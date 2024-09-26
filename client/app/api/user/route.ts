import prisma from "@/lib/client";
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  const user = await prisma.user.findFirst({
    where: {
        token
    }
  })
  return NextResponse.json({ user });
}