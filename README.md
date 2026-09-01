# NWL Australian School — Website

Bilingual (ES/EN) marketing site and parent-facing web app for **NWL Australian School** (formerly Newland School), live at [www.nwl.com.mx](https://www.nwl.com.mx). Built with Next.js 15, GSAP, Tailwind CSS and Framer Motion, with a custom i18n layer, a Redis-backed admin panel and a full ad-attribution pipeline.

**Repo:** [MktALTURA/nwl-landing](https://github.com/MktALTURA/nwl-landing)

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 App Router (React 19) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| Animations | GSAP 3.12 (ScrollTrigger + ScrollSmoother) + Framer Motion 11 |
| Fonts | Gabarito (brand display + body) + Spline Sans Mono (eyebrows/labels) |
| Icons | React Icons |
| i18n | Custom ES/EN system (`lib/i18n/`) |
| Forms | GoHighLevel embedded iframes |
| Data store | Upstash Redis (`@upstash/redis`) |
| File uploads | Vercel Blob (`@vercel/blob`) |
| Validation | Zod |
| Auth | JWT (`jose`) + bcrypt, role-based admin |
| Analytics | GA4 + Google Ads (gtag), Meta Pixel + Conversions API, Microsoft Clarity |
| Hosting | Vercel |

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm start         # start production server
npm run lint
```

### Environment variables

| Variable | Used for |
|---|---|
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Upstash Redis — jobs, beneficios catalog, game leaderboard, WhatsApp attribution |
| `JWT_SECRET` | Admin session tokens |
| `ADMIN_PASSWORD_HASH` | bcrypt hash for the `admin` role |
| `BENEFICIOS_PASSWORD_HASH` | bcrypt hash for the `beneficios` role |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob uploads from the admin panel |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel (browser) |
| `NEXT_PUBLIC_META_BROWSER_LEAD` | Flag: fire browser-side `Lead` alongside CAPI |
| `META_CAPI_ACCESS_TOKEN` | Meta Conversions API (server) |
| `META_CAPI_TEST_EVENT_CODE` | Optional — Meta Events Manager test mode |
| `GHL_Private_API_Key` | GoHighLevel API — writes attribution onto contacts |
| `WA_RESOLVE_SECRET` | Shared secret for the `/api/wa-resolve` webhook |

## Project Structure

```
app/
  layout.tsx                # root layout: fonts, JSON-LD, tracking, A/B snippet
  globals.css
  robots.ts / sitemap.ts    # robots.txt + XML sitemap generation
  error.tsx / not-found.tsx
  (main)/                   # public site — shares nav, footer, smooth scroll, i18n
    layout.tsx
    page.tsx                # homepage
    modelo/                 # the NWL educational model (7 components, 21 capabilities)
    maternal/ kinder/ elementary/ middle-school/ high-school/
    beneficios/             # partner benefits catalog for the community
    noticias/               # news section
      nwl-australian-school/  # rebrand announcement
      newland-knotion/        # Knotion methodology update
  campus/[slug]/            # individual campus pages (5 campuses)
  informacion/              # SEO información hub + 56 landing pages
  brochures/[level]/        # dynamic brochure pages (en/es)
  padres/                   # parents portal (landing + password-gated campus pages)
  trabaja-con-nosotros/     # careers page
  coming-soon/
  admin/                    # JWT-protected panel
    login/ jobs/ beneficios/
  api/
    auth/                   # login / logout
    jobs/                   # job listings CRUD
    beneficios/             # partners, categories, ordering, seed
    admin/upload/           # Vercel Blob upload
    game-scores/            # Outback Run leaderboard
    meta-capi/              # Meta Conversions API relay
    wa-token/ wa-resolve/   # WhatsApp attribution bridge
components/
  Navigation, Hero, Benefits, Levels, CampusFinder, KangarooSpirit, BeSection,
  Philosophy, Testimonials, Partnerships, TrustNumbers, FinalCTA, Footer
  KangarooGame.tsx          # "Outback Run" easter-egg game
  FixedCTAButton, BrochureModal, BrochureLevelDropdown, LanguageToggle
  MetadataUpdater, SmoothScroll, JsonLd
  UTMCapture, MetaTracking, GHLTracking, EngagementTracking
  Bubble/Grid/Sparkle/ConstellationAnimation.tsx  # ambient background effects
  ui/                       # Button, Card, Crest, Eyebrow, Logo, SouthernCross, Stat, Tag
  campus/ informacion/ careers/ padres/ beneficios/ admin/
lib/
  seo.ts                    # SITE_URL, site names, per-page metadata
  campus-data.ts            # campus content (facilities, extracurriculars, directors)
  informacion-data.ts       # 56 información pages
  model-data.ts             # educational model components + capabilities
  padres-data.ts            # parents portal documents per campus + cycle
  beneficios-data.ts        # seed catalog (Redis is the source of truth at runtime)
  brochures.ts / BrochureContext.tsx
  experiment.ts             # A/B assignment config (null when no test is running)
  utm.ts / meta-pixel.ts / meta-capi.ts / wa-attribution.ts / ghl.ts  # attribution
  auth.ts / auth-edge.ts    # node + edge halves of admin auth
  rate-limit.ts
  db/                       # Redis: jobs, beneficios, leaderboard, wa-attribution
  i18n/                     # ES/EN translations + LanguageContext
  hooks/ validations/ beneficios/
middleware.ts               # brochure QR UTM tagging + admin route protection
public/
  images/ brochures/ padres/  # static assets and PDFs
  llms.txt                    # AI-crawler summary of the school
  be_nwl.html                 # static BE campaign page
  golden_ticket.html / golden_ticket_cap.html
  survey-post-enrollment-experience.html
docs/                       # attribution, tracking and experiment handoff notes
archive/                    # retired content (e.g. 2025–2026 portal documents)
```

## Routes

| Path | Description |
|---|---|
| `/` | Homepage |
| `/modelo` | The NWL educational model |
| `/maternal`, `/kinder`, `/elementary`, `/middle-school`, `/high-school` | Level pages |
| `/campus/:slug` | Campus pages (`juriquilla`, `milenio`, `san-miguel`, `corregidora`, `zibata`) |
| `/beneficios` | Community benefits catalog + partner application form |
| `/noticias` | News index |
| `/noticias/nwl-australian-school` | Rebrand announcement |
| `/noticias/newland-knotion` | Knotion methodology update |
| `/informacion` | SEO hub linking all información pages |
| `/informacion/:slug` | 56 SEO landing pages (campus / level / neighborhood / general) |
| `/brochures/:level` | Brochure pages — `maternal-kinder`, `elementary`, `middle-school`, `high-school` (`?lang=en\|es`) |
| `/padres` | Parents portal — campus selector |
| `/padres/:campus` | Password-gated portal for that campus |
| `/trabaja-con-nosotros` | Careers page + job listings |
| `/admin/login` | Admin login |
| `/admin/jobs` | Job postings management (`admin` role) |
| `/admin/beneficios` | Partner catalog management (`admin` + `beneficios` roles) |
| `/coming-soon` | Pre-launch placeholder |
| `/be_nwl`, `/golden_ticket`, `/golden_ticket_cap` | Campaign pages (static HTML rewrites) |

Legacy URLs from the old nwl.com.mx site (level pages, campus pages, `/docs/*` SEO pages) 301-redirect to their new equivalents in `next.config.mjs`.

## Parents Portal (`/padres`)

Per-campus document hub for enrolled families, covering four sections: **calendario**, **cafetería**, **comunicados** and **útiles escolares**. Each campus page sits behind a shared campus password (`campusPasswords` in `lib/padres-data.ts`) — a convenience gate, not a security boundary, so nothing sensitive belongs here. Documents are PDFs under `public/padres/:campus/`, plus a school-wide `.ics` calendar. `CURRENT_CYCLE` marks the active school year; year-specific documents render as pending placeholders until the new files land, and retired cycles move to `archive/`.

## Beneficios (`/beneficios`)

Catalog of partner discounts for the NWL community. The page is a server component (partner copy ships in the initial HTML for SEO) reading the catalog from Redis, so `/admin/beneficios` can add, edit, reorder and categorize partners without a redeploy. Writes call `revalidateBeneficios()`; the 1-hour `revalidate` is the self-heal floor if that ever fails. `lib/beneficios-data.ts` is the seed used to populate an empty store via `/api/beneficios/seed`. The page also carries a form for businesses applying to become partners.

## Careers & Admin

`/trabaja-con-nosotros` lists open positions stored in Redis with an application modal and a general CV drop. `/admin` is JWT-protected with two roles: `admin` (full access, lands on `/admin/jobs`) and `beneficios` (scoped to `/admin/beneficios`). `middleware.ts` guards the admin *pages*; every API route additionally checks its own session — that check is the real security boundary. Image uploads go to Vercel Blob.

## Outback Run (easter-egg game)

An 8-bit, Chrome-dino-style runner hidden in the KangarooSpirit section of the homepage: the gold kangaroo hops spinifex, rocks and boomerangs across the outback. Space / ↑ / tap to jump, ESC to exit. Speed and obstacle density ramp after ~650 points, and the sky flips between night and day every 1,000. Scores post to a school-wide top-20 leaderboard (`/api/game-scores`, Redis sorted set keyed on personal best).

## Attribution & Analytics

- **Capture at the root layout** — `UTMCapture` persists inbound `utm_*` / `fbclid` / `gclid` on *every* route, since `/informacion`, `/campus`, `/padres` and `/brochures` are all ad and search landing pages.
- **GA4 + Google Ads** — shared `gtag.js` (`G-0D697PBCB2`, `AW-17936345870`).
- **Meta** — browser Pixel plus the server-side Conversions API at `/api/meta-capi`. The Pixel is gated to the production hostnames so preview deploys and localhost stay out of the dataset.
- **Microsoft Clarity** — heatmaps and session recordings.
- **GoHighLevel** — `GHLTracking` instruments the embedded form iframes (and skips the admin app, which would otherwise turn staff logins into blank CRM contacts); attribution is written onto the contact through `lib/ghl.ts`.
- **WhatsApp bridge** — a CTA click parks its attribution in Redis under an `NW-XXXXXX` code stamped into the prefilled message (`/api/wa-token`); when the message arrives, a GHL workflow calls `/api/wa-resolve` to recover the real source instead of "sin identificar", and optionally replays the conversion to Meta. Records expire after 7 days, Meta's hard limit on `event_time`.
- **Brochure QR tagging** — `middleware.ts` stamps default UTMs on `/brochures/:level` hits that arrive without a `utm_source` (printed QR codes), leaving existing UTMs untouched.
- **A/B testing** — `lib/experiment.ts` holds the active experiment config, rendered as an inline, render-blocking snippet so the losing variant never flashes. `ACTIVE_EXPERIMENT` is `null` when no test is in the field. See `docs/` for the defects the current implementation was built to avoid.

## SEO

- **56 información landing pages** — migrated from the old NWL site to preserve rankings, spanning campus, level, neighborhood and general intent in Spanish and English
- **301 redirects** — old URL paths redirect to new pages (`next.config.mjs`)
- **JSON-LD structured data** — Organization and WebSite site-wide, FAQPage on every información page
- **Hreflang** — `es-MX` / `en-MX` alternates; `hreflangPair` links translated información pages
- **XML sitemap** at `/sitemap.xml` and **robots.txt** at `/robots.txt`, both generated
- **llms.txt** — `public/llms.txt` summarizes the school for AI crawlers
- **Per-page metadata** — title, description and Open Graph tags centralized in `lib/seo.ts`

## Static Campaign Pages

BE campaign pages (`be_nwl`, `golden_ticket`, `golden_ticket_cap`) live as static HTML in `/public` and are served via Next.js rewrites in `next.config.mjs`. They are standalone and don't use the React component tree.

## Brand (tailwind.config.ts)

**Core:** `navy` #0B224E (Southern Cross) / `gold` #CB8606 (Outback Gold) / `paper` #F4EEE2

**Level palette:** `galah` #E89BB5 (Maternal + Kinder) / `bondi` #3AA79B (Elementary) / `coral-sea` #004756 (Middle School) / `jacaranda` #4A3A82 (High School)

**Accents:** `eucalyptus` #93A860 / `wattle` #EDB500 · **Neutrals:** navy-tinted `n.50`–`n.900`

Pre-rebrand token names (`ivory`, `charcoal`, `wine`, `coral`, `sunshine`, …) are kept as aliases repointed to the new system, so any page not yet restyled reads navy + gold instead of breaking.

## Security Headers

Configured in `next.config.mjs`:
- HSTS (2-year max-age, preload-ready)
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (camera, mic, geolocation, payment disabled)
- CSP in report-only mode (switch to enforcing once verified)

Note: `images.unoptimized` is on — the Vercel image optimizer quota is exhausted on the current plan, so raw files are served with a 1-year immutable `Cache-Control` on `/images/*`.

## Deployment

Deployed on **Vercel** — pushes to `main` trigger automatic production deploys. The `test` branch is used for staging previews.

## Campus Locations

| Campus | Levels |
|---|---|
| **Juriquilla** (flagship) | Maternal — Secundaria |
| **Milenio** | Maternal — Secundaria |
| **San Miguel de Allende** | Maternal — Secundaria |
| **Corregidora** | Maternal — Preparatoria |
| **Zibatá** | Maternal — Preparatoria |
