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

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Feature card data ── */
const featureIcons = [FiGlobe, FiStar, FiHeart, FiShield, FiUsers];
const featureColors = [
  { bg: 'bg-sunshine/10', text: 'text-sunshine-700', iconBg: 'bg-sunshine/20', border: 'border-sunshine/30' },
  { bg: 'bg-coral/10', text: 'text-coral-700', iconBg: 'bg-coral/20', border: 'border-coral/30' },
  { bg: 'bg-lime/10', text: 'text-lime-700', iconBg: 'bg-lime/20', border: 'border-lime/30' },
  { bg: 'bg-ocean/10', text: 'text-ocean-700', iconBg: 'bg-ocean/20', border: 'border-ocean/30' },
  { bg: 'bg-bubblegum/10', text: 'text-bubblegum-700', iconBg: 'bg-bubblegum/20', border: 'border-bubblegum/30' },
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

/* Solid pastel colors (brand color blended at ~40% over white) so the
   timeline line is fully hidden behind each icon box. */
const scheduleColors = [
  { bg: '#FFF0B1', color: '#3D3D3D' }, // sunshine
  { bg: '#B8EBE7', color: '#3D3D3D' }, // ocean
  { bg: '#FFC4C4', color: '#3D3D3D' }, // coral
  { bg: '#DCF5EC', color: '#3D3D3D' }, // lime
  { bg: '#C4BEF5', color: '#3D3D3D' }, // blueberry
  { bg: '#FFD1B3', color: '#3D3D3D' }, // tangerine
  { bg: '#FFD6E9', color: '#3D3D3D' }, // bubblegum
  { bg: '#DCBDC2', color: '#8B2332' }, // wine
];

const pillarColors = [
  { accent: 'text-sunshine-700', bg: 'bg-sunshine/10', border: 'border-sunshine/20' },
  { accent: 'text-coral-700', bg: 'bg-coral/10', border: 'border-coral/20' },
  { accent: 'text-lime-700', bg: 'bg-lime/10', border: 'border-lime/20' },
  { accent: 'text-ocean-700', bg: 'bg-ocean/10', border: 'border-ocean/20' },
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
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/10" />

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="max-w-3xl"
            >
              <span className="inline-block bg-white/15 backdrop-blur-sm text-sunshine px-4 py-1.5 rounded-full text-sm font-bold mb-5 border border-white/10">
                {m.ageBadge}
              </span>

              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-5 leading-[1.1]">
                {mp.heroHeadline}
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl">
                {mp.heroSubheadline}
              </p>

              <div className="flex items-center gap-4">
                <a href="#admissions" className="bg-wine text-white px-8 py-3.5 rounded-sm font-medium hover:bg-wine/90 transition-colors border border-wine">
                  {m.cta}
                </a>
                <button onClick={() => openBrochure('maternal-kinder')} className="bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-sm font-medium hover:bg-white/20 transition-colors border border-white/25">
                  {m.ctaSecondary}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 2 — QUICK OVERVIEW + STATS
        ════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-to-b from-sand via-white to-warmgray/30 animate-section">
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
                  <div className="h-2 w-2 rounded-full bg-sunshine animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="h-2 w-2 rounded-full bg-coral animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="h-2 w-2 rounded-full bg-lime animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
                  <span className="bg-gradient-to-r from-sunshine via-coral to-tangerine bg-clip-text text-transparent">
                    {m.tagline}
                  </span>
                </h2>
                <p className="text-lg text-charcoal/70 leading-relaxed mb-8">
                  {m.description}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {/* Bilingual stat */}
                  <div className="relative group bg-gradient-to-br from-sunshine/10 to-sunshine/5 rounded-2xl p-5 border border-sunshine/20 hover:shadow-md hover:border-sunshine/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-sunshine/20 flex items-center justify-center mb-3">
                      <FiGlobe size={20} className="text-sunshine-700" />
                    </div>
                    <span className="block text-2xl md:text-3xl font-bold text-charcoal tracking-tight">100%</span>
                    <span className="text-xs md:text-sm text-charcoal/50 font-medium">{m.statBilingual}</span>
                  </div>
                  {/* Campuses stat */}
                  <div className="relative group bg-gradient-to-br from-coral/10 to-coral/5 rounded-2xl p-5 border border-coral/20 hover:shadow-md hover:border-coral/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-coral/20 flex items-center justify-center mb-3">
                      <FiMapPin size={20} className="text-coral-700" />
                    </div>
                    <span className="block text-2xl md:text-3xl font-bold text-charcoal tracking-tight">5</span>
                    <span className="text-xs md:text-sm text-charcoal/50 font-medium">{m.statCampuses}</span>
                  </div>
                  {/* Schedule stat */}
                  <div className="relative group bg-gradient-to-br from-lime/10 to-lime/5 rounded-2xl p-5 border border-lime/20 hover:shadow-md hover:border-lime/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-lime/20 flex items-center justify-center mb-3">
                      <FiClock size={20} className="text-lime-700" />
                    </div>
                    <span className="block text-2xl md:text-3xl font-bold text-charcoal tracking-tight">{m.schedule}</span>
                    <span className="text-xs md:text-sm text-charcoal/50 font-medium">{m.statSchedule}</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-sunshine to-tangerine text-white px-5 py-2.5 rounded-full font-bold shadow-lg text-sm"
                >
                  <FiStar size={14} />
                  {m.uniqueBadge}
                </motion.div>
              </motion.div>

              {/* Right — Testimonial */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-sunshine/15 via-coral/15 to-lime/15 rounded-3xl p-8 md:p-10 relative overflow-hidden"
              >
                <div className="absolute top-2 left-6 text-sunshine/30 text-8xl font-display leading-none select-none">
                  &ldquo;
                </div>
                <blockquote className="relative z-10 text-xl md:text-2xl text-charcoal font-medium italic leading-relaxed mb-6">
                  &ldquo;{m.testimonial}&rdquo;
                </blockquote>
                <p className="relative z-10 text-charcoal/60 font-medium">&mdash; {m.testimonialAuthor}</p>
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
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                {mp.philosophyTitle}{' '}
                <span className="bg-gradient-to-r from-coral to-tangerine bg-clip-text text-transparent">
                  {mp.philosophyTitleAccent}
                </span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-3xl mx-auto">
                {mp.philosophyDescription}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {mp.philosophyPillars.map((pillar, i) => {
                const colors = pillarColors[i];
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
                    <h3 className="font-display text-xl font-bold text-charcoal mb-3">{pillar.title}</h3>
                    <p className="text-charcoal/60 leading-relaxed">{pillar.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 4 — WHAT MAKES US UNIQUE (Feature Cards)
        ════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-to-b from-warmgray/30 via-sand to-coral/5 animate-section overflow-hidden relative">
          {/* Soft orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-sunshine/15 blur-3xl" />
            <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-coral/10 blur-3xl" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal">
                {m.featuresTitle}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {m.features.map((feature, index) => {
                const Icon = featureIcons[index];
                const colors = featureColors[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 border ${colors.border}`}
                  >
                    <div className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center mb-5`}>
                      <Icon size={26} className={colors.text} />
                    </div>
                    <h3 className="font-bold text-charcoal text-lg mb-3">{feature.title}</h3>
                    <p className="text-charcoal/60 leading-relaxed">{feature.description}</p>
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
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                {mp.dayTitle}{' '}
                <span className="text-wine">{mp.dayTitleAccent}</span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                {mp.daySubtitle}
              </p>
            </motion.div>

            {/* Desktop timeline */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sunshine via-coral to-wine opacity-40" />

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
                        <div className="flex-1 flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm border border-charcoal/5 group-hover:shadow-md transition-shadow">
                          <span className="text-lg md:text-xl font-bold text-charcoal whitespace-nowrap">
                            {item.time}
                          </span>
                          <span className="text-charcoal/70">{item.activity}</span>
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
        <section className="py-10 md:py-14 bg-gradient-to-b from-white to-sand relative overflow-hidden animate-section">
          <div className="absolute top-0 left-10 w-40 h-40 bg-mustard/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-48 h-48 bg-sunshine/10 rounded-full blur-3xl" />

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal">
                {mp.galleryTitle}{' '}
                <span className="text-wine">{mp.galleryTitleAccent}</span>
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
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl mb-4 bg-sand">
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
                  <FiChevronLeft size={20} className="text-charcoal" />
                </button>
                <button
                  onClick={() => setActiveGallery((i) => (i + 1) % maternalGalleryImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="Next"
                >
                  <FiChevronRight size={20} className="text-charcoal" />
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
                        ? 'ring-2 ring-wine opacity-100 scale-105'
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
