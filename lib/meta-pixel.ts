import { getFbclid } from '@/lib/utm';

/* ------------------------------------------------------------------ */
/*  Meta Pixel helpers (client-side)                                   */
/*                                                                     */
/*  fireMetaEvent() sends one event TWICE with a shared event_id:      */
/*    1. browser pixel  — fbq('track', name, data, { eventID })        */
/*    2. server CAPI     — POST /api/meta-capi                          */
/*  Meta deduplicates the pair via the shared event_id.                */
/*                                                                     */
/*  `browserOnly` skips step 2. Currently unused: GHL's CAPI action    */
/*  cannot emit an `event_id`, so it can never dedup against us — its  */
/*  event is renamed `SubmitApplication` instead, leaving every event  */
/*  named here owned end-to-end by this codebase.                      */
/* ------------------------------------------------------------------ */

export type MetaEventName = 'Lead' | 'ViewContent' | 'Contact' | 'CompleteRegistration';

/**
 * Hosts allowed to send data to the Meta dataset.
 *
 * Preview deployments (`nwl-landing*.vercel.app`) and localhost were firing
 * live Pixel traffic into the production dataset, which both pollutes the
 * numbers and risks duplicate events. Keep this in sync with the equivalent
 * inline check in app/layout.tsx, which gates `fbq` init itself.
 *
 * As of 29 Jul 2026 `www.nwl.com.mx` is the sole canonical host: `nwl.mx`,
 * `www.nwl.mx` and `nwl.com.mx` all 308 to it, preserving the query string.
 * The pattern stays deliberately permissive rather than pinning the canonical
 * host, so tracking doesn't go silent if a redirect is ever removed or a new
 * `*.nwl.mx` alias is pointed at the project. Preview deploys and localhost
 * are still excluded, which is the part that matters.
 */
export const META_HOST_RE = /(^|\.)nwl\.(com\.)?mx$/;

export function isMetaTrackingHost(): boolean {
  if (typeof window === 'undefined') return false;
  return META_HOST_RE.test(window.location.hostname);
}

/** Generate a deduplication ID shared between browser pixel and server CAPI. */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export interface FireMetaEventOptions {
  /** Reuse a pre-minted id (e.g. one already handed to GHL). */
  eventId?: string;
  /** Fire the browser pixel only; do not POST to our own CAPI route. */
  browserOnly?: boolean;
}

/** Fires the event and returns the event_id used, for logging/dedup. */
export function fireMetaEvent(
  eventName: MetaEventName,
  customData?: Record<string, unknown>,
  options?: FireMetaEventOptions,
): string | null {
  if (typeof window === 'undefined') return null;
  if (!isMetaTrackingHost()) return null;

  const eventId = options?.eventId ?? newEventId();
  const eventSourceUrl = window.location.href;

  // 1. Browser pixel (deduplicated via eventID). This is the ONLY place
  //    `_fbc` / `_fbp` can be read from — they are first-party cookies, so no
  //    third-party server (GHL included) can access them.
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, customData ?? {}, { eventID: eventId });
  }

  if (options?.browserOnly) return eventId;

  // 2. Server-side Conversions API — fire-and-forget.
  //    fbclid comes from the ad-click URL *or* our 7-day store, together with
  //    the timestamp it was captured at, so the server can rebuild a valid
  //    `fbc` even when the pixel (and its `_fbc` cookie) is blocked.
  const click = getFbclid();

  try {
    void fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true, // survive page navigation (WhatsApp/tel clicks)
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl,
        fbclid: click?.fbclid,
        fbclidTs: click?.ts,
        customData,
      }),
    }).catch(() => {});
  } catch {
    /* never block the UI on tracking */
  }

  return eventId;
}
