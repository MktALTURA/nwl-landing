'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import CampusSelector from '@/components/padres/CampusSelector';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const heroImages = [
  { src: '/images/campus/juriquilla/juriquilla-building.jpg', alt: 'Campus Juriquilla' },
  { src: '/images/campus/milenio/milenio-soccer-field-hero.jpg', alt: 'Campus Milenio' },
  { src: '/images/campus/san-miguel/san-miguel-hero.jpg', alt: 'Campus San Miguel' },
  { src: '/images/campus/corregidora/corregidora-campus-wide.jpg', alt: 'Campus Corregidora' },
  { src: '/images/campus/zibata/zibata-hero.jpg', alt: 'Campus Zibatá' },
];

export default function PadresPage() {
  const { t } = useLanguage();

  return (
    <main>
      {/* Hero with campus images */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background image collage */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid grid-cols-5 h-full">
            {heroImages.map((img, i) => (
              <div key={i} className="relative h-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="20vw"
                  priority={i < 3}
                />
              </div>
            ))}
          </div>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-charcoal/75" />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/60" />
        </div>

        <div className="container-custom relative z-10 text-center py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
              {t.padres.heroTitle}{' '}
              <span className="text-nwl-yellow">{t.padres.heroTitleAccent}</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              {t.padres.heroSubtitle}
            </p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 0C1440 0 1080 40 720 40C360 40 0 0 0 0L0 60Z" fill="#FFFEF7" />
          </svg>
        </div>
      </section>

      {/* Campus Selection */}
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal">
              {t.padres.selectCampus}
            </h2>
            <div className="wine-divider mx-auto mt-4" />
            <p className="mt-4 text-charcoal/60 max-w-lg mx-auto">
              {t.padres.selectCampusSubtitle}
            </p>
          </div>
          <CampusSelector />
        </div>
      </section>

      <Footer />
    </main>
  );
}
