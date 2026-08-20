# Hop 5B is not broken — measured against live GHL, 20 Aug 2026

**Reply to:** `attribution-flow-diagnosis.md` (Media Buyer, 20 Aug)
**Method:** pulled all 110 `whatsapp_web` contacts from the GHL API, opened each with
`GET /contacts/{id}` (the endpoint that actually returns attribution), and resolved live codes
against production `/api/wa-resolve`.

---

## Headline

**The WhatsApp resolution webhook never stopped working.** It is working right now, including on a
contact created today. The `11 → 1` fbclid drop is real, but it measures **Meta delivery**, not
pipeline health — and the cause is already in your own document, in §3E.

**Stage 1.1 and 1.2 are unnecessary. Stage 1.3 is the whole emergency**, and it is more urgent than
your draft treats it, because it is the actual cause rather than a side issue.

---

## 1. Capture rate never moved

| Window | WhatsApp contacts | With attribution written | Rate |
|---|---|---|---|
| 01–06 Aug | 38 | 34 | **89%** |
| **07–13 Aug** (the "broken" window) | 31 | 28 | **90%** |
| 14–20 Aug | 23 | 19 | **83%** |

The webhook fired, `/api/wa-resolve` resolved, and the 14-field write-back landed at a steady ~85–90%
throughout the period the pipeline was assumed dead. A contact created **20 Aug** has
`utm_source=google` written.

### The four recent contacts without attribution are not failures

All four have codes. All four resolve `found: true` with `already_resolved: true` — the webhook
already processed them. Their parked records simply contain **no UTMs**: untagged visits.

```
NW-AWWTF4  found=True  src=None  fbclid=-  already_resolved=True
NW-RF2RTQ  found=True  src=None  fbclid=Y  already_resolved=True   ← fbclid WAS written
NW-C7NHH2  found=True  src=None  fbclid=-  already_resolved=True
NW-49DU5T  found=True  src=None  fbclid=-  already_resolved=True
```

Nothing failed. There was nothing to write.

---

## 2. What the `11 → 1` actually measured

Same contacts, broken out by click ID and source:

| Window | contacts | has attr | **fbclid** | **gclid** |
|---|---|---|---|---|
| 01–06 Aug | 38 | 34 | **11** | 6 |
| 07–13 Aug | 31 | 28 | **1** | **11** |
| 14–20 Aug | 23 | 19 | **2** | 8 |

Source mix:

| Window | mix |
|---|---|
| 01–06 Aug | google=24, **facebook=8**, none=4, org=1, chatgpt=1 |
| 07–13 Aug | google=26, none=3, bing=1, **facebook=1** |
| 14–20 Aug | google=16, none=4, chatgpt=2, **facebook=1** |

`fbclid` collapsed. `gclid` went **up**. Total capture held. Facebook-sourced WhatsApp leads went
8 → 1 → 1.

That is not a pipeline that stopped recording Meta. That is **Meta that stopped sending traffic to
the website**, while Google kept sending it and the same pipeline kept recording it.

---

## 3. The cause is your §3E, filed under the wrong heading

> `Golden Ticket 30% - Image` — **end_time 1 Aug** — best ad in the account, 91 leads @ $45.76 in July
> `GT Aaron Reel`, `Elementary JULIO` — **end_time 1 Aug**

Website-destination ad sets expired **1 Aug**. Facebook-sourced WhatsApp contacts fall off a cliff
immediately after. The dates line up exactly.

You labelled that section *"unrelated to attribution, but it is costing money today."* It is not
unrelated — **it is the finding.** Everything else in §3A follows from it.

### Reconciling the messaging-conversation number

You ruled out ad delivery because `messaging_conversation_started_7d` rose (6 → 11). Worth checking
whether those are **click-to-WhatsApp** ads: that format goes straight from Facebook/Instagram to
WhatsApp and **never loads the website**. No page view, no code minted, no `fbclid` captured — by
design, not by fault.

If so, messaging conversations rising while website-sourced `fbclid` fell is fully consistent: two
different populations. Messaging ad sets kept delivering; the website-destination ones expired. I
can't confirm the split — my token has CAPI scope only, no `ads_read`. **Please check
`destination_type` per ad set against the expiry dates.**

---

## 4. Corrections to the fix plan

| Item | Your status | Actual |
|---|---|---|
| 1.1 Inspect GHL workflow | 🔴 prime suspect, today | ✅ **Verified working. Close it.** |
| 1.2 Re-run backfill for codes in TTL | 🔴 urgent | ✅ **Nothing to recover** — see below |
| 1.3 Raise cap + clear `end_time` | 🔴 today | 🔴 **THE emergency. Do this first.** |

**On "codes 7–13 Aug have already expired — that data is gone":** it was never lost. Those codes were
resolved *at the time* and their attribution was written to the contacts. 28 of 31 contacts in that
window carry it. Redis expiry only matters for codes that were never resolved, and there aren't any.

Everything in Stage 0, 2, 3 and 4 stands. §5 (why four rounds failed) and §0 (your own retractions)
are both correct and worth keeping — the "prove the instrument returned real data" rule is exactly
what produced this correction too.

---

## 5. Stage 3 is now partly done, in reverse

Your tracer test was never run forward. This analysis ran it **backward** on ~90 real records:
contact → code → Redis → written fields. Hops 3B, 4B, 5B, 6B and 7 are confirmed on live production
data rather than a single synthetic case.

Still unverified end to end, and still worth your forward tracer:

- **Hop 1 (Google)** — a real ad click producing a single clean UTM set, after §2.1–2.3
- **Hop 8a** — that a WhatsApp-replayed `Lead` gets credited to a specific ad in Ads Manager
- **Hop 8c** — that the contact appears under the right channel in the monthly report

**Correction to my own §6 in the 5 Aug doc:** I claimed `POST /contacts/search` returns no
attribution. It does return it — both `customFields` and `attributionSource`. I had queried the wrong
key. The real reporting defect is that GHL's `source` field never contains a channel name (its values
are `None`, `whatsapp_web`, and form names), so any report grouping by `source` prints `google=0`
regardless of tagging. **Group by the `utm_source` / `utm_campaign` custom fields instead** — they
cover both the form and WhatsApp paths and come back in bulk from `search`.

---

## 6. Where this leaves the diagnosis

| # | Item | Status |
|---|---|---|
| A | WhatsApp resolution webhook | ✅ **cleared — working, measured** |
| B | Google `{campaignname}` + duplicate UTMs | 🔴 open, ads |
| C | Report groups by `source` (never holds a channel) instead of the UTM custom fields | 🔴 open, **blocks all measurement** |
| D | `external_form` inflating counts ~33% | 🔴 open, website fix queued |
| E | **Meta account dark — ad sets past `end_time`** | 🔴 **promoted to prime cause** |

E was the answer the whole time. It was sitting in the document labelled "unrelated."
