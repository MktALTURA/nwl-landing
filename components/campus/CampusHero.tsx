'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { type CampusData, localized } from '@/lib/campus-data';

interface CampusHeroProps {
  campus: CampusData;
}

export default function CampusHero({ campus }: CampusHeroProps) {
  const { locale, t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {campus.heroImage ? (
          <Image
            src={campus.heroImage}
            alt={`Newland School Campus ${campus.name} – ${localized(campus.tagline, locale)}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={80}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-wine via-charcoal to-charcoal" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
        {/* Subtle top strip so navbar text is readable over bright hero images */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
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
            {t.campusDetail.backToHome}
          </a>

          {/* Campus name */}
          <h1 className="font-display text-6xl md:text-8xl font-bold text-white mb-4">
            {campus.name}
            <span className="sr-only">
              {locale === 'es' ? ` — Campus Newland School` : ` — Newland School Campus`}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
            {localized(campus.tagline, locale)}
          </p>

          {/* Levels badge */}
          <div className="inline-flex items-center bg-wine/80 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium mb-8">
            {localized(campus.levels, locale)}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#campus-admissions" className="btn-primary text-center">
              {t.campusDetail.ctaScheduleVisit}
            </a>
            <a
              href="https://wa.me/5214421227791"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !border-white !text-white hover:!bg-white hover:!text-wine text-center"
            >
              {t.campusDetail.ctaWhatsapp}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Kangaroo Watermark */}
      <div className="absolute right-[-5%] bottom-[-5%] w-[40vh] h-[40vh] opacity-[0.06] pointer-events-none">
        <img
          src="/images/brand/kangaroo-white-transparent.png"
          alt=""
          className="w-full h-full object-contain rotate-[15deg]"
        />
      </div>
    </section>
  );
}
