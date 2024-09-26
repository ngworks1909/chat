import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server';


export const config = {
    matcher : ["/", "/friends", "/requests"]
}

export default withAuth(async( req ) => {
    const token = req.nextauth.token;
    if(!token){
        return NextResponse.redirect(new URL('/login', req.url))
    }
    // const user = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user?token=${token.jwtToken}`);
    // const json = await user.json();
    // if(!json.user){
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }
})