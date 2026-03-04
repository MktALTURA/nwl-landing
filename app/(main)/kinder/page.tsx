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
  FiArrowLeft,
  FiClock,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
  FiBookOpen,
  FiAward,
  FiUsers,
} from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Pillar icon + color config ── */
const pillarConfig = [
  { icon: FiBookOpen, gradient: 'from-blueberry/20 to-blueberry/5', border: 'border-blueberry/25', accent: 'text-blueberry', num: 'bg-blueberry/15 text-blueberry' },
  { icon: FiGlobe, gradient: 'from-ocean/20 to-ocean/5', border: 'border-ocean/25', accent: 'text-ocean', num: 'bg-ocean/15 text-ocean' },
  { icon: FiAward, gradient: 'from-wine/15 to-wine/5', border: 'border-wine/20', accent: 'text-wine', num: 'bg-wine/10 text-wine' },
];

/* ── Gallery images ── */
const kinderGalleryImages = [
  { src: '/images/levels/kinder/kinder-classroom.jpg', alt: 'Classroom' },
  { src: '/images/levels/kinder/kinder-tunnel-play.jpg', alt: 'Tunnel play' },
  { src: '/images/levels/kinder/kinder-students.jpg', alt: 'Students' },
  { src: '/images/levels/kinder/kinder-friends.jpg', alt: 'Friends' },
  { src: '/images/levels/kinder/kinder-climbing.jpg', alt: 'Climbing' },
  { src: '/images/levels/kinder/kinder-playground.jpg', alt: 'Playground' },
  { src: '/images/levels/kinder/kinder-tablets.jpg', alt: 'Tablets' },
  { src: '/images/levels/kinder/kinder-digital-learning.jpg', alt: 'Digital learning' },
];

export default function KinderPage() {
  const mainRef = useRef<HTMLElement>(null);
  const [activeGallery, setActiveGallery] = useState(0);
  const { locale, t } = useLanguage();
  const k = t.kinder;
  const kp = t.kinderPage;

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
        {/* ════════════════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex items-end overflow-hidden">
          {/* Background image */}
          <Image
            src="/images/levels/kinder.jpg"
            alt="NWL Kinder — children learning and growing"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/10" />

          <div className="container-custom relative z-10 pb-20 pt-40">
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
                <span>{kp.backToHome}</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="max-w-3xl"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="inline-block bg-white/15 backdrop-blur-sm text-blueberry-200 px-4 py-1.5 rounded-full text-sm font-bold mb-5 border border-white/10"
              >
                {k.ageBadge}
              </motion.span>

              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-5 leading-[1.1]">
                {kp.heroHeadline}
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl">
                {kp.heroSubheadline}
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="#admissions"
                  className="bg-wine text-white px-8 py-3.5 rounded-sm font-medium hover:bg-wine/90 transition-colors border border-wine"
                >
                  {k.cta}
                </a>
                <a
                  href="#"
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-sm font-medium hover:bg-white/20 transition-colors border border-white/25"
                >
                  {k.ctaSecondary}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 2 — OVERVIEW + STATS
        ════════════════════════════════════════════════ */}
        <section className="section-padding bg-gradient-to-b from-sand via-white to-warmgray/20 animate-section">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left — Description */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
                  {kp.overviewTitle}{' '}
                  <span className="bg-gradient-to-r from-blueberry via-ocean to-blueberry bg-clip-text text-transparent">
                    {kp.overviewTitleAccent}
                  </span>
                </h2>
                <p className="text-lg text-charcoal/70 leading-relaxed mb-8">
                  {k.description}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="relative group bg-gradient-to-br from-blueberry/10 to-blueberry/5 rounded-2xl p-5 border border-blueberry/20 hover:shadow-md hover:border-blueberry/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-blueberry/20 flex items-center justify-center mb-3">
                      <FiGlobe size={20} className="text-blueberry" />
                    </div>
                    <span className="block text-2xl md:text-3xl font-bold text-charcoal tracking-tight">100%</span>
                    <span className="text-xs md:text-sm text-charcoal/50 font-medium">{k.statBilingual}</span>
                  </div>
                  <div className="relative group bg-gradient-to-br from-ocean/10 to-ocean/5 rounded-2xl p-5 border border-ocean/20 hover:shadow-md hover:border-ocean/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-ocean/20 flex items-center justify-center mb-3">
                      <FiMapPin size={20} className="text-ocean" />
                    </div>
                    <span className="block text-2xl md:text-3xl font-bold text-charcoal tracking-tight">5</span>
                    <span className="text-xs md:text-sm text-charcoal/50 font-medium">{k.statCampuses}</span>
                  </div>
                  <div className="relative group bg-gradient-to-br from-wine/10 to-wine/5 rounded-2xl p-5 border border-wine/20 hover:shadow-md hover:border-wine/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center mb-3">
                      <FiClock size={20} className="text-wine" />
                    </div>
                    <span className="block text-2xl md:text-3xl font-bold text-charcoal tracking-tight">{k.schedule}</span>
                    <span className="text-xs md:text-sm text-charcoal/50 font-medium">{k.statSchedule}</span>
                  </div>
                </div>
              </motion.div>

              {/* Right — Testimonial */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blueberry/10 via-ocean/10 to-wine/10 rounded-3xl p-8 md:p-10 relative overflow-hidden"
              >
                <div className="absolute top-2 left-6 text-blueberry/20 text-8xl font-display leading-none select-none">
                  &ldquo;
                </div>
                <blockquote className="relative z-10 text-xl md:text-2xl text-charcoal font-medium italic leading-relaxed mb-6">
                  &ldquo;{k.testimonial}&rdquo;
                </blockquote>
                <p className="relative z-10 text-charcoal/60 font-medium">&mdash; {k.testimonialAuthor}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 3 — THE NWL MODEL (3 Pillars)
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
                {kp.pillarsTitle}{' '}
                <span className="text-wine">{kp.pillarsTitleAccent}</span>
              </h2>
              <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
                {kp.pillarsSubtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {kp.pillars.map((pillar, i) => {
                const cfg = pillarConfig[i];
                const Icon = cfg.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className={`bg-gradient-to-br ${cfg.gradient} rounded-2xl p-7 border ${cfg.border} hover:shadow-lg transition-shadow`}
                  >
                    {/* Number + Icon */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-xl ${cfg.num} flex items-center justify-center font-bold text-lg`}>
                        {i + 1}
                      </div>
                      <Icon size={22} className={cfg.accent} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-charcoal mb-1">{pillar.title}</h3>
                    <p className={`text-sm font-semibold ${cfg.accent} mb-3`}>{pillar.subtitle}</p>
                    <p className="text-charcoal/60 leading-relaxed text-[15px]">{pillar.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 4 — PHOTO GALLERY
        ════════════════════════════════════════════════ */}
        <section className="py-10 md:py-14 bg-gradient-to-b from-warmgray/20 to-sand relative overflow-hidden animate-section">
          <div className="absolute top-0 right-10 w-40 h-40 bg-blueberry/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-ocean/8 rounded-full blur-3xl" />

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
                {kp.galleryTitle}{' '}
                <span className="text-wine">{kp.galleryTitleAccent}</span>
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
                      src={kinderGalleryImages[activeGallery].src}
                      alt={kinderGalleryImages[activeGallery].alt}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Nav Arrows */}
                <button
                  onClick={() => setActiveGallery((i) => (i - 1 + kinderGalleryImages.length) % kinderGalleryImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="Previous"
                >
                  <FiChevronLeft size={20} className="text-charcoal" />
                </button>
                <button
                  onClick={() => setActiveGallery((i) => (i + 1) % kinderGalleryImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="Next"
                >
                  <FiChevronRight size={20} className="text-charcoal" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {kinderGalleryImages.map((img, i) => (
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
                      alt={img.alt}
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
            SECTION 5 — FINAL CTA
        ════════════════════════════════════════════════ */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
