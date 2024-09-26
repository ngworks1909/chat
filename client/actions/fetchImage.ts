import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@/lib/client";
import { getServerSession } from "next-auth";

export const fetchImage = async() => {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const id = session.user.id;
    const user = await prisma.user.findUnique({
        where: {
            userId: id
        }
    });
    return user?.image || ""
}