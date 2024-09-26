import prisma from "@/lib/client";
import { signupInput } from "@/zod/validateUser";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'


export async function POST(req: NextRequest){
    const body = await req.json();
    let success = false;
    const signupSuccess = signupInput.safeParse(body);
    if(!signupSuccess){
        return NextResponse.json({success, error: "Invalid inputs..."})
    }
    const {username, email, password, mobile} = body;
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email
            },
            select: {
                userId: true
            }
        });
        if(existingUser) {
            return NextResponse.json({success, error: 'User already exists...'}, {status: 400});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedpassword,
                mobile
            },
            select: {
                userId: true
            }
        });
        
        success = true;
        return NextResponse.json({success, message: "User signup successful..."});
    } catch (error) {
        success = false;
        return NextResponse.json({success, error: 'Internal server error...'}, {status: 500});
    }
    


}