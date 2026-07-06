'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiGlobe,
  FiStar,
  FiHeart,
  FiShield,
  FiUsers,
  FiSun,
  FiBook,
  FiHome,
  FiMusic,
  FiMoon,
  FiArrowLeft,
  FiClock,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useBrochure } from '@/lib/BrochureContext';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import BubbleAnimation from '@/components/BubbleAnimation';
import Crest from '@/components/ui/Crest';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Feature card data ── */
const featureIcons = [FiGlobe, FiStar, FiHeart, FiUsers, FiHeart, FiShield];
const featureColors = [
  { bg: 'bg-galah/10', text: 'text-navy', iconBg: 'bg-galah/20', border: 'border-galah/30' },
  { bg: 'bg-gold/10', text: 'text-gold-600', iconBg: 'bg-gold/15', border: 'border-gold/25' },
  { bg: 'bg-navy/10', text: 'text-navy', iconBg: 'bg-navy/10', border: 'border-navy/15' },
];

/* ── Schedule icon map ── */
const scheduleIcons: Record<string, React.ElementType> = {
  sun: FiSun,
  globe: FiGlobe,
  star: FiStar,
  heart: FiHeart,
  book: FiBook,
  music: FiMusic,
  moon: FiMoon,
  home: FiHome,
};

/* Solid brand tints (level color blended at ~20% over white) so the
   timeline line is fully hidden behind each icon box. */
const scheduleColors = [
  { bg: '#E9EEDF', color: '#0B224E' }, // eucalyptus tint
  { bg: '#F5E7CD', color: '#0B224E' }, // gold tint
  { bg: '#CED3DC', color: '#0B224E' }, // navy tint
];

const pillarColors = [
  { accent: 'text-navy', bg: 'bg-galah/10', border: 'border-galah/25' },
  { accent: 'text-gold-600', bg: 'bg-gold/10', border: 'border-gold/25' },
  { accent: 'text-navy', bg: 'bg-navy/10', border: 'border-navy/15' },
];

const maternalGalleryImages = [
  { src: '/images/levels/maternal/maternal-art-class.jpg', caption: { en: 'Art Class', es: 'Clase de Arte' } },
  { src: '/images/levels/maternal/maternal-painting.jpg', caption: { en: 'Painting', es: 'Pintura' } },
  { src: '/images/levels/maternal/maternal-playtime.jpg', caption: { en: 'Playtime', es: 'Tiempo de Juego' } },
  { src: '/images/levels/maternal/maternal-ball-pit.jpg', caption: { en: 'Sensory Play', es: 'Juego Sensorial' } },
  { src: '/images/levels/maternal/maternal-roleplay.jpg', caption: { en: 'Role Play', es: 'Juego de Roles' } },
  { src: '/images/levels/maternal/corregidora-kinder-classroom.jpg', caption: { en: 'Corregidora Classroom', es: 'Salón Corregidora' } },
  { src: '/images/levels/maternal/zibata-classrooms.jpg', caption: { en: 'Zibatá Classroom', es: 'Salón Zibatá' } },
];

export default function MaternalPage() {
  const mainRef = useRef<HTMLElement>(null);
  const [activeGallery, setActiveGallery] = useState(0);
  const { locale, t } = useLanguage();
  const { openBrochure } = useBrochure();
  const m = t.maternal;
  const mp = t.maternalPage;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.animate-section').forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.utils.toArray('.wine-divider').forEach((divider: any) => {
        gsap.from(divider, {
          width: 0,
          duration: 0.8,
          scrollTrigger: { trigger: divider, start: 'top 85%' },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main ref={mainRef}>
        {/* Glass bubble animation — scroll-triggered, plays once */}
        <BubbleAnimation />

        {/* ════════════════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex items-end overflow-hidden">
          {/* Background image */}
          <Image
            src="/images/levels/maternal.jpg"
            alt="NWL Maternal — children learning through play"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient overlay — stronger at bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-navy-900/10" />

          <div className="container-custom relative z-10 pb-20 pt-40">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-10 transition-colors group"
              >
                <FiArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>{mp.backToHome}</span>
              </Link>
            </motion.div>

            {/* Content — bottom-aligned, clean hierarchy */}
            <div className="flex items-end justify-between gap-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="max-w-3xl"
              >
                <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold-400 mb-5">
                  <span className="w-9 h-px bg-gold-400" />
                  {m.ageBadge}
                </span>

                <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-5 leading-[1.1]">
                  {mp.heroHeadline}
                </h1>

                <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl">
                  {mp.heroSubheadline}
                </p>

                <div className="flex items-center gap-4">
                  <a href="#admissions" className="btn-primary inline-flex items-center justify-center">
                    {m.cta}
                  </a>
                  <button onClick={() => openBrochure('maternal-kinder')} className="inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold bg-paper/5 text-paper border border-paper/25 backdrop-blur-sm hover:border-gold/60 transition-colors duration-300">
                    {m.ctaSecondary}
                  </button>
                </div>
              </motion.div>

              {/* Level crest */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden md:flex flex-shrink-0"
              >
                <Crest level="kinder" size={104} showBanner={false} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 2 — QUICK OVERVIEW + STATS
        ════════════════════════════════════════════════ */}
        <section className="section-padding bg-paper animate-section">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left — Description */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-galah animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="h-2 w-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="h-2 w-2 rounded-full bg-navy animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-medium tracking-[-0.02em] text-navy mb-6">
                  <span className="italic text-gold">{m.tagline}</span>
                </h2>
                <p className="text-lg text-navy/70 leading-relaxed mb-8">
                  {m.description}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {/* Bilingual stat */}
                  <div className="relative group bg-galah/10 rounded-2xl p-5 border border-galah/25 hover:shadow-navy-sm hover:border-galah/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-galah/20 flex items-center justify-center mb-3">
                      <FiGlobe size={20} className="text-navy" />
                    </div>
                    <span className="block text-2xl md:text-3xl font-bold text-navy tracking-tight">100%</span>
                    <span className="text-xs md:text-sm text-n-500 font-medium">{m.statBilingual}</span>
                  </div>
                  {/* Campuses stat */}
                  <div className="relative group bg-gold/10 rounded-2xl p-5 border border-gold/25 hover:shadow-navy-sm hover:border-gold/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center mb-3">
                      <FiMapPin size={20} className="text-gold-600" />
                    </div>
                    <span className="block text-2xl md:text-3xl font-bold text-navy tracking-tight">5</span>
                    <span className="text-xs md:text-sm text-n-500 font-medium">{m.statCampuses}</span>
                  </div>
                  {/* Schedule stat */}
                  <div className="relative group bg-navy/10 rounded-2xl p-5 border border-navy/15 hover:shadow-navy-sm hover:border-navy/25 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center mb-3">
                      <FiClock size={20} className="text-navy" />
                    </div>
                    <span className="block text-2xl md:text-3xl font-bold text-navy tracking-tight">{m.schedule}</span>
                    <span className="text-xs md:text-sm text-n-500 font-medium">{m.statSchedule}</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold-600"
                >
                  <span className="w-9 h-px bg-gold" />
                  <FiStar size={12} />
                  {m.uniqueBadge}
                </motion.div>
              </motion.div>

              {/* Right — Testimonial */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white border border-n-200 shadow-navy-sm rounded-3xl p-8 md:p-10 relative overflow-hidden"
              >
                <div className="absolute top-2 left-6 text-galah/30 text-8xl font-display leading-none select-none">
                  &ldquo;
                </div>
                <blockquote className="relative z-10 text-xl md:text-2xl text-navy font-medium italic leading-relaxed mb-6">
                  &ldquo;{m.testimonial}&rdquo;
                </blockquote>
                <p className="relative z-10 text-n-500 font-medium">&mdash; {m.testimonialAuthor}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 3 — OUR APPROACH (Philosophy Pillars)
        ════════════════════════════════════════════════ */}
        <section className="section-padding bg-white animate-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-[-0.02em] text-navy mb-4">
                {mp.philosophyTitle}{' '}
                <span className="italic text-gold">
                  {mp.philosophyTitleAccent}
                </span>
              </h2>
              <p className="text-lg text-navy/70 max-w-3xl mx-auto">
                {mp.philosophyDescription}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {mp.philosophyPillars.map((pillar, i) => {
                const colors = pillarColors[i % pillarColors.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`rounded-2xl p-8 border ${colors.border} ${colors.bg} hover:shadow-lg transition-shadow`}
                  >
                    <div className={`inline-block text-3xl font-bold ${colors.accent} mb-1`}>0{i + 1}</div>
                    <h3 className="font-display text-xl font-bold text-navy mb-3">{pillar.title}</h3>
                    <p className="text-navy/70 leading-relaxed">{pillar.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 4 — WHAT MAKES US UNIQUE (Feature Cards)
        ════════════════════════════════════════════════ */}
        <section className="section-padding bg-n-50 animate-section overflow-hidden relative">
          {/* Soft orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-galah/15 blur-3xl" />
            <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-gold/10 blur-3xl" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-3xl md:text-5xl font-medium tracking-[-0.02em] text-navy">
                {m.featuresTitle}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {m.features.map((feature, index) => {
                const Icon = featureIcons[index];
                const colors = featureColors[index % featureColors.length];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 border ${colors.border} relative`}
                  >
                    {feature.logo && (
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Image
                          src={feature.logo}
                          alt={feature.title}
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                        {feature.logo2 && (
                          <Image
                            src={feature.logo2}
                            alt="Tec de Monterrey"
                            width={56}
                            height={56}
                            className="object-contain"
                          />
                        )}
                      </div>
                    )}
                    <div className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center mb-5`}>
                      <Icon size={26} className={colors.text} />
                    </div>
                    <h3 className="font-bold text-navy text-lg mb-3 pr-12">{feature.title}</h3>
                    <p className="text-navy/70 leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 5 — A DAY IN MATERNAL (Schedule Timeline)
        ════════════════════════════════════════════════ */}
        <section className="section-padding bg-white animate-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-[-0.02em] text-navy mb-4">
                {mp.dayTitle}{' '}
                <span className="italic text-gold">{mp.dayTitleAccent}</span>
              </h2>
              <p className="text-lg text-navy/70 max-w-2xl mx-auto">
                {mp.daySubtitle}
              </p>
            </motion.div>

            {/* Desktop timeline */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-galah via-gold to-navy opacity-40" />

                <div className="space-y-6">
                  {mp.daySchedule.map((item, i) => {
                    const IconComp = scheduleIcons[item.icon] || FiStar;
                    const palette = scheduleColors[i % scheduleColors.length];

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-5 md:gap-6 group"
                      >
                        {/* Icon box — solid bg so the timeline line is hidden */}
                        <div
                          className="relative w-16 h-16 min-w-[4rem] md:w-24 md:h-16 md:min-w-[6rem] rounded-xl flex items-center justify-center z-10 group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: palette.bg, color: palette.color }}
                        >
                          <IconComp size={22} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm border border-n-200 group-hover:shadow-md transition-shadow">
                          <span className="text-lg md:text-xl font-bold text-navy whitespace-nowrap">
                            {item.time}
                          </span>
                          <span className="text-navy/70">{item.activity}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 6 — PHOTO GALLERY
        ════════════════════════════════════════════════ */}
        <section className="py-10 md:py-14 bg-paper relative overflow-hidden animate-section">
          <div className="absolute top-0 left-10 w-40 h-40 bg-galah/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-3xl md:text-5xl font-medium tracking-[-0.02em] text-navy">
                {mp.galleryTitle}{' '}
                <span className="italic text-gold">{mp.galleryTitleAccent}</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto"
            >
              {/* Main Image */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-navy-md mb-4 bg-n-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeGallery}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={maternalGalleryImages[activeGallery].src}
                      alt={maternalGalleryImages[activeGallery].caption[locale]}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Nav Arrows */}
                <button
                  onClick={() => setActiveGallery((i) => (i - 1 + maternalGalleryImages.length) % maternalGalleryImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="Previous"
                >
                  <FiChevronLeft size={20} className="text-navy" />
                </button>
                <button
                  onClick={() => setActiveGallery((i) => (i + 1) % maternalGalleryImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="Next"
                >
                  <FiChevronRight size={20} className="text-navy" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {maternalGalleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGallery(i)}
                    className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-md overflow-hidden transition-all duration-200 ${
                      i === activeGallery
                        ? 'ring-2 ring-gold opacity-100 scale-105'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.caption[locale]}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 7 — FINAL CTA (with form)
        ════════════════════════════════════════════════ */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
