import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const path = pathname.toLowerCase();

  // Allow public paths without auth
  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next();
  }

  // get token from cookies
  const token = request.cookies.get('access_token')?.value;

  console.log('MIDDLEWARE: token ->', token);

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  else if(path == '/'){
    return NextResponse.redirect(new URL('/points', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/map/:path*',
    '/businesses/:path*',
    '/workers/:path*',
    '/appointments/:path*',
    '/points/:path*',
    '/admin-panel/:path*',
    '/profile/:path*',
  ],
};
