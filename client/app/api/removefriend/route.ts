import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@/lib/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest){
    const url = new URL(req.url)
    const id1 = url.searchParams.get('id') || "";
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const id2 = session.user.id || "";
    try {
        await prisma.$transaction(async(tx) => {
            await tx.friend.deleteMany({
                where: {
                    OR: [
                        {userId: id1, friendId: id2},
                        {userId: id2, friendId: id1}
                    ]
                }
            });
            const request = await tx.request.findFirst({
                where: {
                    OR: [
                        {senderId: id1, recieverId: id2},
                        {senderId: id1, recieverId: id2}
                    ]
                },
                select: {
                    requestId: true
                }
            })
            await tx.request.delete({
                where: {
                    requestId: request?.requestId
                }
            })
        })

        return NextResponse.json({success: true, message: "Removed friend"})
    } catch (error) {
        return NextResponse.json({success: false, error: "Internal server error"})
    }
}