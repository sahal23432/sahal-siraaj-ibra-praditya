import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth/security';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = req.cookies.get('admin_session')?.value;

  const isLoginPage = pathname === '/admin/login';
  const isAdminPath = pathname.startsWith('/admin');

  if (isAdminPath) {
    const isAuthenticated = await verifySessionToken(sessionCookie);

    // If user is already authenticated and visits /admin/login, redirect to /admin
    if (isLoginPage) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      return NextResponse.next();
    }

    // For all other /admin routes, block unauthenticated access at the edge
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
