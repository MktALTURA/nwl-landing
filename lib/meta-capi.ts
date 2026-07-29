import { createHash } from 'crypto';

/* ------------------------------------------------------------------ */
/*  Meta Conversions API — shared server-side sender                   */
/*                                                                     */
/*  Used by:                                                           */
/*    app/api/meta-capi/route.ts   — browser-originated events         */
/*    app/api/wa-resolve/route.ts  — WhatsApp leads reconnected later  */
/* ------------------------------------------------------------------ */

const GRAPH_API_VERSION = 'v21.0';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE;

/** Meta rejects the WHOLE request if any event_time is older than 7 days. */
export const META_MAX_EVENT_AGE_SECONDS = 7 * 24 * 60 * 60;

const sha256 = (value: string) =>
  createHash('sha256').update(value.trim().toLowerCase()).digest('hex');

/**
 * Build a Meta `fbc` from a raw fbclid.
 *
 * Format is `fb.<subdomainIndex>.<creationTimeMs>.<fbclid>` — creation time in
 * MILLISECONDS, matching what the pixel itself writes into the `_fbc` cookie.
 * Passing seconds here produces a value Meta silently fails to match.
 *
 * `capturedAtMs` must be when the click was OBSERVED, not when the event is
 * sent — otherwise a click stored earlier in the visit gets a timestamp that
 * doesn't line up with the ad click Meta recorded.
 */
export function buildFbc(fbclid: string, capturedAtMs?: number): string {
  const ts = Number.isFinite(capturedAtMs) ? Number(capturedAtMs) : Date.now();
  return `fb.1.${Math.round(ts)}.${fbclid}`;
}

export interface MetaUserData {
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
  email?: string;
  phone?: string;
}

export interface MetaEventInput {
  eventName: string;
  eventId?: string;
  eventSourceUrl?: string;
  /** Epoch SECONDS. Defaults to now. Must be within 7 days. */
  eventTime?: number;
  actionSource?: 'website' | 'chat' | 'phone_call' | 'email' | 'other';
  userData: MetaUserData;
  customData?: Record<string, unknown>;
}

export type MetaSendResult =
  | { ok: true; result: unknown }
  | { ok: false; status: number; error: string; details?: unknown };

export function isCapiConfigured(): boolean {
  return Boolean(PIXEL_ID && ACCESS_TOKEN);
}

export async function sendMetaEvent(input: MetaEventInput): Promise<MetaSendResult> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('[meta-capi] Missing NEXT_PUBLIC_META_PIXEL_ID or META_CAPI_ACCESS_TOKEN');
    return { ok: false, status: 500, error: 'CAPI not configured' };
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const eventTime = input.eventTime ?? nowSeconds;

  if (nowSeconds - eventTime > META_MAX_EVENT_AGE_SECONDS) {
    // Sending it would make Meta reject the entire batch, so drop it here.
    return { ok: false, status: 400, error: 'Event older than the 7-day limit' };
  }

  const u = input.userData;
  const userData: Record<string, unknown> = {
    ...(u.client_ip_address && { client_ip_address: u.client_ip_address }),
    ...(u.client_user_agent && { client_user_agent: u.client_user_agent }),
    ...(u.fbp && { fbp: u.fbp }),
    ...(u.fbc && { fbc: u.fbc }),
    ...(u.email && { em: [sha256(u.email)] }),
    ...(u.phone && { ph: [sha256(u.phone.replace(/\D/g, ''))] }),
  };

  const payload = {
    data: [
      {
        event_name: input.eventName,
        event_time: eventTime,
        ...(input.eventId && { event_id: input.eventId }),
        ...(input.eventSourceUrl && { event_source_url: input.eventSourceUrl }),
        action_source: input.actionSource ?? 'website',
        user_data: userData,
        ...(input.customData && { custom_data: input.customData }),
      },
    ],
    ...(TEST_EVENT_CODE && { test_event_code: TEST_EVENT_CODE }),
  };

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    if (!res.ok) {
      console.error('[meta-capi] Meta API error:', JSON.stringify(result));
      return { ok: false, status: 502, error: 'Meta API error', details: result };
    }
    return { ok: true, result };
  } catch (err) {
    console.error('[meta-capi] Request failed:', err);
    return { ok: false, status: 500, error: 'Request failed' };
  }
}
