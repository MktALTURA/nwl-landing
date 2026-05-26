'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { fireMetaEvent } from '@/lib/meta-pixel';

/* ------------------------------------------------------------------ */
/*  Meta event tracking — client side                                  */
/*                                                                     */
/*  Mounted once in the root layout. Handles:                          */
/*   1. Contact   — clicks on WhatsApp / tel: / mailto: links          */
/*                  (one delegated listener, covers the whole site)    */
/*   2. ViewContent — visits to high-intent pages                      */
/*                                                                     */
/*  Each event fires browser pixel + server CAPI via fireMetaEvent,    */
/*  deduplicated by a shared event_id.                                 */
/* ------------------------------------------------------------------ */

/** Route prefixes considered high-intent → fire ViewContent. */
const VIEW_CONTENT_PATHS = [
  '/kinder',
  '/maternal',
  '/elementary',
  '/middle-school',
  '/high-school',
  '/campus/',
  '/informacion',
  '/padres',
];

function classifyContact(href: string): { method: string; detail: string } | null {
  const lower = href.toLowerCase();
  if (lower.includes('wa.me') || lower.includes('whatsapp.com')) {
    return { method: 'whatsapp', detail: href };
  }
  if (lower.startsWith('tel:')) {
    return { method: 'phone', detail: href.replace(/^tel:/i, '') };
  }
  if (lower.startsWith('mailto:')) {
    return { method: 'email', detail: href.replace(/^mailto:/i, '') };
  }
  return null;
}

export default function MetaTracking() {
  const pathname = usePathname();

  // ── 1. Contact: delegated click listener for WhatsApp / phone / email ──
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const contact = classifyContact(href);
      if (!contact) return;

      fireMetaEvent('Contact', {
        contact_method: contact.method,
        contact_detail: contact.detail,
        source_path: window.location.pathname,
      });
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  // ── 2. ViewContent: fire on high-intent pages (per path change) ──
  useEffect(() => {
    if (!pathname) return;
    const isKeyPage = VIEW_CONTENT_PATHS.some((p) => pathname.startsWith(p));
    if (isKeyPage) {
      fireMetaEvent('ViewContent', { content_path: pathname });
    }
  }, [pathname]);

  return null;
}
