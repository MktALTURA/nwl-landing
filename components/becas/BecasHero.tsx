'use client';

import { motion, useReducedMotion } from 'framer-motion';
import SouthernCross from '@/components/ui/SouthernCross';
import { useBecas } from './BecasProvider';
import BecasCounter from './BecasCounter';

/**
 * Hero. No photo: the dawn gradient is the fastest possible LCP for an ad
 * landing page, and the h1 is visible in the server HTML (no opacity-0
 * motion wrapper on the text). Only the decorations animate.
 *
 * Not id="home": EngagementTracking keys `hero_exit` to that id on the
 * homepage and the hero baseline must stay clean.
 */
export default function BecasHero() {
  const { copy, catalog, scrollTo } = useBecas();
  const reduce = useReducedMotion();
  const pct = catalog ? `${catalog.programa.becaPct}%` : copy.hero.pct;

  return (
    <section id="becas-hero" className="relative overflow-hidden nwl-bg-dawn-deep text-paper pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Top strip so the transparent nav stays readable */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-900/60 to-transparent pointer-events-none" />

      {/* Southern Cross */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute top-28 right-[6%] z-[1] pointer-events-none hidden md:block"
      >
        <SouthernCross height={120} color="var(--nwl-gold)" opacity={0.35} />
      </motion.div>

      {/* Kangaroo watermark */}
      <div className="absolute left-[-8%] bottom-[-14%] w-[60vh] h-[60vh] opacity-[0.05] pointer-events-none select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/brand/nwl-as-kangaroo-white.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
              <span className="w-9 h-px bg-gold" />
              {copy.brand.eyebrow}
            </span>

            <h1 className="font-display font-bold text-[2.75rem] leading-[1.02] sm:text-6xl md:text-7xl mt-6">
              {copy.hero.title} <span className="italic text-gold">{copy.hero.titleAccent}</span>
            </h1>

            <div className="mt-8 flex items-end gap-4">
              <span className="font-display font-bold leading-none text-gold text-[5.5rem] sm:text-[7rem] md:text-[8.5rem] tracking-[-0.03em]">
                {pct}
              </span>
              <span className="mb-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-paper/70 max-w-[9rem] leading-relaxed">
                {copy.hero.pctLabel}
              </span>
            </div>

            <p className="mt-6 text-lg md:text-xl text-paper/80 max-w-xl leading-relaxed">{copy.hero.subtitle}</p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                data-cta="becas_hero_apply"
                onClick={() => scrollTo('solicitud')}
                className="btn-primary inline-flex items-center justify-center text-base"
              >
                {copy.hero.ctaApply}
              </button>
              <button
                type="button"
                data-cta="becas_hero_calc"
                onClick={() => scrollTo('calculadora')}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold border border-paper/35 text-paper hover:border-gold hover:text-gold transition-colors duration-300"
              >
                {copy.hero.ctaCalc}
              </button>
            </div>

            {catalog && catalog.cuposTotal === null && (
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">{copy.hero.noCounter}</p>
            )}
          </div>

          {/* Visible in the server HTML (no opacity-0 initial): the counter is
              part of the first impression and must not wait for hydration. */}
          <motion.div initial={reduce ? false : { y: 18 }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="lg:col-span-5">
            <BecasCounter />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
