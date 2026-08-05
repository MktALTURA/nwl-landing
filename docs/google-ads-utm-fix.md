# Google Ads → GHL attribution: the `{campaignname}` defect

**Status:** open, fix is in Google Ads only — no code change
**Found:** 5 Aug 2026, by reading `attributionSource` off real GHL contacts via the API
**Owner:** Media Buyer (Google Ads account), verified by Dev

---

## Symptom

Every Google paid lead in GHL carries a literal, unsubstituted campaign name:

```
campaign: "{campaignname}"
```

Because the campaign never resolves, no report can group spend or leads by campaign,
and the monthly report shows paid attribution as unmeasurable.

## Evidence

Real GHL contact (`Formulario para pag web - EN`), native `attributionSource`:

```json
{
  "sessionSource": "Paid Search",
  "utmSource":     "google",
  "utmMedium":     "cpc",
  "utmTerm":       "colegio newland querétaro",
  "utmContent":    "797735403017",
  "campaign":      "{campaignname}",
  "gclid":         "Cj0KCQjwm8bTBhDWARIsAC9Hi8mgzDd4FdC_Dy83O8eG5fZWrykZPBJyENMzF8pnTku5H5fcMiXVj7ca…",
  "medium":        "form"
}
```

Everything else captured correctly. Only `campaign` is broken.

The stored landing URL shows why — **the UTM parameters appear twice**:

```
https://www.nwl.com.mx/
  ?utm_source=google&utm_medium=cpc&utm_campaign=brand_protection&utm_content=797735403017
  &utm_source=google&utm_medium=cpc&utm_campaign={campaignname}&utm_term=colegio+newland+querétaro
  &gad_source=1&gad_campaignid=23570483757&gclid=Cj0KCQjwm8bTBhDWARIs…
```

- **First set** — hardcoded in each ad's Final URL. `utm_campaign=brand_protection` is *correct*.
  `utm_content` differs per ad (`…017`, `…020`), so it is typed per-ad.
- **Second set** — appended by the Final URL suffix (or tracking template). Carries `{campaignname}`.

The second set wins, so the good value is overwritten by the broken one.

## Root cause — two independent faults

### 1. `{campaignname}` is not a Google Ads parameter

Google Ads has **no campaign-name ValueTrack parameter**. The only campaign-level
identifier is `{campaignid}`, which returns a numeric ID. Confirmed against Google's
official parameter list — the full Search set is `{campaignid}`, `{adgroupid}`,
`{creative}`, `{keyword}`, `{matchtype}`, `{network}`, `{device}`, `{targetid}`,
`{placement}`, `{feeditemid}`, `{extensionid}`, `{loc_physical_ms}`,
`{loc_interest_ms}`, `{gclid}`, `{lpurl}`, `{random}`, plus the conditional
`{ifmobile:}` / `{ifsearch:}` forms. There is no name variant of any of them.

Google leaves unrecognised `{braces}` untouched, so the literal string is what
reaches the landing page.

**Likely origin of the mistake:** Microsoft Advertising *does* have a `{CampaignName}`
parameter. A template copied from a Bing setup, or from a blog covering both platforms,
would look correct and silently fail on Google.

### 2. Two sources of UTMs are fighting

Parameters are set in **both** the ad's Final URL and the Final URL suffix. Google
appends the suffix after the Final URL's own query string, producing duplicate keys.
Google's documentation does not define which duplicate wins for downstream consumers —
in practice GHL reads the **last** occurrence, which here is the broken one.

Even after fixing fault 1, leaving both sources in place means two places to maintain
and a silent overwrite the next time they disagree.

---

## The fix

Pick **one** source of truth for UTMs. Recommended: the **Final URL suffix, set at
campaign level**, with the campaign name typed literally.

### Step 1 — strip UTMs from the ads' Final URLs

For every ad in every campaign, the Final URL becomes the clean landing page:

```
https://www.nwl.com.mx/
```

No `?utm_…` at all. This removes the first duplicate set.

### Step 2 — set the Final URL suffix per campaign

Google Ads → select the campaign → **Settings** → scroll to
**Additional settings** → **Campaign URL options** → *Final URL suffix*.

Type the campaign's own name as a literal. For the brand campaign:

```
utm_source=google&utm_medium=cpc&utm_campaign=brand_protection&utm_term={keyword}&utm_content={creative}&utm_matchtype={matchtype}
```

Repeat per campaign, changing only `utm_campaign`. This is the trade-off worth
accepting: `{campaignid}` would be automatic but writes a meaningless number like
`23570483757` into every report. A literal typed once per campaign stays readable,
and campaigns are created rarely enough that the manual step is cheap.

If you would rather it be fully automatic, use `utm_campaign={campaignid}` instead
and map IDs to names in the reporting layer.

### Step 3 — leave auto-tagging on

`gclid` is arriving correctly and is what makes offline conversion import and any
historical repair possible. Do not turn auto-tagging off.

### Step 4 — verify at account level

Check that no account-level or ad-group-level tracking template is also injecting
UTMs. Google applies the most specific level, but a stray account-level template is
the usual cause of a fix that "doesn't stick."

---

## Verifying the fix

1. Click a live ad yourself. Inspect the landing URL — each `utm_` key must appear
   **exactly once**, and `utm_campaign` must be a readable name.
2. Submit the form on that visit.
3. Pull the contact and confirm `campaign` is now the real name:

```bash
curl -s "https://services.leadconnectorhq.com/contacts/<contactId>" \
  -H "Authorization: Bearer $GHL_Private_API_Key" \
  -H "Version: 2021-07-28" \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['contact']['attributionSource'])"
```

Allow up to ~15 minutes for the ad to serve the edited URL.

---

## Recovering the historical data

Past contacts are **not** permanently lost. `gclid` was captured correctly the whole
time, so campaign can be restored by joining on it:

1. Google Ads → Reports → build a report with **Click ID (GCLID)**, Campaign, Ad group, Keyword.
2. Set the date range to the months being reported.
3. Export, and join to GHL contacts on `gclid`.

This makes the June and July numbers recoverable for the monthly report rather than
written off — worth doing before item #1 is escalated as a pipeline defect, because
the underlying data was never actually missing.

---

## Note on the reporting side

Separately from this defect: `POST /contacts/search` returns **no attribution fields
at all**. `attributionSource` and `lastAttributionSource` are only returned by
`GET /contacts/{id}`. Any bulk report built on the search endpoint will show
`google=0 / meta=0` no matter how clean the tagging is. Confirm which endpoint the
reporting job uses before concluding attribution is missing.

---

## Sources

- [Set up tracking with ValueTrack parameters — Google Ads Help](https://support.google.com/google-ads/answer/6305348) — the complete parameter list; no campaign-name parameter exists
- [About ValueTrack parameters — Google Ads Help](https://support.google.com/google-ads/answer/2375447)
- [Set up your tracking template — Google Ads Help](https://support.google.com/google-ads/answer/10070427)
- [Mapping ValueTrack parameters with report fields — Google Ads API](https://developers.google.com/google-ads/api/docs/reporting/valuetrack-mapping)
- [UET Parameters Table — Microsoft Advertising](https://help.ads.microsoft.com/apex/index/3/en/60123) — where `{CampaignName}` does exist
- [Google Ads & Microsoft UTM Parameters & Tracking Templates — Seer Interactive](https://www.seerinteractive.com/insights/how-to-use-utm-parameters-and-tracking-templates-for-ppc) — "Google doesn't offer a campaign name variable, but you can still use an ID"
