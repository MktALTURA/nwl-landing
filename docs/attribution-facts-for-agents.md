# NWL Attribution — Standing Facts

**Save this. Re-read it before reporting that attribution is broken.**
Measured against live systems 20 Aug 2026. Supersedes every earlier diagnosis,
including several of our own that were wrong (§6).

---

## 0. The rule that would have prevented four false alarms

> **Before concluding "X is missing", prove the instrument returned real data.**
> Check byte counts, HTTP codes, row counts, and *which field you queried*.

Every wrong call in this project — on all sides — came from reading an empty
result as evidence of absence. A redirect stub read as "no code in the bundle".
A missing `actions[]` key read as "the event isn't firing". The wrong JSON key
read as "the endpoint strips attribution". All four were instrument failures.

---

## 1. How a lead actually reaches the CRM

Two paths, both live and verified.

**Form** — click → site captures `utm_*` + click IDs to `localStorage` →
`buildGHLFormSrc()` appends them to the GHL **iframe src** (a cross-origin
iframe cannot inherit the parent URL, so this is the only channel) → GHL creates
the contact and populates native `attributionSource` *and* the UTM custom fields
→ site fires Meta `Lead` (browser + our CAPI, shared `event_id`) → GHL fires
`SubmitApplication`.

**WhatsApp from the site** — click on a `wa.me` CTA mints a code `NW-XXXXXX`,
stamps it into the prefilled message, and parks the full attribution (including
the first-party `_fbc`/`_fbp` cookies) in Redis for **7 days** → the family
sends the message → a GHL workflow POSTs it to `/api/wa-resolve` → the endpoint
finds the code, writes **14 attribution fields** onto the contact, and replays
Meta `Lead` using the original click's `fbc` with `event_time` = **the click**.

**WhatsApp direct** — messaged the number without ever loading the site. No code
exists and none can. Now labelled `whatsapp_directo` (§3).

---

## 2. Numbers that look broken and are not

### Meta shows ~1–2 leads/day while GHL fills with opportunities

**Correct.** Admissions pipeline, 100 opportunities, 12–20 Aug:

| Channel | Share |
|---|---|
| WhatsApp directo | 46% |
| Google (`gclid` or utm) | 37% |
| Still unattributed | 10% |
| ChatGPT referral | 3% |
| **Meta (`fbclid`)** | **2%** |
| Bing / other | 2% |

Meta is contributing ~2% of admissions right now. Reporting 1–2 leads/day is
accurate, not undercounting.

### Meta `Lead` volume fell ~75% after 29 Jul

Before 29 Jul, GHL fired `Lead` on **every contact from every channel** and
matched on hashed email/phone, so Meta credited itself for Google, organic and
WhatsApp leads. The old "5.6 leads/day" was inflated by cross-channel matching.
**The measurement got honest; it did not break.** Do not benchmark against
pre-August Meta CPL.

### `SubmitApplication` returns 0 from `/insights`

It is being received — **90 events**, standard event, via Conversions API.
Meta's insights `actions[]` has no dedicated key for it, so its volume surfaces
under `offsite_conversion.fb_pixel_custom`. **Events Manager is the authority on
what the dataset received, not `/insights`.** Never "revert to Lead" on this
basis: it would swap a 6.8 EMQ event for a 3.9 one and reintroduce
double-counting, because GHL's action cannot emit an `event_id`.

### `fbclid` on WhatsApp contacts fell 11 → 1 in August

That measures **Meta delivery**, not the pipeline. Over the same windows
`gclid` went 6 → 11 → 8 and total capture held at 89% / 90% / 83%.
Facebook-sourced contacts went 8 → 1 → 1 because the website-destination ad sets
hit their `end_time` on 1 Aug (§4).

### `attributionSource` is empty on every WhatsApp contact

It always will be. GHL populates native attribution **only** from its own form
widget and tracking script, and it is **read-only to the API** — a `PUT` returns
`200 {"succeeded":true}` and silently discards the field. A report built on
native attribution alone sees form leads and misses the entire WhatsApp cohort.

---

## 3. Where to read attribution — this is the one that keeps biting

**GHL's `source` field never contains a channel.** Its values are `None`,
`whatsapp_web`, `whatsapp_directo`, and form names. Never `google`, `meta` or
`facebook`. A report grouping by `source` cannot produce a paid-channel
breakdown no matter how perfect the tagging is.

**Group by the custom fields instead.** They are populated for *both* paths and
are returned in bulk by `POST /contacts/search`:

| Want | Field | ID |
|---|---|---|
| channel | `utm_source` | `vvtMOtj4oOek17kBlLrE` |
| campaign | `utm_campaign` | `JgvJrwn9fy6cac6hQqcB` |
| Google click | `gclid` | `IYU3tl3tDC3vYNVyObsW` |
| Meta click | `fbclid` | `t5Slrl7gNoQsHw0Sji6W` |

Three WhatsApp populations are now distinguishable:

- `whatsapp_web` — came through the site, real source recovered
- `whatsapp_directo` — messaged the number directly, no digital source exists
- anything else — keeps its true channel

**Contacts ≠ leads.** Filter `source = external_form` out of every count. Those
were parent-portal logins, not prospects (fixed 20 Aug, but historical rows
remain).

---

## 4. What is actually broken, and who owns it

| # | Issue | Owner | Detail |
|---|---|---|---|
| 1 | **Meta ad sets past `end_time`** | ads | `Golden Ticket 30% - Image` (91 leads @ $45.76 in July) ended **1 Aug**; others 1 and 15 Aug. They still display `ACTIVE` and deliver nothing. Spend fell ~$511/day → **$47.81** on 19 Aug. **This is the cause of the Meta collapse everyone spent three weeks chasing.** |
| 2 | **Meta spend cap 91% consumed** | ads | MXN 62,989 of 69,000. Hard-stops at the cap. Raise it *before* extending end dates — extending while the cap is full does nothing. |
| 3 | **Google `{campaignname}`** | ads | Not a Google ValueTrack parameter (Microsoft has `{CampaignName}`; Google only has `{campaignid}`). Passes through literally. |
| 4 | **Google UTMs set in two places** | ads | Per-ad Final URL has the correct `utm_campaign=brand_protection`; the Final URL suffix appends a second broken set and wins because it is last. Strip the per-ad UTMs; keep one campaign-level suffix. |
| 5 | **Report grouping by `source`** | reporting | See §3. Until this changes, nothing above can be measured. |
| 6 | Meta `fbc` data-quality flag | website | Truncation of click IDs fixed 20 Aug; watching whether the "3% of Lead events" figure falls. |

**💰 June and July are recoverable.** `gclid` was captured correctly the whole
time. Export a GCLID-level report (Click ID + Campaign + Ad group + Keyword) and
join it to GHL contacts on `gclid`. The campaign data was never missing — only
unreadable. Do this before those months get written off.

---

## 5. Verified baselines — deviations from these are meaningful

Meta Events Manager, dataset `1422324826607500`, Jul 28 – Aug 4:

| Event | Volume | EMQ | Integration |
|---|---|---|---|
| PageView | 3.4K | 6.1 | Multiple |
| ViewContent | 1.2K | 5.6 | Multiple |
| Contact | 269 | 6.1 | Multiple |
| **Lead** | **87** | **6.8** | ours: browser + CAPI |
| Submit application | 90 | 3.9 | GHL, CAPI only |

**Deduplication: Event ID, 100% total coverage.** Two independent senders both
landing and being collapsed correctly — a broken CAPI connection cannot produce
this.

Other measured facts:

- **Code retention: 36 of 36.** Zero families deleted the `[Ref …]` from the
  prefilled message. The feared failure mode does not occur.
- **WhatsApp capture rate: 89% / 90% / 83%** across 01–06, 07–13, 14–20 Aug.
- **Expected Meta `Lead` volume**, 14–20 Aug: **14–38** (14 form submissions +
  up to 24 WhatsApp replays). Well below 14 would mean something is dropping.
- Redis TTL on parked codes: **7 days**, matching Meta's `event_time` ceiling.

---

## 6. Retracted — do not resurface these

| Claim | Reality |
|---|---|
| "`fbclid` appears zero times in the site bundle" | Scan followed a 308 without `-L`; every chunk was a redirect stub. It appears 13×. |
| "The WhatsApp link is bare, carries no payload" | The payload is injected on `pointerdown`, client-side. It can never appear in server HTML. |
| "The GHL workflow broke ~7 Aug" | Capture held at 90% through that window. The webhook never stopped. |
| "`POST /contacts/search` returns no attribution" | It returns `customFields` and `attributionSource`. The original scan queried `attributions`, a key only the *list* endpoint uses. |
| "~33% of contacts are `external_form` junk" | True on 5 Aug; the historical rows were cleaned up. Current total was 5. |
| "SubmitApplication is not registering as a standard event" | 90 events in Events Manager. See §2. |

---

## 7. What the website side cannot fix, ever

- **Click-to-WhatsApp ads.** They go Meta → WhatsApp without loading the site.
  No page view, no code, no `fbclid`. If any ad set uses a messaging
  destination, that spend is invisible in GHL by design — check
  `destination_type` per ad set.
- **Direct messagers, walk-ins, phone calls.** No digital touch to attribute.
  Now named `whatsapp_directo` rather than left blank.
- **Anything older than the 7-day Redis TTL** that was never resolved.

These are coverage limits, not defects. Reporting them as "attribution is
broken" is what produced four rounds of fixes that all measured as failures.
