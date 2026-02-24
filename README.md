# Newland School Landing Page

Animated landing page for Newland School (nwl.mx) built with Next.js 15, GSAP, Tailwind CSS, and Framer Motion.

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
| Analytics | Vercel Analytics + Speed Insights |
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
  layout.tsx              # root layout, fonts, analytics
  globals.css
  (main)/page.tsx         # main landing page
  brochures/[level]/      # dynamic brochure pages (en/es)
  coming-soon/page.tsx    # placeholder for nwl.mx pre-launch
components/
  Navigation.tsx          # site nav
  Hero.tsx                # hero banner
  Benefits.tsx            # value propositions
  Philosophy.tsx          # the Newland Model
  KangarooSpirit.tsx      # brand mascot section
  Levels.tsx              # educational levels (Maternal–Prepa)
  CampusFinder.tsx        # 5 campus locations
  BeSection.tsx           # BE campaign section
  Testimonials.tsx        # parent reviews
  FinalCTA.tsx            # admissions CTA
  Footer.tsx              # site footer
  FixedCTAButton.tsx      # sticky CTA button
  BrochureModal.tsx       # brochure viewer modal
  BrochureLevelDropdown.tsx
  LanguageToggle.tsx      # en/es toggle
  MetadataUpdater.tsx     # dynamic meta tags
  SmoothScroll.tsx        # scroll behavior wrapper
lib/
  brochures.ts            # brochure data + types
  BrochureContext.tsx      # brochure state context
middleware.ts             # domain-based routing (see below)
public/
  be_nwl.html             # static BE campaign page
  golden_ticket.html      # static golden ticket page
  golden_ticket_cap.html  # static golden ticket cap page
```

## Routes

| Path | Domain | Description |
|---|---|---|
| `/` | `*.vercel.app` | Full landing page |
| `/` | `nwl.mx` | Rewrites to `/coming-soon` (middleware lockdown) |
| `/brochures/:level` | all | Dynamic brochure pages (`?lang=en\|es`) |
| `/coming-soon` | all | Pre-launch placeholder |
| `/be_nwl` | `nwl.mx` | BE campaign (static HTML rewrite) |
| `/golden_ticket` | `nwl.mx` | Golden ticket campaign (static HTML rewrite) |
| `/golden_ticket_cap` | `nwl.mx` | Golden ticket cap page (static HTML rewrite) |

### Domain Lockdown (middleware.ts)

The middleware restricts `nwl.mx` / `www.nwl.mx` to only serve brochure pages and campaign pages. Everything else rewrites to `/coming-soon`. Remove the middleware when the full site is ready to launch on `nwl.mx`.

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

Deployed on **Vercel** — pushes to `main` trigger automatic deploys. Vercel Analytics and Speed Insights are integrated in `app/layout.tsx`.

## Campus Locations

1. **Juriquilla** — Maternal to Preparatoria
2. **Zibata** — Maternal to Preparatoria
3. **San Miguel de Allende** — Kinder to Secundaria
4. **Corregidora** — Maternal to Primaria
5. **Milenio** — Kinder to Primaria
