import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {messageId, senderId, recieverId, messageStatus} = body;
    
    await prisma.$transaction(async(tx) => {
        await tx.message.update({
            where: {
                messageId
            },
            data: {
                messageStatus
            }
        });

        await tx.friend.updateMany({
            where: {
                OR: [
                    {
                        userId: senderId,
                        friendId: recieverId
                    },
                    {
                        userId: recieverId,
                        friendId: senderId
                    }
                ]
            },
            data: {
                lastStatus: messageStatus
            }
        });
    })
    return NextResponse.json({});
}