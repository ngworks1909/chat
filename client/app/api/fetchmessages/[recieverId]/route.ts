import { Message } from "@prisma/client";
import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export async function GET(req: NextRequest, {params}: {params: {recieverId: string}}){
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const senderId = session.user.id;
    const recieverId = params.recieverId
    try {
        const messages = await prisma.$transaction(async(tx) => {
            const messages = await tx.message.findMany({
                where: {
                    OR: [
                        {
                            senderId, recieverId, senderDelete: false
                        },
                        {
                            senderId: recieverId, recieverId: senderId, recieverDelete: false
                        }
                    ]
                },
                orderBy: {
                    messageId: "asc"
                }
            });
    
            const unreadMessages = new Array<number>();
            messages.forEach((message:Message, index: number) => {
                if(message.messageStatus !== "Seen" && message.senderId === recieverId){
                    if(messages[index]){
                        messages[index].messageStatus = "Seen";
                        unreadMessages.push(message.messageId);
                    }
                }
            })

            const lastmessage = messages[messages.length - 1]

            if(lastmessage.senderId === recieverId){
                await tx.message.updateMany({
                    where: {
                        messageId: {in: unreadMessages}
                    },
                    data: {
                        messageStatus: "Seen"
                    }
                })
    
    
                await tx.friend.update({
                    where: {
                        userId: senderId, friendId: recieverId
                    },
                    data: {
                        lastStatus: "Seen",
                        messageCount: 0
                    }
                });
    
                await tx.friend.update({
                    where: {
                        userId: recieverId,
                        friendId: senderId
                    },
                    data: {
                        lastStatus: "Seen"
                    }
                })
            }
            return messages;
        })
        return NextResponse.json({success: true, messages})
    } catch (error) {
        return NextResponse.json({success: false, error: 'Internal server error'})
    }
}