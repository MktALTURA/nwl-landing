import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Domains that should ONLY serve /brochures/* pages.
// Everything else gets rewritten to /coming-soon.
// Remove this middleware entirely when the full site is ready to launch.
const BROCHURE_ONLY_HOSTS = ['nwl.mx', 'www.nwl.mx'];

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is required');
  return new TextEncoder().encode(secret);
}
const ADMIN_COOKIE = 'nwl-admin-token';

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.replace(/:\d+$/, '') ?? '';
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
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, getJwtSecret());
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // ── Brochure-only domain lockdown ──
  if (!BROCHURE_ONLY_HOSTS.includes(host)) {
    return NextResponse.next();
  }

  // Allow brochure pages, informacion pages, coming-soon, and BE campaign pages through
  if (
    pathname.startsWith('/brochures') ||
    pathname.startsWith('/informacion') ||
    pathname === '/coming-soon' ||
    pathname === '/be_nwl' ||
    pathname === '/golden_ticket' ||
    pathname === '/golden_ticket_cap'
  ) {
    return NextResponse.next();
  }

  // Block everything else → rewrite to coming-soon (URL stays as nwl.mx/)
  return NextResponse.rewrite(new URL('/coming-soon', request.url));
}

export const config = {
  // Skip static assets, _next internals, images, and favicon
  matcher: ['/((?!_next/static|_next/image|images|favicon.ico|.*\\..*).*)'],
};
