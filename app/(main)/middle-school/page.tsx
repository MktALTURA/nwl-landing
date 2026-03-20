'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiGlobe,
  FiHeart,
  FiAward,
  FiShield,
  FiUsers,
  FiVideo,
} from 'react-icons/fi';
import { GiSoccerBall, GiMusicalNotes } from 'react-icons/gi';
import { PiPaintBrush, PiMicrophone } from 'react-icons/pi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useBrochure } from '@/lib/BrochureContext';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ConstellationAnimation from '@/components/ConstellationAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Pillar color config ── */
const pillarColors = [
  { gradient: 'from-secundaria/25 to-secundaria/8', border: 'border-secundaria/25', accent: 'text-secundaria', num: 'bg-secundaria/20 text-charcoal' },
  { gradient: 'from-mustard/25 to-mustard/8', border: 'border-mustard/25', accent: 'text-mustard', num: 'bg-mustard/20 text-charcoal' },
  { gradient: 'from-wine/20 to-wine/8', border: 'border-wine/25', accent: 'text-wine', num: 'bg-wine/15 text-wine' },
];

/* ── Differentiator config ── */
const diffItems = [
  { accent: 'text-secundaria', border: 'border-secundaria/25', bg: 'bg-secundaria/15', icon: FiGlobe },
  { accent: 'text-mustard', border: 'border-mustard/25', bg: 'bg-mustard/15', icon: FiAward },
  { accent: 'text-wine', border: 'border-wine/25', bg: 'bg-wine/12', icon: FiHeart },
  { accent: 'text-secundaria', border: 'border-secundaria/25', bg: 'bg-secundaria/15', icon: FiShield },
  { accent: 'text-charcoal/70', border: 'border-charcoal/15', bg: 'bg-charcoal/8', icon: FiVideo },
  { accent: 'text-wine', border: 'border-wine/25', bg: 'bg-wine/12', icon: FiUsers },
];

/* ── Activity config ── */
const activityStyles = [
  { bg: 'bg-gradient-to-br from-secundaria/25 to-secundaria/10', icon: 'text-secundaria' },
  { bg: 'bg-gradient-to-br from-wine/18 to-wine/8', icon: 'text-wine' },
  { bg: 'bg-gradient-to-br from-mustard/25 to-mustard/10', icon: 'text-mustard' },
  { bg: 'bg-gradient-to-br from-secundaria/20 to-mustard/10', icon: 'text-secundaria' },
];
const activityIcons = [GiSoccerBall, PiPaintBrush, GiMusicalNotes, PiMicrophone];
const activityRotations = [-0.5, 0.3, -0.3, 0.5];

/* ── Gallery images ── */
const galleryImages = [
  { src: '/images/levels/secundaria/nwl-sma-secundaria-tres-alumnas-retrato-uniforme.jpg', alt: 'Newland Middle School students in uniform at San Miguel de Allende campus' },
  { src: '/images/levels/secundaria/nwl-sma-maestra-alumno-pizarron-explicacion.jpg', alt: 'Newland teacher explaining concept at whiteboard with middle school student' },
  { src: '/images/levels/secundaria/nwl-sma-secundaria-laboratorio-quimica.jpg', alt: 'Newland Middle School chemistry lab with hands-on experiments' },
  { src: '/images/levels/secundaria/nwl-sma-secundaria-alumnos-tablets-discusion.jpg', alt: 'Newland Middle School students collaborating with tablets in discussion' },
  { src: '/images/levels/secundaria/nwl-sma-secundaria-alumnas-yoga-bienestar.jpg', alt: 'Newland Middle School wellness and yoga session for student wellbeing' },
  { src: '/images/levels/secundaria/nwl-zibata-secundaria-alumno-escuchando-clase.jpg', alt: 'Newland Middle School student engaged in bilingual class at Zibatá' },
  { src: '/images/levels/secundaria/nwl-secundaria-lab-experiment.jpg', alt: 'Newland Middle School students conducting science lab experiment with teacher guidance' },
  { src: '/images/levels/secundaria/nwl-zibata-secundaria-tres-alumnos-pasillo-retrato.jpg', alt: 'Newland Middle School students in campus hallway at Zibatá' },
];

/* ── Knotion phase dot colors ── */
const phaseDotColors = ['bg-secundaria', 'bg-secundaria', 'bg-mustard', 'bg-wine'];

export default function MiddleSchoolPage() {
  const mainRef = useRef<HTMLElement>(null);
  const [activeGallery, setActiveGallery] = useState(0);
  const { t } = useLanguage();
  const { openBrochure } = useBrochure();
  const ms = t.middleSchool;
  const msp = t.middleSchoolPage;

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
            src="/images/levels/secundaria/nwl-secundaria-lab-team-fist-bump.jpg"
            alt="Newland Middle School students fist bumping in science lab teamwork activity"
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
                <span>{msp.backToHome}</span>
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
                className="inline-block bg-white/90 backdrop-blur-sm text-secundaria px-4 py-1.5 rounded-full text-sm font-bold mb-5 border border-white/30 shadow-md"
              >
                {ms.ageBadge}
              </motion.span>

              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-5 leading-[1.1]">
                {msp.heroHeadline}
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl">
                {msp.heroSubheadline}
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="#admissions"
                  className="bg-wine text-white px-8 py-3.5 rounded-sm font-medium hover:bg-wine/90 transition-colors border border-wine"
                >
                  {ms.cta}
                </a>
                <button
                  onClick={() => openBrochure('middle-school')}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-sm font-medium hover:bg-white/20 transition-colors border border-white/25"
                >
                  {ms.ctaSecondary}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 2 — TRANSFORMATION NARRATIVE
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-sand via-warmgray/15 to-warmgray/25 animate-section relative overflow-hidden">
          <ConstellationAnimation />
          <div className="container-custom relative z-10">
            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
                {msp.transformationTitle}{' '}
                <span className="bg-gradient-to-r from-secundaria to-secundaria/70 bg-clip-text text-transparent">
                  {msp.transformationTitleAccent}
                </span>
              </h2>
            </motion.div>

            {/* Before / After transformation card */}
            <div className="max-w-4xl mx-auto mb-14">
              <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-lg border border-charcoal/8 bg-white">
                {/* Before */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-charcoal/[0.03] p-8 md:p-10 relative"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-charcoal/20 to-charcoal/5" />
                  <p className="text-sm font-bold tracking-widest uppercase text-charcoal/35 mb-6">
                    {msp.transformationBefore}
                  </p>
                  <ul className="space-y-4">
                    {msp.transformationBeforeItems.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-charcoal/20 mt-2 flex-shrink-0" />
                        <span className="text-charcoal/60 text-[15px] leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* After */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-secundaria/12 via-secundaria/6 to-secundaria/3 p-8 md:p-10 relative"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-secundaria to-secundaria/40" />
                  <p className="text-sm font-bold tracking-widest uppercase text-secundaria/60 mb-6">
                    {msp.transformationAfter}
                  </p>
                  <ul className="space-y-4">
                    {msp.transformationAfterItems.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-secundaria mt-2 flex-shrink-0" />
                        <span className="text-charcoal font-medium text-[15px] leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Editorial pullquote — testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-14 relative"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-secundaria/15 text-[120px] font-display leading-none select-none pointer-events-none">
                &ldquo;
              </div>
              <blockquote className="relative z-10 text-xl md:text-2xl text-charcoal italic leading-relaxed mb-4 px-4">
                &ldquo;{ms.testimonial}&rdquo;
              </blockquote>
              <p className="relative z-10 text-charcoal/50 font-medium text-sm">
                &mdash; {ms.testimonialAuthor}
              </p>
            </motion.div>

            {/* Compact stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {[
                { value: '100%', label: ms.statBilingual, gradient: 'from-secundaria/18 to-secundaria/8', border: 'border-secundaria/25' },
                { value: '5', label: ms.statCampuses, gradient: 'from-mustard/18 to-mustard/8', border: 'border-mustard/25' },
                { value: ms.schedule, label: ms.statSchedule, gradient: 'from-wine/15 to-wine/8', border: 'border-wine/25' },
                { value: '2', label: ms.statCertifications, gradient: 'from-charcoal/8 to-warmgray/15', border: 'border-charcoal/15' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-5 border ${stat.border}`}
                >
                  <span className="block text-3xl font-bold text-charcoal tracking-tight">{stat.value}</span>
                  <span className="text-sm text-charcoal/60 font-medium">{stat.label}</span>
                </motion.div>
              ))}
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
                {msp.pillarsTitle}{' '}
                <span className="text-secundaria">{msp.pillarsTitleAccent}</span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                {msp.pillarsSubtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {msp.pillars.map((pillar, i) => {
                const c = pillarColors[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`bg-gradient-to-br ${c.gradient} rounded-2xl p-7 border ${c.border} hover:shadow-lg transition-shadow relative`}
                  >
                    {pillar.logo && (
                      <div className="absolute top-4 right-4">
                        <Image
                          src={pillar.logo}
                          alt={pillar.title}
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className={`w-10 h-10 rounded-xl ${c.num} flex items-center justify-center font-bold text-lg mb-5`}>
                      {i + 1}
                    </div>
                    <h3 className="font-display text-xl font-bold text-charcoal mb-1 pr-10">{pillar.title}</h3>
                    <p className={`text-sm font-semibold ${c.accent} mb-3`}>{pillar.subtitle}</p>
                    <p className="text-charcoal/65 leading-relaxed text-[15px]">{pillar.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 4 — EXCLUSIVE PROGRAMS
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-sand/80 via-warmgray/10 to-sand animate-section overflow-hidden relative">
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
                {msp.exclusiveTitle}{' '}
                <span className="bg-gradient-to-r from-secundaria to-wine/70 bg-clip-text text-transparent">
                  {msp.exclusiveTitleAccent}
                </span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                {msp.exclusiveSubtitle}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {msp.exclusivePrograms.map((program, i) => {
                const isFirst = i === 0;
                const accentColor = isFirst ? 'secundaria' : 'wine';
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isFirst ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-charcoal/8"
                  >
                    {/* Top accent stripe */}
                    <div className={`h-[3px] bg-${accentColor}`} />

                    <div className="p-8 md:p-10">
                      {/* Numbered badge */}
                      <div className={`w-10 h-10 rounded-xl bg-${accentColor}/15 flex items-center justify-center font-bold text-lg text-${accentColor} mb-5`}>
                        {String(i + 1).padStart(2, '0')}
                      </div>

                      <h3 className="font-display text-2xl font-bold text-charcoal mb-1">
                        {program.title}
                      </h3>
                      <p className={`text-sm font-semibold text-${accentColor} mb-4`}>
                        {program.partner}
                      </p>
                      <p className="text-charcoal/65 leading-relaxed mb-6">
                        {program.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-3 mb-6">
                        {program.highlights.map((highlight, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 + j * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-3"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full bg-${accentColor} mt-2 flex-shrink-0`} />
                            <span className="text-charcoal/70 text-sm leading-relaxed">{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Partner logo */}
                      <div className="pt-4 border-t border-charcoal/6">
                        <Image
                          src={isFirst
                            ? '/images/logos/universidad-mondragon-mexico.jpg'
                            : '/images/logos/hokku-academy.webp'}
                          alt={program.partner}
                          width={isFirst ? 110 : 90}
                          height={36}
                          className="h-7 w-auto object-contain opacity-60"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quote callout */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center text-charcoal/40 font-display italic text-lg mt-10"
            >
              &ldquo;{msp.exclusiveQuote}&rdquo;
            </motion.p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 5 — KNOTION / IMPACT MODEL
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-sand via-warmgray/15 to-warmgray/20 animate-section overflow-hidden relative">
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
                {msp.knotionTitle}{' '}
                <span className="bg-gradient-to-r from-secundaria to-mustard bg-clip-text text-transparent">
                  {msp.knotionTitleAccent}
                </span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-xl mx-auto">
                {msp.knotionSubtitle}
              </p>
            </motion.div>

            {/* Image — wide with Knotion badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-[21/9] md:aspect-[3/1] rounded-2xl overflow-hidden shadow-lg bg-sand max-w-5xl mx-auto mb-12"
            >
              <Image
                src="/images/levels/secundaria/nwl-sma-secundaria-alumnos-tablets-discusion.jpg"
                alt="Students collaborating with tablets"
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

            {/* Horizontal stepped process — desktop */}
            <div className="max-w-4xl mx-auto">
              <div className="hidden md:block relative">
                {/* Connecting line */}
                <div className="absolute top-[28px] left-[12.5%] right-[12.5%] h-[2px] bg-warmgray/30">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-secundaria via-mustard to-wine/60 origin-left"
                  />
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {msp.knotionPhases.map((phase, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className={`w-14 h-14 rounded-full ${phaseDotColors[i]} flex items-center justify-center ring-4 ring-white shadow-md mb-5 relative z-10`}>
                        <span className="text-white font-bold text-lg">{i + 1}</span>
                      </div>
                      <p className="text-[11px] font-bold tracking-widest uppercase text-charcoal/35 mb-1">
                        {phase.name}
                      </p>
                      <p className="font-bold text-charcoal text-sm mb-2">
                        {phase.title}
                      </p>
                      <p className="text-charcoal/55 text-xs leading-relaxed">
                        {phase.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile: vertical */}
              <div className="md:hidden relative pl-10">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  style={{ left: 6 }}
                  className="absolute top-1 bottom-1 w-[2px] origin-top bg-gradient-to-b from-secundaria via-mustard to-wine/60"
                />

                <div className="flex flex-col gap-8">
                  {msp.knotionPhases.map((phase, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className={`absolute -left-10 top-0.5 w-[14px] h-[14px] rounded-full ${phaseDotColors[i]} ring-[3px] ring-white shadow-sm`} />
                      <p className="text-[11px] font-bold tracking-widest uppercase text-charcoal/35 mb-0.5">
                        {phase.name}
                      </p>
                      <p className="font-bold text-charcoal text-[15px] mb-1.5">
                        {phase.title}
                      </p>
                      <p className="text-charcoal/55 text-sm leading-relaxed">
                        {phase.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 6 — WHAT SETS US APART (scattered badges)
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-warmgray/20 to-sand/60 animate-section overflow-hidden">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal">
                {msp.differentiatorsSectionTitle}
              </h2>
            </motion.div>

            {/* Scattered badge cloud — settle-in animation */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
              {msp.differentiators.map((item, i) => {
                const c = diffItems[i];
                const Icon = c.icon;
                /* Final resting tilt for each badge */
                const restAngles = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.4];
                /* Overshoot direction — swings past, then settles */
                const entryAngles = [8, -10, 7, -8, 9, -7];
                const sizes = ['px-5 py-3', 'px-6 py-3.5', 'px-5 py-3', 'px-6 py-3.5', 'px-5 py-3', 'px-6 py-3.5'];
                const rest = restAngles[i % restAngles.length];
                const entry = entryAngles[i % entryAngles.length];

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -30, scale: 0.7, rotate: entry }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: [0.7, 1.06, 0.97, 1],
                      rotate: [entry, rest * -1.5, rest * 0.5, rest],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                      scale: { duration: 0.7, delay: 0.1 + i * 0.1, times: [0, 0.5, 0.75, 1] },
                      rotate: { duration: 0.8, delay: 0.1 + i * 0.1, times: [0, 0.45, 0.7, 1] },
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.08,
                      rotate: 0,
                      y: -5,
                      transition: { type: 'spring', stiffness: 350, damping: 18 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`${sizes[i % sizes.length]} rounded-full bg-white border ${c.border} shadow-sm hover:shadow-lg cursor-default
                      flex items-center gap-2.5 select-none transition-shadow duration-300`}
                  >
                    <div className={`w-7 h-7 rounded-full ${c.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={14} className={c.accent} />
                    </div>
                    <span className="font-semibold text-charcoal text-sm whitespace-nowrap">{item.title}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 7 — BEYOND THE CLASSROOM (Activities)
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-sand/60 via-warmgray/15 to-warmgray/25 animate-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
                {msp.activitiesTitle}{' '}
                <span className="text-secundaria">{msp.activitiesTitleAccent}</span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                {msp.activitiesSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              {msp.activities.map((activity, i) => {
                const s = activityStyles[i % activityStyles.length];
                const Icon = activityIcons[i % activityIcons.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: activityRotations[i % activityRotations.length] }}
                    transition={{ duration: 0.5, delay: 0.06 * i, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className={`${s.bg} rounded-2xl p-6 md:p-8 text-center select-none`}
                  >
                    <Icon className={`${s.icon} mx-auto mb-3 opacity-60`} size={32} />
                    <p className="font-bold text-charcoal text-base mb-2">
                      {activity.name}
                    </p>
                    <p className="text-charcoal/55 text-xs leading-relaxed">
                      {activity.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-center text-charcoal/40 text-sm mt-8 italic">
              {msp.activitiesNote}
            </p>
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
                {msp.galleryTitle}{' '}
                <span className="text-secundaria">{msp.galleryTitleAccent}</span>
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
                      src={galleryImages[activeGallery].src}
                      alt={galleryImages[activeGallery].alt}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Nav Arrows */}
                <button
                  onClick={() => setActiveGallery((idx) => (idx - 1 + galleryImages.length) % galleryImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="Previous"
                >
                  <FiChevronLeft size={20} className="text-charcoal" />
                </button>
                <button
                  onClick={() => setActiveGallery((idx) => (idx + 1) % galleryImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="Next"
                >
                  <FiChevronRight size={20} className="text-charcoal" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGallery(i)}
                    className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-md overflow-hidden transition-all duration-200 ${
                      i === activeGallery
                        ? 'ring-2 ring-secundaria opacity-100 scale-105'
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
