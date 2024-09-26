import prisma from "@/lib/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, {params}: {params: {searchId: string}} ){
    const emailOrMobile = params.searchId;
    if(emailOrMobile){
        const session = await getServerSession(NEXT_AUTH_CONFIG);
        const mail = session.user.email;
        const mobile = session.user.mobile;
        const id = session.user.id;

        const users = await prisma.user.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            {email: {startsWith: emailOrMobile}},
                            {mobile: {startsWith: emailOrMobile}}
                        ]
                    },
                    {
                        NOT: [
                            {email: mail},
                            {mobile: mobile}
                        ]
                    },
                ],
            },
            select: {
                userId: true,
                username: true,
                image: true,
                incomingRequests: {
                    select: {
                        senderId: true,
                        status: true,
                    }
                },
                outgoingRequests: {
                    select: {
                        recieverId: true,
                        status: true
                    }
                },
            }
        });

        const results = [];

        for (const user of users) {
            const incomingRequest = user.incomingRequests.find(request => request.senderId === id);
            if (incomingRequest) {
                results.push({
                  name: user.username,
                  image: user.image,
                  status: incomingRequest.status
                });
                continue;
            }


            const outgoingRequest = user.outgoingRequests.find(request => request.recieverId === id);
            if (outgoingRequest) {
                results.push({
                  name: user.username,
                  image: user.image,
                  status: outgoingRequest.status === "Sent" ? "Recieved": outgoingRequest.status
                });
                continue;
            }
            results.push({
                id: user.userId,
                name: user.username,
                image: user.image,
                status: "Request"
            });

        }
        

        


        
        return NextResponse.json({success: true, users: results})
    }
    return NextResponse.json({success: true, users: []})
}