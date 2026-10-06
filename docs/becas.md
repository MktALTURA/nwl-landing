# Programa de Becas — site side runbook

The becas program lives in two repos. This site is the **face**: `/becas`,
the calculator, the native application, the family status page and the QR
verification page. The **brain** is the ALTURA worker (`altura-landing`,
Cloudflare, D1 `altura-hojas`): applications, rules, scheduler, GHL
email/SMS, carta PDF, CAP command center at `/reportes/nwl/becas`.

Decisions (owner, 2026-10-02) are recorded in the plan file and in memory;
this document is the operational side.

## Routes

| Route | What | Indexing |
|---|---|---|
| `/becas` | Page. ISR 60 s. Spanish-first render (`LanguageProvider initialLocale="es"`). | Indexed once public |
| `/becas/demo/precios`, `/becas/demo/ahorro` | Same page forcing one calculator variant. Cookie-gated forever. | noindex |
| `/becas/solicitud/[token]` | Moves the token into cookie `nwl_becas_app` and 303s to `/becas/solicitud`. | noindex |
| `/becas/solicitud` | Family status page (timeline, window countdown, carta, WhatsApp). | noindex |
| `/becas/verificar/[folio]?c=` | QR target on the carta. | noindex |
| `/api/becas/live` | Live cupos + form token. `no-store`. Never prices. | — |
| `/api/becas/start` | Step 1 → worker `POST /applications`. Fires the one Lead on 2xx (browser). | — |
| `/api/becas/documents` | Asks the worker for an upload ticket; the browser PUTs to the worker. | — |
| `/api/becas/submit` | Final submit → worker. Busts the catalog cache. | — |
| `/api/becas/revalidate` | Worker → site webhook (HMAC). Busts the catalog cache. | — |
| `/api/becas/mock-upload` | Sink for uploads in mock mode only. | — |

## Environment variables (Vercel)

| Name | Where | Purpose |
|---|---|---|
| `BECAS_API_URL` | Preview, Production | `https://marketingaltura.com/api/nwl/becas`. Unset = **mock mode** (fixtures). |
| `BECAS_API_SECRET` | Preview, Production | Shared HMAC secret with the worker. Also signs the browser form token. |
| `BECAS_PREVIEW_TOKEN` | Production | Gate token for `/becas?preview=<token>` before launch, and for `/becas/demo/*` forever. Unset = gate closed. |
| `NEXT_PUBLIC_BECAS_PUBLIC` | Production | `true` to launch. Opens the gate, adds the footer link + sitemap entry, turns on the old-URL redirects. |
| `BECAS_MOCK` | any | `1` forces fixtures even with credentials (never in production once public: the client refuses). |
| `BECAS_MOCK_VARIANT` | any | `precios` or `ahorro` for the mock catalog (default `ahorro`). |

Preview deployments are open (no gate) like Rectoría was; keep them on mock
unless the Preview env has real credentials.

## Mock mode

With `BECAS_API_URL` unset, `lib/becas/fixtures.ts` answers every call:
illustrative prices (the documented BE NEWLAND case, 9,100 → 6,370), cupos,
and three status tokens: `/becas/solicitud/mock-pending`, `mock-approved`,
`mock-expired`. Verify works for `BECA-JUR-27-000042`. A wattle ribbon reads
"Demo · precios ilustrativos" whenever fixtures are in use.

## Category requirements (step 3)

- **Académica**: promedio + ciclo escolar de la boleta, two uploads (`boleta`,
  `constancia` de estudios con sello) and the verification authorization
  checkbox (`declarado.autorizaVerificacion`). The worker rejects without all of them.
- **Deportiva / Cultural**: declared data + one `evidencia` upload or an https link.
- **Espíritu NWL**: three guided answers joined by `buildCarta()` into one
  `cartaMotivos` with Spanish headings; each answer needs ⅓ of the catalog's
  `cartaMinChars` (900 by default). Optional recommendation letter (`evidencia`).
- Step 3 is themed per category (`components/becas/categoryTheme.ts`) and shows
  a live requirements checklist. The public cards prefill the choice.

## Contract

`lib/becas/contract.ts` is a verbatim copy of the worker's file. Change it in
both repos at once. HMAC: headers `X-Becas-Timestamp` (epoch ms) and
`X-Becas-Signature = hex(HMAC-SHA256(secret, "${ts}.${METHOD}.${pathname+search}.${sha256hex(body)}"))`, ±5 min.

## Tracking

- One **Lead** per application, fired in the browser after `/api/becas/start`
  returns 2xx (`lib/conversions.ts` `fireLeadConversion`, form_label
  `becas_application`, detect_signal `native`). Persisted as `leadFired` in the
  draft before firing so a reload cannot double it. Skipped on non-production
  hosts. `NEXT_PUBLIC_META_BROWSER_LEAD` stays the kill switch.
- Full submit → GA4 `becas_application_submit` + Meta `CompleteRegistration`.
- Other GA4 events: `becas_view`, `becas_calc_start/result/referrals/apply`,
  `becas_form_start`, `becas_step_view/complete`, `becas_category_select`,
  `becas_upload`, `becas_error`, `becas_faq_open`, `becas_draft_restored`,
  `becas_status_view`, `becas_verify_view`, plus `cta_click` ids prefixed
  `becas_`. Register the new custom dimensions in GA4 before launch.
- No `<form>` element on the page: GHL's `external-tracking.js` hooks every
  form and creates blank contacts. Inputs sit in `div role="group"`.

## Launch checklist

1. Worker on prod with migration 0012 applied, secrets set, catalog row "BE BECA NWL 30%" and cupos configured, program enabled.
2. Vercel Production: `BECAS_API_URL`, `BECAS_API_SECRET`, `BECAS_PREVIEW_TOKEN`. Deploy. Open `/becas?preview=<token>` and run one application end to end; confirm it in the command center.
3. GA4 custom dimensions registered; `NEXT_PUBLIC_META_BROWSER_LEAD=true` confirmed in Production.
4. Aviso de privacidad: the program's simplified notice lives at `/becas/aviso-de-privacidad` (version in `lib/becas/consent.ts`, must equal the worker's `consentVersion`). Have the school's legal reviewer sign it off before launch; the consent checkbox links to it.
5. Set `NEXT_PUBLIC_BECAS_PUBLIC=true`, redeploy. In the same commit delete `public/be_nwl.html`, `public/golden_ticket.html`, `public/golden_ticket_cap.html`, add the "Scholarships" section to `public/llms.txt` (static file, cannot be gated), and bump `SITE_LAST_UPDATED`. The FAQ answer in `lib/informacion-data.ts` and the Knotion article note switch on with the flag by themselves.
6. One real application on production (then delete it from the worker side). Events Manager: one `Lead`, one `CompleteRegistration`, deduped.
7. Log the launch date in `docs/hero-headline-test-baseline-plan.md`. Top-nav link and paid campaigns wait for the baseline window to close.
8. After a week: flip the old-URL redirects to `permanent: true`, hard-code `BECAS_PUBLIC = true`, delete `app/becas/demo`.

## llms.txt section to add at launch

Paste this into `public/llms.txt` above "Educational Methodology" in the launch commit (step 5). It was pulled out before the code reached production because the file is static and cannot be gated.

```
## Scholarships (Programa de Becas)
- 30% off monthly tuition for new families at Milenio, Corregidora, San Miguel
  de Allende and Juriquilla, in four categories: Sports, Academic (average
  8.5+ on the latest SEP report card, from 2nd grade of Primary), Arts, and
  NWL Spirit (a short letter of motivation; open to all grades)
- Applies to tuition paid between the 1st and 10th of the month; not on
  enrollment or the one-time fee; renews each school year; not transferable
  between campuses; grows 10% per referred family that enrolls, up to 100%
- Online application with an answer the next business day and a 14-day
  enrollment window: https://www.nwl.com.mx/becas
```
