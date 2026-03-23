# Newland School Landing Page

Bilingual landing page for Newland School (nwl.mx) built with Next.js 15, GSAP, Tailwind CSS, and Framer Motion. Supports Spanish and English with a custom i18n system.

**Repo:** [JP-GutierrezC/nwl-landing](https://github.com/JP-GutierrezC/nwl-landing)

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (React 19) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| Animations | GSAP 3.12 + Framer Motion 11 |
| Fonts | Inter (body) + Playfair Display (headings) |
| Icons | React Icons |
| i18n | Custom ES/EN system (`lib/i18n/`) |
| Forms | GoHighLevel embedded iframes |
| Analytics | Vercel Analytics + Speed Insights |
| Auth | JWT-based admin login |
| Hosting | Vercel |

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm start         # start production server
```

## Project Structure

```
app/
  layout.tsx                # root layout, fonts, analytics
  globals.css
  robots.ts                 # robots.txt generation
  sitemap.ts                # XML sitemap generation
  (main)/page.tsx           # main landing page
  brochures/[level]/        # dynamic brochure pages (en/es)
  campus/[slug]/            # individual campus pages (5 campuses)
  informacion/              # SEO información hub + 44 landing pages
    page.tsx                # hub page linking all info pages
    [slug]/                 # dynamic per-campus-per-level pages
  admin/                    # admin panel (JWT-protected)
    login/                  # admin login page
    jobs/                   # job postings management
  trabaja-con-nosotros/     # careers page
  coming-soon/page.tsx      # placeholder for nwl.mx pre-launch
components/
  Navigation.tsx            # site nav (light/dark variants)
  Hero.tsx                  # hero banner with GSAP scroll animations
  Benefits.tsx              # value propositions
  Philosophy.tsx            # the Newland Model
  KangarooSpirit.tsx        # brand mascot section
  Levels.tsx                # educational levels (Maternal–Prepa)
  MaternalSection.tsx       # maternal program highlight
  CampusFinder.tsx          # 5 campus locations
  Partnerships.tsx          # institutional partnerships
  TrustNumbers.tsx          # key stats/numbers
  BeSection.tsx             # BE campaign section
  Testimonials.tsx          # parent reviews
  FinalCTA.tsx              # admissions CTA
  Footer.tsx                # site footer
  FixedCTAButton.tsx        # sticky CTA button
  BrochureModal.tsx         # brochure viewer modal
  BrochureLevelDropdown.tsx # level selector for brochures
  LanguageToggle.tsx        # en/es toggle
  MetadataUpdater.tsx       # dynamic meta tags
  SmoothScroll.tsx          # scroll behavior wrapper
  JsonLd.tsx                # JSON-LD structured data component
  UTMCapture.tsx            # UTM parameter tracking
  campus/                   # campus-specific components
  informacion/              # información page components
  careers/                  # careers page components
lib/
  brochures.ts              # brochure data + types
  BrochureContext.tsx        # brochure state context
  campus-data.ts            # campus information data
  informacion-data.ts       # 44 información pages data
  seo.ts                    # SEO utilities
  utm.ts                    # UTM tracking utilities
  auth.ts                   # authentication helpers
  rate-limit.ts             # rate limiting
  i18n/                     # bilingual translations (ES/EN)
  db/                       # database utilities
  hooks/                    # custom React hooks
  validations/              # form validation schemas
middleware.ts               # domain lockdown + admin auth
public/
  be_nwl.html               # static BE campaign page
  golden_ticket.html         # static golden ticket page
  golden_ticket_cap.html     # static golden ticket cap page
```

## Routes

| Path | Description |
|---|---|
| `/` | Full landing page (homepage) |
| `/campus/:slug` | Individual campus pages (juriquilla, zibata, san-miguel, corregidora, milenio) |
| `/informacion` | SEO hub page linking all información pages |
| `/informacion/:slug` | 44 SEO landing pages (per campus + level) |
| `/brochures/:level` | Dynamic brochure pages (`?lang=en\|es`) |
| `/trabaja-con-nosotros` | Careers page |
| `/admin` | Admin panel (JWT-protected) |
| `/admin/login` | Admin login |
| `/coming-soon` | Pre-launch placeholder |
| `/be_nwl` | BE campaign (static HTML rewrite) |
| `/golden_ticket` | Golden ticket campaign (static HTML rewrite) |
| `/golden_ticket_cap` | Golden ticket cap page (static HTML rewrite) |

### Domain Lockdown (middleware.ts)

The middleware restricts `nwl.mx` / `www.nwl.mx` to only serve brochure pages, información pages, and campaign pages. Everything else rewrites to `/coming-soon`. The admin panel is protected by JWT authentication. Remove the domain lockdown when the full site is ready to launch on `nwl.mx`.

## SEO

- **44 información landing pages** — migrated from the old NWL site to preserve search rankings, with updated content
- **301 redirects** — old URL paths redirect to new pages (`next.config.mjs`)
- **JSON-LD structured data** — FAQPage schema on every información page
- **Hreflang tags** — `es-MX` / `en-MX` alternates on all pages
- **XML sitemap** — auto-generated at `/sitemap.xml`
- **robots.txt** — auto-generated at `/robots.txt`
- **Per-page metadata** — title, description, and Open Graph tags

## Static Campaign Pages

BE campaign pages (`be_nwl`, `golden_ticket`, `golden_ticket_cap`) live as static HTML in `/public` and are served via Next.js rewrites in `next.config.mjs`. They are standalone and don't use the React component tree.

## Brand Colors (tailwind.config.ts)

**Institutional:** `ivory` #FFFEF7 / `charcoal` #3D3D3D / `wine` #8B2332 / `nwl-yellow` #FCB22F

**Accent:** `mustard` #E6A944 / `eucalyptus` #A8C5A5 / `skyblue` #B8D4E8 / `terracotta` #D4876F

**Vibrant:** `coral` #FF6B6B / `sunshine` #FFD93D / `ocean` #4ECDC4 / `tangerine` #FF8C42 / `bubblegum` #FF99C8 / `lime` #A8E6CF / `blueberry` #6C5CE7

**Neutrals:** `sand` #F5F1E8 / `warmgray` #E8E4DF

## Security Headers

Configured in `next.config.mjs`:
- HSTS (2-year max-age, preload-ready)
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (camera, mic, geolocation, payment disabled)
- CSP in report-only mode (switch to enforcing once verified)

## Deployment

Deployed on **Vercel** — pushes to `main` trigger automatic deploys. The `test` branch is used for staging previews. Vercel Analytics and Speed Insights are integrated in `app/layout.tsx`.

## Campus Locations

1. **Juriquilla** — Maternal to Secundaria
2. **Zibata** — Maternal to Preparatoria
3. **San Miguel de Allende** — Kinder to Secundaria
4. **Corregidora** — Maternal to Primaria
5. **Milenio** — Kinder to Primaria
