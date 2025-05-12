import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // 1. Protection des routes avec Next-Auth v4
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;

  // Routes protégées
  const protectedRoutes = ['/admin', '/dashboard'];
  if (protectedRoutes.some(route => path.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Headers de sécurité (votre configuration actuelle)
  const headers = new Headers(request.headers);
  const response = NextResponse.next({ request: { headers } });

  // CSP (ajusté pour Stripe)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://*.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://*.stripe.com;"
  );

  // Autres headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};