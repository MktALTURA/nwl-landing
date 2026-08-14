import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_NAME, ROLE_HOME, verifyToken } from '@/lib/auth-edge';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Brochure QR default UTM tagging ──
  // Printed QR codes point to /brochures/{level} without UTM params.
  // If no utm_source is present, redirect with brochure-specific UTMs.
  // If UTMs already exist (e.g., CAP-shared link), leave them untouched.
  const brochureLevelMatch = pathname.match(/^\/brochures\/(maternal-kinder|elementary|middle-school|high-school)$/);
  if (brochureLevelMatch && !request.nextUrl.searchParams.has('utm_source')) {
    const level = brochureLevelMatch[1];
    const url = request.nextUrl.clone();
    url.searchParams.set('utm_source', 'brochure_qr');
    url.searchParams.set('utm_medium', 'offline');
    url.searchParams.set('utm_campaign', `brochure_${level.replace(/-/g, '_')}`);
    return NextResponse.redirect(url);
  }

  // ── Admin route protection ──
  // Note: this only guards PAGES. The matcher doesn't exclude /api, but the
  // block below never fires for it, so every API route guards itself via
  // getSession() — that is the real security boundary.
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = await verifyToken(request.cookies.get(COOKIE_NAME)?.value);

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // The beneficios role only reaches its own panel; anything else bounces
    // back to its home instead of exposing the job-listings admin.
    if (session.role === 'beneficios' && !pathname.startsWith('/admin/beneficios')) {
      return NextResponse.redirect(new URL(ROLE_HOME.beneficios, request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets, _next internals, images, and favicon
  matcher: ['/((?!_next/static|_next/image|images|favicon.ico|.*\\..*).*)'],
};
