'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FiAward, FiHeart, FiMessageSquare, FiTrendingUp, FiFolder, FiCpu, FiCompass,
  FiLayers, FiTarget, FiMessageCircle, FiSmile, FiGlobe, FiUsers, FiMap,
  FiCalendar, FiMic, FiFlag, FiZap, FiShare2, FiArchive, FiCommand,
  FiBarChart2, FiStar, FiMonitor, FiPenTool, FiHome, FiEye, FiSend,
  FiArrowRight, FiArrowLeft, FiArrowDown, FiUser,
} from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  MODEL_COMPONENTS, MODEL_PROMISE, MODEL_RECOGNITIONS,
  type Localized, type ModelComponent,
} from '@/lib/model-data';
import SouthernCross from '@/components/ui/SouthernCross';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

/* ---------- icon registry (keys used in lib/model-data.ts) ---------- */
const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  award: FiAward, heart: FiHeart, 'message-square': FiMessageSquare,
  'trending-up': FiTrendingUp, folder: FiFolder, cpu: FiCpu, compass: FiCompass,
  layers: FiLayers, target: FiTarget, 'message-circle': FiMessageCircle,
  smile: FiSmile, globe: FiGlobe, users: FiUsers, map: FiMap, calendar: FiCalendar,
  mic: FiMic, flag: FiFlag, zap: FiZap, 'share-2': FiShare2, archive: FiArchive,
  command: FiCommand, 'bar-chart-2': FiBarChart2, star: FiStar, monitor: FiMonitor,
  'pen-tool': FiPenTool, home: FiHome, eye: FiEye, send: FiSend,
};
const Icon = ({ name, size = 18, className = '' }: { name: string; size?: number; className?: string }) => {
  const C = ICONS[name] || FiStar;
  return <C size={size} className={className} />;
};

/* ---------- wheel geometry ---------- */
const SEG = 360 / 7;
const GAP = 1.2; // degrees of breathing room between segments
const R_OUTER = 48;
const R_INNER = 28;
const R_LABEL = (R_OUTER + R_INNER) / 2;

function polar(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) };
}
function segmentPath(startDeg: number, endDeg: number) {
  const p1 = polar(R_OUTER, startDeg);
  const p2 = polar(R_OUTER, endDeg);
  const p3 = polar(R_INNER, endDeg);
  const p4 = polar(R_INNER, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${R_OUTER} ${R_OUTER} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${R_INNER} ${R_INNER} 0 ${large} 0 ${p4.x} ${p4.y} Z`;
}

/* ---------- page-local UI strings ---------- */
const UI = {
  heroEyebrow: { en: 'NWL Australian School · Academic Model', es: 'NWL Australian School · Modelo Académico' },
  heroTitle: { en: 'The NWL', es: 'El Modelo' },
  heroTitleAccent: { en: 'Academic Model', es: 'Académico NWL' },
  heroMono: {
    en: 'AN AUSTRALIAN-INSPIRED, FUTURE-READY EDUCATION FOR CONFIDENT LEARNERS AND GLOBAL CITIZENS.',
    es: 'UNA EDUCACIÓN DE INSPIRACIÓN AUSTRALIANA, LISTA PARA EL FUTURO, PARA ALUMNOS SEGUROS Y CIUDADANOS GLOBALES.',
  },
  heroSub: {
    en: 'Seven components. Twenty-one capabilities. One student at the center. This is how the Australian way of learning comes to life at NWL, every day, from Maternal to High School.',
    es: 'Siete componentes. Veintiún capacidades. Un alumno al centro. Así cobra vida el modelo australiano de aprendizaje en NWL, todos los días, de Maternal a High School.',
  },
  statComponents: { en: 'Components', es: 'Componentes' },
  statCapabilities: { en: 'Capabilities', es: 'Capacidades' },
  statCenter: { en: 'Student at the center', es: 'Alumno al centro' },
  heroCtaWheel: { en: 'Explore the wheel', es: 'Explora la rueda' },
  heroCtaVisit: { en: 'Schedule a visit', es: 'Agenda una visita' },
  componentsLabel: {
    en: 'Components — the seven core dimensions of an NWL education: the inner ring of the wheel.',
    es: 'Componentes — las siete dimensiones centrales de una educación NWL: el anillo interior de la rueda.',
  },
  capabilitiesLabel: {
    en: 'Capabilities — the concrete skills and experiences within each component that students live every day.',
    es: 'Capacidades — las habilidades y experiencias concretas de cada componente que los alumnos viven todos los días.',
  },
  wheelEyebrow: { en: 'The wheel', es: 'La rueda' },
  wheelTitle: { en: 'Inside the', es: 'Dentro del' },
  wheelTitleAccent: { en: 'Academic Model', es: 'Modelo Académico' },
  wheelSub: {
    en: 'What each part of the wheel actually means. Tap a component to see the capabilities students live every day.',
    es: 'Qué significa realmente cada parte de la rueda. Toca un componente para ver las capacidades que los alumnos viven a diario.',
  },
  wheelCenterTitle: { en: 'The Student Experience', es: 'La Experiencia del Alumno' },
  wheelCenterSub: { en: 'At the heart of everything we do', es: 'Al centro de todo lo que hacemos' },
  wheelValues: { en: 'BELONGING · EXCELLENCE · PURPOSE', es: 'PERTENENCIA · EXCELENCIA · PROPÓSITO' },
  componentLabel: { en: 'Component', es: 'Componente' },
  capabilitiesCount: { en: '3 capabilities', es: '3 capacidades' },
  seeInDepth: { en: 'See it in depth', es: 'Verlo a fondo' },
  sectionsEyebrow: { en: 'The 7 components', es: 'Los 7 componentes' },
  sectionsTitle: { en: 'What each component', es: 'Qué significa' },
  sectionsTitleAccent: { en: 'really means', es: 'cada componente' },
  placeholder: { en: 'Image coming soon', es: 'Imagen próximamente' },
  whyEyebrow: { en: 'Why Australia', es: 'Por qué Australia' },
  whyTitle: { en: 'Why is the model', es: '¿Por qué es un modelo' },
  whyTitleAccent: { en: 'Australian?', es: 'australiano?' },
  whyIntro: {
    en: 'Australia runs one of the most admired school systems in the world — not because it demands more homework, but because it balances academic rigor with wellbeing, creativity and real-world capabilities. That balance is exactly what NWL has built toward for sixteen years.',
    es: 'Australia tiene uno de los sistemas escolares más admirados del mundo — no porque exija más tarea, sino porque equilibra el rigor académico con el bienestar, la creatividad y las capacidades para la vida real. Ese equilibrio es exactamente lo que NWL ha construido durante dieciséis años.',
  },
  whyCards: [
    {
      icon: 'heart',
      title: { en: 'Wellbeing next to rigor', es: 'Bienestar junto al rigor' },
      text: {
        en: 'The Australian curriculum treats emotional development as a condition for deep learning — not a nice-to-have.',
        es: 'El currículo australiano trata el desarrollo emocional como condición del aprendizaje profundo — no como un extra.',
      },
    },
    {
      icon: 'message-square',
      title: { en: 'English as the engine', es: 'El inglés como motor' },
      text: {
        en: 'True immersion from age 2: English is how school is lived, not a subject on the timetable.',
        es: 'Inmersión real desde los 2 años: el inglés es la forma de vivir la escuela, no una materia en el horario.',
      },
    },
    {
      icon: 'compass',
      title: { en: 'A door to the world', es: 'Una puerta al mundo' },
      text: {
        en: 'Cognia accreditation, the Hokku dual diploma and an international pathway that opens universities in Mexico and abroad.',
        es: 'Acreditación Cognia, el doble diploma Hokku y una ruta internacional que abre universidades en México y el extranjero.',
      },
    },
  ],
  whyKangaroo: {
    en: 'And like the kangaroo on our crest — the model only knows how to move forward.',
    es: 'Y como el canguro de nuestro escudo — este modelo solo sabe avanzar.',
  },
  recognitionsEyebrow: { en: 'Globally recognized', es: 'Reconocimiento global' },
  recognitionsTitle: {
    en: 'The model is backed by names that travel',
    es: 'Un modelo respaldado por nombres que abren puertas',
  },
};

export default function ModeloPage() {
  const { locale } = useLanguage();
  const L = (l: Localized) => l[locale];
  const [active, setActive] = useState(0);
  const c: ModelComponent = MODEL_COMPONENTS[active];

  return (
    <main className="overflow-hidden">
      {/* ============================== HERO ============================== */}
      <section className="relative nwl-bg-dawn-deep text-paper overflow-hidden">
        <SouthernCross height={150} className="absolute top-24 right-[6vw] opacity-40 pointer-events-none" />
        <div className="container-custom relative z-10 pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-6">
              <span className="w-9 h-px bg-gold" />
              {L(UI.heroEyebrow)}
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-medium tracking-[-0.02em] mb-6">
              {L(UI.heroTitle)} <span className="italic text-gold">{L(UI.heroTitleAccent)}</span>
            </h1>
            <p className="font-mono text-[12px] md:text-[13px] uppercase tracking-[0.18em] leading-relaxed text-paper/60 mb-6 max-w-2xl">
              {L(UI.heroMono)}
            </p>
            <p className="text-lg md:text-xl text-paper/80 leading-relaxed max-w-2xl mb-10">
              {L(UI.heroSub)}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <a href="#wheel" className="btn-primary inline-flex items-center gap-2">
                {L(UI.heroCtaWheel)} <FiArrowDown size={16} />
              </a>
              <a
                href="#admissions"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-paper/25 text-paper font-semibold hover:bg-paper/10 transition-colors duration-200"
              >
                {L(UI.heroCtaVisit)}
              </a>
            </div>
            {/* 7 · 21 · 1 */}
            <div className="grid grid-cols-3 max-w-xl border-t border-paper/15">
              {[
                { n: '7', label: L(UI.statComponents) },
                { n: '21', label: L(UI.statCapabilities) },
                { n: '1', label: L(UI.statCenter) },
              ].map((s, i) => (
                <div key={i} className={`pt-5 ${i > 0 ? 'pl-6 border-l border-paper/15' : ''}`}>
                  <div className="font-display text-4xl md:text-5xl font-semibold text-gold">{s.n}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ PROMISE ============================ */}
      <section className="bg-paper animate-section py-14 md:py-16 border-b border-navy/10">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="lg:max-w-md flex-shrink-0">
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-4">
                <span className="w-9 h-px bg-gold" />
                {L(MODEL_PROMISE.label)}
              </span>
              <p className="font-display text-xl md:text-2xl text-navy leading-snug">
                {L(MODEL_PROMISE.text)}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
              {MODEL_PROMISE.outcomes.map((o, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl border border-navy/10 p-5 text-center shadow-[0_12px_30px_-22px_rgba(11,34,78,0.35)]"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold/12 text-gold-600 mb-3">
                    <Icon name={o.icon} size={18} />
                  </span>
                  <div className="font-semibold text-navy text-sm leading-tight">{o[locale]}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================= WHEEL EXPLORER ========================= */}
      <section id="wheel" className="nwl-bg-dawn text-paper section-padding animate-section relative overflow-hidden scroll-mt-20">
        <div className="absolute top-16 right-[4vw] opacity-25 pointer-events-none">
          <SouthernCross height={110} />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-9 h-px bg-gold" />
              {L(UI.wheelEyebrow)}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-[-0.02em] mb-4">
              {L(UI.wheelTitle)} <span className="italic text-gold">{L(UI.wheelTitleAccent)}</span>
            </h2>
            <p className="text-paper/70 max-w-2xl mx-auto text-lg">{L(UI.wheelSub)}</p>
          </div>

          <div className="grid lg:grid-cols-[1.05fr,0.95fr] gap-10 lg:gap-14 items-center">
            {/* --- the wheel --- */}
            <div className="relative w-full max-w-[560px] mx-auto aspect-square select-none">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                {MODEL_COMPONENTS.map((comp, i) => {
                  const mid = i * SEG;
                  const isActive = i === active;
                  return (
                    <path
                      key={comp.id}
                      d={segmentPath(mid - SEG / 2 + GAP, mid + SEG / 2 - GAP)}
                      fill={comp.color}
                      opacity={isActive ? 1 : 0.5}
                      stroke={isActive ? 'var(--nwl-gold)' : 'transparent'}
                      strokeWidth={isActive ? 0.7 : 0}
                      className="cursor-pointer transition-all duration-300"
                      style={{ transformOrigin: '50% 50%', transform: isActive ? 'scale(1.02)' : 'scale(1)' }}
                      onClick={() => setActive(i)}
                    />
                  );
                })}
                {/* center */}
                <circle cx="50" cy="50" r="25.5" fill="var(--nwl-gold)" opacity="0.9" />
                <circle cx="50" cy="50" r="24.6" fill="#071638" />
              </svg>

              {/* segment labels */}
              {MODEL_COMPONENTS.map((comp, i) => {
                const p = polar(R_LABEL, i * SEG);
                const isActive = i === active;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center w-[24%] transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-105' : 'opacity-75 hover:opacity-100'
                    }`}
                    style={{ left: `${p.x}%`, top: `${p.y}%`, color: comp.darkText ? '#1C0F00' : '#F4EEE2' }}
                  >
                    <Icon name={comp.icon} size={18} className="mb-1 hidden sm:block" />
                    <span className="font-semibold text-[8.5px] sm:text-[10px] md:text-[11px] leading-[1.15] drop-shadow-sm">
                      {L(comp.name)}
                    </span>
                  </button>
                );
              })}

              {/* center label */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] text-center pointer-events-none">
                <span className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-gold/15 text-gold mb-2">
                  <FiUser size={18} />
                </span>
                <div className="font-display text-sm md:text-lg font-semibold leading-tight text-paper">
                  {L(UI.wheelCenterTitle)}
                </div>
                <div className="font-mono text-[7.5px] md:text-[9px] uppercase tracking-[0.16em] text-paper/55 mt-1.5">
                  {L(UI.wheelCenterSub)}
                </div>
              </div>
            </div>

            {/* --- detail panel --- */}
            <div className="lg:min-h-[480px] flex flex-col">
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.06] border border-white/10 rounded-3xl p-7 md:p-9 backdrop-blur-sm flex-1"
              >
                  <div className="flex items-center gap-4 mb-5">
                    <span
                      className="inline-flex items-center justify-center w-12 h-12 rounded-2xl flex-shrink-0"
                      style={{ background: c.color, color: c.darkText ? '#1C0F00' : '#F4EEE2' }}
                    >
                      <Icon name={c.icon} size={22} />
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                        {L(UI.componentLabel)} 0{active + 1} · {L(UI.capabilitiesCount)}
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-semibold text-paper leading-tight">
                        {L(c.name)}
                      </h3>
                    </div>
                  </div>
                  <p className="italic text-paper/60 mb-6">{L(c.tagline)}</p>

                  <div className="space-y-4 mb-7">
                    {c.capabilities.map((cap, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <span
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 mt-0.5"
                          style={{ background: `${c.color}4D`, color: '#F4EEE2' }}
                        >
                          <Icon name={cap.icon} size={16} />
                        </span>
                        <div>
                          <div className="font-semibold text-paper">{L(cap.name)}</div>
                          <p className="text-sm text-paper/65 leading-relaxed">{L(cap.description)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-white/10">
                    <a
                      href={`#${c.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:gap-3 transition-all"
                    >
                      {L(UI.seeInDepth)} <FiArrowRight size={15} />
                    </a>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActive((active + 6) % 7)}
                        aria-label="Previous component"
                        className="w-9 h-9 rounded-full border border-white/20 inline-flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <FiArrowLeft size={15} />
                      </button>
                      <button
                        onClick={() => setActive((active + 1) % 7)}
                        aria-label="Next component"
                        className="w-9 h-9 rounded-full border border-white/20 inline-flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <FiArrowRight size={15} />
                      </button>
                    </div>
                  </div>
              </motion.div>
            </div>
          </div>

          <div className="text-center mt-12 font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-gold/80">
            {L(UI.wheelValues)}
          </div>

          {/* components / capabilities definitions */}
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mt-10 text-sm text-paper/55 leading-relaxed">
            <p>{L(UI.componentsLabel)}</p>
            <p>{L(UI.capabilitiesLabel)}</p>
          </div>
        </div>
      </section>

      {/* ===================== 7 COMPONENT DEEP DIVES ===================== */}
      <section className="section-padding bg-paper animate-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-9 h-px bg-gold" />
              {L(UI.sectionsEyebrow)}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-[-0.02em] text-navy">
              {L(UI.sectionsTitle)} <span className="italic text-gold">{L(UI.sectionsTitleAccent)}</span>
            </h2>
          </div>

          <div className="space-y-20 md:space-y-24">
            {MODEL_COMPONENTS.map((comp, i) => (
              <motion.div
                key={comp.id}
                id={comp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: '-60px' }}
                className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center scroll-mt-28"
              >
                {/* text */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <span
                    className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] mb-4"
                    style={{ color: comp.darkText ? 'var(--nwl-gold-600, #B0750A)' : comp.color }}
                  >
                    <span className="w-9 h-px" style={{ background: comp.color }} />
                    0{i + 1} · {L(comp.tagline)}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-semibold text-navy tracking-tight mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex items-center justify-center w-11 h-11 rounded-2xl flex-shrink-0"
                      style={{ background: comp.color, color: comp.darkText ? '#1C0F00' : '#F4EEE2' }}
                    >
                      <Icon name={comp.icon} size={20} />
                    </span>
                    {L(comp.name)}
                  </h3>
                  <p className="text-navy/70 leading-relaxed mb-7">{L(comp.intro)}</p>

                  <div className="space-y-3">
                    {comp.capabilities.map((cap, j) => (
                      <div
                        key={j}
                        className="flex gap-4 items-start bg-white rounded-2xl border border-n-200 p-4 shadow-[0_10px_26px_-22px_rgba(11,34,78,0.3)]"
                      >
                        <span
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 mt-0.5"
                          style={{ background: `${comp.color}1F`, color: comp.color }}
                        >
                          <Icon name={cap.icon} size={16} />
                        </span>
                        <div>
                          <div className="font-semibold text-navy text-sm">{L(cap.name)}</div>
                          <p className="text-sm text-navy/65 leading-relaxed">{L(cap.description)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* placeholder image slot */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <div
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-dashed"
                    style={{
                      borderColor: `${comp.color}40`,
                      background: `linear-gradient(135deg, ${comp.color}0F 0%, ${comp.color}26 100%)`,
                    }}
                  >
                    <Image
                      src="/images/brand/nwl-as-kangaroo-navy.png"
                      alt=""
                      width={220}
                      height={220}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-auto opacity-[0.12] pointer-events-none"
                    />
                    <span className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/50">
                      {L(UI.placeholder)} · {L(comp.name)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= WHY AUSTRALIAN ========================= */}
      <section className="section-padding nwl-bg-dawn-deep text-paper animate-section relative overflow-hidden">
        <div className="absolute bottom-10 right-8 opacity-[0.05] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/nwl-as-kangaroo-white.png" alt="" className="w-72 h-72 object-contain" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-9 h-px bg-gold" />
              {L(UI.whyEyebrow)}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-[-0.02em] mb-5">
              {L(UI.whyTitle)} <span className="italic text-gold">{L(UI.whyTitleAccent)}</span>
            </h2>
            <p className="text-lg text-paper/75 leading-relaxed">{L(UI.whyIntro)}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {UI.whyCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/[0.06] border border-white/10 rounded-3xl p-7 backdrop-blur-sm"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gold/15 text-gold mb-4">
                  <Icon name={card.icon} size={20} />
                </span>
                <h3 className="font-display text-xl font-semibold mb-2">{L(card.title)}</h3>
                <p className="text-sm text-paper/65 leading-relaxed">{L(card.text)}</p>
              </motion.div>
            ))}
          </div>

          <p className="font-display italic text-xl md:text-2xl text-gold max-w-2xl mb-10">
            {L(UI.whyKangaroo)}
          </p>

          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">
            <span className="text-gold/90">QRO 20.59° N</span>
            <span>·</span>
            <span>↔</span>
            <span>·</span>
            <span className="text-gold/90">SYD 33.87° S</span>
          </div>
        </div>
      </section>

      {/* ========================== RECOGNITIONS ========================== */}
      <section className="bg-white py-16 md:py-20 animate-section border-b border-n-200">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-4">
              <span className="w-9 h-px bg-gold" />
              {L(UI.recognitionsEyebrow)}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-medium text-navy">
              {L(UI.recognitionsTitle)}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center max-w-5xl mx-auto">
            {MODEL_RECOGNITIONS.map((r, i) => {
              const src = typeof r.image === 'string' ? r.image : r.image[locale];
              return (
                <div key={i} className="flex items-center justify-center">
                  <Image
                    src={src}
                    alt={r.name}
                    width={140}
                    height={80}
                    className="h-14 md:h-16 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
