/* ------------------------------------------------------------------ */
/*  Meta Pixel helpers (client-side)                                   */
/*                                                                     */
/*  fireMetaEvent() sends one event TWICE with a shared event_id:      */
/*    1. browser pixel  — fbq('track', name, data, { eventID })        */
/*    2. server CAPI     — POST /api/meta-capi                          */
/*  Meta deduplicates the pair via the shared event_id.                */
/* ------------------------------------------------------------------ */

export type MetaEventName = 'Lead' | 'ViewContent' | 'Contact' | 'CompleteRegistration';

/** Generate a deduplication ID shared between browser pixel and server CAPI. */
function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function fireMetaEvent(
  eventName: MetaEventName,
  customData?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return;

  const eventId = newEventId();
  const eventSourceUrl = window.location.href;

  // 1. Browser pixel (deduplicated via eventID)
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, customData ?? {}, { eventID: eventId });
  }

  // 2. Server-side Conversions API — fire-and-forget
  try {
    void fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true, // survive page navigation
      body: JSON.stringify({ eventName, eventId, eventSourceUrl, customData }),
    }).catch(() => {});
  } catch {
    /* never block the UI on tracking */
  }
}
