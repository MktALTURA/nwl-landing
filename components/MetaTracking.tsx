'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { fireMetaEvent } from '@/lib/meta-pixel';
import { buildWhatsAppHref, mintWaToken, storeWaAttribution } from '@/lib/wa-attribution';

/* ------------------------------------------------------------------ */
/*  Meta event tracking — client side                                  */
/*                                                                     */
/*  Mounted once in the root layout. Handles:                          */
/*   1. Contact   — clicks on WhatsApp / tel: / mailto: links          */
/*                  (one delegated listener, covers the whole site)    */
/*   2. WhatsApp attribution token — stamps a reference code into the  */
/*                  wa.me prefill so the lead can be reconnected       */
/*   3. ViewContent — visits to high-intent pages                      */
/*                                                                     */
/*  Each event fires browser pixel + server CAPI via fireMetaEvent,    */
/*  deduplicated by a shared event_id.                                 */
/* ------------------------------------------------------------------ */

/** Marks an anchor whose href we already stamped, so re-clicks reuse it. */
const WA_TOKEN_ATTR = 'data-wa-token';

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
    // Drop the query string — by click time it carries the prefilled message
    // and the reference token, neither of which belongs in Meta custom_data.
    return { method: 'whatsapp', detail: href.split('?')[0] };
  }
  if (lower.startsWith('tel:')) {
    return { method: 'phone', detail: href.replace(/^tel:/i, '') };
  }
  if (lower.startsWith('mailto:')) {
    return { method: 'email', detail: href.replace(/^mailto:/i, '') };
  }
  return null;
}

/**
 * Stamp a WhatsApp anchor with a reference code and park its attribution.
 * Idempotent per anchor. Returns the href actually in place.
 */
function stampWhatsAppAnchor(anchor: HTMLAnchorElement, href: string): string {
  const existing = anchor.getAttribute(WA_TOKEN_ATTR);
  if (existing) return anchor.getAttribute('href') ?? href;

  const token = mintWaToken();
  const stamped = buildWhatsAppHref(href, token);
  if (stamped === href) return href; // URL we couldn't parse — leave it alone

  anchor.setAttribute('href', stamped);
  anchor.setAttribute(WA_TOKEN_ATTR, token);
  storeWaAttribution(token);
  return stamped;
}

export default function MetaTracking() {
  const pathname = usePathname();

  // ── 1 & 2. Delegated listeners for WhatsApp / phone / email links ──
  useEffect(() => {
    const findWhatsAppAnchor = (e: Event): [HTMLAnchorElement, string] | null => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return null;
      const href = anchor.getAttribute('href');
      if (!href) return null;
      return classifyContact(href)?.method === 'whatsapp' ? [anchor, href] : null;
    };

    // Rewrite the href on pointerdown, which fires before `click` — so the
    // token is already in place by the time the browser follows the link.
    // Keyboard activation skips pointerdown; the click handler below covers it.
    const handlePointerDown = (e: PointerEvent) => {
      const hit = findWhatsAppAnchor(e);
      if (hit) stampWhatsAppAnchor(hit[0], hit[1]);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const contact = classifyContact(href);
      if (!contact) return;

      if (contact.method === 'whatsapp') {
        stampWhatsAppAnchor(anchor, href);
      }

      fireMetaEvent('Contact', {
        contact_method: contact.method,
        contact_detail: contact.detail,
        source_path: window.location.pathname,
      });
    };

    document.addEventListener('pointerdown', handlePointerDown, { capture: true });
    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      document.removeEventListener('click', handleClick, { capture: true });
    };
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
