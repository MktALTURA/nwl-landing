'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Eyebrow from '@/components/ui/Eyebrow';

export default function CareersHero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/og/careers.jpg')" }}
      />
      {/* Navy scrim for text readability */}
      <div className="absolute inset-0 bg-navy-900/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/55 to-transparent" />

      {/* Subtle top strip for nav readability */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy-900/40 to-transparent" />

      {/* Kangaroo watermark */}
      <div className="absolute bottom-10 right-10 opacity-[0.05] pointer-events-none">
        <img
          src="/images/brand/nwl-as-kangaroo-white.png"
          alt=""
          className="w-64 h-64 object-contain"
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          {/* Back link */}
          <a
            href="/"
            className="inline-flex items-center text-sm text-paper/70 hover:text-paper transition-colors mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </a>

          <div className="mb-5">
            <Eyebrow>NWL Australian School</Eyebrow>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {t.careers.heroTitle}{' '}
            <span className="italic text-gold">{t.careers.heroTitleAccent}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-paper/80 mt-6 max-w-lg leading-relaxed"
          >
            {t.careers.heroSubtitle}
          </motion.p>

          <motion.a
            href="#positions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="btn-primary inline-flex items-center mt-8"
          >
            {t.careers.heroCta}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
