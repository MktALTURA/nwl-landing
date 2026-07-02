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
  FiCompass,
  FiSun,
  FiTablet,
  FiUserCheck,
} from 'react-icons/fi';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { LuBrain, LuRocket } from 'react-icons/lu';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useBrochure } from '@/lib/BrochureContext';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import SparkleAnimation from '@/components/SparkleAnimation';
import Crest from '@/components/ui/Crest';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Pillar icon + color config ── */
const pillarConfig = [
  { icon: FiBookOpen, gradient: 'from-eucalyptus/20 to-eucalyptus/5', border: 'border-eucalyptus/25', accent: 'text-navy', num: 'bg-eucalyptus/15 text-navy' },
  { icon: FiGlobe, gradient: 'from-navy/10 to-navy/5', border: 'border-navy/20', accent: 'text-navy', num: 'bg-navy/10 text-navy' },
  { icon: FiAward, gradient: 'from-gold/15 to-gold/5', border: 'border-gold/25', accent: 'text-gold-600', num: 'bg-gold/10 text-gold-600' },
];

/* ── Gradual-technology (iPad by grade) config ── */
const gradeTechConfig = [
  { icon: FiUserCheck, gradient: 'from-eucalyptus/20 via-eucalyptus/10 to-eucalyptus/5', border: 'border-eucalyptus/30', iconBox: 'bg-eucalyptus/15 text-navy', chip: 'bg-eucalyptus text-[#1C0F00]' },
  { icon: FiTablet, gradient: 'from-navy/10 via-navy/5 to-navy/5', border: 'border-navy/20', iconBox: 'bg-navy/10 text-navy', chip: 'bg-navy text-paper' },
  { icon: FiTablet, gradient: 'from-gold/15 via-gold/10 to-gold/5', border: 'border-gold/30', iconBox: 'bg-gold/10 text-gold-600', chip: 'bg-gold text-[#1C0F00]' },
];

/* ── Timeline icon map ── */
const timelineIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  compass: FiCompass,
  lightbulb: HiOutlineLightBulb,
  globe: FiGlobe,
  sun: FiSun,
  brain: LuBrain,
  rocket: LuRocket,
  users: FiUsers,
  star: FiStar,
};

const timelineColors = [
  'bg-eucalyptus/15 text-navy border-eucalyptus/25',
  'bg-navy/10 text-navy border-navy/20',
  'bg-gold/10 text-gold-600 border-gold/20',
  'bg-eucalyptus/15 text-navy border-eucalyptus/25',
  'bg-navy/10 text-navy border-navy/20',
  'bg-gold/10 text-gold-600 border-gold/20',
  'bg-eucalyptus/15 text-navy border-eucalyptus/25',
  'bg-navy/10 text-navy border-navy/20',
];

/* ── Gallery images ── */
const kinderGalleryImages = [
  { src: '/images/levels/kinder/kinder-friends.jpg', alt: 'NWL Australian School Kinder students socializing during group activity' },
  { src: '/images/levels/kinder/kinder-tunnel-play.jpg', alt: 'Kinder children playing in tunnel during outdoor recess at NWL Australian School' },
  { src: '/images/levels/kinder/kinder-students.jpg', alt: 'NWL Australian School Kinder students in bilingual classroom session' },
  { src: '/images/levels/kinder/kinder-classroom.jpg', alt: 'Kinder classroom at NWL Australian School with learning materials' },
  { src: '/images/levels/kinder/kinder-climbing.jpg', alt: 'Child climbing on playground equipment at NWL Australian School Kinder' },
  { src: '/images/levels/kinder/kinder-playground.jpg', alt: 'NWL Australian School Kinder outdoor playground and play area' },
  { src: '/images/levels/kinder/kinder-tablets.jpg', alt: 'Kinder students using tablets for digital learning at NWL Australian School' },
  { src: '/images/levels/kinder/kinder-digital-learning.jpg', alt: 'NWL Australian School Kinder digital literacy and technology session' },
  { src: '/images/levels/kinder/san-miguel-classrooms.jpg', alt: 'NWL Australian School Kinder classroom at San Miguel de Allende campus' },
  { src: '/images/levels/kinder/nwl-milenio-kinder-courtyard.jpg', alt: 'Colorful kinder courtyard at NWL Campus Milenio' },
];

export default function KinderPage() {
  const mainRef = useRef<HTMLElement>(null);
  const [activeGallery, setActiveGallery] = useState(0);
  const { locale, t } = useLanguage();
  const { openBrochure } = useBrochure();
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
      <SparkleAnimation />
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
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-navy-900/10" />

          <div className="container-custom relative z-10 pb-20 pt-40">
            <div className="hidden md:block absolute right-6 lg:right-12 bottom-20 z-10">
              <Crest level="kinder" size={104} showBanner={false} />
            </div>
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
                className="inline-block bg-white/15 backdrop-blur-sm text-gold-400 px-4 py-1.5 rounded-full text-sm font-bold mb-5 border border-white/10"
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
                <a href="#admissions" className="btn-primary">
                  {k.cta}
                </a>
                <button
                  onClick={() => openBrochure('maternal-kinder')}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-sm font-medium hover:bg-white/20 transition-colors border border-white/25"
                >
                  {k.ctaSecondary}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 2 — OVERVIEW + STATS
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
                <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-6">
                  {kp.overviewTitle}{' '}
                  <span className="italic text-gold">
                    {kp.overviewTitleAccent}
                  </span>
                </h2>
                <p className="text-lg text-navy/70 leading-relaxed mb-8">
                  {k.description}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="relative group bg-gradient-to-br from-eucalyptus/10 to-eucalyptus/5 rounded-2xl p-5 border border-eucalyptus/25 hover:shadow-md hover:border-eucalyptus/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-eucalyptus/20 flex items-center justify-center mb-3">
                      <FiGlobe size={20} className="text-navy" />
                    </div>
                    <span className="block text-2xl md:text-3xl font-bold text-navy tracking-tight">100%</span>
                    <span className="text-xs md:text-sm text-n-500 font-medium">{k.statBilingual}</span>
                  </div>
                  <div className="relative group bg-gradient-to-br from-navy/10 to-navy/5 rounded-2xl p-5 border border-navy/15 hover:shadow-md hover:border-navy/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center mb-3">
                      <FiMapPin size={20} className="text-navy" />
                    </div>
                    <span className="block text-2xl md:text-3xl font-bold text-navy tracking-tight">5</span>
                    <span className="text-xs md:text-sm text-n-500 font-medium">{k.statCampuses}</span>
                  </div>
                  <div className="relative group bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl p-5 border border-gold/20 hover:shadow-md hover:border-gold/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                      <FiClock size={20} className="text-gold-600" />
                    </div>
                    <span className="block text-2xl md:text-3xl font-bold text-navy tracking-tight">{k.schedule}</span>
                    <span className="text-xs md:text-sm text-n-500 font-medium">{k.statSchedule}</span>
                  </div>
                </div>

                {/* Kn·Spark Sense pill */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-eucalyptus text-[#1C0F00] px-5 py-2.5 rounded-full font-bold shadow-lg text-sm"
                >
                  <FiStar size={14} />
                  {kp.knotionSenseBadge}
                </motion.div>
              </motion.div>

              {/* Right — Testimonial */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-eucalyptus/10 via-white to-gold/10 rounded-3xl p-8 md:p-10 relative overflow-hidden border border-n-200"
              >
                <div className="absolute top-2 left-6 text-gold/30 text-8xl font-display leading-none select-none">
                  &ldquo;
                </div>
                <blockquote className="relative z-10 text-xl md:text-2xl text-navy font-medium italic leading-relaxed mb-6">
                  &ldquo;{k.testimonial}&rdquo;
                </blockquote>
                <p className="relative z-10 text-n-500 font-medium">&mdash; {k.testimonialAuthor}</p>
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
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
                {kp.pillarsTitle}{' '}
                <span className="italic text-gold">{kp.pillarsTitleAccent}</span>
              </h2>
              <p className="text-lg text-n-500 max-w-2xl mx-auto">
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
                    className={`bg-gradient-to-br ${cfg.gradient} rounded-2xl p-7 border ${cfg.border} hover:shadow-lg transition-shadow relative`}
                  >
                    {pillar.logo && (
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Image
                          src={pillar.logo}
                          alt={pillar.title}
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                        {pillar.logo2 && (
                          <Image
                            src={pillar.logo2}
                            alt="Tec de Monterrey"
                            width={56}
                            height={56}
                            className="object-contain"
                          />
                        )}
                      </div>
                    )}
                    {/* Number + Icon */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-xl ${cfg.num} flex items-center justify-center font-bold text-lg`}>
                        {i + 1}
                      </div>
                      <Icon size={22} className={cfg.accent} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-navy mb-1 pr-10">{pillar.title}</h3>
                    <p className={`text-sm font-semibold ${cfg.accent} mb-3`}>{pillar.subtitle}</p>
                    <p className="text-navy/70 leading-relaxed text-[15px]">{pillar.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 3.5 — GRADUAL TECHNOLOGY (iPad by grade)
        ════════════════════════════════════════════════ */}
        <section className="section-padding bg-n-50 relative overflow-hidden animate-section">
          {/* Playful background blobs */}
          <div className="absolute top-12 right-[8%] w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-[10%] w-64 h-64 bg-eucalyptus/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-80 h-40 bg-navy/5 rounded-full blur-3xl" />

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
                {kp.gradTechTitle}{' '}
                <span className="italic text-gold">{kp.gradTechTitleAccent}</span>
              </h2>
              <p className="text-lg text-n-500 max-w-2xl mx-auto">
                {kp.gradTechSubtitle}
              </p>
              <Image
                src="/images/logos/partners/kn-spark-sense-knotion-color.png"
                alt="Kn·Spark Sense by Knotion"
                width={360}
                height={104}
                className="h-12 md:h-14 w-auto object-contain mx-auto mt-7"
              />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {kp.gradTech.map((g, i) => {
                const cfg = gradeTechConfig[i];
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
                    <div className={`w-12 h-12 rounded-xl ${cfg.iconBox} flex items-center justify-center mb-4 shadow-md`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-navy mb-3">{g.grade}</h3>
                    <div className={`inline-flex items-center gap-2 ${cfg.chip} px-3 py-1.5 rounded-full text-sm font-semibold mb-4`}>
                      {g.device}
                    </div>
                    <p className="text-navy/70 leading-relaxed text-[15px]">{g.detail}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 4 — A DAY IN KINDER (TIMELINE)
        ════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-paper to-white relative overflow-hidden animate-section">
          {/* Playful background blobs */}
          <div className="absolute top-10 left-[10%] w-72 h-72 bg-eucalyptus/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-[15%] w-56 h-56 bg-navy/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-80 h-40 bg-gold/10 rounded-full blur-3xl" />

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="wine-divider mx-auto mb-4" />
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy">
                {kp.dayTitle}{' '}
                <span className="italic text-gold">{kp.dayTitleAccent}</span>
              </h2>
            </motion.div>

            {/* Desktop: single row of 8 with connecting line */}
            <div className="hidden md:block relative">
              {/* Connecting line — sits behind icons */}
              <div className="absolute top-[26px] left-[6%] right-[6%] h-[3px] rounded-full bg-gradient-to-r from-eucalyptus/25 via-gold/20 to-navy/15 z-0" />

              <div className="grid grid-cols-8 gap-3">
                {kp.daySchedule.map((item, i) => {
                  const Icon = timelineIcons[item.icon] || FiStar;
                  const iconStyles = [
                    'bg-eucalyptus text-[#1C0F00]',
                    'bg-navy text-paper',
                    'bg-gold text-[#1C0F00]',
                    'bg-eucalyptus text-[#1C0F00]',
                    'bg-navy text-paper',
                    'bg-gold text-[#1C0F00]',
                    'bg-navy text-paper',
                    'bg-eucalyptus text-[#1C0F00]',
                  ];
                  const badgeStyles = [
                    'bg-eucalyptus/15 text-navy',
                    'bg-navy/10 text-navy',
                    'bg-gold/10 text-gold-600',
                    'bg-eucalyptus/15 text-navy',
                    'bg-navy/10 text-navy',
                    'bg-gold/10 text-gold-600',
                    'bg-navy/10 text-navy',
                    'bg-eucalyptus/15 text-navy',
                  ];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center text-center"
                    >
                      {/* Solid icon circle — no transparency, line stays behind */}
                      <div className={`relative z-10 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-md ${iconStyles[i]}`}>
                        <Icon size={22} />
                      </div>

                      {/* Time badge */}
                      <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full mt-3 mb-1.5 ${badgeStyles[i]}`}>
                        {item.time}
                      </span>

                      {/* Activity */}
                      <p className="text-xs text-navy/70 leading-snug font-medium mt-0.5">
                        {item.activity}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: 2-column grid */}
            <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-8">
              {kp.daySchedule.map((item, i) => {
                const Icon = timelineIcons[item.icon] || FiStar;
                const mobileColors = [
                  'bg-eucalyptus/15 text-navy border-eucalyptus/25',
                  'bg-navy/10 text-navy border-navy/15',
                  'bg-gold/10 text-gold-600 border-gold/20',
                  'bg-eucalyptus/15 text-navy border-eucalyptus/25',
                  'bg-navy/10 text-navy border-navy/15',
                  'bg-gold/10 text-gold-600 border-gold/20',
                  'bg-navy/10 text-navy border-navy/15',
                  'bg-eucalyptus/15 text-navy border-eucalyptus/25',
                ];
                const timeBadgeColors = [
                  'bg-eucalyptus/15 text-navy',
                  'bg-navy/10 text-navy',
                  'bg-gold/10 text-gold-600',
                  'bg-eucalyptus/15 text-navy',
                  'bg-navy/10 text-navy',
                  'bg-gold/10 text-gold-600',
                  'bg-navy/10 text-navy',
                  'bg-eucalyptus/15 text-navy',
                ];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 border-2 shadow-sm ${mobileColors[i]}`}>
                      <Icon size={22} />
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full mb-1.5 ${timeBadgeColors[i]}`}>
                      {item.time}
                    </span>
                    <p className="text-sm text-navy/80 leading-snug font-semibold">
                      {item.activity}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 5 — PHOTO GALLERY
        ════════════════════════════════════════════════ */}
        <section className="py-10 md:py-14 bg-gradient-to-b from-n-50 to-paper relative overflow-hidden animate-section">
          <div className="absolute top-0 right-10 w-40 h-40 bg-eucalyptus/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-navy/5 rounded-full blur-3xl" />

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
                {kp.galleryTitle}{' '}
                <span className="italic text-gold">{kp.galleryTitleAccent}</span>
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
                  <FiChevronLeft size={20} className="text-navy" />
                </button>
                <button
                  onClick={() => setActiveGallery((i) => (i + 1) % kinderGalleryImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
                  aria-label="Next"
                >
                  <FiChevronRight size={20} className="text-navy" />
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
                        ? 'ring-2 ring-gold opacity-100 scale-105'
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
