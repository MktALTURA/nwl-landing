'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function CareersHero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/og/careers.jpg')" }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />

      {/* Subtle top strip for nav readability */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Kangaroo watermark */}
      <div className="absolute bottom-10 right-10 opacity-[0.04]">
        <img
          src="/images/brand/kangaroo-white-transparent.png"
          alt=""
          className="w-64 h-64 object-contain rotate-[15deg]"
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
            className="inline-flex items-center text-sm text-white/70 hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </a>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {t.careers.heroTitle}{' '}
            <span className="text-mustard">{t.careers.heroTitleAccent}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mt-6 max-w-lg leading-relaxed"
          >
            {t.careers.heroSubtitle}
          </motion.p>

          <motion.a
            href="#positions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center mt-8 px-8 py-4 bg-wine text-white rounded-full font-medium hover:bg-wine/90 transition-colors"
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
