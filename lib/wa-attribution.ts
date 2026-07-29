import { getClickIds, getFbclid, getFirstLandingPage, getFirstTouchUTMs, getLastTouchUTMs } from '@/lib/utm';

/* ------------------------------------------------------------------ */
/*  WhatsApp attribution bridge (client half)                          */
/*                                                                     */
/*  ~44% of contacts arrive through the site's WhatsApp button. The    */
/*  wa.me handoff drops every URL param, so those land in the CRM as   */
/*  "sin identificar" even though the visitor arrived on a tagged ad   */
/*  click seconds earlier.                                             */
/*                                                                     */
/*  Fix: stamp a short reference code into the prefilled message and   */
/*  park the real attribution server-side under that code. When the    */
/*  family sends the message, a GHL workflow reads the code back out   */
/*  and calls /api/wa-resolve to recover it.                           */
/*                                                                     */
/*  The code is deliberately human-readable and carries no data — the  */
/*  payload (including the raw _fbc cookie) never leaves our servers.  */
/* ------------------------------------------------------------------ */

/** `NW-` + 6 chars. Ambiguous glyphs (0/O/1/I) omitted — humans retype these. */
const TOKEN_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const TOKEN_LENGTH = 6;

export const WA_TOKEN_PATTERN = /NW-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}/;

// Strips a whole bracketed reference group containing a token — `[NW-ABC234]`,
// `[Ref NW-ABC234]`, `[ref: NW-ABC234]`. Keeps re-stamping idempotent even if
// the wording inside the brackets changes later.
const WA_TOKEN_GROUP = /\s*\[[^\]]*NW-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}[^\]]*\]/g;

/** Default prefilled message. Ops owns this copy — keep it short. */
const DEFAULT_MESSAGE_ES = 'Hola, quiero informes de NWL Australian School.';
const DEFAULT_MESSAGE_EN = 'Hi, I would like information about NWL Australian School.';

export function mintWaToken(): string {
  let out = '';
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(TOKEN_LENGTH);
    crypto.getRandomValues(bytes);
    for (const b of bytes) out += TOKEN_ALPHABET[b % TOKEN_ALPHABET.length];
  } else {
    for (let i = 0; i < TOKEN_LENGTH; i++) {
      out += TOKEN_ALPHABET[Math.floor(Math.random() * TOKEN_ALPHABET.length)];
    }
  }
  return `NW-${out}`;
}

/**
 * Rewrite a wa.me URL so its prefilled text ends with `[NW-XXXXXX]`.
 * Idempotent: an existing reference code is replaced, never stacked.
 */
export function buildWhatsAppHref(href: string, token: string): string {
  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return href;
  }

  const lang = document.documentElement.lang?.toLowerCase().startsWith('en') ? 'en' : 'es';
  const fallback = lang === 'en' ? DEFAULT_MESSAGE_EN : DEFAULT_MESSAGE_ES;

  const existing = url.searchParams.get('text');
  const base = (existing ?? fallback)
    .replace(WA_TOKEN_GROUP, '')
    // Belt and braces: a bare token that somehow isn't bracketed.
    .replace(WA_TOKEN_PATTERN, '')
    .replace(/\[\s*\]/g, '')
    .trim();

  // Serialise by hand: URLSearchParams encodes spaces as `+`, and wa.me links
  // are conventionally `%20`. Don't bet the prefill on WhatsApp treating the
  // two the same.
  url.searchParams.delete('text');
  const others = url.searchParams.toString();
  const textParam = `text=${encodeURIComponent(`${base} [${token}]`)}`;
  url.search = others ? `${others}&${textParam}` : textParam;

  return url.toString();
}

/** Everything worth recovering later, read from the live page. */
function collectPayload(token: string) {
  const click = getFbclid();
  const lastTouch = getLastTouchUTMs();
  const firstTouch = getFirstTouchUTMs();

  return {
    token,
    clickedAt: Date.now(),
    href: window.location.href,
    source_path: window.location.pathname,
    landing_page: lastTouch?.landing_page,
    ft_landing_page: firstTouch?.landing_page ?? getFirstLandingPage(),
    fbclid: click?.fbclid,
    fbclidTs: click?.ts,
    clickIds: getClickIds(),
    utm: lastTouch
      ? {
          utm_source: lastTouch.utm_source,
          utm_medium: lastTouch.utm_medium,
          utm_campaign: lastTouch.utm_campaign,
          utm_term: lastTouch.utm_term,
          utm_content: lastTouch.utm_content,
        }
      : undefined,
    ft_utm: firstTouch
      ? {
          utm_source: firstTouch.utm_source,
          utm_medium: firstTouch.utm_medium,
          utm_campaign: firstTouch.utm_campaign,
          utm_term: firstTouch.utm_term,
          utm_content: firstTouch.utm_content,
        }
      : undefined,
  };
}

/**
 * Park the attribution for `token`. Fire-and-forget with `keepalive` so it
 * still completes after the browser hands off to WhatsApp.
 *
 * The `_fbc` / `_fbp` cookies are NOT sent from here — they're first-party
 * cookies on this origin, so /api/wa-token reads them off the request
 * directly, which is both simpler and immune to document.cookie being
 * partitioned.
 */
export function storeWaAttribution(token: string): void {
  if (typeof window === 'undefined') return;
  try {
    void fetch('/api/wa-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify(collectPayload(token)),
    }).catch(() => {});
  } catch {
    /* never block the CTA on tracking */
  }
}
