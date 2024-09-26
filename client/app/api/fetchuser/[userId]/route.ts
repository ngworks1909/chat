import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    userId: string
}

export async function GET(req: NextRequest, {params}:{params: Params}){
    const {userId} = params;
    const user = await prisma.user.findUnique({
        where: {
            userId
        }
    })
    return NextResponse.json({user})
}