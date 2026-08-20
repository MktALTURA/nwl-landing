# NWL Attribution — What Works, What Doesn't, and What to Check on the Ads Side

**For:** the Meta / Google Ads agent
**From:** the website + GHL side
**Date:** 5 Aug 2026 · **Live on production:** `www.nwl.com.mx`

---

## 0. Read this first: "attribution is broken" means four different things

Most of the disagreement between us is that we're using one phrase for four separate systems. Please
say which one you mean, because the causes and owners are completely different:

| # | Symptom | Where you'd see it | Owner |
|---|---|---|---|
| 1 | GHL contact has no source / `sin identificar` | GHL contact record | website (fixed) |
| 2 | Meta Ads Manager shows 0 leads for a campaign | Ads Manager / `/insights` | mixed — see §5 |
| 3 | Monthly report says `google=0 / meta=0` | reporting job | **reporting job — see §6 (grouping by the wrong field)** |
| 4 | Google `utm_campaign` is a literal `{campaignname}` | GHL + GA4 | **Google Ads — see §4** |

Items 1 is fixed and verified. Item 3 is very likely a query bug, not a data problem. Items 2 and 4
have real work outstanding, and most of it is on the ads side.

---

## 1. How a FORM lead connects to GHL

```
Ad click  →  www.nwl.com.mx/?utm_*&fbclid=…&gclid=…
              │
              ├─ <UTMCapture/> in the ROOT layout captures utm_* + click IDs
              │  → localStorage, click IDs with a 7-day TTL and a capture timestamp
              │
              ▼
        Visitor opens a form (GHL iframe, api.leadconnectorhq.com/widget/form/<id>)
              │
              │  buildGHLFormSrc() appends to the IFRAME SRC — a cross-origin iframe
              │  does NOT inherit the parent URL, so this is the only way GHL sees them:
              │     fbclid, gclid
              │     utm_source, utm_medium, utm_campaign, utm_term, utm_content
              │     landing_page
              │     ft_utm_* (first touch, write-once), ft_landing_page
              │     event_id  (pre-minted, for Meta dedup)
              ▼
        Visitor submits
              ├─ GHL creates the contact, populates NATIVE attributionSource
              │  AND the utm_* custom fields from those iframe params
              ├─ site fires Meta `Lead` — browser pixel + our own CAPI, shared event_id
              └─ GHL's own CAPI action fires `SubmitApplication` (server-side, hashed PII)
```

**Verified working.** Pulled a real form lead from the GHL API:

```json
"attributionSource": {
  "sessionSource": "Paid Search",
  "utmSource": "google", "utmMedium": "cpc",
  "utmTerm": "colegio newland querétaro", "utmContent": "797735403017",
  "gclid": "Cj0KCQjwm8bTBhDWARIsAC9Hi8mgz…",
  "campaign": "{campaignname}",        ←  THE ONLY BROKEN FIELD. See §4.
  "fbEventId": "f3c97f85-ddbd-4e52-8327-7e1360055bbb"
}
```

Everything captured correctly except `campaign`, and that is a Google Ads configuration problem, not a site
problem. `fbEventId` is our `event_id` arriving through the iframe — the plumbing works end to end.

---

## 2. How a WHATSAPP lead connects to GHL

This is the one that used to lose ~95% of attribution at the `wa.me` handoff, because that handoff
drops every URL parameter. 44% of contacts arrive this way.

```
Ad click  →  site (same capture as above)
              │
              ▼
        Visitor taps a WhatsApp CTA
              │  on pointerdown (fires BEFORE navigation):
              │   1. mint a short code:  NW-XXXXXX
              │      (6 chars from 23456789ABCDEFGHJKLMNPQRSTUVWXYZ — no 0/O/1/I)
              │   2. rewrite the prefilled text →  "…NWL Australian School. [Ref NW-GCCZV9]"
              │   3. POST the full attribution + the first-party _fbc/_fbp cookies
              │      to /api/wa-token  →  parked in Redis under that code, 7-day TTL
              │   4. fire Meta `Contact`
              ▼
        Family sends the prefilled message (the code travels inside the message text)
              │
              ▼
        GHL workflow:  trigger "El cliente ha respondido"
                       filter  "Canal de respuesta = SMS"   (WhatsApp arrives as SMS here)
                       action  plain Webhook (free tier) → POST /api/wa-resolve
              │            header: x-nwl-secret
              │            custom data: message, sendLead, email, phone
              ▼
        /api/wa-resolve
              ├─ pulls NW-XXXXXX out of the message, looks it up in Redis
              ├─ WRITES 14 attribution custom fields onto the GHL contact
              │  (first resolution only; fills blanks only, never overwrites)
              └─ if sendLead=true, replays Meta `Lead` with the ORIGINAL click's fbc
                 and event_time = the CLICK, not now
```

**Verified working in production.** A real inbound lead resolved to
`google / cpc / brand_protection` with its `gclid` intact — a lead that would previously have been
`sin identificar`.

**Backfill done 5 Aug:** 36 WhatsApp contacts checked, **36 of 36 still carried their code** (zero
families deleted it). 31 backfilled, 4 already populated, 1 past the 7-day TTL. Recovered 8
`google/cpc/brand_protection`, 3 paid Meta campaigns, and one `chatgpt.com` referral.

### Why WhatsApp leads still won't show as Meta conversions

This is important and it is **not a bug**. Of those 36 WhatsApp leads, only **3 came from paid Meta**.
The rest were Google, organic, or direct. We recover their *true* source — but a lead with no
`fbclid` has no `fbc`, so Meta correctly declines to attribute it to an ad. If you are expecting the
WhatsApp cohort to show up as Meta conversions, most of it never should.

---

## 3. Meta events — the current, verified state

From Events Manager, dataset `1422324826607500`, window Jul 28 – Aug 4:

| Event | Volume | EMQ | Integration | Notes |
|---|---|---|---|---|
| PageView | 3.4K | 6.1 | Multiple | |
| ViewContent | 1.2K | 5.6 | Multiple | |
| Contact | 269 | 6.1 | Multiple | fires on WhatsApp / tel / mailto click |
| **Lead** | **87** | **6.8** | Multiple | ours — form submit + WhatsApp replay |
| **Submit application** | **90** | **3.9** | Conversions API | GHL's, server-side, hashed PII |

**Deduplication: Event ID key, 100% total event coverage.** Browser and server halves collapse
correctly. The 87 are real, deduplicated conversions.

### Three things to correct if you were told otherwise

1. **`SubmitApplication` IS being received.** 90 events, recognised as a standard event. An earlier
   analysis concluded it wasn't, because `/insights` returns `0` for
   `offsite_conversion.fb_pixel_submit_application`. Meta's insights `actions[]` appears to have no
   dedicated key for it, so its volume surfaces under `offsite_conversion.fb_pixel_custom` — which is
   exactly the bucket that jumped from 2.65% to 11.75% of link clicks on Jul 29. Events Manager is the
   authority on what the dataset received. **Do not "revert to Lead" on that basis** — it would swap a
   6.8 EMQ event for a 3.9 one and reintroduce double-counting.

2. **Lead EMQ went UP, 4.6 → 6.8.** That was the point of the Jul 29 work.

3. **Only ~10 of 87 Lead events get campaign-attributed, and that is correct.** Before Jul 29, GHL
   fired the `Lead` event on *every contact from every channel* and matched on hashed email/phone, so
   Meta credited itself for Google, organic and WhatsApp leads. The old "5.6 leads/day" was inflated
   by cross-channel matching. ~1.4/day is closer to genuine Meta-driven volume. **The measurement got
   honest; it did not break.**

---

## 4. ⚠️ ACTION REQUIRED — Google Ads is genuinely misconfigured

Every Google paid lead in GHL carries `campaign: "{campaignname}"`.

**`{campaignname}` is not a Google Ads ValueTrack parameter.** The complete Search set is
`{campaignid}`, `{adgroupid}`, `{creative}`, `{keyword}`, `{matchtype}`, `{network}`, `{device}`,
`{targetid}`, `{placement}`, `{feeditemid}`, `{extensionid}`, `{loc_physical_ms}`,
`{loc_interest_ms}`, `{gclid}`, `{lpurl}`, `{random}`. There is **no name variant of anything** —
only IDs. Google leaves unrecognised braces untouched, so the literal string reaches the landing page.

*(Microsoft Advertising DOES have `{CampaignName}`. A template copied from a Bing setup looks correct
and fails silently on Google. That is the most likely origin.)*

**Second fault, stacked on it:** the UTMs are set in **two places** and they disagree. Real stored URL:

```
https://www.nwl.com.mx/
  ?utm_source=google&utm_medium=cpc&utm_campaign=brand_protection&utm_content=797735403017
  &utm_source=google&utm_medium=cpc&utm_campaign={campaignname}&utm_term=…&gclid=…
```

The first set (hardcoded in each ad's Final URL) is **correct**. The second set (Final URL suffix)
carries the broken value and, being last, wins.

### The fix

1. Strip `?utm_*` from every ad's Final URL — leave the clean landing page.
2. Set the Final URL suffix **at campaign level**, with the campaign name typed literally:
   `utm_source=google&utm_medium=cpc&utm_campaign=brand_protection&utm_term={keyword}&utm_content={creative}&utm_matchtype={matchtype}`
   (or use `utm_campaign={campaignid}` if you'd rather it be automatic and map IDs in reporting).
3. Leave auto-tagging ON. `gclid` is arriving correctly and is load-bearing.
4. Check for a stray **account-level** tracking template also injecting UTMs — that's the usual reason
   a fix "doesn't stick".

### 💰 June and July are recoverable

`gclid` was captured correctly the entire time. Export a **GCLID-level report** from Google Ads
(Click ID + Campaign + Ad group + Keyword) for those months and join it to GHL contacts on `gclid`.
The campaign data was never actually missing — just unreadable. Please do this before the monthly
report writes those months off.

---

## 5. ⚠️ ACTION REQUIRED — Meta account issues

**1. Spend cap is 91% consumed.** `spend_cap` MXN 69,000.07 · `amount_spent` MXN 62,989.00 ·
**remaining MXN 6,011**. The account hard-stops at the cap and this is an independent constraint on
delivery regardless of anything to do with events. Raise it in the Meta UI.

**2. Ad set count disagrees.** An API pull found `custom_event_type: LEAD` on **13 ad sets**; Events
Manager reports `Lead` as "used by **6 ad sets**". If 7 ad sets are optimizing toward something else,
that's a real coverage gap. Please reconcile.

**3. If you ever change what the `Lead` event covers, repoint the ad sets in the same change.**
Spend fell from $356/day to $203/day against ~$388/day of available budget after Jul 29 — the
signature of an optimizer that can't find its conversion event. That was our miss and it's worth not
repeating.

**4. Data-quality diagnostic — half fixed, watching.** Meta flagged *"Server sending modified fbclid
value in fbc parameter"* (high priority, `Lead`/`ViewContent`/`Contact`, 3% of Lead events, $184).
We found and fixed a real truncation on our side (click IDs were being cut at 256/512 chars;
modern fbclids exceed both). Verified in production: a 659-character click ID now round-trips intact.
**Please tell us whether that 3% figure drops over the next 3–7 days.** If it doesn't, the remaining
suspect is our reconstruction of `fbc` when the pixel is ad-blocked, and we'll need a Test Events
code from you to settle it.

Also worth knowing: Meta claims **+0.7 EMQ** for advertisers adopting their Conversions API
*parameter builder*. From 6.8 that would be ~7.5.

---

## 6. ⚠️ CHECK THIS FIRST — the report is almost certainly grouping by the wrong FIELD

**Correction (20 Aug):** an earlier version of this document said `POST /contacts/search` returns no
attribution fields. **That was wrong** — it was based on a query that inspected `attributions` (the
plural array key, which only the *list* endpoint uses) rather than `attributionSource`. Retracted.

What `search` actually returns, measured over 100 contacts:

| Field | Available via `POST /contacts/search`? |
|---|---|
| `customFields` (our `utm_source`, `utm_campaign`, `gclid`, `fbclid`) | ✅ **yes** — 28/100 populated |
| `attributionSource` (GHL native) | ✅ yes — 29/100 non-empty |
| `source` | ✅ yes |

So bulk reporting works fine off `search`. **The endpoint was never the problem.**

### The actual problem: `source` never contains a channel

Distribution of GHL's `source` field over 100 contacts:

```
None                              64
whatsapp_web                      23
Formulario para pag web  - EN      7
Formulario trabaja-con-nosotros    3
Formulario para pag web            3
```

**Not one value contains "google", "meta" or "facebook", and none ever will.** `source` records *how*
the contact was created, not *where they came from*. A report that groups leads by `source` — the
natural thing to do, and exactly what the original findings described as "leads land as
whatsapp/direct/manual" — cannot produce a paid-channel breakdown no matter how perfect the tagging is.

### The fix

Group by the **custom fields**, not by `source`:

| Want | Read |
|---|---|
| channel | `customFields[utm_source]` → `vvtMOtj4oOek17kBlLrE` |
| campaign | `customFields[utm_campaign]` → `JgvJrwn9fy6cac6hQqcB` |
| Google click | `customFields[gclid]` → `IYU3tl3tDC3vYNVyObsW` |
| Meta click | `customFields[fbclid]` → `t5Slrl7gNoQsHw0Sji6W` |

These are populated for **both** paths — forms and WhatsApp — and are returned in bulk by `search`.

Note that `attributionSource` is **empty on every WhatsApp contact** and always will be: GHL's native
attribution is populated only by its own form widget and tracking script, and is read-only to the API
(verified — a `PUT` returns `200 succeeded:true` and silently discards it). So a report built on
native attribution alone will see form leads and miss the entire WhatsApp cohort. **The custom fields
are the only field set that covers both.**

---

## 7. What is genuinely verified vs. what is still assumed

Being explicit so nobody over-trusts this document.

**Verified against live systems:**
- Form leads carry native `attributionSource` with `utmSource`/`utmMedium`/`gclid` — read from the GHL API
- WhatsApp write-back: 13/13 fields written and read back, replay guard and no-clobber guard both hold
- Backfill: 31 contacts written, 0 errors, 36/36 codes retained
- Meta: Lead EMQ 6.8, dedup 100% coverage, SubmitApplication receiving at 90 events
- Long click IDs survive `/api/wa-token` intact (659 chars round-tripped in production)

**Not yet proven:**
- Whether the `fbc` diagnostic clears after our truncation fix — needs 3–7 days of Meta data
- Whether the reporting job actually uses `/contacts/search` — needs someone to check the job
- What triggers GHL's `SubmitApplication` CAPI action — it's a GHL workflow trigger we can't read
  from the website side; someone with GHL access should confirm it

---

## 8. Known noise in the CRM that will skew any lead count

GHL's `external-tracking.js` hooks **every** `<form>` on the site. The parents-portal password gate
at `/padres/*` is a native form, so **every parent login creates a blank contact** — source
`external_form`, "Unidentified Form", no name, no email, no phone. That was **33 of a recent
100-contact sample**.

If you are counting contacts as leads, roughly a third of recent volume is parent logins, not
prospects. Filter out `source = external_form`. (Fix is queued on the website side.)

---

## Summary — who owns what

| Item | Owner | Status |
|---|---|---|
| Form → GHL attribution | website | ✅ working, verified |
| WhatsApp → GHL attribution | website | ✅ working, verified + backfilled |
| Meta Lead event + dedup | website | ✅ working, EMQ 6.8 |
| `fbc` truncation | website | ✅ fixed, awaiting Meta confirmation |
| Google Ads `{campaignname}` | **ads** | 🔴 open — §4 |
| June/July GCLID recovery | **ads** | 🔴 open — §4 |
| Meta spend cap | **ads** | 🔴 open — §5 |
| 13 vs 6 ad sets on `Lead` | **ads** | 🟡 reconcile — §5 |
| Report groups by `source`, not UTM fields | **reporting** | 🔴 check first — §6 |
| `external_form` junk contacts | website | 🟡 queued — §8 |
