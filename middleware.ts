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

  // Allow brochure pages, coming-soon, and BE campaign pages through
  if (
    pathname.startsWith('/brochures') ||
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
