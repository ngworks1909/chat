import prisma from "@/lib/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Friend } from "@/zod/Friend";

export async function GET(){
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const id = session.user.id;
    try {
        const friends = await prisma.friend.findMany({
            where: {
                userId: id
            },
            orderBy: {
                time: "desc"
            },
            select: {
                userId: true,
                friendId: true,
                friend: {
                    select: {
                        username: true,
                        email: true,
                        mobile: true,
                        image: true
                    }
                },
                time: true,
                last: true,
                lastMessage: true,
                messageType: true,
                lastStatus: true,
                messageCount: true
            }
            
        });


        // select: {
        //     userId: true,
        //     friendId: true,
        //     time: true,
        //     friend: {
        //         select: {
        //             username: true,
        //             image: true,
        //             email: true,
        //             mobile: true,
        //         }
        //     },
        //     incomingMessages: {
        //         select: {
        //             messageId: true,
        //             message: true,
        //             type: true
        //         },
        //         where: {
        //             messageStatus: {
        //                 in: ["Sent", "Delivered"]
        //             }
        //         },
        //         orderBy: {
        //             messageId: "desc"
        //         }
        //     },
        //     outgoingMessages: {
        //         select: {
        //             messageId: true,
        //             type: true,
        //             messageStatus: true,
        //             message: true
        //         },
        //         orderBy: {
        //             messageId: "desc"
        //         },
        //         take: 1
        //     }
        // }

        // const results = new Array<Friend>()

        // for(const friend of friends){
        //     var firstIncoming;
        //     if(friend.incomingMessages.length > 0){
        //         firstIncoming = friend.incomingMessages[0]
        //     }
        //     if(!firstIncoming){
        //         firstIncoming = await prisma.message.findFirst({
        //             where: {
        //                 senderId: friend.friendId,
        //                 recieverId: id
        //             },
        //             orderBy: {
        //                 messageId: "desc"
        //             }
        //         });
        //     }
        //     var firstOutgoing;
        //     if(friend.outgoingMessages.length > 0){
        //         firstOutgoing = friend.outgoingMessages[0]
        //     }
        //     if((!firstIncoming && firstOutgoing) || (firstIncoming && firstOutgoing && firstIncoming.messageId < firstOutgoing.messageId)){
        //         const data = {friend: friend.friend, userId: friend.userId, friendId: friend.friendId, time: friend.time, messageType: "Outgoing", messageStatus: firstOutgoing.messageStatus, type: firstOutgoing.type, message: firstOutgoing.message}
        //         results.push(data);
        //         continue;
        //     }
        //     if((firstIncoming && !firstOutgoing) || (firstIncoming && firstOutgoing && firstIncoming.messageId > firstOutgoing.messageId)){
        //         const data = {friend: friend.friend, userId: friend.userId, friendId: friend.friendId, time: friend.time, messageType: "Incoming", count: friend.incomingMessages.length, type: firstIncoming.type, message: firstIncoming.message};
        //         results.push(data);
        //         continue;
        //     }
        //     const data = {friend: friend.friend, userId: friend.userId, friendId: friend.friendId, messageType: "None"}
        //     results.push(data);

        // }
        return NextResponse.json({success: true, friends})
    } catch (error) {
        return NextResponse.json({success: false, friends: []})
    }
}