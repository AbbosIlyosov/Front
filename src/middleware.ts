import { NextRequest, NextResponse } from 'next/server';
import { AuthenticatedUser } from './interfaces/AuthenticatedUser';

const PUBLIC_PATHS = ['/login', '/register'];
const ADMIN_PATHS = ['/admin-panel'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const path = pathname.toLowerCase();

  // Allow public paths without auth
  if (PUBLIC_PATHS.includes(path)) {
    return NextResponse.next();
  }

  // Get access token from cookies
  const token = request.cookies.get('access_token')?.value;
  console.log('MIDDLEWARE: token ->', token);

  // Redirect to login if token is missing
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Admin route protection
  if (ADMIN_PATHS.includes(path) || path.startsWith('admin-panel')) {
    const authUserCookie = request.cookies.get('auth_user')?.value;

    if (authUserCookie) {
      try {
        const user: AuthenticatedUser = JSON.parse(authUserCookie);
        if (user.role.toLowerCase() !== 'admin') {
          return NextResponse.redirect(new URL('/not-found', request.url));
        }
      } catch (err) {
        console.error('Failed to parse auth_user cookie', err);
        return NextResponse.redirect(new URL('/not-found', request.url));
      }
    } else {
      return NextResponse.redirect(new URL('/not-found', request.url));
    }
  }

  // Redirect root path to /points
  if (path === '/') {
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
