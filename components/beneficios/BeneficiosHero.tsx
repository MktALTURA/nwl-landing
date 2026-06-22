'use client';

import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { benefitPartners, benefitCategories } from '@/lib/beneficios-data';

export default function BeneficiosHero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-wine text-white pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/benefits/hero-beneficios.jpg')" }}
      />
      {/* Dark fade (like the Work with Us hero) — image stays clearly visible */}
      <div className="absolute inset-0 bg-charcoal/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/30" />
      {/* Subtle wine tint to keep it on-brand */}
      <div className="absolute inset-0 bg-wine/20 mix-blend-multiply" />
      {/* Top strip so the transparent nav stays readable */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      {/* Soft color blooms */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mustard rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-eucalyptus rounded-full blur-3xl" />
      </div>

      {/* Kangaroo watermark */}
      <div className="absolute right-[-6%] bottom-[-12%] w-[55vh] h-[55vh] opacity-[0.06] pointer-events-none">
        <img
          src="/images/brand/kangaroo-white-transparent.png"
          alt=""
          className="w-full h-full object-contain rotate-[15deg]"
        />
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block text-mustard text-sm font-semibold tracking-[0.25em] uppercase mb-5"
        >
          {t.beneficios.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
        >
          {t.beneficios.title}{' '}
          <span className="text-mustard">{t.beneficios.titleAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed"
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
            <div className="font-display text-4xl md:text-5xl font-bold text-mustard">
              {benefitPartners.length}
            </div>
            <div className="text-sm uppercase tracking-wider text-white/70 mt-1">
              {t.beneficios.statPartners}
            </div>
          </div>
          <div className="w-px h-12 bg-white/25" />
          <div className="text-center">
            <div className="font-display text-4xl md:text-5xl font-bold text-mustard">
              {benefitCategories.length}
            </div>
            <div className="text-sm uppercase tracking-wider text-white/70 mt-1">
              {t.beneficios.statCategories}
            </div>
          </div>
        </motion.div>

        <motion.a
          href="#catalogo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-white/80 hover:text-mustard transition-colors group"
          aria-label="Ver catálogo"
        >
          <span className="text-sm font-medium uppercase tracking-wider">
            {t.beneficios.catalogTitle} {t.beneficios.catalogTitleAccent}
          </span>
          <FiArrowDown className="animate-bounce group-hover:translate-y-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
}
