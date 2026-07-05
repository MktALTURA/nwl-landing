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
import Crest from '@/components/ui/Crest';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Tailwind safelist — ensures JIT generates these dynamic classes ──
   bg-gold bg-jacaranda text-gold text-jacaranda
   bg-jacaranda/10 bg-gold/15 bg-jacaranda/15 bg-n-500/15
   text-gold-600 text-n-500
   border-jacaranda/20 border-gold/25 border-n-200
   from-jacaranda/15 from-jacaranda/5 from-gold/15 from-gold/5 from-n-500/10 from-n-500/5
   to-jacaranda/5 to-gold/5 to-n-500/5
   from-jacaranda via-gold via-jacaranda to-gold to-coral-sea
   bg-navy bg-coral-sea bg-wattle bg-eucalyptus
   bg-navy/10 bg-jacaranda/10 bg-coral-sea/10 bg-gold/10 bg-wattle/15 bg-eucalyptus/15
   text-navy text-coral-sea text-paper text-[#1C0F00]
   ring-navy/30 ring-jacaranda/30 ring-coral-sea/30 ring-gold/30 ring-wattle/30 ring-eucalyptus/30
── */

/* ── Value prop icons ── */
const valuePropIcons = [FiCompass, FiZap, FiBookOpen, FiDollarSign, FiAward, FiCpu, FiTarget];
const valuePropStyles = [
  { bg: 'bg-jacaranda/10', accent: 'text-jacaranda', border: 'border-jacaranda/20' },
  { bg: 'bg-gold/15', accent: 'text-gold-600', border: 'border-gold/25' },
  { bg: 'bg-jacaranda/10', accent: 'text-jacaranda', border: 'border-jacaranda/20' },
  { bg: 'bg-gold/15', accent: 'text-gold-600', border: 'border-gold/25' },
  { bg: 'bg-jacaranda/10', accent: 'text-jacaranda', border: 'border-jacaranda/20' },
  { bg: 'bg-gold/15', accent: 'text-gold-600', border: 'border-gold/25' },
  { bg: 'bg-jacaranda/10', accent: 'text-jacaranda', border: 'border-jacaranda/20' },
];

/* ── Semester colors — 6-stop NWL brand journey ── */
const semesterColors = [
  { bg: 'bg-navy', text: 'text-paper', ring: 'ring-navy/30', badge: 'bg-navy/10 text-navy' },
  { bg: 'bg-jacaranda', text: 'text-paper', ring: 'ring-jacaranda/30', badge: 'bg-jacaranda/10 text-jacaranda' },
  { bg: 'bg-coral-sea', text: 'text-paper', ring: 'ring-coral-sea/30', badge: 'bg-coral-sea/10 text-coral-sea' },
  { bg: 'bg-gold', text: 'text-[#1C0F00]', ring: 'ring-gold/30', badge: 'bg-gold/10 text-gold-600' },
  { bg: 'bg-wattle', text: 'text-[#1C0F00]', ring: 'ring-wattle/30', badge: 'bg-wattle/15 text-gold-600' },
  { bg: 'bg-eucalyptus', text: 'text-[#1C0F00]', ring: 'ring-eucalyptus/30', badge: 'bg-eucalyptus/15 text-navy' },
];

/* ── Pillar colors ── */
const pillarColors = [
  { gradient: 'from-jacaranda/15 to-jacaranda/5', border: 'border-jacaranda/20', accent: 'text-jacaranda', num: 'bg-jacaranda/15 text-jacaranda' },
  { gradient: 'from-gold/15 to-gold/5', border: 'border-gold/25', accent: 'text-gold-600', num: 'bg-gold/15 text-navy' },
  { gradient: 'from-n-500/10 to-n-500/5', border: 'border-n-200', accent: 'text-n-500', num: 'bg-n-500/15 text-navy' },
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
  { src: '/images/levels/prepa/nwl-zibata-prepa-classroom-jackets.jpg', alt: 'Prepa NWL classroom at Zibata with NWL varsity jackets and iPads' },
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
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-jacaranda/20" />

          {/* Level crest — bottom right */}
          <div className="absolute bottom-16 right-8 z-10 hidden lg:block">
            <Crest level="high" size={104} showBanner={false} />
          </div>

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
              {/* Age Badge */}
              <div className="flex items-center gap-5 mb-6">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="inline-block bg-gold/20 backdrop-blur-sm text-gold-400 px-4 py-1.5 rounded-full text-sm font-bold border border-gold/30"
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
                <a href="#admissions" className="btn-primary inline-block">
                  {hs.cta}
                </a>
                <button
                  onClick={() => openBrochure('high-school')}
                  className="bg-white/10 backdrop-blur-sm text-white px-7 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors border border-white/25"
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
        <section className="py-12 md:py-20 bg-gradient-to-b from-paper via-n-100/15 to-n-100/25 animate-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">
                {hsp.valuePropsTitle}{' '}
                <span className="italic text-jacaranda">{hsp.valuePropsTitleAccent}</span>
              </h2>
              <p className="text-lg text-navy/70 max-w-2xl mx-auto mt-4">
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
                        <p className="text-n-500 text-sm leading-relaxed">{prop.description}</p>
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
                        <h3 className="font-display text-lg font-bold text-navy mb-2">{prop.title}</h3>
                        <p className="text-n-500 text-sm leading-relaxed">{prop.description}</p>
                      </>
                    ) : i === 4 ? (
                      <>
                        <img
                          src="/images/logos/hokku-academy.webp"
                          alt="Hokku Academy"
                          className="h-16 w-auto mb-4"
                        />
                        <p className="text-n-500 text-sm leading-relaxed">{prop.description}</p>
                      </>
                    ) : (
                      <>
                        <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
                          <Icon size={20} className={s.accent} />
                        </div>
                        <h3 className="font-display text-lg font-bold text-navy mb-2">{prop.title}</h3>
                        <p className="text-n-500 text-sm leading-relaxed">{prop.description}</p>
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
        <section className="py-12 md:py-20 bg-gradient-to-b from-n-100/25 to-paper animate-section overflow-hidden">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">
                {hsp.journeyTitle}{' '}
                <span className="italic text-gold">
                  {hsp.journeyTitleAccent}
                </span>
              </h2>
              <p className="text-lg text-navy/70 max-w-2xl mx-auto mt-4">
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
                    className="bg-white rounded-2xl p-6 border border-n-200 hover:shadow-lg transition-shadow relative overflow-hidden"
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

                    <h3 className="font-display text-base font-bold text-navy mb-3 leading-snug">
                      {sem.theme}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {sem.skills.map((skill, j) => (
                        <span
                          key={j}
                          className="text-[11px] font-medium text-n-500 bg-n-100/40 px-2 py-0.5 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-n-400 italic">
                      {locale === 'es' ? 'Proyecto: ' : 'Project: '}
                      <span className="font-semibold text-navy/70">{sem.project}</span>
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
                className="absolute top-1 bottom-1 w-[2px] origin-top bg-gradient-to-b from-jacaranda via-gold to-coral-sea"
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
                      <span className="text-[11px] font-bold tracking-widest uppercase text-n-400 mb-0.5 block">
                        {locale === 'es' ? `Semestre ${sem.number}` : `Semester ${sem.number}`}
                      </span>
                      <p className="font-bold text-navy text-[15px] mb-1.5">
                        {sem.theme}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        {sem.skills.map((skill, j) => (
                          <span key={j} className="text-[10px] font-medium text-n-500 bg-n-100/40 px-2 py-0.5 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-n-400 italic">
                        {locale === 'es' ? 'Proyecto: ' : 'Project: '}
                        <span className="font-semibold text-navy/70">{sem.project}</span>
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
        <section className="py-12 md:py-20 bg-gradient-to-b from-paper via-n-100/10 to-n-100/20 animate-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
                {hsp.pillarsTitle}{' '}
                <span className="italic text-jacaranda">{hsp.pillarsTitleAccent}</span>
              </h2>
              <p className="text-lg text-navy/70 max-w-2xl mx-auto">
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
                  <span className="flex items-center gap-2 bg-navy-900/75 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
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
                    className="fixed inset-0 z-[9999] bg-navy-900/90 backdrop-blur-sm"
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
                    <h3 className="font-display text-xl font-bold text-navy mb-1">{pillar.title}</h3>
                    <p className={`text-sm font-semibold ${c.accent} mb-3`}>{pillar.subtitle}</p>
                    <p className="text-navy/70 leading-relaxed text-[15px]">{pillar.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 5 — EXCLUSIVE PROGRAMS
        ════════════════════════════════════════════════ */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-n-100/20 to-paper/80 animate-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
                {hsp.exclusiveTitle}{' '}
                <span className="italic text-gold">
                  {hsp.exclusiveTitleAccent}
                </span>
              </h2>
              <p className="text-lg text-navy/70 max-w-2xl mx-auto">
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
              <div className="nwl-bg-dawn-deep rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-white/10">
                <div className="h-[3px] bg-gradient-to-r from-jacaranda via-gold to-gold" />
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
                          <FiAward size={20} className="text-gold-400" />
                        </div>
                        <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold-400">
                          {locale === 'es' ? 'Programa Estrella' : 'Star Program'}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-paper mb-1">
                        {hsp.exclusivePrograms[0].title}
                      </h3>
                      <p className="text-sm font-semibold text-gold-400 mb-4">
                        {hsp.exclusivePrograms[0].partner}
                      </p>
                      <p className="text-paper/70 leading-relaxed mb-6">
                        {hsp.exclusivePrograms[0].description}
                      </p>
                      <ul className="space-y-3">
                        {hsp.exclusivePrograms[0].highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                            <span className="text-paper/80 text-sm leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-shrink-0 pt-2">
                      <div className="bg-white/95 rounded-xl px-4 py-3">
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
                const accentColors = ['gold', 'jacaranda'];
                const accent = accentColors[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-n-200"
                  >
                    <div className={`h-[3px] bg-${accent}`} />
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold text-navy mb-1">
                        {program.title}
                      </h3>
                      <p className={`text-xs font-semibold text-${accent} mb-3`}>
                        {program.partner}
                      </p>
                      <p className="text-n-500 text-sm leading-relaxed mb-4">
                        {program.description}
                      </p>
                      <ul className="space-y-2">
                        {program.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <div className={`w-1 h-1 rounded-full bg-${accent} mt-2 flex-shrink-0`} />
                            <span className="text-n-500 text-xs leading-relaxed">{h}</span>
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
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white via-paper/60 to-gold/10 shadow-sm hover:shadow-lg transition-shadow border border-gold/20">
                  <div className="h-[3px] bg-gradient-to-r from-gold via-jacaranda to-gold" />
                  <div className="relative p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
                          <FiGlobe size={20} className="text-jacaranda" />
                        </div>
                        <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold-600">
                          {locale === 'es' ? 'Experiencia Global' : 'Global Experience'}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-navy mb-2">
                        {hsp.exclusivePrograms[3].title}
                      </h3>
                      <p className="text-navy/70 leading-relaxed mb-6">
                        {hsp.exclusivePrograms[3].description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {hsp.exclusivePrograms[3].highlights.map((h, j) => (
                          <span
                            key={j}
                            className="inline-flex items-center gap-2 bg-jacaranda/10 text-navy/70 text-sm px-4 py-2 rounded-full border border-jacaranda/10"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-jacaranda flex-shrink-0" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 hidden md:flex flex-col items-center gap-2">
                      <div className="text-6xl">🌍</div>
                      <span className="text-n-400 text-xs font-medium tracking-wider uppercase">
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
        <section className="py-12 md:py-20 bg-gradient-to-b from-paper/80 to-n-100/20 animate-section">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border border-n-200 shadow-sm"
              >
                {/* Banner image with McGraw-Hill badge */}
                <div className="relative aspect-[21/9] bg-paper">
                  <Image
                    src="/images/levels/prepa/prepa-nwl-student-studying-classroom.jpg"
                    alt="Prepa NWL student studying in classroom"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />
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
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-2">
                    {hsp.academicTitle}{' '}
                    <span className="italic text-jacaranda">{hsp.academicTitleAccent}</span>
                  </h2>
                  <p className="text-navy/70 leading-relaxed mb-6">
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
                        <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                        <span className="text-navy/70 text-sm leading-relaxed">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <a
                    href={locale === 'es'
                      ? '/images/levels/prepa/es/plan-de-estudios-prepa-nwl-2025.pdf'
                      : '/images/levels/prepa/en/plan-de-estudios-prepa-nwl.pdf'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 text-sm font-semibold text-jacaranda border border-jacaranda/25 rounded-full hover:bg-jacaranda/5 transition-colors"
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
        <section className="py-12 md:py-20 bg-gradient-to-b from-n-100/20 to-paper/60 animate-section">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">
                {hsp.universityPathwaysTitle}{' '}
                <span className="italic text-gold">
                  {hsp.universityPathwaysTitleAccent}
                </span>
              </h2>
              <p className="text-lg text-navy/70 max-w-2xl mx-auto mt-4">
                {hsp.universityPathwaysSubtitle}
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border border-n-200 shadow-sm"
              >
                <div className="h-[3px] bg-gradient-to-r from-jacaranda to-gold" />
                <div className="p-8 md:p-12">
                  <p className="text-navy/70 leading-relaxed text-center mb-10 max-w-3xl mx-auto">
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

                  <p className="text-xs text-n-400 text-center mt-8 italic">
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
        <section className="py-10 md:py-14 bg-gradient-to-b from-n-100/20 to-paper/60 animate-section">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {[
                { value: '3', label: hs.statCampuses, gradient: 'from-jacaranda/15 to-jacaranda/5', border: 'border-jacaranda/20' },
                { value: '100%', label: hs.statBilingual, gradient: 'from-gold/15 to-gold/5', border: 'border-gold/25' },
                { value: '6', label: hs.statCertifications, gradient: 'from-n-500/10 to-n-500/5', border: 'border-n-200' },
                { value: '6', label: hs.statProjects, gradient: 'from-jacaranda/10 to-gold/10', border: 'border-gold/20' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-5 border ${stat.border}`}
                >
                  <span className="block text-3xl font-bold text-navy tracking-tight">{stat.value}</span>
                  <span className="text-sm text-n-500 font-medium">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 9 — PHOTO GALLERY
        ════════════════════════════════════════════════ */}
        <section className="py-10 md:py-14 bg-gradient-to-b from-paper/60 to-n-100/20 relative overflow-hidden animate-section">
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy">
                {hsp.galleryTitle}{' '}
                <span className="italic text-jacaranda">{hsp.galleryTitleAccent}</span>
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
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl mb-4 bg-paper">
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
                  <FiChevronLeft size={20} className="text-navy" />
                </button>
                <button
                  onClick={() => setActiveGallery((idx) => (idx + 1) % galleryImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="Next"
                >
                  <FiChevronRight size={20} className="text-navy" />
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
                        ? 'ring-2 ring-jacaranda opacity-100 scale-105'
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
