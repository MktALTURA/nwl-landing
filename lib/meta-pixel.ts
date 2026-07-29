import { getFbclid } from '@/lib/utm';

/* ------------------------------------------------------------------ */
/*  Meta Pixel helpers (client-side)                                   */
/*                                                                     */
/*  fireMetaEvent() sends one event TWICE with a shared event_id:      */
/*    1. browser pixel  — fbq('track', name, data, { eventID })        */
/*    2. server CAPI     — POST /api/meta-capi                          */
/*  Meta deduplicates the pair via the shared event_id.                */
/*                                                                     */
/*  `browserOnly` skips step 2 — used for `Lead`, where the SERVER     */
/*  side is owned by GoHighLevel (it has the hashed email/phone we     */
/*  can't read out of the cross-origin form iframe). The browser half  */
/*  exists to contribute `fbc` + `fbp`, which GHL cannot send at all.  */
/* ------------------------------------------------------------------ */

export type MetaEventName = 'Lead' | 'ViewContent' | 'Contact' | 'CompleteRegistration';

/**
 * Hosts allowed to send data to the Meta dataset.
 *
 * Preview deployments (`nwl-landing*.vercel.app`) and localhost were firing
 * live Pixel traffic into the production dataset, which both pollutes the
 * numbers and risks duplicate events. Keep this in sync with the equivalent
 * inline check in app/layout.tsx, which gates `fbq` init itself.
 */
export const META_HOST_RE = /(^|\.)nwl\.com\.mx$/;

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
