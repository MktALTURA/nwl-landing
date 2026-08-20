# Handoff — Fix the NWL Monthly Report's Channel Attribution

**Self-contained.** You need this file, a GHL private-integration API key with
contacts read scope, and the location ID. Nothing else.

**System:** GoHighLevel (LeadConnector) CRM · location `mBBe0eYA8ipK5V9Icpq1`
**Written:** 20 Aug 2026, verified against live data that day.

---

## 1. The bug, in one line

The report groups leads by GHL's **`source`** field. That field can never contain
a marketing channel, so the report prints `google=0 / meta=0` no matter how
correct the tagging is.

Observed values of `source` across 100 recent contacts:

```
None                              64
whatsapp_web                      23
Formulario para pag web  - EN      7
Formulario trabaja-con-nosotros    3
Formulario para pag web            3
```

Not one says `google`, `meta`, or `facebook`. None ever will. `source` records
**how the record was created**, not **where the person came from**.

This has been misdiagnosed as "attribution is broken" four times. The tagging was
fine every time.

---

## 2. The data model — attribution lives in THREE places

This is the single most important thing in this document. Every wrong conclusion
in this project came from reading one location and treating empty as absent.

| # | Location | Notes |
|---|---|---|
| 1 | `customFields[]` | Our own fields. **The `gclid` field was created 5 Aug 2026 — it is empty for anything earlier by construction.** |
| 2 | `attributionSource` | GHL's native **first-touch** object |
| 3 | `lastAttributionSource` | GHL's native **last-touch** object |

Reading two of three still undercounts. Measured over June–July 2026:

| Signal | only `attributionSource` | only `lastAttributionSource` | **either** |
|---|---|---|---|
| `gclid` present | 41 | 36 | **45** |
| `utmSource == google` | 55 | 46 | **63** |

**Always read all three and union them.**

Native objects carry: `utmSource`, `utmMedium`, `campaign`, `utmTerm`,
`utmContent`, `gclid`, `fbclid`, `sessionSource`, `referrer`, `medium`,
`mediumId`. Note the camelCase — the custom fields use snake_case.

⚠️ `attributionSource` is **empty on every WhatsApp contact and always will be**.
GHL populates it only from its own form widget and tracking script, and it is
read-only to the API. A report built on native attribution alone silently misses
the entire WhatsApp cohort — roughly half of all leads.

---

## 3. How to pull the data

```
POST https://services.leadconnectorhq.com/contacts/search
Authorization: Bearer <API_KEY>
Version: 2021-07-28
Content-Type: application/json
User-Agent: curl/8.7.1        <-- REQUIRED, see below

{"locationId":"mBBe0eYA8ipK5V9Icpq1","pageLimit":100,"page":1,
 "sort":[{"field":"dateAdded","direction":"desc"}]}
```

This endpoint returns `customFields`, `attributionSource` **and**
`lastAttributionSource` in bulk. You do **not** need per-contact `GET` calls.

**Two traps:**

- **Cloudflare returns `403 error code: 1010` to default user-agents.** Python's
  `urllib` is blocked; `curl` is not. Send an explicit `User-Agent` header or
  every request fails in a way that looks like an auth problem.
- **Paginate with `page`.** Increment until `contacts` is empty or the oldest
  `dateAdded` in the batch passes your window.

---

## 4. Custom field IDs

Address by **ID**, never by `fieldKey`. Five of these have a key that disagrees
with their name (`ft_utm_campaign` → `contact.ft_campaign`), and a key can never
be corrected — renaming a field leaves its key untouched.

| Meaning | ID |
|---|---|
| `utm_source` | `vvtMOtj4oOek17kBlLrE` |
| `utm_medium` | `Re5UyuNTEWOBgIVmXtPg` |
| `utm_campaign` | `JgvJrwn9fy6cac6hQqcB` |
| `utm_term` | `3SEJFnsrDM4UmG0TcFgc` |
| `utm_content` | `CStfj0mHjc66vgD4NMhO` |
| `landing_page` | `zWb5ffTPaQ0fGYKaJ6FW` |
| `ft_utm_source` | `eCd7cQqEJiNWRbs1tSql` |
| `ft_utm_medium` | `lNPBCPUrfkO4qlaILzoe` |
| `ft_utm_campaign` | `zDMdFk7v4fVQDGeVPzl8` |
| `ft_utm_term` | `HKJ2VIdcwZ0OJKOM2sCF` |
| `ft_utm_content` | `PvoS8WOjB5e08xUUkoRF` |
| `ft_landing_page` | `8UNbnslJLjtamdVJtzhL` |
| `Fbclid` | `t5Slrl7gNoQsHw0Sji6W` |
| `Google Click ID` (gclid) | `IYU3tl3tDC3vYNVyObsW` |

---

## 5. Channel classification — apply in this order

Click IDs win over `utm_source` because `utm_source` on this account is
demonstrably overwritten with junk (§7), while a click ID is proof of a real ad
click.

```
gclid  = customFields[IYU3tl3tDC3vYNVyObsW]
      or attributionSource.gclid
      or lastAttributionSource.gclid

fbclid = customFields[t5Slrl7gNoQsHw0Sji6W]
      or attributionSource.fbclid
      or lastAttributionSource.fbclid

src    = customFields[vvtMOtj4oOek17kBlLrE]
      or attributionSource.utmSource
      or lastAttributionSource.utmSource

session = lastAttributionSource.sessionSource or attributionSource.sessionSource
```

Then:

| Order | Condition | Channel |
|---|---|---|
| 1 | `gclid` present | **Google Ads (paid)** |
| 2 | `fbclid` present | **Meta (paid)** |
| 3 | `src` == `whatsapp_directo` | **WhatsApp direct** |
| 4 | `src` in {`formulario_web`, `nwl.com.mx`} | **treat as unknown — see §7** |
| 5 | `src` non-empty | that value |
| 6 | `session` present | that value (`Paid Search`, `Organic Search`, …) |
| 7 | otherwise | **Unattributed** |

Report `utm_campaign` alongside, resolved the same way (custom field → native
`campaign` on either layer).

---

## 6. Exclusions — apply before any count, rate or CPA

| Exclude | Why |
|---|---|
| `source == "external_form"` | Parent-portal logins, not prospects. Blank contacts with no name, email or phone. Source closed 20 Aug 2026, but historical rows remain. |
| `sessionSource == "CRM UI"` | **Advisor-typed contacts. 165 in June–July — larger than every paid bucket combined.** These are data entry, not acquisition. Report them as their own line; never inside a paid conversion rate. |

Failing to exclude these inflates the denominator and makes every CPA and
conversion rate wrong.

---

## 7. Known-bad `utm_source` values on this account

These appear in the data and are **not channels**. Contacts carrying them often
have a real `gclid` underneath — which is why §5 puts click IDs first.

| Value | Count (Jun–Jul) | What it is |
|---|---|---|
| `formulario_web` | 20 | hardcoded on a GHL form |
| `nwl.com.mx` | 8 | self-referral — the site tagging itself |

Together, 28 contacts carried a real Google click ID while `utm_source` said one
of these. A `utm_source`-only pull misses every one of them.

---

## 8. WhatsApp — three distinct populations

| `source` value | Meaning |
|---|---|
| `whatsapp_web` | Clicked the WhatsApp button on the website. Real ad source was recovered and written to the custom fields. |
| `whatsapp_directo` | Messaged the business number directly — saved contact, Google Maps, flyer, referral, click-to-WhatsApp ad. **No digital source exists and none can be recovered.** |
| neither, but has a conversation | Not yet classified; treat as unattributed |

Report `whatsapp_directo` as its own channel. It is a real acquisition channel,
not a tracking failure.

---

## 9. Validate your build against these

Window **1 June – 31 July 2026**, expect **1,478 contacts**, 522 with any native
attribution object.

| Metric | Expected |
|---|---|
| Google contacts, full union (§5) | **91** |
| Google by custom `utm_source` alone | 50 |
| Native `gclid`, either layer | 45 |
| Native `utmSource == google`, either layer | 63 |
| Contacts with `gclid` but non-Google `utm_source` | 28 |

`sessionSource` distribution for the same window:

```
CRM UI          165
Social media    112
Direct traffic   95
Organic Search   88
Paid Search      36
Paid Social      15
Trigger Link      5
Referral          4
```

**If your Google number comes out at 50, you are reading only the custom field.
If it comes out ~63, you are reading only `utmSource`. The target is 91.**

Cross-check on the admissions pipeline (`Admisiones NWL`,
`cPCXiO9ps2rbFPNvHWHG`), opportunities created 12–20 Aug, n=100:

```
WhatsApp directo  46    Google  37    Unattributed  10
ChatGPT            3    Meta     2    Bing/other     2
```

---

## 10. Do not do these

- **Do not group by `source`.** That is the bug.
- **Do not force agreement with platform conversion counts.** A `gclid` proves an
  ad *click*; Google's "41 July conversions" counts conversions *it* attributed
  under *its* windows. 53 contacts vs 41 conversions is coherent, not an error.
- **Do not use the `Google Click ID` custom field for anything before 5 Aug 2026.**
  The field did not exist. Use the native layers.
- **Do not conclude a signal is missing because one query returned nothing.**
  Check all three locations in §2 first. This exact mistake produced four
  false "attribution is broken" reports.
- **Do not compare Meta numbers to anything before 29 July 2026.** Until that
  date GHL fired a Meta `Lead` event on every contact from every channel and
  matched on hashed email/phone, so Meta credited itself for Google, organic and
  WhatsApp leads. Pre-August Meta CPL is inflated and is not a valid baseline.

---

## 11. Definition of done

1. A contact known to have `gclid` + `utm_source=google` appears under Google.
2. A contact with `gclid` and `utm_source=formulario_web` **also** appears under
   Google.
3. A `whatsapp_directo` contact appears as its own channel, not as unattributed.
4. `external_form` and `CRM UI` contacts are excluded from paid rates.
5. June–July Google contacts total **91**.
6. The report shows non-zero paid channels.
