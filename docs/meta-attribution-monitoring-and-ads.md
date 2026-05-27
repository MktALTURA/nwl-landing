# Meta Attribution — Monitoring, Building Ads & What to Expect

**Companion to:** `meta-tracking-implementation.md`
**Pixel / Dataset:** `1422324826607500`
**Events live:** `PageView`, `ViewContent`, `Contact` (WhatsApp/phone/email clicks), `Lead` (GHL forms, with hashed PII)

This doc covers: (1) what to monitor in GHL, (2) how to build Meta ads toward these conversions, (3) what results to expect, and (4) how to verify attribution for future reference.

---

## 1. What to monitor in GHL (CRM-level attribution)

GHL shows **where each lead came from** (captured from UTMs / `fbclid` on the landing page). It does **not** show Meta's server-side ad matching — that's Ads Manager's job. Use GHL to answer *"which source/campaign produced this contact."*

### Per-contact
- **Contacts → open a contact → Attribution section** (First Touch + Last Touch):
  - **Source** (e.g. `Paid Social`), **Medium**, **Campaign**
  - **UTM source / medium / campaign / content**
  - Session source, landing URL, and `fbclid` (if captured)
- Healthy ad-driven lead looks like: `Source: Paid Social`, `utm_source: facebook`, a campaign name, and a populated `fbclid`.

### Aggregate
- **Opportunities** → add a Source column to scan lead origins at a glance.
- **Reporting → Attribution Report** → leads grouped by source/campaign over time.
- **Reporting → (Facebook) Ad Reporting** → if the FB ad account is connected to GHL, summarizes spend/leads by campaign.

### What to watch for
- ✅ New ad leads show **Paid Social / facebook** with a campaign + `fbclid`.
- ⚠️ Ad leads showing **Direct / null source** → tracking/UTM not reaching the form (check the ad's destination URL carries params; check the LeadConnector tracking script).
- ⚠️ `fbclid` empty on a known ad click → the FBCLID custom-mapping field is wrong; fix so Meta can attribute to the specific ad.

---

## 2. How to build Meta ads toward these conversions

### Campaign structure
1. **Objective:** `Leads` (or `Sales`) — a conversion objective, not Traffic/Awareness.
2. **Conversion location:** **`Website`**.
   - ⚠️ Do **NOT** pick **Instant forms** — that collects leads inside Facebook and bypasses your website tracking + GHL entirely.
3. **Dataset/Pixel:** `NWL - Pixel Principal` (`1422324826607500`).
4. **Conversion event:**
   - Form-lead campaigns → **`Lead`** (highest-value, has hashed PII).
   - WhatsApp campaigns → **`Contact`** (WhatsApp click intent).
   - Awareness/retargeting feeders → `ViewContent` or `PageView`.

### Recommended setup
- Run separate ad sets/campaigns per goal so optimization is clean: one optimizing `Lead`, one optimizing `Contact`.
- **Attribution setting:** default **7-day click, 1-day view** (leave unless you have a reason).
- **Audiences from your events** (Audiences → Create → Custom Audience → Website):
  - Retarget `ViewContent` (visited a program/campus page) and `Contact` (clicked WhatsApp) but did not become a `Lead`.
  - Build **Lookalikes** from `Lead` converters (strongest, because `Lead` carries email/phone = better seed).

### Notes
- **No Aggregated Event Measurement (AEM) setup needed** — Meta removed manual event ranking in June 2025. Events are auto-eligible.
- **Match quality:** `Lead` is high (email/phone via GHL). `Contact`/`ViewContent` are lower (cookies/IP only) — fine for top-funnel optimization and audiences.

---

## 3. What to expect

- **Reporting delay:** conversions can take **hours up to ~72h** to fully attribute. Don't judge an ad in the first few hours.
- **Pixel vs CAPI counts:** the same conversion arrives from browser + server; deduplication via `event_id` prevents double-counting. Some events are CAPI-only (blocked browsers) — that's the system working.
- **Unattributed conversions are normal:** organic/Google/direct leads still record as events but won't be credited to any ad (no `fbclid`/ad match). Events Manager **Overview** shows the *total*; Ads Manager shows only the *ad-attributed subset*.
- **WhatsApp:** you'll see `Contact` (clicks) attributable to ads; the actual conversation is **not** attributable via `wa.me` (would need Click-to-WhatsApp ads).
- **Volume for optimization:** Meta optimizes best with ~**50 conversions per ad set per week**. If `Lead` volume is low, optimize a higher-volume event (`Contact`/`ViewContent`) or broaden the conversion event while ramping.
- **Match Quality score:** check after a few days of real traffic; `Lead` should sit well above the early ~3/10 once email/phone flow from real (non-duplicate) contacts.

---

## 4. How to verify attribution is working (future reference)

### The chain
`Ad click (fbclid)` → `site captures fbc` → `conversion event carries fbc` → `Meta matches` → `Ads Manager credits the ad`.

### Step-by-step validation (needs a real ad click)
1. Click your **live ad** (or use its destination URL) → land on `www.nwl.com.mx`.
2. Submit a form (and/or click WhatsApp).
3. **GHL:** open the new contact → **Attribution** = `Paid Social / facebook / <campaign>`, `fbclid` populated. ✅
4. **Meta Events Manager:** open the `Lead`/`Contact` event → parameters include **`fbc`**. ✅
5. **Meta Ads Manager** (next day): the conversion appears against that specific ad. ✅

### Where to look in Ads Manager
- **Ads Manager → campaign → Columns → Customize Columns** → add **`Lead`** and **`Contact`** as result columns.
- Set the **Attribution setting** (button above the table).
- Drill to **ad level** (expand campaign → ad set → ad) or **Breakdown → By Delivery → Ad** to see which ad drove conversions.
- Optional: create a **Custom Conversion** ("WhatsApp Clicks" = `Contact`) for cleaner per-ad reporting.

### Quick plumbing test without spending (no ad needed)
- Visit `www.nwl.com.mx/?fbclid=TEST123` → click WhatsApp / submit form → confirm the event in Events Manager carries **`fbc`**. This proves the capture works; only a real ad click proves full Ads-Manager attribution.

### Red flags & fixes
| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| GHL shows source but Ads Manager shows 0 attributed | `fbc`/`fbclid` not captured | check FBCLID mapping in GHL; confirm ad URL carries `fbclid` |
| Pixel Helper shows ID but no events | browser blocker | test in clean incognito; CAPI still covers it |
| `Lead` match quality low | email/phone missing | ensure forms collect them; test with a **unique** email/phone (GHL dedups duplicates) |
| Real conversions not counting | `META_CAPI_TEST_EVENT_CODE` set in Production / test code left in GHL action | remove test codes everywhere, re-save |

---

## 5. One-line summary

- **GHL** tells you *which source/campaign* a lead came from (CRM attribution).
- **Meta Ads Manager** tells you *which ad got credited* for the conversion (ad attribution).
- They should agree for ad-driven leads; verify with the 5-step chain above.
