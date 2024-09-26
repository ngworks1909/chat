import prisma from "@/lib/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const data = await req.json();
    try {
        await prisma.$transaction(async(tx) => {
            await tx.request.create({
                data: {
                    senderId: session.user.id,
                    recieverId: data.recieverId,
                }
            });
        })

        return NextResponse.json({success: true, message: "Sent"})
    } catch (error) {
        return NextResponse.json({success: false, error: "Failed"})
    }
}