import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Domains that should ONLY serve /brochures/* pages.
// Everything else gets rewritten to /coming-soon.
// Remove this middleware entirely when the full site is ready to launch.
const BROCHURE_ONLY_HOSTS = ['nwl.mx', 'www.nwl.mx'];

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.replace(/:\d+$/, '') ?? '';
  const { pathname } = request.nextUrl;

  // Only apply lockdown on brochure-only domains
  if (!BROCHURE_ONLY_HOSTS.includes(host)) {
    return NextResponse.next();
  }

  // Allow brochure pages, coming-soon, and BE campaign pages through
  if (
    pathname.startsWith('/brochures') ||
    pathname === '/coming-soon' ||
    pathname === '/be_nwl' ||
    pathname === '/golden_ticket'
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
