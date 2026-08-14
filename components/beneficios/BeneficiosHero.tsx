'use client';

import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import SouthernCross from '@/components/ui/SouthernCross';

interface BeneficiosHeroProps {
  partnerCount: number;
  categoryCount: number;
}

export default function BeneficiosHero({ partnerCount, categoryCount }: BeneficiosHeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden nwl-bg-dawn-deep text-paper pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/benefits/hero-beneficios.jpg')" }}
      />
      {/* Navy scrim: image stays clearly visible */}
      <div className="absolute inset-0 bg-navy-900/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/45 to-navy-900/30" />
      {/* Top strip so the transparent nav stays readable */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-900/60 to-transparent pointer-events-none" />

      {/* Southern Cross motif */}
      <div className="absolute top-28 right-[7%] z-[1] pointer-events-none hidden md:block">
        <SouthernCross height={110} color="var(--nwl-gold)" opacity={0.35} />
      </div>

      {/* Kangaroo watermark */}
      <div className="absolute right-[-6%] bottom-[-12%] w-[55vh] h-[55vh] opacity-[0.06] pointer-events-none">
        <img
          src="/images/brand/nwl-as-kangaroo-white.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-6"
        >
          <span className="w-9 h-px bg-gold" />
          {t.beneficios.eyebrow}
          <span className="w-9 h-px bg-gold" />
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
        >
          {t.beneficios.title}{' '}
          <span className="italic text-gold">{t.beneficios.titleAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-lg md:text-xl text-paper/80 max-w-2xl mx-auto leading-relaxed"
        >
          {t.beneficios.subtitle}
        </motion.p>

        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-8 md:gap-12 mt-10"
        >
          <div className="text-center">
            <div className="font-display text-4xl md:text-5xl font-bold text-gold">
              {partnerCount}
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-paper/70 mt-1">
              {t.beneficios.statPartners}
            </div>
          </div>
          <div className="w-px h-12 bg-paper/25" />
          <div className="text-center">
            <div className="font-display text-4xl md:text-5xl font-bold text-gold">
              {categoryCount}
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-paper/70 mt-1">
              {t.beneficios.statCategories}
            </div>
          </div>
        </motion.div>

        <motion.a
          href="#catalogo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="btn-primary mt-12 inline-flex items-center gap-2 group"
          aria-label="Ver catálogo"
        >
          <span>
            {t.beneficios.catalogTitle} {t.beneficios.catalogTitleAccent}
          </span>
          <FiArrowDown className="group-hover:translate-y-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
}
