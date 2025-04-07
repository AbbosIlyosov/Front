import { parse } from "cookie";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ['/login', '/register'];
// const ADMIN_PATHS = ['/admin-panel'];


export function middleware(request:NextRequest){
    const { pathname } = request.nextUrl;

    if(PUBLIC_PATHS.includes(pathname)){
        return NextResponse.next();
    }

    const cookie = request.headers.get('cookie') || '';
    const cookies = parse(cookie);
    const token = cookies['auth_token'];

    if(!token){
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        // '/map/:path*',
        // '/businesses/:path*',
        // '/points/:path*'
    ]
}