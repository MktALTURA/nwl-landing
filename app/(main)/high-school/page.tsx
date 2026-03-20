'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiCompass,
  FiZap,
  FiDollarSign,
  FiAward,
  FiCpu,
  FiTarget,
  FiBookOpen,
  FiX,
  FiZoomIn,
  FiGlobe,
} from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useBrochure } from '@/lib/BrochureContext';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Tailwind safelist — ensures JIT generates these dynamic classes ──
   bg-deep-ember/12 bg-deep-ember/15 bg-golden-spark/15 bg-steel/15
   text-deep-ember text-golden-spark text-steel text-deep-ember/60
   border-deep-ember/20 border-golden-spark/25 border-steel/20
   from-deep-ember/15 from-deep-ember/5 from-golden-spark/15 from-golden-spark/5 from-steel/12 from-steel/5
   to-deep-ember/5 to-golden-spark/5 to-steel/5
   from-deep-ember to-golden-spark
   bg-deep-ember/20 border-golden-spark/30
   ring-[#31356e]/30 ring-[#a455bb]/30 ring-[#ff914d]/30 ring-[#c6de27]/30 ring-[#00ad60]/30 ring-[#2d8bba]/30
   bg-[#31356e] bg-[#a455bb] bg-[#ff914d] bg-[#c6de27] bg-[#00ad60] bg-[#2d8bba]
   bg-[#31356e]/10 bg-[#a455bb]/10 bg-[#ff914d]/10 bg-[#c6de27]/10 bg-[#00ad60]/10 bg-[#2d8bba]/10
   text-[#31356e] text-[#a455bb] text-[#ff914d] text-[#6b7a00] text-[#00ad60] text-[#2d8bba]
── */

/* ── Value prop icons ── */
const valuePropIcons = [FiCompass, FiZap, FiBookOpen, FiDollarSign, FiAward, FiCpu, FiTarget];
const valuePropStyles = [
  { bg: 'bg-deep-ember/12', accent: 'text-deep-ember', border: 'border-deep-ember/20' },
  { bg: 'bg-golden-spark/15', accent: 'text-golden-spark', border: 'border-golden-spark/25' },
  { bg: 'bg-deep-ember/12', accent: 'text-deep-ember', border: 'border-deep-ember/20' },
  { bg: 'bg-golden-spark/15', accent: 'text-golden-spark', border: 'border-golden-spark/25' },
  { bg: 'bg-deep-ember/12', accent: 'text-deep-ember', border: 'border-deep-ember/20' },
  { bg: 'bg-golden-spark/15', accent: 'text-golden-spark', border: 'border-golden-spark/25' },
  { bg: 'bg-deep-ember/12', accent: 'text-deep-ember', border: 'border-deep-ember/20' },
];

/* ── Semester colors (from the PDF palette) ── */
const semesterColors = [
  { bg: 'bg-[#31356e]', text: 'text-white', ring: 'ring-[#31356e]/30', badge: 'bg-[#31356e]/10 text-[#31356e]' },
  { bg: 'bg-[#a455bb]', text: 'text-white', ring: 'ring-[#a455bb]/30', badge: 'bg-[#a455bb]/10 text-[#a455bb]' },
  { bg: 'bg-[#ff914d]', text: 'text-white', ring: 'ring-[#ff914d]/30', badge: 'bg-[#ff914d]/10 text-[#ff914d]' },
  { bg: 'bg-[#c6de27]', text: 'text-charcoal', ring: 'ring-[#c6de27]/30', badge: 'bg-[#c6de27]/10 text-[#6b7a00]' },
  { bg: 'bg-[#00ad60]', text: 'text-white', ring: 'ring-[#00ad60]/30', badge: 'bg-[#00ad60]/10 text-[#00ad60]' },
  { bg: 'bg-[#2d8bba]', text: 'text-white', ring: 'ring-[#2d8bba]/30', badge: 'bg-[#2d8bba]/10 text-[#2d8bba]' },
];

/* ── Pillar colors ── */
const pillarColors = [
  { gradient: 'from-deep-ember/15 to-deep-ember/5', border: 'border-deep-ember/20', accent: 'text-deep-ember', num: 'bg-deep-ember/15 text-deep-ember' },
  { gradient: 'from-golden-spark/15 to-golden-spark/5', border: 'border-golden-spark/25', accent: 'text-golden-spark', num: 'bg-golden-spark/15 text-charcoal' },
  { gradient: 'from-steel/12 to-steel/5', border: 'border-steel/20', accent: 'text-steel', num: 'bg-steel/15 text-charcoal' },
];

/* ── Gallery images ── */
const galleryImages = [
  { src: '/images/levels/prepa/prepa-nwl-nova-hub-workspace.jpg', alt: 'The Nova Hub — modern collaborative workspace' },
  { src: '/images/levels/prepa/prepa-nwl-hit-fitness-sled-push.jpg', alt: 'HIT fitness training — sled push' },
  { src: '/images/levels/prepa/prepa-nwl-student-keyboard-music.jpg', alt: 'Student playing keyboard in music room' },
  { src: '/images/levels/prepa/prepa-nwl-students-podcast-studio.jpg', alt: 'Students in podcast studio' },
  { src: '/images/levels/prepa/prepa-nwl-modern-classroom.jpg', alt: 'Modern classroom with collaborative tables' },
  { src: '/images/levels/prepa/prepa-nwl-student-lounge-gradas.jpg', alt: 'NWL student lounge' },
  { src: '/images/levels/prepa/prepa-nwl-teacher-collaborative-workspace.jpg', alt: 'Teacher and students in collaborative workspace' },
  { src: '/images/levels/prepa/prepa-nwl-hit-fitness-tire-flip.jpg', alt: 'HIT fitness training — tire flip' },
  { src: '/images/levels/prepa/prepa-nwl-student-lounge-seating.jpg', alt: 'Student common area with lounge seating' },
  { src: '/images/levels/prepa/prepa-nwl-student-studying-classroom.jpg', alt: 'Student studying in casual classroom' },
  { src: '/images/levels/prepa/prepa-nwl-instructor-drums-music.jpg', alt: 'Music instructor playing drums' },
  { src: '/images/levels/prepa/prepa-nwl-podcast-studio-alt.jpg', alt: 'Podcast studio setup' },
  { src: '/images/levels/prepa/corregidora-prepa-classroom-2.jpg', alt: 'Prepa NWL Corregidora tech classroom' },
  { src: '/images/levels/prepa/san-miguel-reception.jpg', alt: 'Prepa NWL San Miguel de Allende high school area' },
];

export default function HighSchoolPage() {
  const mainRef = useRef<HTMLElement>(null);
  const [activeGallery, setActiveGallery] = useState(0);
  const [wheelOpen, setWheelOpen] = useState(false);
  const [wheelScale, setWheelScale] = useState(0.75);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (wheelOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [wheelOpen]);

  const { t, locale } = useLanguage();
  const { openBrochure } = useBrochure();
  const hs = t.highSchool;
  const hsp = t.highSchoolPage;

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
            src="/images/levels/prepa/prepa-nwl-teacher-collaborative-workspace.jpg"
            alt="Prepa NWL students in modern collaborative classroom"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-deep-ember/20" />

          {/* Logos floating top-right */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
            <Image
              src="/images/levels/prepa/lifeproject-logo-white.png"
              alt="Life Project"
              width={120}
              height={40}
              className="h-8 md:h-10 w-auto opacity-80"
            />
          </div>

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
                <span>{hsp.backToHome}</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="max-w-3xl"
            >
              {/* Prepa NWL Logo + Age Badge */}
              <div className="flex items-center gap-5 mb-6">
                <img
                  src="/images/levels/prepa/nwl-prepa-logo.png"
                  alt="Prepa NWL"
                  className="h-16 md:h-20 w-auto drop-shadow-lg"
                />
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="inline-block bg-golden-spark/20 backdrop-blur-sm text-golden-spark px-4 py-1.5 rounded-full text-sm font-bold border border-golden-spark/30"
                >
                  {hs.ageBadge}
                </motion.span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-5 leading-[1.1]">
                {hsp.heroHeadline}
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl">
                {hsp.heroSubheadline}
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="#admissions"
                  className="bg-deep-ember text-white px-8 py-3.5 rounded-sm font-medium hover:bg-deep-ember/90 transition-colors border border-deep-ember"
                >
                  {hs.cta}
                </a>
                <button
                  onClick={() => openBrochure('high-school')}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-sm font-medium hover:bg-white/20 transition-colors border border-white/25"
                >
                  {hs.ctaSecondary}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 2 — WHAT MAKES US DIFFERENT
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-sand via-warmgray/15 to-warmgray/25 animate-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
                {hsp.valuePropsTitle}{' '}
                <span className="text-deep-ember">{hsp.valuePropsTitleAccent}</span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto mt-4">
                {hsp.valuePropsSubtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {hsp.valueProps.map((prop, i) => {
                const s = valuePropStyles[i];
                const Icon = valuePropIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`bg-white rounded-2xl p-6 border ${s.border} hover:shadow-lg transition-shadow`}
                  >
                    {i === 0 ? (
                      <>
                        <img
                          src="/images/levels/prepa/lifeproject-logo-black.png"
                          alt="Life Project"
                          className="h-24 w-auto mb-4"
                        />
                        <p className="text-charcoal/60 text-sm leading-relaxed">{prop.description}</p>
                      </>
                    ) : i === 2 ? (
                      <>
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src="/images/logos/partners/kn-u-high-coursera.png"
                            alt="Kn U High by Coursera"
                            className="h-12 w-auto"
                          />
                        </div>
                        <h3 className="font-display text-lg font-bold text-charcoal mb-2">{prop.title}</h3>
                        <p className="text-charcoal/60 text-sm leading-relaxed">{prop.description}</p>
                      </>
                    ) : i === 4 ? (
                      <>
                        <img
                          src="/images/logos/hokku-academy.webp"
                          alt="Hokku Academy"
                          className="h-16 w-auto mb-4"
                        />
                        <p className="text-charcoal/60 text-sm leading-relaxed">{prop.description}</p>
                      </>
                    ) : (
                      <>
                        <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
                          <Icon size={20} className={s.accent} />
                        </div>
                        <h3 className="font-display text-lg font-bold text-charcoal mb-2">{prop.title}</h3>
                        <p className="text-charcoal/60 text-sm leading-relaxed">{prop.description}</p>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 3 — LIFE PROJECT JOURNEY (6 Semesters)
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-warmgray/25 to-sand animate-section overflow-hidden">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
                {hsp.journeyTitle}{' '}
                <span className="bg-gradient-to-r from-deep-ember to-golden-spark bg-clip-text text-transparent">
                  {hsp.journeyTitleAccent}
                </span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto mt-4">
                {hsp.journeySubtitle}
              </p>
            </motion.div>

            {/* Desktop: horizontal 3×2 grid */}
            <div className="hidden md:grid grid-cols-3 gap-5 max-w-5xl mx-auto">
              {hsp.semesters.map((sem, i) => {
                const c = semesterColors[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-6 border border-charcoal/8 hover:shadow-lg transition-shadow relative overflow-hidden"
                  >
                    {/* Top color stripe */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${c.bg}`} />

                    <div className="flex items-center gap-3 mb-4 mt-1">
                      <div className={`w-10 h-10 rounded-full ${c.bg} ${c.text} flex items-center justify-center font-bold text-sm ring-4 ${c.ring} ring-offset-1`}>
                        {sem.number}
                      </div>
                      <span className={`text-xs font-bold tracking-wide uppercase ${c.badge} px-2.5 py-1 rounded-full`}>
                        {locale === 'es' ? `Semestre ${sem.number}` : `Semester ${sem.number}`}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-charcoal mb-3 leading-snug">
                      {sem.theme}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {sem.skills.map((skill, j) => (
                        <span
                          key={j}
                          className="text-[11px] font-medium text-charcoal/50 bg-warmgray/40 px-2 py-0.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-charcoal/40 italic">
                      {locale === 'es' ? 'Proyecto: ' : 'Project: '}
                      <span className="font-semibold text-charcoal/60">{sem.project}</span>
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden relative pl-10">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                viewport={{ once: true }}
                style={{ left: 6 }}
                className="absolute top-1 bottom-1 w-[2px] origin-top bg-gradient-to-b from-deep-ember via-golden-spark to-[#2d8bba]"
              />

              <div className="flex flex-col gap-8">
                {hsp.semesters.map((sem, i) => {
                  const c = semesterColors[i];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className={`absolute -left-10 top-0.5 w-[14px] h-[14px] rounded-full ${c.bg} ring-[3px] ring-white shadow-sm`} />
                      <span className="text-[11px] font-bold tracking-widest uppercase text-charcoal/35 mb-0.5 block">
                        {locale === 'es' ? `Semestre ${sem.number}` : `Semester ${sem.number}`}
                      </span>
                      <p className="font-bold text-charcoal text-[15px] mb-1.5">
                        {sem.theme}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        {sem.skills.map((skill, j) => (
                          <span key={j} className="text-[10px] font-medium text-charcoal/45 bg-warmgray/40 px-2 py-0.5 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-charcoal/40 italic">
                        {locale === 'es' ? 'Proyecto: ' : 'Project: '}
                        <span className="font-semibold text-charcoal/55">{sem.project}</span>
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 4 — LIFE PROJECT MODEL (3 Pillars)
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-sand via-warmgray/10 to-warmgray/20 animate-section">
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
                {hsp.pillarsTitle}{' '}
                <span className="text-deep-ember">{hsp.pillarsTitleAccent}</span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                {hsp.pillarsSubtitle}
              </p>
            </motion.div>

            {/* Interactive competencies wheel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center mb-14"
            >
              <button
                type="button"
                onClick={() => { setWheelOpen(true); setWheelScale(0.75); }}
                className="relative group cursor-zoom-in"
              >
                <img
                  src={locale === 'es'
                    ? '/images/levels/prepa/es/competencias-life-project.svg'
                    : '/images/levels/prepa/en/life-project-skills.svg'}
                  alt={locale === 'es' ? 'Competencias Life Project' : 'Life Project Skills'}
                  className="w-full max-w-sm md:max-w-lg transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {/* Explore hint overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="flex items-center gap-2 bg-charcoal/75 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                    <FiZoomIn size={16} />
                    {locale === 'es' ? 'Explorar' : 'Explore'}
                  </span>
                </div>
              </button>
            </motion.div>

            {/* Wheel lightbox — portalled to body so GSAP transforms don't break fixed positioning */}
            {typeof document !== 'undefined' && createPortal(
              <AnimatePresence>
                {wheelOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[9999] bg-charcoal/90 backdrop-blur-sm"
                    onClick={() => setWheelOpen(false)}
                  >
                    {/* Close button — always visible */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setWheelOpen(false); }}
                      className="fixed top-5 right-5 z-[10000] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    >
                      <FiX size={22} />
                    </button>

                    {/* Zoom controls — always visible */}
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setWheelScale((s) => Math.max(0.5, s - 0.25)); }}
                        className="text-white/80 hover:text-white text-lg font-bold w-8 h-8 flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="text-white/70 text-sm font-medium min-w-[3rem] text-center">
                        {Math.round(wheelScale * 100)}%
                      </span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setWheelScale((s) => Math.min(3, s + 0.25)); }}
                        className="text-white/80 hover:text-white text-lg font-bold w-8 h-8 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    {/* Centered image */}
                    <div
                      className="absolute inset-0 flex items-center justify-center overflow-hidden"
                      onWheel={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setWheelScale((s) => {
                          const delta = e.deltaY > 0 ? -0.15 : 0.15;
                          return Math.min(3, Math.max(0.5, +(s + delta).toFixed(2)));
                        });
                      }}
                    >
                      <motion.img
                        src={locale === 'es'
                          ? '/images/levels/prepa/es/competencias-life-project.svg'
                          : '/images/levels/prepa/en/life-project-skills.svg'}
                        alt={locale === 'es' ? 'Competencias Life Project' : 'Life Project Skills'}
                        className="max-h-[85vh] max-w-[90vw] select-none pointer-events-none"
                        style={{ transform: `scale(${wheelScale})`, transformOrigin: 'center center' }}
                        draggable={false}
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>,
              document.body
            )}

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {hsp.pillars.map((pillar, i) => {
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
            SECTION 5 — EXCLUSIVE PROGRAMS
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-warmgray/20 to-sand/80 animate-section">
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
                {hsp.exclusiveTitle}{' '}
                <span className="bg-gradient-to-r from-deep-ember to-golden-spark bg-clip-text text-transparent">
                  {hsp.exclusiveTitleAccent}
                </span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                {hsp.exclusiveSubtitle}
              </p>
            </motion.div>

            {/* Hokku — Full-width hero card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto mb-8"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-deep-ember/15">
                <div className="h-[3px] bg-gradient-to-r from-deep-ember to-golden-spark" />
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-deep-ember/12 flex items-center justify-center">
                          <FiAward size={20} className="text-deep-ember" />
                        </div>
                        <span className="text-xs font-bold tracking-widest uppercase text-deep-ember/60">
                          {locale === 'es' ? 'Programa Estrella' : 'Star Program'}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-charcoal mb-1">
                        {hsp.exclusivePrograms[0].title}
                      </h3>
                      <p className="text-sm font-semibold text-deep-ember mb-4">
                        {hsp.exclusivePrograms[0].partner}
                      </p>
                      <p className="text-charcoal/65 leading-relaxed mb-6">
                        {hsp.exclusivePrograms[0].description}
                      </p>
                      <ul className="space-y-3">
                        {hsp.exclusivePrograms[0].highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-deep-ember mt-2 flex-shrink-0" />
                            <span className="text-charcoal/70 text-sm leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-shrink-0 pt-2">
                      <div className="bg-warmgray/20 rounded-xl px-4 py-3">
                        <Image
                          src="/images/logos/hokku-academy.webp"
                          alt="Hokku Academy"
                          width={120}
                          height={55}
                          className="h-10 w-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Fitness + Projects — 2-column grid */}
            <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto mb-8">
              {hsp.exclusivePrograms.slice(1, 3).map((program, i) => {
                const accentColors = ['golden-spark', 'deep-ember'];
                const accent = accentColors[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-charcoal/8"
                  >
                    <div className={`h-[3px] bg-${accent}`} />
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold text-charcoal mb-1">
                        {program.title}
                      </h3>
                      <p className={`text-xs font-semibold text-${accent} mb-3`}>
                        {program.partner}
                      </p>
                      <p className="text-charcoal/60 text-sm leading-relaxed mb-4">
                        {program.description}
                      </p>
                      <ul className="space-y-2">
                        {program.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <div className={`w-1 h-1 rounded-full bg-${accent} mt-2 flex-shrink-0`} />
                            <span className="text-charcoal/55 text-xs leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* International Exchange — Standout section */}
            {hsp.exclusivePrograms[3] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto"
              >
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white via-sand/60 to-golden-spark/10 shadow-sm hover:shadow-lg transition-shadow border border-golden-spark/20">
                  <div className="h-[3px] bg-gradient-to-r from-golden-spark via-deep-ember to-golden-spark" />
                  <div className="relative p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-golden-spark/15 flex items-center justify-center">
                          <FiGlobe size={20} className="text-deep-ember" />
                        </div>
                        <span className="text-xs font-bold tracking-widest uppercase text-deep-ember/60">
                          {locale === 'es' ? 'Experiencia Global' : 'Global Experience'}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-2">
                        {hsp.exclusivePrograms[3].title}
                      </h3>
                      <p className="text-charcoal/60 leading-relaxed mb-6">
                        {hsp.exclusivePrograms[3].description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {hsp.exclusivePrograms[3].highlights.map((h, j) => (
                          <span
                            key={j}
                            className="inline-flex items-center gap-2 bg-deep-ember/8 text-charcoal/70 text-sm px-4 py-2 rounded-full border border-deep-ember/12"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-deep-ember flex-shrink-0" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 hidden md:flex flex-col items-center gap-2">
                      <div className="text-6xl">🌍</div>
                      <span className="text-charcoal/35 text-xs font-medium tracking-wider uppercase">
                        {locale === 'es' ? 'Semestres 5-6' : 'Semesters 5-6'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 6 — ACADEMIC EXCELLENCE (McGraw-Hill)
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-sand/80 to-warmgray/20 animate-section">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border border-charcoal/8 shadow-sm"
              >
                {/* Banner image with McGraw-Hill badge */}
                <div className="relative aspect-[21/9] bg-sand">
                  <Image
                    src="/images/levels/prepa/prepa-nwl-student-studying-classroom.jpg"
                    alt="Prepa NWL student studying in classroom"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                  {/* McGraw-Hill logo badge */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1.5 shadow-md">
                    <Image
                      src="/images/levels/prepa/mcgraw-hill-logo.jpg"
                      alt="McGraw-Hill Education"
                      width={140}
                      height={46}
                      className="h-9 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Content below image */}
                <div className="p-8 md:p-10">
                  <div className="wine-divider mb-4" />
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-2">
                    {hsp.academicTitle}{' '}
                    <span className="text-deep-ember">{hsp.academicTitleAccent}</span>
                  </h2>
                  <p className="text-charcoal/65 leading-relaxed mb-6">
                    {hsp.academicDescription}
                  </p>
                  <ul className="space-y-3">
                    {hsp.academicHighlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-golden-spark mt-2 flex-shrink-0" />
                        <span className="text-charcoal/70 text-sm leading-relaxed">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <a
                    href={locale === 'es'
                      ? '/images/levels/prepa/es/plan-de-estudios-prepa-nwl-2025.pdf'
                      : '/images/levels/prepa/en/plan-de-estudios-prepa-nwl.pdf'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 text-sm font-semibold text-deep-ember border border-deep-ember/25 rounded-full hover:bg-deep-ember/5 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {hsp.academicPlanCta}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 7 — UNIVERSITY PATHWAYS
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-18 bg-gradient-to-b from-warmgray/20 to-sand/60 animate-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
                {hsp.universityPathwaysTitle}{' '}
                <span className="bg-gradient-to-r from-deep-ember to-golden-spark bg-clip-text text-transparent">
                  {hsp.universityPathwaysTitleAccent}
                </span>
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto mt-4">
                {hsp.universityPathwaysSubtitle}
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border border-charcoal/8 shadow-sm"
              >
                <div className="h-[3px] bg-gradient-to-r from-deep-ember to-golden-spark" />
                <div className="p-8 md:p-12">
                  <p className="text-charcoal/65 leading-relaxed text-center mb-10 max-w-3xl mx-auto">
                    {hsp.universityPathwaysDescription}
                  </p>

                  {/* Infinite marquee */}
                  <div className="relative overflow-hidden group/marquee">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div className="flex gap-14 md:gap-20 animate-marquee group-hover/marquee:[animation-play-state:paused]">
                      {/* Render logos twice for seamless loop */}
                      {[...Array(2)].map((_, setIdx) => (
                        <div key={setIdx} className="flex gap-14 md:gap-20 items-center shrink-0">
                          {[
                            { name: 'Tecnológico de Monterrey', src: '/images/logos/universities/tecnologico-de-monterrey.png', tall: false },
                            { name: 'Red de Universidades Anáhuac', src: '/images/logos/universities/universidad-anahuac.png', tall: false },
                            { name: 'UVM', src: '/images/logos/universities/uvm.png', tall: false },
                            { name: 'Universidad Tecmilenio', src: '/images/logos/universities/universidad-tecmilenio.png', tall: 'extra' as const },
                            { name: 'Universidad Mondragón México', src: '/images/logos/universities/universidad-mondragon-mexico.png', tall: false },
                            { name: 'Arkansas State University', src: '/images/logos/universities/arkansas-state-university.png', tall: true },
                            { name: 'Universidad Cuauhtémoc', src: '/images/logos/universities/universidad-cuauhtemoc.png', tall: false },
                            { name: 'EBC', src: '/images/logos/universities/ebc-escuela-bancaria-comercial.png', tall: true },
                            { name: 'Libre de Negocios', src: '/images/logos/universities/libre-de-negocios.png', tall: false },
                          ].map((logo, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-center h-20 md:h-24 shrink-0"
                            >
                              <img
                                src={logo.src}
                                alt={logo.name}
                                className={`${logo.tall === 'extra' ? 'h-20 md:h-24' : logo.tall ? 'h-14 md:h-[4.5rem]' : 'h-12 md:h-16'} w-auto object-contain hover:scale-110 transition-transform duration-300`}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-charcoal/40 text-center mt-8 italic">
                    {hsp.universityPathwaysFootnote}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 8 — STATS BAR
        ════════════════════════════════════════════════ */}
        <section className="py-10 md:py-14 bg-gradient-to-b from-warmgray/20 to-sand/60 animate-section">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {[
                { value: '3', label: hs.statCampuses, gradient: 'from-deep-ember/15 to-deep-ember/5', border: 'border-deep-ember/20' },
                { value: '100%', label: hs.statBilingual, gradient: 'from-golden-spark/15 to-golden-spark/5', border: 'border-golden-spark/25' },
                { value: '6', label: hs.statCertifications, gradient: 'from-steel/12 to-steel/5', border: 'border-steel/20' },
                { value: '6', label: hs.statProjects, gradient: 'from-deep-ember/10 to-golden-spark/8', border: 'border-golden-spark/20' },
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
            SECTION 9 — PHOTO GALLERY
        ════════════════════════════════════════════════ */}
        <section className="py-10 md:py-14 bg-gradient-to-b from-sand/60 to-warmgray/20 relative overflow-hidden animate-section">
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
                {hsp.galleryTitle}{' '}
                <span className="text-deep-ember">{hsp.galleryTitleAccent}</span>
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
                        ? 'ring-2 ring-deep-ember opacity-100 scale-105'
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
            SECTION 10 — FINAL CTA
        ════════════════════════════════════════════════ */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
