import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const requestId = data.requestId;
    console.log(requestId)
    try {
        await prisma.$transaction(async(tx) => {
            const request = await tx.request.update({
                data: {
                    status: "Friends"
                },
                where: {
                    requestId
                },
                select: {
                    sender: {
                        select: {
                            userId: true
                        }
                    },
                    reciever: {
                        select: {
                            userId: true
                        }
                    }
                }
            })
            
            await tx.friend.createMany({
                data: [
                    {
                        userId: request.sender.userId,
                        friendId: request.reciever.userId
                    },
                    {
                        userId: request.reciever.userId,
                        friendId: request.sender.userId
                    }
                ]
            });
        })

        

        return NextResponse.json({success: true})
    } catch (error) {
        return NextResponse.json({success: false, error: "Internal server error"})
    }

}