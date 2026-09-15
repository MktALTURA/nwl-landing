import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_NAME, ROLE_HOME, verifyToken } from '@/lib/auth-edge';
import {
  RECTORIA_PUBLIC,
  RECTORIA_PREVIEW_COOKIE,
  RECTORIA_PREVIEW_PARAM,
  rectoriaPreviewToken,
} from '@/lib/rectoria-preview';

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

  // ── Rectoría private preview ──
  // Inactive since the 2026-09-15 launch (RECTORIA_PUBLIC is true). Kept so the
  // page can be re-gated: only browsers that came through the preview link can see it. The link sets a
  // cookie and redirects to the clean URL; anyone else gets the 404 page, so
  // the route is invisible rather than "coming soon".
  if (!RECTORIA_PUBLIC && (pathname === '/rectoria' || pathname.startsWith('/rectoria/'))) {
    const token = rectoriaPreviewToken();

    if (request.nextUrl.searchParams.get(RECTORIA_PREVIEW_PARAM) === token) {
      const url = request.nextUrl.clone();
      url.searchParams.delete(RECTORIA_PREVIEW_PARAM);
      const response = NextResponse.redirect(url);
      response.cookies.set(RECTORIA_PREVIEW_COOKIE, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/rectoria',
        maxAge: 60 * 60 * 24 * 30,
      });
      return response;
    }

    if (request.cookies.get(RECTORIA_PREVIEW_COOKIE)?.value !== token) {
      return NextResponse.rewrite(new URL('/rectoria/not-found', request.url), { status: 404 });
    }

    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
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
