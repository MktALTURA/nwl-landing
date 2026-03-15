'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowLeft, FiChevronLeft, FiChevronRight, FiGlobe, FiHeart, FiAward, FiShield } from 'react-icons/fi';
import { GiSoccerBall, GiBasketballBall, GiMusicalNotes, GiRun } from 'react-icons/gi';
import { MdOutlineSportsMartialArts } from 'react-icons/md';
import { PiPaintBrush, PiMaskHappy } from 'react-icons/pi';
import { TbMusic } from 'react-icons/tb';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useBrochure } from '@/lib/BrochureContext';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import GridAnimation from '@/components/GridAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Pillar color config (no icons) ── */
const pillarColors = [
  { gradient: 'from-primaria/30 to-primaria/10', border: 'border-primaria/30', accent: 'text-primaria', num: 'bg-primaria/20 text-charcoal' },
  { gradient: 'from-mustard/25 to-mustard/8', border: 'border-mustard/25', accent: 'text-mustard', num: 'bg-mustard/20 text-charcoal' },
  { gradient: 'from-wine/20 to-wine/8', border: 'border-wine/25', accent: 'text-wine', num: 'bg-wine/15 text-wine' },
];

/* ── Differentiator colors + icons ── */
const diffItems = [
  { accent: 'text-primaria', border: 'border-primaria/25', bg: 'bg-primaria/15', icon: FiGlobe },
  { accent: 'text-wine', border: 'border-wine/25', bg: 'bg-wine/12', icon: FiHeart },
  { accent: 'text-mustard', border: 'border-mustard/30', bg: 'bg-mustard/15', icon: FiAward },
  { accent: 'text-charcoal/70', border: 'border-charcoal/15', bg: 'bg-charcoal/8', icon: FiShield },
];

/* ── Gallery images ── */
const elementaryGalleryImages = [
  { src: '/images/levels/primaria/nwl-zibata-primaria-dos-amigos-salon.jpg', alt: 'Newland Elementary students working together in Zibatá classroom' },
  { src: '/images/levels/primaria/steam-lab.jpg', alt: 'Newland Elementary STEAM maker lab with hands-on experiments' },
  { src: '/images/levels/primaria/nwl-sma-primaria-alumnos-teamwork-manos-circulo.jpg', alt: 'Elementary students building teamwork skills in group circle activity' },
  { src: '/images/levels/primaria/nwl-sma-primaria-alumnas-arte-recortes-papel.jpg', alt: 'Newland Elementary art class with paper cutting and creative projects' },
  { src: '/images/levels/primaria/nwl-sma-primaria-recreo-piramide-cuerdas-aerea.jpg', alt: 'Students on rope pyramid climbing structure during recess at Newland' },
  { src: '/images/levels/primaria/nwl-zibata-primaria-trabajo-colaborativo-cuaderno.jpg', alt: 'Newland Elementary collaborative notebook work in bilingual classroom' },
];

export default function ElementaryPage() {
  const mainRef = useRef<HTMLElement>(null);
  const [activeGallery, setActiveGallery] = useState(0);
  const { t } = useLanguage();
  const { openBrochure } = useBrochure();
  const e = t.elementary;
  const ep = t.elementaryPage;

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
          <Image
            src="/images/levels/primaria.jpg"
            alt="NWL Elementary — students in STEAM maker lab"
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
                <span>{ep.backToHome}</span>
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
                className="inline-block bg-white/15 backdrop-blur-sm text-primaria px-4 py-1.5 rounded-full text-sm font-bold mb-5 border border-white/10"
              >
                {e.ageBadge}
              </motion.span>

              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-5 leading-[1.1]">
                {ep.heroHeadline}
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl">
                {ep.heroSubheadline}
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="#admissions"
                  className="bg-wine text-white px-8 py-3.5 rounded-sm font-medium hover:bg-wine/90 transition-colors border border-wine"
                >
                  {e.cta}
                </a>
                <button
                  onClick={() => openBrochure('elementary')}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-sm font-medium hover:bg-white/20 transition-colors border border-white/25"
                >
                  {e.ctaSecondary}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 2 — OVERVIEW + STATS
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-sand via-warmgray/15 to-warmgray/25 animate-section">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left — Description + Stats */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
                  {ep.overviewTitle}{' '}
                  <span className="bg-gradient-to-r from-primaria via-mustard to-primaria bg-clip-text text-transparent">
                    {ep.overviewTitleAccent}
                  </span>
                </h2>
                <p className="text-lg text-charcoal/70 leading-relaxed mb-8">
                  {e.description}
                </p>

                {/* Stats — clean number-first cards, no icons */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-gradient-to-br from-primaria/18 to-primaria/8 rounded-2xl p-5 border border-primaria/25">
                    <span className="block text-3xl font-bold text-charcoal tracking-tight">100%</span>
                    <span className="text-sm text-charcoal/60 font-medium">{e.statBilingual}</span>
                  </div>
                  <div className="bg-gradient-to-br from-mustard/18 to-mustard/8 rounded-2xl p-5 border border-mustard/25">
                    <span className="block text-3xl font-bold text-charcoal tracking-tight">5</span>
                    <span className="text-sm text-charcoal/60 font-medium">{e.statCampuses}</span>
                  </div>
                  <div className="bg-gradient-to-br from-wine/15 to-wine/8 rounded-2xl p-5 border border-wine/25">
                    <span className="block text-3xl font-bold text-charcoal tracking-tight">{e.schedule}</span>
                    <span className="text-sm text-charcoal/60 font-medium">{e.statSchedule}</span>
                  </div>
                  <div className="bg-gradient-to-br from-charcoal/8 to-warmgray/15 rounded-2xl p-5 border border-charcoal/15">
                    <span className="block text-3xl font-bold text-charcoal tracking-tight">0</span>
                    <span className="text-sm text-charcoal/60 font-medium">{e.statNoHomework}</span>
                  </div>
                </div>
              </motion.div>

              {/* Right — Testimonial */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primaria/15 via-warmgray/35 to-sand rounded-3xl p-8 md:p-10 relative overflow-hidden"
              >
                <div className="absolute top-2 left-6 text-primaria/20 text-8xl font-display leading-none select-none">
                  &ldquo;
                </div>
                <blockquote className="relative z-10 text-xl md:text-2xl text-charcoal font-medium italic leading-relaxed mb-6">
                  &ldquo;{e.testimonial}&rdquo;
                </blockquote>
                <p className="relative z-10 text-charcoal/60 font-medium">&mdash; {e.testimonialAuthor}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 3 — THE NWL MODEL (3 Pillars)
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-warmgray/15 to-sand/80 animate-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                {ep.pillarsTitle}{' '}
                <span className="text-primaria">{ep.pillarsTitleAccent}</span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                {ep.pillarsSubtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {ep.pillars.map((pillar, i) => {
                const c = pillarColors[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`bg-gradient-to-br ${c.gradient} rounded-2xl p-7 border ${c.border} hover:shadow-lg transition-shadow`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${c.num} flex items-center justify-center font-bold text-lg mb-5`}>
                      {i + 1}
                    </div>
                    <h3 className="font-display text-xl font-bold text-charcoal mb-1">{pillar.title}</h3>
                    <p className={`text-sm font-semibold ${c.accent} mb-3`}>{pillar.subtitle}</p>
                    <p className="text-charcoal/65 leading-relaxed text-[15px]">{pillar.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 4 — KNOTION / IMPACT MODEL
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-sand via-warmgray/10 to-sand animate-section overflow-hidden relative">
          <GridAnimation />
          <div className="container-custom relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                {ep.knotionTitle}{' '}
                <span className="bg-gradient-to-r from-primaria to-mustard bg-clip-text text-transparent">
                  {ep.knotionTitleAccent}
                </span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-xl mx-auto">
                {ep.knotionSubtitle}
              </p>
            </motion.div>

            {/* Split: Image left + Phases right */}
            <div className="grid lg:grid-cols-5 gap-10 items-center max-w-5xl mx-auto">
              {/* Left — Image with Knotion logo badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:col-span-3 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-sand"
              >
                <Image
                  src="/images/levels/primaria/nwl-zibata-preescolar-ninos-compartiendo-tablet.jpg"
                  alt="Knotion learning in action"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
                {/* Knotion logo badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                  <Image
                    src="/images/logos/knotion.png"
                    alt="Knotion"
                    width={100}
                    height={32}
                    className="h-6 w-auto"
                  />
                </div>
              </motion.div>

              {/* Right — Vertical animated phase list */}
              <div className="lg:col-span-2 relative pl-10">
                {/* Vertical connecting line — centered on dot (dot=14px, center=7px from left-0) */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  style={{ left: 6 }}
                  className="absolute top-1 bottom-1 w-[2px] origin-top bg-gradient-to-b from-primaria via-mustard to-wine/60"
                />

                <div className="flex flex-col gap-8">
                  {ep.knotionPhases.map((phase, i) => {
                    const dotColors = [
                      'bg-primaria',
                      'bg-primaria/80',
                      'bg-mustard',
                      'bg-wine',
                    ];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
                        viewport={{ once: true }}
                        className="relative"
                      >
                        {/* Dot on the line */}
                        <div className={`absolute -left-10 top-0.5 w-[14px] h-[14px] rounded-full ${dotColors[i]} ring-[3px] ring-white shadow-sm`} />
                        <p className="text-[11px] font-bold tracking-widest uppercase text-charcoal/35 mb-0.5">
                          {phase.name}
                        </p>
                        <p className="font-bold text-charcoal text-[15px]">
                          {phase.title}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 5 — TECNIKIDS STEAM SPOTLIGHT
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-warmgray/25 via-sand/60 to-sand animate-section overflow-hidden relative">
          {/* Geometric background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-[10%] w-64 h-64 border-2 border-primaria/25 rounded-lg rotate-12" />
            <div className="absolute bottom-20 left-[5%] w-48 h-48 border-2 border-charcoal/12 rounded-lg -rotate-6" />
            <div className="absolute top-[60%] left-[15%] w-32 h-32 border border-mustard/20 rounded-full" />
            <div className="absolute top-10 left-[30%] w-20 h-20 border border-wine/15 rounded-lg rotate-45" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                {ep.steamTitle}{' '}
                <span className="bg-gradient-to-r from-primaria to-mustard bg-clip-text text-transparent">
                  {ep.steamTitleAccent}
                </span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                {ep.steamSubtitle}
              </p>
            </motion.div>

            {/* STEAM acronym reveal */}
            <div className="flex justify-center gap-3 md:gap-6 mb-14 max-w-3xl mx-auto">
              {[
                { letter: 'S', word: 'Science', color: 'text-primaria' },
                { letter: 'T', word: 'Technology', color: 'text-mustard' },
                { letter: 'E', word: 'Engineering', color: 'text-wine' },
                { letter: 'A', word: 'Arts', color: 'text-primaria' },
                { letter: 'M', word: 'Mathematics', color: 'text-mustard' },
              ].map((item, i) => (
                <motion.div
                  key={item.letter}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.12, type: 'spring', stiffness: 300 }}
                    viewport={{ once: true }}
                    className={`font-display text-3xl md:text-5xl font-bold ${item.color}`}
                  >
                    {item.letter}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 + i * 0.12 }}
                    viewport={{ once: true }}
                    className="text-[10px] md:text-xs font-semibold text-charcoal/40 tracking-wider uppercase mt-1"
                  >
                    {item.word}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              {/* Left — Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-sand"
              >
                <Image
                  src="/images/levels/primaria/steam-lab.jpg"
                  alt="TecniKids STEAM Lab"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-charcoal/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-bold">
                  TecniKids Lab
                </div>
              </motion.div>

              {/* Right — 2x2 Feature Cards (no icons, just bold titles) */}
              <div className="grid grid-cols-2 gap-4">
                {ep.steamFeatures.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl p-5 border border-charcoal/12 shadow-sm hover:shadow-md hover:border-primaria/35 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primaria/15 flex items-center justify-center mb-3">
                      <span className="text-sm font-bold text-primaria">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="font-bold text-charcoal text-sm mb-1.5">{feature.title}</h3>
                    <p className="text-charcoal/65 text-xs leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 6 — WHAT SETS US APART
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-sand/60 to-warmgray/20 animate-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal">
                {ep.differentiatorsSectionTitle}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {ep.differentiators.map((item, i) => {
                const c = diffItems[i];
                const Icon = c.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border ${c.border}`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center mb-4`}>
                      <Icon size={16} className={c.accent} />
                    </div>
                    <h3 className="font-bold text-charcoal mb-2">{item.title}</h3>
                    <p className="text-charcoal/65 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 7 — BEYOND THE CLASSROOM (Activities)
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-warmgray/20 via-sand/70 to-warmgray/25 animate-section overflow-hidden relative">
          {/* Subtle decorative circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-2 border-primaria/20" />
            <div className="absolute bottom-20 -left-8 w-28 h-28 rounded-full border-2 border-mustard/25" />
            <div className="absolute top-[40%] right-[8%] w-24 h-24 rounded-full border border-wine/15" />
            <div className="absolute top-16 left-[20%] w-16 h-16 rounded-lg border border-primaria/15 rotate-12" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                {ep.activitiesTitle}{' '}
                <span className="text-primaria">{ep.activitiesTitleAccent}</span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                {ep.activitiesSubtitle}
              </p>
            </motion.div>

            {/* Activities — scattered playful layout with icons */}
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {ep.activities.map((activity, i) => {
                  const activityIcons = [
                    GiSoccerBall,
                    GiBasketballBall,
                    MdOutlineSportsMartialArts,
                    GiMusicalNotes,
                    PiPaintBrush,
                    TbMusic,
                    PiMaskHappy,
                    GiRun,
                  ];
                  const cardStyles = [
                    { bg: 'bg-gradient-to-br from-primaria/30 to-primaria/12', text: 'text-charcoal', icon: 'text-primaria' },
                    { bg: 'bg-gradient-to-br from-mustard/28 to-mustard/10', text: 'text-charcoal', icon: 'text-mustard' },
                    { bg: 'bg-gradient-to-br from-wine/18 to-wine/8', text: 'text-charcoal', icon: 'text-wine' },
                    { bg: 'bg-gradient-to-br from-primaria/22 to-mustard/12', text: 'text-charcoal', icon: 'text-primaria' },
                    { bg: 'bg-gradient-to-br from-mustard/22 to-primaria/10', text: 'text-charcoal', icon: 'text-mustard' },
                    { bg: 'bg-gradient-to-br from-charcoal/12 to-charcoal/5', text: 'text-charcoal', icon: 'text-charcoal/50' },
                    { bg: 'bg-gradient-to-br from-wine/15 to-mustard/8', text: 'text-charcoal', icon: 'text-wine/80' },
                    { bg: 'bg-gradient-to-br from-primaria/35 to-primaria/15', text: 'text-charcoal', icon: 'text-primaria' },
                  ];
                  const rotations = [-1.5, 1, -0.5, 1.5, 0.8, -1, 0.5, -0.8];
                  const s = cardStyles[i % cardStyles.length];
                  const Icon = activityIcons[i % activityIcons.length];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24, rotate: 0 }}
                      whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
                      transition={{ duration: 0.5, delay: 0.06 * i, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className={`${s.bg} rounded-2xl p-5 md:p-6 text-center select-none`}
                    >
                      <Icon className={`${s.icon} mx-auto mb-3 opacity-60`} size={28} />
                      <p className={`font-bold text-sm md:text-base ${s.text} tracking-wide`}>
                        {activity}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Campus note */}
              <p className="text-center text-charcoal/40 text-sm mt-8 italic">
                {ep.activitiesNote}
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 8 — PHOTO GALLERY
        ════════════════════════════════════════════════ */}
        <section className="py-10 md:py-14 bg-gradient-to-b from-warmgray/20 to-sand relative overflow-hidden animate-section">
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
                {ep.galleryTitle}{' '}
                <span className="text-wine">{ep.galleryTitleAccent}</span>
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
                      src={elementaryGalleryImages[activeGallery].src}
                      alt={elementaryGalleryImages[activeGallery].alt}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Nav Arrows */}
                <button
                  onClick={() => setActiveGallery((i) => (i - 1 + elementaryGalleryImages.length) % elementaryGalleryImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="Previous"
                >
                  <FiChevronLeft size={20} className="text-charcoal" />
                </button>
                <button
                  onClick={() => setActiveGallery((i) => (i + 1) % elementaryGalleryImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="Next"
                >
                  <FiChevronRight size={20} className="text-charcoal" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {elementaryGalleryImages.map((img, i) => (
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
            SECTION 9 — FINAL CTA
        ════════════════════════════════════════════════ */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
