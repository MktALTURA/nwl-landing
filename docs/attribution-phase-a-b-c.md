# Attribution fix — Phase A / B / C implementation + findings

**Branch:** `test`
**Repo:** nwl.com.mx (Next.js 15, App Router)
**Meta dataset:** `1422324826607500`
**Date:** 29 Jul 2026
**Responds to:** *"Handoff — NWL attribution: Phase A & B (website code)"* (28 Jul 2026)

---

## 0. TL;DR for the handoff author

Phases A, B and C are implemented on `test`. Six things in the handoff need correcting before
anyone acts on it — three of them would have caused real damage if built as written.

| # | Handoff says | Reality in this codebase |
|---|---|---|
| 1 | Build `fbc` as `fb.1.<unix_seconds>.<fbclid>` | **Wrong — must be milliseconds.** The pixel writes `_fbc` in ms; seconds produces a value Meta silently fails to match |
| 2 | B2a: add a `Contact` fire on WhatsApp click | **Already shipped.** That *is* the 1.1K/6.1 EMQ `Contact` — adding another would double-count |
| 3 | Listen for postMessage type `FORM_SUBMITTED` | GHL does not send that here. A listener keyed on it fires **never** |
| 4 | Capture first-touch in `sessionStorage` | Dies on the wa.me tab handoff — the exact case Phase B exists to fix |
| 5 | Phase C: self-referral UTM still to remove | Already fixed 1 Jul 2026 (`114aa5a`) |
| 6 | — (not in the handoff) | **`captureUTMs()` never ran on `/campus`, `/informacion`, `/padres`, `/brochures`** — the ad and SEO landing pages |

\#6 is probably a bigger contributor to `sin_identificar` than the wa.me handoff is, and it was
invisible from the Meta side.

---

## 1. Corrections in detail

### 1.1 `fbc` timestamp is milliseconds, not seconds

The handoff states the format is `fb.1.<unix_seconds>.<fbclid>` and repeats it under "Do not do".
Meta's spec is `fb.<subdomainIndex>.<creationTimeMs>.<fbclid>` — the canonical example
(`fb.1.1554763741205.AbCd…`) is a 13-digit millisecond value, and it is what the pixel itself
writes into the `_fbc` cookie.

The existing code was already correct. Had someone "fixed" it to seconds per the handoff, every
reconstructed `fbc` would have stopped matching — while still looking populated in Test Events,
which is precisely the failure the handoff's own A5 warns about.

`buildFbc()` in `lib/meta-capi.ts` is now the single place this is constructed.

### 1.2 The `Contact` event is already the WhatsApp click

The handoff's B2a asks for a browser event on WhatsApp click, then adds *"Check first: the dataset
already has a Contact event at 1.1K / 6.1 EMQ. Find out what fires it."*

Answer: `components/MetaTracking.tsx`. One delegated capture-phase click listener, mounted in the
root layout, classifying `wa.me` / `whatsapp.com` / `tel:` / `mailto:` and firing `Contact` with
`contact_method` — browser pixel **and** server CAPI, shared `event_id`. It has been live since
26 May 2026.

So B2a needs no new event. WhatsApp clicks are already credited to Meta at click time with real
`fbc`/`fbp`, and they are already separable in reporting via `contact_method`. Only B2b — the
reconnect — was actually missing.

### 1.3 GHL does not post `FORM_SUBMITTED`

The handoff's A3 step 4 builds a fresh `message` listener gated on `type === 'FORM_SUBMITTED'`.
The messages this embed actually posts, already handled in `lib/hooks/useGHLFormTracking.ts`, are
`['set-sticky-contacts','_ud']`, `['modify-parent-url']`, `{action:'modify-parent-url'}` and
`{type:'form:submit'}`. A listener keyed on `FORM_SUBMITTED` alone would never fire, and the Lead
would look "shipped but broken" for however long it took anyone to check.

`FORM_SUBMITTED` is now accepted as well, in case GHL changes the contract — but it is not the
trigger. The existing hook is.

### 1.4 sessionStorage is the wrong store

The handoff's A3 step 1 puts first-touch in `sessionStorage`. Every WhatsApp CTA on this site is
`target="_blank"`, and Meta in-app browsers hand off to the system browser — both start a fresh
sessionStorage. Attribution would be gone at exactly the moment Phase B needs it.

Click IDs now live in `localStorage` under `nwl_click_ids`, each stamped with its capture time and
expiring at 7 days (matching Meta's click window, so nothing outlives its usefulness). The old
`nwl_track_*` sessionStorage keys are still *read* so visitors mid-session at deploy time aren't
dropped.

### 1.5 Self-referral UTM: already done

`lib/utm.ts` has had dynamic `isSelfHost()` plus retroactive scrubbing of polluted localStorage
since `114aa5a` (1 Jul 2026). `vercel.app` is in `SELF_HOSTS`, so preview domains can't become a
`utm_source` either. Nothing to do.

### 1.6 The gap nobody had spotted: `captureUTMs()` covered ~half the site

`<UTMCapture />` was mounted in `app/(main)/layout.tsx` — the route *group* containing the
homepage and the level pages. It was **not** in the root layout, so these routes never captured
anything:

- `/informacion/*` — 59 SEO landing pages
- `/campus/*` — campus pages
- `/padres/*`
- `/brochures/*` — the printed-QR entry point, which middleware deliberately UTM-tags
- `/trabaja-con-nosotros`

A visitor landing on `/informacion/kinder-en-milenio-queretaro?fbclid=…` and submitting *on that
page* still worked, because `buildGHLFormSrc()` reads the live URL. But navigate once and
everything was lost — no first touch, no landing page, no click ID. Given ads and organic search
point at exactly these pages, this plausibly accounts for a large share of the 19-of-379 retention
figure, independent of WhatsApp.

`<UTMCapture />` now sits in the root layout. **Verified:** landing on
`/campus/zibata?utm_source=facebook&utm_medium=paid_social&utm_campaign=test_jul&fbclid=TEST123`
now persists `nwl_click_ids`, `nwl_utm_first/last` and `nwl_landing_first`, and all of it survives
to a form on a later, untagged page.

---

## 2. What was built

### Phase A — browser-side Lead

| File | Change |
|---|---|
| `lib/hooks/useFormEventId.ts` | *new* — one stable `event_id` per mounted form, minted before the iframe is built |
| `lib/utm.ts` | `buildGHLFormSrc(url, extra)` now takes extra params; `event_id` rides into the iframe src |
| `lib/hooks/useGHLFormTracking.ts` | fires `fbq('track','Lead',…,{eventID})` on submit, **browser-only** |
| `lib/meta-pixel.ts` | `browserOnly` option; exported `newEventId()`; sends `fbclidTs` |
| `lib/meta-capi.ts` | *new* — shared server sender, `buildFbc()`, 7-day guard |
| `app/api/meta-capi/route.ts` | rebuilt on the shared sender; honours the capture timestamp |

The browser Lead is **browser-pixel only** — it does not also POST to `/api/meta-capi`. GHL keeps
the server side (it has the hashed email/phone we can't read out of a cross-origin iframe); the
browser half exists solely to contribute `fbc` + `fbp`, which is the entire reason Lead scores 4.6.

**Gated behind `NEXT_PUBLIC_META_BROWSER_LEAD=true`.** It ships disabled. This is the A6 kill
switch: if Lead volume doubles, flip the env var and redeploy — one click, no code change.

### Phase B — WhatsApp bridge

| File | Change |
|---|---|
| `lib/wa-attribution.ts` | *new* — mint `NW-XXXXXX`, rewrite the wa.me prefill, park the payload |
| `lib/db/wa-attribution.ts` | *new* — Upstash Redis store, 7-day TTL, per-IP write cap |
| `app/api/wa-token/route.ts` | *new* — POST at click time; reads `_fbc`/`_fbp` **server-side** |
| `app/api/wa-resolve/route.ts` | *new* — secret-guarded lookup + optional Meta replay |
| `components/MetaTracking.tsx` | stamps wa.me anchors on `pointerdown` (fires before `click`) |

Three deliberate choices worth flagging:

- **The href is rewritten on `pointerdown`, not `click`.** Mutating an anchor's `href` mid-`click`
  usually works, but "usually" isn't good enough for the primary CTA. `pointerdown` guarantees the
  href is settled before navigation; the `click` handler re-stamps as a fallback for keyboard
  activation. Idempotent per anchor — re-clicking never stacks a second code.
- **`_fbc` / `_fbp` are read server-side in `/api/wa-token`,** not sent from the client. They're
  first-party cookies on our own origin, so the request carries them anyway, and this survives
  cookie partitioning. The handoff asked for the client to send them; this is strictly better.
- **No token is minted until a WhatsApp link is actually touched.** Nothing is stored for the ~99%
  of pageviews that never click through.

Existing prefilled text is preserved and the code appended; links with no text get a Spanish
default. **Ops: sanity-check this copy** — `DEFAULT_MESSAGE_ES` in `lib/wa-attribution.ts`:

> Hola, quiero informes de NWL Australian School. [NW-7F3K2A]

### Phase C

- Root-layout UTM capture (§1.6).
- **`https://api.nwl.com.mx` added to `GHL_TRUSTED_ORIGINS`.** It was missing, so the careers and
  partner-application forms — served from the white-label domain — fired **no** conversion at all,
  not even GA4. Separate from the Meta work; found while in the file.
- **Pixel gated to `*.nwl.com.mx`.** `nwl-landing.vercel.app` and localhost were sending live
  traffic into the production dataset. `META_HOST_RE` in `lib/meta-pixel.ts`, mirrored in the
  layout's inline init. *Consequence: the pixel no longer fires on localhost — loosen the regex
  temporarily if you need to test it locally.*
- Inbound params verified intact: Next.js `redirects()` preserve query strings by default, and
  `middleware.ts` clones `nextUrl` for the brochure UTM tagging. Nothing in this repo strips
  `fbclid` / `utm_*` / `gclid`. **`nwl.mx → nwl.com.mx` is a DNS/registrar-level redirect and is
  NOT verifiable from this codebase — Ops must confirm it forwards the query string.**

### Unplanned fix: false-positive form conversions

During testing, `[NWL] Form submission detected — home_form` logged on the homepage **without any
form being submitted.** Intermittent — it did not recur on three subsequent clean loads.

This is pre-existing: today it fires phantom Google Ads conversions and GA4 `generate_lead`. It
became urgent because Phase A hangs a Meta `Lead` off the same trigger, and a phantom Lead trains
Meta's optimiser on noise.

The 5-second gate isn't enough — GHL's `set-sticky-contacts` was observed arriving well past it.
Added a second gate: a **cross-origin interaction check**. On `window.blur`, if
`document.activeElement` is the form iframe, the visitor put focus inside the form. A form nobody
touched cannot have been submitted.

- Explicit signals (`form:submit`, `FORM_SUBMITTED`, `form_submitted`) — trusted alone.
- Heuristic signals (`set-sticky-contacts`, `modify-parent-url`, iframe height shrink) — now
  additionally require interaction.

**Verified** `document.activeElement === iframe` after focusing the embed, so the gate opens on
genuine use. Worth watching for a suppressed real conversion after deploy, though every submission
path necessarily focuses the iframe first.

---

## 3. Verification performed

Local dev, Chrome, full round trip:

| Check | Result |
|---|---|
| `/campus/zibata?utm_*&fbclid=TEST123` persists attribution | ✅ (previously captured nothing) |
| Survives navigation to an untagged page | ✅ `ft_utm_source=facebook`, `nwl_landing_first=/campus/zibata` |
| Form iframe src carries `event_id` + 9 attribution params | ✅ 36-char UUID present |
| WhatsApp href stamped `[NW-LXQCJD]`, `%20`-encoded | ✅ |
| Re-click doesn't stack a second code | ✅ |
| `/api/wa-resolve` recovers attribution from raw message text | ✅ returned `facebook / paid_social / test_jul`, landing `/campus/zibata` |
| Wrong / missing secret | ✅ 401 |
| Unknown code → 404; malformed → 400 | ✅ |
| 8-day-old click + `sendLead` | ✅ skipped: *"Click is older than Meta's 7-day limit"* |
| Interaction gate detects iframe focus | ✅ |
| `tsc --noEmit` + `next build` | ✅ clean |

**Not verified — needs production:**
- Actual `fbc` value in Events Manager (host gate means the pixel can't fire locally).
- Meta replay via `sendLead: true`. **Deliberately not run:** `META_CAPI_TEST_EVENT_CODE` is blank
  locally, so it would have posted a fabricated Lead into the live dataset. Set a test event code
  before exercising this path.
- Dedup. Cannot be tested from this side at all — see §4.

---

## 4. Open risk, unchanged: GHL `event_id`

The handoff's A4 flags this and it is still open. We now pass `event_id` into the form iframe's
query string, which GHL can capture into a hidden field with Query Key `event_id`. What remains
unconfirmed is whether GHL's Meta Conversions API **action** exposes an Event ID input to send it
back with.

If it does not, browser and server Leads will not deduplicate and Lead volume roughly doubles.
Hence the env flag. Recommended sequence:

1. Ship with `NEXT_PUBLIC_META_BROWSER_LEAD` unset. Everything else in this doc takes effect
   immediately and is independent of the flag.
2. Ops confirms the hidden field populates and the CAPI action can send it as `event_id`.
3. Set the flag to `true`. Watch daily Lead volume for 48h.
4. ~21/day → keep both. ~42/day → GHL can't set it: flip the flag off, or disable GHL's CAPI Lead
   action and run browser-only. **Do not leave both running undeduplicated.**

My recommendation if step 4 goes badly: keep GHL's server Lead and turn the browser one off, then
recover match quality by pointing GHL's action at a webhook here instead — we can merge its hashed
PII with the cookies we hold and send one well-matched event. That's a bigger change than this
handoff scoped, so it isn't built.

---

## 5. Ops checklist

**Vercel env vars**

| Var | Value | Notes |
|---|---|---|
| `WA_RESOLVE_SECRET` | random 32+ chars | required, or `/api/wa-resolve` returns 503 |
| `NEXT_PUBLIC_META_BROWSER_LEAD` | *leave unset for now* | set to `true` only after step 2 above |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | already set | reused from the leaderboard |

**GHL**

1. Hidden **Text** field, Query Key exactly `event_id`, on the three admissions forms → map to a
   contact custom field.
2. Workflow: inbound WhatsApp message matching `NW-` → webhook
   `POST https://www.nwl.com.mx/api/wa-resolve`, header `x-nwl-secret: <WA_RESOLVE_SECRET>`,
   body `{"message": "<full inbound message>"}`. Add `"sendLead": true` (plus `email` / `phone`
   once known) to also replay the conversion to Meta.
3. Map the returned `attribution.*` fields onto the contact.
4. Sanity-check the Spanish prefill copy.
5. Confirm the stale test-event code is out of the GHL CAPI action.
6. Confirm `nwl.mx → nwl.com.mx` preserves the query string.

`/api/wa-resolve` response shape:

```json
{
  "found": true,
  "attribution": {
    "token": "NW-LXQCJD",
    "clicked_at": "2026-07-29T00:10:33.735Z",
    "utm_source": "facebook", "utm_medium": "paid_social", "utm_campaign": "test_jul",
    "ft_utm_source": "facebook", "ft_utm_medium": "paid_social", "ft_utm_campaign": "test_jul",
    "landing_page": "/campus/zibata", "ft_landing_page": "/campus/zibata",
    "source_path": "/", "fbclid": "TEST123", "gclid": null,
    "already_resolved": false
  },
  "meta": { "sent": true, "eventName": "Lead", "eventTime": 1785283833 }
}
```

404 `{"found": false}` means expired or never stored — leave the contact's attribution alone.
