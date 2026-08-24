# Baseline plan — hero headline test

**Status:** instrumentation shipped to the repo (`35688b8`, `643af0a`), **not yet deployed**.
**Owner:** jp@marketingaltura.com (GA4 access is under ALTURA > Newland — switch authuser in Chrome)
**Purpose:** measure the rates the headline test will be sized on. No copy changes until this window closes.

---

## Why a baseline at all

`cta_click`, `hero_exit` and `scroll_depth` did not exist before 2026-08-25. They have **zero
history**, so there is no baseline rate to compute a sample size from. Running the headline test
now would repeat the exact mistake of the hero photo test: launch, wait a month, then discover it
was never powered.

The baseline answers one question: **what fraction of homepage-landing sessions click a hero CTA?**
That number sets the minimum detectable effect and therefore the test duration.

---

## Gate 0 — before the clock starts

The clock does **not** start at deploy. It starts when all of these are true.

| # | Action | Why it blocks |
|---|---|---|
| 1 | Deploy to production | Events only exist in prod traffic |
| 2 | Register **event-scoped** custom dimensions in GA4: `cta_id`, `exp_id`, `exp_variant`, `percent_scrolled` | GA4 only retains dimension values **from registration onward**. Register late and the early days are unqueryable — the data is not backfilled |
| 3 | Confirm events arrive in GA4 Realtime: `cta_click`, `scroll_depth`, `hero_exit` | See Gate 1 |

Do not skip #2. This is the single most common way a baseline window is wasted.

---

## Gate 1 — validation checkpoints

Do not wait until day 10 to find out something is broken.

**At +24 h** — GA4 Realtime / DebugView:
- [ ] `cta_click` present, with `cta_id` populated (expect `hero_schedule_visit`, `hero_whatsapp`, `hero_brochure`, `sticky_*`, `fixed_*`)
- [ ] `hero_exit` present and firing on `/` only
- [ ] `scroll_depth` present with all three milestones (25 / 50 / 75)
- [ ] `experiment_impression` **absent** — correct, no experiment is armed

**At +72 h** — first real query:
- [ ] `hero_exit` volume is plausible vs. sessions (expect roughly the 27% ballpark from the old 90%-scroll figure; wildly off means the trigger is misfiring)
- [ ] `cta_click` on `hero_*` is non-trivial — if it is under ~2% of homepage sessions, the primary metric is too rare and the plan changes (see Contingency)

If any box fails, fix it and **restart the clock**. A partial window is not a baseline.

---

## Window

**10 days minimum, 14 preferred.**

- 10 days covers two full weekday/weekend cycles at ~122 homepage-landing sessions/day, giving
  ~1,200 sessions — enough to pin a ~8% rate to about ±1.5pp.
- 14 is better because site-wide CVR was still decaying through the last test (~7% wk30 → ~2% wk33,
  post-back-to-school). A longer window averages over more of that slope.

**Freeze during the window** — otherwise the baseline does not describe the period the test runs in:
- no hero copy, headline, subheadline or CTA label changes
- no changes to hero layout or CTA placement
- no changes to Meta/Google ad routing or landing-page destinations
- no new sections above the fold

Log anything that does change. An unlogged change is indistinguishable from a real shift.

---

## What to pull at the end

GA4 Exploration, free-form, **sessions where landing page = `/`**:

| Output | Definition | Feeds |
|---|---|---|
| **Hero CTA click rate** | sessions with ≥1 `cta_click` where `cta_id` starts `hero_` ÷ homepage-landing sessions | Primary metric baseline → sample size |
| Per-CTA split | same, broken by `cta_id` | Which CTA carries the intent; whether WhatsApp or visit dominates |
| **Hero exit rate** | sessions with `hero_exit` ÷ homepage-landing sessions | Secondary metric; also the real "how many get past the hero" number, replacing the useless 90%-scroll figure |
| Scroll profile | `scroll_depth` by `percent_scrolled` | Sanity check against Clarity's 43% average |
| Lead rate | `form_submit` ÷ homepage-landing sessions | Decision-gate baseline |
| Device split | all of the above by device | Mobile is 68% of traffic and converts at half of desktop |

Also pull **Clarity**, filtered to `/`: scroll heatmap and click map. That is the qualitative read on
where the hero loses people, and it is what tells you which headline angle to test.

---

## What the baseline decides

Plug the measured hero CTA click rate into the sizing below (95% / 80% power, two arms,
~61 homepage-landing sessions per arm per day):

| Measured baseline | Detects +30% in | Detects +50% in |
|---|---:|---:|
| 5% | ~57 days | ~21 days |
| 8% | ~37 days | ~14 days |
| 12% | ~24 days | ~9 days |

Then commit to a duration **before launch** and do not stop early. Stopping when it looks good is
how the last analysis produced a "significant" +198% on a page the test never touched.

### Contingency

If hero CTA clicks come in under ~2% of homepage sessions, the metric is too rare to help. Fall
back to `hero_exit` as primary (much higher baseline, ~27%), and treat CTA clicks as secondary.
`hero_exit` is only trustworthy because the rebuilt harness assigns without bias — at that
sensitivity the old `catch (e) { v = 'a' }` split would have read population mix as a win.

---

## Then, and only then

Arm the test by setting `ACTIVE_EXPERIMENT` in `lib/experiment.ts`:

```ts
export const ACTIVE_EXPERIMENT: ExperimentConfig | null = {
  id: 'hero_headline', variants: ['a', 'b'], scope: '/',
};
```

Branch the headline on `data-exp-variant` on `<html>`. Text-only, so the variants are
performance-equivalent by construction — the confound that broke the photo test cannot recur.

**Pre-register before launch:** primary metric, duration, and the decision rule
(ship B only if the primary wins at p<0.05 **and** `form_submit` is not directionally negative).

---

## Verified working (smoke-tested in a real browser, 2026-08-25)

- `cta_click` fires for all hero CTAs, including `hero_schedule_visit` — the `#admissions`
  same-page anchor that GA4 enhanced measurement structurally cannot see
- `scroll_depth` 25/50/75 and `hero_exit` fire on real wheel input through GSAP ScrollSmoother
- assignment is sticky across reloads (cookie + localStorage mirror), rides on events as
  event-scoped `exp_id`/`exp_variant`, and does not leak off-scope (`/kinder` carries no variant)
- `experiment_impression` fires reliably via the gtag-ready queue
