# Meta (Facebook) Pixel + Conversions API — Implementation Report

**Site:** www.nwl.com.mx (Next.js, App Router, deployed on Vercel)
**Pixel / Dataset:** `NWL - Pixel Principal` — ID `1422324826607500`
**Implemented:** May 2026
**Goal:** Track website conversions and send them to Meta two ways (browser pixel + server-side Conversions API), deduplicated, so ad campaigns can optimize toward and attribute real conversions — even when browsers block the pixel.

---

## 1. Architecture overview

Two complementary layers feed the same Meta dataset:

| Layer | What it is | Why |
|-------|-----------|-----|
| **Browser Pixel** | `fbevents.js` running in the visitor's browser | Sets `_fbp`/`_fbc` cookies, captures ad-click ID, fires events client-side |
| **Conversions API (CAPI)** | Server-to-server POST to Meta's Graph API | Survives ad blockers / iOS tracking protection; carries hashed PII |

**Deduplication:** when the site sends an event from *both* layers, it uses one shared `event_id` so Meta merges the pair instead of double-counting.

### Event ownership (important design decision)

| Event | Fires on | Sent by | Carries |
|-------|----------|---------|---------|
| `PageView` | every page load | Browser pixel | cookies, IP, UA |
| `ViewContent` | high-intent pages (kinder, maternal, elementary, middle-school, high-school, /campus, /informacion, /padres) | Browser + CAPI | `_fbp`/`_fbc`, IP, UA |
| `Contact` | WhatsApp / tel / mailto link clicks | Browser + CAPI | `_fbp`/`_fbc` (+ ad attribution), IP, UA |
| **`Lead`** | **form submission** | **GoHighLevel (GHL) server-side CAPI** | **hashed email + phone + name + country + fbclid** |

> **Why GHL owns `Lead`:** the lead forms are embedded as cross-origin GHL iframes, so the website **cannot read** the email/phone the visitor typed. GHL *does* have them. Sending `Lead` from GHL's side means it carries hashed email/phone = **high match quality**. The site deliberately does **not** also fire `Lead` (it can't share an `event_id` with GHL across the iframe, so firing both would double-count).

---

## 2. Code implementation (the website side)

All paths relative to repo root.

### 2.1 Browser pixel + domain verification — `app/layout.tsx`
- Standard Meta Pixel snippet loads `fbevents.js`, runs `fbq('init', NEXT_PUBLIC_META_PIXEL_ID)` and `fbq('track','PageView')`.
- Pixel ID comes from the public env var (interpolated into the inline script + `<noscript>` fallback).
- Facebook **domain verification** tag is emitted via Next.js metadata:
  ```ts
  verification: { other: { "facebook-domain-verification": "<token>" } }
  ```
  This renders a static `<meta>` in `<head>` (not JS-injected), satisfying Meta's requirement.
- `<MetaTracking />` client component is mounted once here.

### 2.2 Shared event helper — `lib/meta-pixel.ts`
- `fireMetaEvent(eventName, customData)`:
  1. generates one `event_id` (`crypto.randomUUID()`),
  2. reads `fbclid` from the URL,
  3. fires the **browser pixel** `fbq('track', name, data, { eventID })`,
  4. POSTs to **`/api/meta-capi`** (server) with the same `event_id` + `fbclid`.
- `keepalive: true` on the fetch so it survives navigation (e.g. clicking a WhatsApp link).

### 2.3 Click + page tracking — `components/MetaTracking.tsx`
- **Contact:** one delegated `click` listener on `document` catches every `a[href]` matching `wa.me`/`whatsapp.com`, `tel:`, or `mailto:` — site-wide, so new links are covered automatically. Fires `fireMetaEvent('Contact', { contact_method, contact_detail, source_path })`.
- **ViewContent:** on path change, if the path matches a high-intent prefix, fires `fireMetaEvent('ViewContent', { content_path })`.

### 2.4 Server-side CAPI route — `app/api/meta-capi/route.ts`
- `POST` handler that:
  - validates `eventName` against an allow-list,
  - reads `_fbp`/`_fbc` cookies; if `_fbc` is absent but a `fbclid` was sent, **builds `fbc`** as `fb.1.<unixMs>.<fbclid>` (so ad clicks still match when the pixel is blocked),
  - SHA-256 **hashes** any `email`/`phone`,
  - reads client IP (`x-forwarded-for`) + user-agent,
  - POSTs to `https://graph.facebook.com/v21.0/{PIXEL_ID}/events?access_token=...`,
  - includes `test_event_code` when the env var is set.
- Returns `{ success, events_received }` from Meta, or an error status.

### 2.5 Form-submit hook — `lib/hooks/useGHLFormTracking.ts`
- Detects GHL form submission (postMessage + iframe-height fallback).
- Fires **Google Ads** conversion + `dataLayer` push.
- Does **NOT** fire a Meta `Lead` (that's GHL's job — see ownership note above).

### 2.6 Type + CSP support
- `types/global.d.ts` — declares `window.fbq`.
- `next.config.mjs` — CSP must whitelist Meta domains or the pixel breaks when the policy is enforced:
  - `script-src … https://connect.facebook.net`
  - `img-src … https://www.facebook.com`
  - `connect-src … https://www.facebook.com https://connect.facebook.net`

### 2.7 Environment variables (`.env.local` locally + Vercel)
| Var | Scope | Notes |
|-----|-------|-------|
| `NEXT_PUBLIC_META_PIXEL_ID` | public | `1422324826607500` |
| `META_CAPI_ACCESS_TOKEN` | secret, server only | from Events Manager → pixel → Settings → Generate access token |
| `META_CAPI_TEST_EVENT_CODE` | testing only | **must be empty/absent in Production** or real conversions divert to Test Events |

> `.env.local` is gitignored. Production values must also be set in **Vercel → Settings → Environment Variables**.

---

## 3. Getting the info from Facebook (Meta side, one-time)

1. **Events Manager → Data Sources** → open the pixel → note the **Dataset/Pixel ID**.
2. **Settings → Conversions API → Generate access token** → copy the token.
3. **(Optional) Test Events** → copy the **test event code** for verification.
4. **Domains** → add your domain → copy the `facebook-domain-verification` token → put it in `app/layout.tsx` metadata → deploy → click **Verify domain**. (Meta scrapes the live root domain, so this only passes after deploy.)

---

## 4. The GHL automation (Lead conversion)

**Prerequisite:** the lead forms collect Email + Phone into the standard contact fields (default GHL behavior). No "Facebook Form Field Mapping" is needed — that screen is only for Facebook *Instant Forms*, the wrong direction.

**Workflow:**
1. **Automations → Workflows → Create**.
2. **Trigger:** `Form Submitted` → select **all** lead forms (ES + EN) in one trigger.
3. **Action:** `Meta Conversion API` (a.k.a. Facebook Conversions API), configured:
   - **Connection type:** `Integración` (lets you paste token + dataset directly; has a Test Code field).
   - **Event type:** `Funnel Event` (NOT "Lead Event" — that's only for FB Instant Forms).
   - **Access token:** the CAPI token.
   - **Dataset ID:** `1422324826607500`.
   - **Facebook event name:** `Lead`.
   - **Custom mapping (Mapeo personalizado):** ON → map **FBCLID** → the contact's `fbclid` field (so real ad clicks attribute to the ad).
   - **Test code:** set while testing, **remove + re-save before going live**.
4. **Publish.**

GHL automatically sends the contact's **hashed email, phone, first/last name, country, IP** plus the mapped `fbclid`. No extra code on the website is required.

> **Gotcha learned:** if a test email/phone already exists on another GHL contact, GHL dedups and **withholds** that field from the event — making it look like email "isn't sending." Always test with a **unique** email + phone.

---

## 5. How to replicate from scratch (checklist)

1. **Meta:** create/identify pixel, generate CAPI token, grab domain-verification token + test code.
2. **Code:**
   - add pixel snippet + domain-verification meta tag to root layout,
   - add `lib/meta-pixel.ts` (`fireMetaEvent` with shared `event_id` + `fbclid`),
   - add `app/api/meta-capi/route.ts` (hash PII, build `fbc` from `fbclid`, POST to Graph API),
   - add `components/MetaTracking.tsx` (Contact + ViewContent), mount in layout,
   - declare `window.fbq` in global types,
   - whitelist Meta domains in CSP,
   - set the 3 env vars locally + in Vercel.
3. **Deploy** to the production domain.
4. **Meta:** verify the domain.
5. **GHL:** build the Form-Submitted → Meta Conversion API (Funnel/Lead) workflow for all forms.
6. **Test** (Section 6), then remove all test event codes.

---

## 6. How it was verified end-to-end

| Check | Tool | Result |
|-------|------|--------|
| CAPI route reachable + configured | `POST /api/meta-capi` → `200 {events_received:1}` | ✅ |
| Browser pixel loads | Incognito (no blocker) → `_fbp` cookie set | ✅ |
| WhatsApp click | DevTools Network → `POST /api/meta-capi 200` on click | ✅ |
| `fbclid` coverage | `?fbclid=…` → event payload carries it | ✅ |
| Domain verification | Meta Domains → **Verified** | ✅ |
| GHL Lead with PII | Test Events → `Lead`, Server, with `em`, `ph`, `fn`, `ln` | ✅ |
| No duplicate Lead | one `Lead` per submission | ✅ |

**Note on blocked browsers:** if a tester has an ad blocker, the browser pixel won't fire (Pixel Helper shows the ID but no events). This is expected — the **server CAPI** still fires (it hits our own domain), which is exactly why CAPI exists. Verify the browser pixel in a clean incognito window.

---

## 7. Key principles to remember

- **Recording ≠ attributing.** The pixel/CAPI records every conversion; Meta only *credits an ad* if it can link the person to a prior ad click/view within the attribution window.
- **UTMs are not Meta attribution.** `utm_source=facebook` is for GA only. Meta attributes via its own `fbclid`/`_fbc` and user matching. A real ad click carries `fbclid`; a hand-built UTM link does not.
- **WhatsApp:** only the *click* (website `Contact`) is ad-attributable (fires with `_fbc` on-site). The actual conversation can't be attributed via `wa.me` links — that requires Click-to-WhatsApp ads + the official WhatsApp API in GHL.
