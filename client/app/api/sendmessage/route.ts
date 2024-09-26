import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@/lib/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const json = await req.json();
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const senderId = session.user.id
    try {
        const {message, recieverId, messageType} = json;
        if(message && senderId && recieverId) {
            
            const newMessage = await prisma.$transaction(async(tx) => {
                const newMessage = await prisma.message.create({
                    data: {
                        message,
                        senderId,
                        recieverId,
                        type: messageType || "text"
                    }
                });
                // await tx.friend.updateMany({
                //     where: {
                //         OR: [
                //             {
                //                 userId: senderId,
                //                 friendId: recieverId
                //             },{
                //                 userId: recieverId,
                //                 friendId: senderId
                //             }
                //         ]
                //     },
                //     data:{
                //         lastMessage: newMessage.message,
                //         time: new Date()
                //     }
                // })

                // last             Last      @default(None)
                // messageType  MessageType @default(text)
                // lastMessage      String    @default("")
                // lastStatus       MessageStatus @default(Sent)
                // messageCount     Int       @default(0)
                const time = new Date();
                await tx.friend.update({
                    where: {
                        userId: senderId,
                        friendId: recieverId
                    },
                    data: {
                        last: "Outgoing",
                        messageType: messageType,
                        lastMessage: message,
                        time  
                    }
                });

                await tx.friend.update({
                    where: {
                        userId: recieverId,
                        friendId: senderId
                    },
                    data: {
                        last: "Incoming",
                        messageType: messageType,
                        lastMessage: message,
                        messageCount: {
                            increment: 1
                        },
                        time
                    }
                })

                return newMessage;
            })
            return NextResponse.json({success: true, message: newMessage})
        };
    } catch (error) {
        return NextResponse.json({success: false, error: 'Internal server error'})
    }
}