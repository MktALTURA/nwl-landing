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
const GAP = 1.2; // degrees of breathing room between component segments
const R_OUTER = 40; // component ring, outer edge
const R_INNER = 25.5; // component ring, inner edge
const R_LABEL = (R_OUTER + R_INNER) / 2;
const R_CAP_IN = 41.2; // capability ring (the slide's outer ring)
const R_CAP_OUT = 49.4;
const R_CAP_ICON = (R_CAP_IN + R_CAP_OUT) / 2;
const CAP_GAP = 0.6; // gap between capability sub-segments

function polar(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  // Rounded so SSR and client produce byte-identical path strings
  // (full-precision trig differs in the last digit across runtimes → hydration mismatch).
  return { x: +(50 + r * Math.cos(rad)).toFixed(3), y: +(50 + r * Math.sin(rad)).toFixed(3) };
}
function ringPath(rIn: number, rOut: number, startDeg: number, endDeg: number) {
  const p1 = polar(rOut, startDeg);
  const p2 = polar(rOut, endDeg);
  const p3 = polar(rIn, endDeg);
  const p4 = polar(rIn, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${rOut} ${rOut} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rIn} ${rIn} 0 ${large} 0 ${p4.x} ${p4.y} Z`;
}
const segmentPath = (startDeg: number, endDeg: number) => ringPath(R_INNER, R_OUTER, startDeg, endDeg);
/** Angular span of capability j (0-2) inside component i's segment. */
function capAngles(i: number, j: number): [number, number] {
  const start = i * SEG - SEG / 2 + GAP;
  const span = (SEG - GAP * 2) / 3;
  return [start + j * span + (j > 0 ? CAP_GAP : 0), start + (j + 1) * span - (j < 2 ? CAP_GAP : 0)];
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

/* ---------- "The case" — evidence content (from the rebrand case study) ---------- */
const CASE = {
  eyebrow: { en: 'The case · 16 years', es: 'El caso · 16 años' },
  lead: {
    en: "This isn't a new label — it's the culmination of sixteen years of work.",
    es: 'No es una etiqueta nueva — es la culminación de dieciséis años de trabajo.',
  },
  p1: {
    en: "NWL has spent over sixteen years raising the bar for education in Mexico — beginning with childhood wellbeing, maturing into critical thinking, and growing into a complete international model. The kangaroo was never decoration; Australia has been in the school's DNA from the start.",
    es: 'NWL lleva más de dieciséis años elevando la educación en México — empezó con el bienestar infantil, maduró hacia el pensamiento crítico y creció hasta un modelo internacional completo. El canguro nunca fue decoración: Australia ha estado en nuestro ADN desde el inicio.',
  },
  p2: {
    en: 'Adopting a model inspired by the Australian curriculum makes explicit what the school has always built toward: students who think critically, lead with purpose, and belong to the world.',
    es: 'Adoptar un modelo inspirado en el currículo australiano hace explícito lo que siempre construimos: estudiantes que piensan críticamente, lideran con propósito y pertenecen al mundo.',
  },
  journey: [
    {
      title: { en: 'Childhood wellbeing', es: 'Bienestar infantil' },
      text: {
        en: 'Where it started — a school built around how children actually grow.',
        es: 'Donde empezó — un colegio construido en torno a cómo crecen realmente los niños.',
      },
    },
    {
      title: { en: 'Critical thinking', es: 'Pensamiento crítico' },
      text: {
        en: 'Philosophy for Children matured into reasoning, inquiry and real-world projects.',
        es: 'Filosofía para Niños maduró hacia el razonamiento, la indagación y proyectos reales.',
      },
    },
    {
      title: { en: 'The Australian model', es: 'El modelo australiano' },
      text: {
        en: 'An international mindset, aligned with the Australian curriculum — the culmination, not a detour.',
        es: 'Una mentalidad internacional, alineada con el currículo australiano — la culminación, no un desvío.',
      },
    },
  ],
  stats: [
    {
      n: '503',
      unit: '',
      text: {
        en: "Australia's PISA score in reading & science — above the OECD average of 487, and well ahead of memorization-led models.",
        es: 'Puntaje PISA de Australia en lectura y ciencias — por encima del promedio OCDE de 487 y muy adelante de modelos basados en memorización.',
      },
    },
    {
      n: '65',
      unit: '%',
      text: {
        en: 'of assessment comes from continuous work and real-world projects — not high-stakes final exams.',
        es: 'de la evaluación proviene de trabajo continuo y proyectos reales — no de exámenes finales de alto impacto.',
      },
    },
    {
      n: '9',
      unit: '/10',
      text: {
        en: 'emphasis on student wellbeing in the Australian model, versus 5/10 in traditional private schooling.',
        es: 'de énfasis en el bienestar del estudiante en el modelo australiano, frente a 5/10 en la escuela privada tradicional.',
      },
    },
  ],
  source: {
    en: 'Reference data · PISA 2022 · Australian Curriculum',
    es: 'Datos de referencia · PISA 2022 · Currículo Australiano',
  },
};

/* Chart palette — validated (OKLCH band, chroma, CVD, contrast) on the navy surface */
const CH = { gold: '#C08109', goldBright: '#E3990F', teal: '#1D89A6', violet: '#8171C2' };

const PISA = {
  caption: {
    en: 'PISA 2022 · Australia vs OECD vs Mexico (private est.)',
    es: 'PISA 2022 · Australia vs OCDE vs México (privado)',
  },
  subjects: [
    { label: { en: 'Math', es: 'Matemáticas' }, values: [491, 430, 489] },
    { label: { en: 'Science', es: 'Ciencias' }, values: [503, 440, 489] },
    { label: { en: 'Reading', es: 'Lectura' }, values: [503, 455, 487] },
  ],
  series: [
    { name: { en: 'Australia', es: 'Australia' }, color: CH.gold, labelColor: CH.goldBright },
    { name: { en: 'Mexico (private est.)', es: 'México (privado)' }, color: CH.teal, labelColor: '#4FB3CE' },
    { name: { en: 'OECD average', es: 'Promedio OCDE' }, color: CH.violet, labelColor: '#A99BE0' },
  ],
  min: 350,
  max: 550,
};

const RADAR = {
  caption: {
    en: 'Developmental emphasis · Australian model vs traditional',
    es: 'Énfasis por dominio · modelo australiano vs tradicional',
  },
  axes: [
    { en: 'Academic pressure', es: 'Presión académica' },
    { en: 'Emotional support', es: 'Apoyo emocional' },
    { en: 'Outdoor time', es: 'Aire libre' },
    { en: 'Critical thinking', es: 'Pensamiento crítico' },
    { en: 'Rote memorization', es: 'Memorización' },
    { en: 'Peer collaboration', es: 'Colaboración' },
  ],
  series: [
    { name: { en: 'Australian model', es: 'Modelo australiano' }, color: CH.gold, fill: 'rgba(192,129,9,0.25)', data: [4, 9, 8, 9, 3, 9] },
    { name: { en: 'Traditional private', es: 'Privado tradicional' }, color: CH.violet, fill: 'rgba(129,113,194,0.20)', data: [9, 5, 4, 5, 8, 5] },
  ],
  max: 10,
};

/* ---------- PISA Cleveland dot plot (dependency-free SVG) ---------- */
function PisaDotPlot({ locale }: { locale: 'en' | 'es' }) {
  const W = 560;
  const H = 236;
  const PAD_L = 96;
  const PAD_R = 30;
  const x = (v: number) => +(PAD_L + ((v - PISA.min) / (PISA.max - PISA.min)) * (W - PAD_L - PAD_R)).toFixed(3);
  const rowY = (i: number) => 58 + i * 62;
  const ticks = [350, 400, 450, 500, 550];

  return (
    <div>
      {/* legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-4">
        {PISA.series.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-[11px] text-paper/70">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
            {s.name[locale]}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={PISA.caption[locale]}>
        {/* gridlines + tick labels */}
        {ticks.map((tv) => (
          <g key={tv}>
            <line x1={x(tv)} y1={30} x2={x(tv)} y2={H - 34} stroke="rgba(244,238,226,0.10)" strokeWidth="1" />
            <text x={x(tv)} y={H - 16} textAnchor="middle" fontSize="10" fill="rgba(244,238,226,0.45)" fontFamily="var(--font-mono)">
              {tv}
            </text>
          </g>
        ))}
        {PISA.subjects.map((subj, i) => {
          const y = rowY(i);
          return (
            <g key={i}>
              <text x={0} y={y + 4} fontSize="11.5" fill="rgba(244,238,226,0.75)" fontWeight="600">
                {subj.label[locale]}
              </text>
              {/* row track */}
              <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke="rgba(244,238,226,0.12)" strokeWidth="1.5" strokeLinecap="round" />
              {/* dots — surface ring separates overlapping marks; hero series drawn last (on top) */}
              {[2, 1, 0].map((si) => {
                const v = subj.values[si];
                return (
                  <g key={si}>
                    <circle cx={x(v)} cy={y} r={6.5} fill={PISA.series[si].color} stroke="#0B224E" strokeWidth="2">
                      <title>{`${PISA.series[si].name[locale]} — ${subj.label[locale]}: ${v}`}</title>
                    </circle>
                    {/* direct labels on the two series the comparison is about */}
                    {si < 2 && (
                      <text
                        x={x(v)}
                        y={si === 0 ? y - 13 : y + 22}
                        textAnchor="middle"
                        fontSize="10.5"
                        fontWeight="700"
                        fill={PISA.series[si].labelColor}
                        fontFamily="var(--font-mono)"
                      >
                        {v}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
      {/* screen-reader table */}
      <table className="sr-only">
        <caption>{PISA.caption[locale]}</caption>
        <thead>
          <tr>
            <th>—</th>
            {PISA.series.map((s, i) => (
              <th key={i}>{s.name[locale]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PISA.subjects.map((subj, i) => (
            <tr key={i}>
              <th>{subj.label[locale]}</th>
              {subj.values.map((v, j) => (
                <td key={j}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Developmental-emphasis radar (dependency-free SVG) ---------- */
function ModelRadar({ locale }: { locale: 'en' | 'es' }) {
  const W = 440;
  const S = 300;
  const CX = W / 2;
  const CY = S / 2 + 6;
  const R = 100;
  const N = RADAR.axes.length;
  const pt = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / N - Math.PI / 2;
    const r = (v / RADAR.max) * R;
    return { x: +(CX + r * Math.cos(a)).toFixed(3), y: +(CY + r * Math.sin(a)).toFixed(3) };
  };
  const ring = (v: number) =>
    Array.from({ length: N }, (_, i) => {
      const p = pt(i, v);
      return `${p.x},${p.y}`;
    }).join(' ');

  return (
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-4">
        {RADAR.series.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-[11px] text-paper/70">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
            {s.name[locale]}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${S}`} className="w-full h-auto max-w-[460px] mx-auto" role="img" aria-label={RADAR.caption[locale]}>
        {/* rings + spokes */}
        {[2.5, 5, 7.5, 10].map((v) => (
          <polygon key={v} points={ring(v)} fill="none" stroke="rgba(244,238,226,0.10)" strokeWidth="1" />
        ))}
        {RADAR.axes.map((_, i) => {
          const p = pt(i, RADAR.max);
          return <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="rgba(244,238,226,0.10)" strokeWidth="1" />;
        })}
        {/* series polygons */}
        {RADAR.series.map((s, si) => (
          <g key={si}>
            <polygon
              points={s.data.map((v, i) => { const p = pt(i, v); return `${p.x},${p.y}`; }).join(' ')}
              fill={s.fill}
              stroke={s.color}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {s.data.map((v, i) => {
              const p = pt(i, v);
              return (
                <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={s.color} stroke="#0B224E" strokeWidth="2">
                  <title>{`${s.name[locale]} — ${RADAR.axes[i][locale]}: ${v}/10`}</title>
                </circle>
              );
            })}
          </g>
        ))}
        {/* axis labels */}
        {RADAR.axes.map((ax, i) => {
          const p = pt(i, RADAR.max + 2.4);
          const anchor = Math.abs(p.x - CX) < 8 ? 'middle' : p.x > CX ? 'start' : 'end';
          return (
            <text key={i} x={p.x} y={p.y + 3} textAnchor={anchor} fontSize="10" fill="rgba(244,238,226,0.65)">
              {ax[locale]}
            </text>
          );
        })}
      </svg>
      <table className="sr-only">
        <caption>{RADAR.caption[locale]}</caption>
        <thead>
          <tr>
            <th>—</th>
            {RADAR.axes.map((ax, i) => (
              <th key={i}>{ax[locale]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RADAR.series.map((s, i) => (
            <tr key={i}>
              <th>{s.name[locale]}</th>
              {s.data.map((v, j) => (
                <td key={j}>{v}/10</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
                {/* capability ring — the slide's outer ring; the active component's
                    three capabilities light up, the rest stay as quiet tints */}
                {MODEL_COMPONENTS.map((comp, i) => {
                  const isActive = i === active;
                  return comp.capabilities.map((cap, j) => {
                    const [a0, a1] = capAngles(i, j);
                    return (
                      <path
                        key={`${comp.id}-cap-${j}`}
                        d={ringPath(R_CAP_IN, R_CAP_OUT, a0, a1)}
                        fill={comp.color}
                        opacity={isActive ? 0.42 : 0.13}
                        className="cursor-pointer transition-all duration-300"
                        onClick={() => setActive(i)}
                      >
                        <title>{L(cap.name)}</title>
                      </path>
                    );
                  });
                })}
                {/* component ring */}
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
                <circle cx="50" cy="50" r="24.7" fill="var(--nwl-gold)" opacity="0.9" />
                <circle cx="50" cy="50" r="23.8" fill="#071638" />
              </svg>

              {/* capability icons on the outer ring — appear when their component is active */}
              {MODEL_COMPONENTS.map((comp, i) =>
                comp.capabilities.map((cap, j) => {
                  const [a0, a1] = capAngles(i, j);
                  const p = polar(R_CAP_ICON, (a0 + a1) / 2);
                  const isActive = i === active;
                  return (
                    <motion.button
                      key={`${comp.id}-capicon-${j}`}
                      onClick={() => setActive(i)}
                      aria-label={L(cap.name)}
                      title={L(cap.name)}
                      initial={false}
                      animate={
                        isActive
                          ? { opacity: 1, scale: 1.15, transition: { delay: 0.08 + j * 0.07, duration: 0.3 } }
                          : { opacity: 0.35, scale: 0.9 }
                      }
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-paper"
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    >
                      <Icon name={cap.icon} size={15} />
                    </motion.button>
                  );
                })
              )}

              {/* segment labels */}
              {MODEL_COMPONENTS.map((comp, i) => {
                const p = polar(R_LABEL, i * SEG);
                const isActive = i === active;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center w-[21%] transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-105' : 'opacity-75 hover:opacity-100'
                    }`}
                    style={{ left: `${p.x}%`, top: `${p.y}%`, color: comp.darkText ? '#1C0F00' : '#F4EEE2' }}
                  >
                    <Icon name={comp.icon} size={15} className="mb-1 hidden sm:block" />
                    <span className="font-semibold text-[8px] sm:text-[9px] md:text-[10px] leading-[1.15] drop-shadow-sm">
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

          {/* The case · 16 years — journey + evidence */}
          <div className="grid lg:grid-cols-[1.05fr,0.95fr] gap-10 lg:gap-14 items-start mb-12">
            <div>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-4">
                <span className="w-9 h-px bg-gold" />
                {L(CASE.eyebrow)}
              </span>
              <p className="font-display text-2xl md:text-3xl leading-snug mb-5">
                {L(CASE.lead)}
              </p>
              <p className="text-paper/70 leading-relaxed mb-4">{L(CASE.p1)}</p>
              <p className="text-paper/70 leading-relaxed mb-7">{L(CASE.p2)}</p>
              <ol className="space-y-0">
                {CASE.journey.map((j, i) => (
                  <li key={i} className="grid grid-cols-[auto,1fr] gap-4 py-4 border-t border-white/10">
                    <span className="font-mono text-sm text-gold pt-0.5">0{i + 1}</span>
                    <div>
                      <b className="block font-display font-semibold text-paper mb-1">{L(j.title)}</b>
                      <p className="text-sm text-paper/60 leading-relaxed">{L(j.text)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-white/[0.06] border border-white/10 rounded-3xl p-7 md:p-8 backdrop-blur-sm">
              <div className="space-y-7">
                {CASE.stats.map((s, i) => (
                  <div key={i} className={i > 0 ? 'pt-7 border-t border-white/10' : ''}>
                    <div className="font-display text-5xl font-semibold text-gold leading-none mb-2">
                      {s.n}
                      {s.unit && <span className="text-3xl">{s.unit}</span>}
                    </div>
                    <p className="text-sm text-paper/65 leading-relaxed">{L(s.text)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Evidence charts */}
          <div className="grid md:grid-cols-2 gap-5 mb-4">
            <figure className="bg-white/[0.06] border border-white/10 rounded-3xl p-6 md:p-7 backdrop-blur-sm flex flex-col">
              <PisaDotPlot locale={locale} />
              <figcaption className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
                {PISA.caption[locale]}
              </figcaption>
            </figure>
            <figure className="bg-white/[0.06] border border-white/10 rounded-3xl p-6 md:p-7 backdrop-blur-sm">
              <ModelRadar locale={locale} />
              <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">
                {RADAR.caption[locale]}
              </figcaption>
            </figure>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40 mb-12">
            {L(CASE.source)}
          </p>

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
