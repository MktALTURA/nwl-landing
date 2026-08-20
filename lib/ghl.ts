import type { WaAttribution } from '@/lib/db/wa-attribution';

/* ------------------------------------------------------------------ */
/*  GoHighLevel contact write-back                                     */
/*                                                                     */
/*  WhatsApp leads reach GHL with no attribution at all: the contact   */
/*  is created by the inbound message, long after the ad click, and    */
/*  the free Webhook action can't feed our response back into the      */
/*  workflow. So the recovered UTMs are written straight onto the      */
/*  contact from here instead.                                         */
/*                                                                     */
/*  Custom fields, not GHL's native attribution — verified 5 Aug 2026  */
/*  that `attributionSource` and the standard `gclid` field are both   */
/*  READ-ONLY: the API answers 200 `succeeded:true` and silently       */
/*  discards them. GHL populates native attribution only from its own  */
/*  events (its form widget, its tracking script). Do not "fix" this   */
/*  by switching to attributionSource; it will look healthy in every   */
/*  log and write nothing.                                             */
/* ------------------------------------------------------------------ */

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

/**
 * Field IDs, read from `GET /locations/{id}/customFields` on 5 Aug 2026.
 *
 * Addressed by ID rather than by `fieldKey` on purpose: five of these have a
 * key that disagrees with their name (`ft_utm_campaign` → `contact.ft_campaign`),
 * and a key can never be corrected — renaming a field leaves its key untouched,
 * confirmed empirically. IDs are stable across renames, so they're the only
 * safe handle.
 *
 * To regenerate:
 *   curl -s "$GHL_BASE/locations/$GHL_subaccount_id/customFields" \
 *     -H "Authorization: Bearer $GHL_Private_API_Key" -H "Version: 2021-07-28"
 */
export const ATTRIBUTION_FIELD_IDS = {
  utm_source: 'vvtMOtj4oOek17kBlLrE',
  utm_medium: 'Re5UyuNTEWOBgIVmXtPg',
  utm_campaign: 'JgvJrwn9fy6cac6hQqcB',
  utm_term: '3SEJFnsrDM4UmG0TcFgc',
  utm_content: 'CStfj0mHjc66vgD4NMhO',
  landing_page: 'zWb5ffTPaQ0fGYKaJ6FW',
  ft_utm_source: 'eCd7cQqEJiNWRbs1tSql',
  ft_utm_medium: 'lNPBCPUrfkO4qlaILzoe',
  ft_utm_campaign: 'zDMdFk7v4fVQDGeVPzl8',
  ft_utm_term: 'HKJ2VIdcwZ0OJKOM2sCF',
  ft_utm_content: 'PvoS8WOjB5e08xUUkoRF',
  ft_landing_page: '8UNbnslJLjtamdVJtzhL',
  // "Fbclid" in the GHL UI — capitalisation is theirs, not a typo here.
  fbclid: 't5Slrl7gNoQsHw0Sji6W',
  // "Google Click ID". Created 5 Aug 2026 because `gclid` is a GHL *standard*
  // field name and therefore cannot be used for a custom field — while the
  // standard field itself refuses writes. This is the only place a gclid can go.
  gclid: 'IYU3tl3tDC3vYNVyObsW',
} as const;

const API_KEY = process.env.GHL_Private_API_Key;

function authHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${API_KEY}`,
    Version: GHL_VERSION,
    'Content-Type': 'application/json',
  };
}

/** Drops blanks and unrendered `{{merge.tags}}`, which must never be stored. */
function clean(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.trim();
  if (!s || s.includes('{{') || s.includes('{campaign')) return undefined;
  return s;
}

/**
 * Flatten a parked attribution record into { fieldId: value }.
 *
 * `{campaign…}` is filtered alongside merge tags because Google Ads campaigns
 * are configured with `{campaignname}`, which is not a real ValueTrack
 * parameter and arrives as that literal string. Storing it would put the same
 * garbage into the CRM that already pollutes the form path.
 * See docs/google-ads-utm-fix.md.
 */
function buildFieldMap(a: WaAttribution): Record<string, string> {
  const candidates: Record<string, unknown> = {
    [ATTRIBUTION_FIELD_IDS.utm_source]: a.utm?.utm_source,
    [ATTRIBUTION_FIELD_IDS.utm_medium]: a.utm?.utm_medium,
    [ATTRIBUTION_FIELD_IDS.utm_campaign]: a.utm?.utm_campaign,
    [ATTRIBUTION_FIELD_IDS.utm_term]: a.utm?.utm_term,
    [ATTRIBUTION_FIELD_IDS.utm_content]: a.utm?.utm_content,
    [ATTRIBUTION_FIELD_IDS.landing_page]: a.landing_page,
    [ATTRIBUTION_FIELD_IDS.ft_utm_source]: a.ft_utm?.utm_source,
    [ATTRIBUTION_FIELD_IDS.ft_utm_medium]: a.ft_utm?.utm_medium,
    [ATTRIBUTION_FIELD_IDS.ft_utm_campaign]: a.ft_utm?.utm_campaign,
    [ATTRIBUTION_FIELD_IDS.ft_utm_term]: a.ft_utm?.utm_term,
    [ATTRIBUTION_FIELD_IDS.ft_utm_content]: a.ft_utm?.utm_content,
    [ATTRIBUTION_FIELD_IDS.ft_landing_page]: a.ft_landing_page,
    [ATTRIBUTION_FIELD_IDS.fbclid]: a.fbclid,
    [ATTRIBUTION_FIELD_IDS.gclid]: a.clickIds?.gclid,
  };

  const out: Record<string, string> = {};
  for (const [id, raw] of Object.entries(candidates)) {
    const value = clean(raw);
    if (value) out[id] = value;
  }
  return out;
}

export type GhlWriteResult =
  | { written: true; fields: number }
  | { written: false; reason: string };

/**
 * Fill in a contact's attribution fields from a parked WhatsApp click.
 *
 * Only ever fills BLANKS. A contact that already carries attribution got it
 * from a form submission, where GHL captured the values itself at the moment
 * of conversion — that is better evidence than our replay of an earlier click,
 * so it wins. Costs one extra GET, which is cheap at one call per new lead and
 * a great deal cheaper than silently overwriting good data.
 *
 * Never throws: the caller is a webhook whose 200 the GHL workflow depends on,
 * and losing a CRM stamp must not cost us the Meta replay.
 */
export async function writeAttributionToContact(
  contactId: string,
  record: WaAttribution,
): Promise<GhlWriteResult> {
  if (!API_KEY) return { written: false, reason: 'GHL_Private_API_Key not set' };
  if (!contactId) return { written: false, reason: 'no contact_id in payload' };

  const desired = buildFieldMap(record);
  if (Object.keys(desired).length === 0) {
    return { written: false, reason: 'nothing worth writing' };
  }

  try {
    const res = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
      headers: authHeaders(),
    });
    if (!res.ok) {
      return { written: false, reason: `contact fetch failed: ${res.status}` };
    }

    const body = (await res.json()) as {
      contact?: { customFields?: Array<{ id?: string; value?: unknown }> };
    };

    const occupied = new Set(
      (body.contact?.customFields ?? [])
        .filter((f) => f.value !== undefined && f.value !== null && f.value !== '')
        .map((f) => f.id),
    );

    const customFields = Object.entries(desired)
      .filter(([id]) => !occupied.has(id))
      .map(([id, value]) => ({ id, value }));

    if (customFields.length === 0) {
      return { written: false, reason: 'all fields already populated' };
    }

    const put = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ customFields }),
    });
    if (!put.ok) {
      return { written: false, reason: `update failed: ${put.status}` };
    }

    return { written: true, fields: customFields.length };
  } catch (err) {
    console.error('[ghl] attribution write-back failed:', err);
    return { written: false, reason: 'exception' };
  }
}

/* ------------------------------------------------------------------ */
/*  Direct WhatsApp — contacts that never touched the website          */
/* ------------------------------------------------------------------ */

/**
 * Label for people who message the WhatsApp number without ever loading the
 * site: saved contact, WhatsApp Business profile, Google Maps, a flyer, a
 * referral, or a click-to-WhatsApp ad. Measured 20 Aug 2026: 49 of 54
 * unattributed contacts behind admissions opportunities had a conversation
 * with NO reference code anywhere in it.
 *
 * They are a real acquisition channel, not a tracking failure — nothing can
 * recover a source for someone who never loaded a page. Naming them is the
 * only honest thing left to do. Change this one constant to relabel them
 * everywhere.
 */
export const DIRECT_WHATSAPP = 'whatsapp_directo';

/**
 * Stamp a contact as direct WhatsApp — but ONLY if it carries no attribution
 * of any kind.
 *
 * Deliberately a single condition, not a fallback chain. The rule is:
 *
 *   inbound WhatsApp message with no reference code
 *   AND the contact has no attribution at all
 *   -> label it direct WhatsApp. Otherwise do nothing.
 *
 * Anything already known wins outright — a UTM, a click ID, GHL's own native
 * attribution, or an existing `source`. There is no ranking between signals
 * and no "best guess" if several are present, because a priority order is the
 * thing that turns into an unreadable waterfall nobody can audit later.
 */
export async function markDirectWhatsApp(contactId: string): Promise<GhlWriteResult> {
  if (!API_KEY) return { written: false, reason: 'GHL_Private_API_Key not set' };
  if (!contactId) return { written: false, reason: 'no contact_id in payload' };

  try {
    const res = await fetch(`${GHL_BASE}/contacts/${contactId}`, { headers: authHeaders() });
    if (!res.ok) return { written: false, reason: `contact fetch failed: ${res.status}` };

    const contact = ((await res.json()) as { contact?: Record<string, unknown> }).contact ?? {};
    const fields = (contact.customFields ?? []) as Array<{ id?: string; value?: unknown }>;
    const filled = new Set(
      fields
        .filter((f) => f.value !== undefined && f.value !== null && f.value !== '')
        .map((f) => f.id),
    );

    // Any real signal at all means we keep quiet.
    const KNOWN = [
      ATTRIBUTION_FIELD_IDS.utm_source,
      ATTRIBUTION_FIELD_IDS.utm_campaign,
      ATTRIBUTION_FIELD_IDS.ft_utm_source,
      ATTRIBUTION_FIELD_IDS.fbclid,
      ATTRIBUTION_FIELD_IDS.gclid,
    ];
    if (KNOWN.some((id) => filled.has(id))) {
      return { written: false, reason: 'contact already has attribution' };
    }

    // GHL's own native attribution counts too — it is populated by its form
    // widget and tracking script, and is invisible to the custom fields above.
    const native = (contact.attributionSource ?? {}) as Record<string, unknown>;
    if (native.utmSource || native.fbclid || native.gclid || native.campaign) {
      return { written: false, reason: 'contact has native attribution' };
    }

    // An existing source is somebody else's answer — a form name, or
    // `whatsapp_web` from a resolved code. Never relabel it.
    const source = typeof contact.source === 'string' ? contact.source.trim() : '';
    if (source && source !== DIRECT_WHATSAPP) {
      return { written: false, reason: `source already set: ${source}` };
    }
    if (source === DIRECT_WHATSAPP) {
      return { written: false, reason: 'already marked' };
    }

    const put = await fetch(`${GHL_BASE}/contacts/${contactId}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({
        source: DIRECT_WHATSAPP,
        customFields: [
          { id: ATTRIBUTION_FIELD_IDS.utm_source, value: DIRECT_WHATSAPP },
          { id: ATTRIBUTION_FIELD_IDS.utm_medium, value: 'directo' },
        ],
      }),
    });
    if (!put.ok) return { written: false, reason: `update failed: ${put.status}` };

    return { written: true, fields: 3 };
  } catch (err) {
    console.error('[ghl] direct-whatsapp mark failed:', err);
    return { written: false, reason: 'exception' };
  }
}
