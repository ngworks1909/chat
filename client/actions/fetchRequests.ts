import prisma from "@/lib/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";


// requestId: string;
//     senderId: string;
//     recieverId: string;
//     sentDate: Date;
//     status: $Enums.FriendStatus;
export const fetchRequests = async() => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const id = session.user.id;
    const requests = await prisma.request.findMany({
        where: {
            recieverId: id,
            status: "Sent"
        },
        select: {
            requestId: true,
            status: true,
            sender: {
                select: {
                    username: true,
                    email: true,
                    image: true
                }
            }

        }
    });
    
    return requests;
}