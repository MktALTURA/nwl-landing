'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
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

/* ---------- wheel geometry (deck construction: pastel outer band touching
   the component ring, white dividers hub→perimeter, and per-capability
   sub-divider lines that run from a dot at the ring edge out to the perimeter,
   splitting each slice into thirds with the label inside each third) ---------- */
const SEG = 360 / 7;
const R_HUB = 17.2; // center circle
const R_INNER = 18.2; // component ring, inner edge
const R_OUTER = 33.8; // component ring outer edge = capability band inner edge
const R_CAP_OUT = 49.2; // capability band outer edge
const R_LABEL = (R_INNER + R_OUTER) / 2 + 0.3; // component name cluster
const R_CAP_LABEL = (R_OUTER + R_CAP_OUT) / 2; // capability label cluster
/** How far (viewBox units) the active slice pops outward along its mid-angle. */
const EXPLODE = 1.4;
function sliceOffset(i: number, active: number) {
  if (i !== active) return { dx: 0, dy: 0 };
  const rad = ((i * SEG - 90) * Math.PI) / 180;
  return { dx: +(EXPLODE * Math.cos(rad)).toFixed(3), dy: +(EXPLODE * Math.sin(rad)).toFixed(3) };
}
const POP_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
/* Twinkling stars inside the hub — a loose Southern Cross, placed clear of the
   center text (positions are % of the hub circle's bounding box). */
const HUB_STARS = [
  { x: 50, y: 11, r: 3 },
  { x: 31, y: 22, r: 2 },
  { x: 67, y: 19, r: 2.5 },
  { x: 79, y: 33, r: 2 },
  { x: 22, y: 81, r: 2 },
  { x: 64, y: 87, r: 2.5 },
];

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
/** Mid angle of capability j (0-2) inside component i's wedge. */
function capMid(i: number, j: number) {
  return i * SEG - SEG / 2 + ((j + 0.5) * SEG) / 3;
}
/** Much lighter, "whiter" version of the wedge color (the deck's outer band). */
function pastel(hex: string, t = 0.76) {
  const n = parseInt(hex.slice(1), 16);
  const m = (c: number) => Math.round(c + (255 - c) * t);
  return `rgb(${m((n >> 16) & 255)},${m((n >> 8) & 255)},${m(n & 255)})`;
}

/* ---------- page-local UI strings ---------- */
const UI = {
  heroEyebrow: { en: 'NWL Australian School · Educational Model', es: 'NWL Australian School · Modelo Educativo' },
  heroTitle: { en: 'The NWL', es: 'El Modelo' },
  heroTitleAccent: { en: 'Educational Model', es: 'Educativo NWL' },
  heroMono: {
    en: 'AN AUSTRALIAN-INSPIRED, FUTURE-READY EDUCATION FOR CONFIDENT LEARNERS AND GLOBAL CITIZENS.',
    es: 'UNA EDUCACIÓN DE INSPIRACIÓN AUSTRALIANA, LISTA PARA EL FUTURO, PARA ALUMNOS SEGUROS Y CIUDADANOS GLOBALES.',
  },
  heroSub: {
    en: 'Seven components. Twenty-one capabilities. One student at the center. This is how the Australian way of learning comes to life at NWL, every day, from Maternal to Senior School.',
    es: 'Siete componentes. Veintiún capacidades. Un alumno al centro. Así cobra vida el modelo australiano de aprendizaje en NWL, todos los días, de Maternal a Senior School.',
  },
  statComponents: { en: 'Components', es: 'Componentes' },
  statCapabilities: { en: 'Capabilities', es: 'Capacidades' },
  statCenter: { en: 'Student at the center', es: 'Alumno al centro' },
  heroCtaWheel: { en: 'Explore the wheel', es: 'Explora la rueda' },
  heroCtaVisit: { en: 'Schedule a visit', es: 'Agenda una visita' },
  componentsLabel: {
    en: 'Components are the seven core dimensions of an NWL education: the inner ring of the wheel.',
    es: 'Los componentes son las siete dimensiones centrales de una educación NWL: el anillo interior de la rueda.',
  },
  capabilitiesLabel: {
    en: 'Capabilities are the concrete skills and experiences within each component that students live every day.',
    es: 'Las capacidades son las habilidades y experiencias concretas de cada componente que los alumnos viven todos los días.',
  },
  wheelEyebrow: { en: 'The wheel', es: 'La rueda' },
  wheelTitle: { en: 'Inside the', es: 'Dentro del' },
  wheelTitleAccent: { en: 'Educational Model', es: 'Modelo Educativo' },
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
    en: 'Australia runs one of the most admired school systems in the world. Not because it demands more homework, but because it balances academic rigor with wellbeing, creativity and real-world capabilities. That balance is exactly what NWL has built toward for sixteen years.',
    es: 'Australia tiene uno de los sistemas escolares más admirados del mundo. No porque exija más tarea, sino porque equilibra el rigor académico con el bienestar, la creatividad y las capacidades para la vida real. Ese equilibrio es exactamente lo que NWL ha construido durante dieciséis años.',
  },
  whyCards: [
    {
      icon: 'heart',
      title: { en: 'Wellbeing next to rigor', es: 'Bienestar junto al rigor' },
      text: {
        en: 'The Australian curriculum treats emotional development as a condition for deep learning, not a nice-to-have.',
        es: 'El currículo australiano trata el desarrollo emocional como condición del aprendizaje profundo, no como un extra.',
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
    en: 'And like the kangaroo on our crest, the model only knows how to move forward.',
    es: 'Y como el canguro de nuestro escudo, este modelo solo sabe avanzar.',
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
    en: "This isn't a new label. It's the culmination of sixteen years of work.",
    es: 'No es una etiqueta nueva. Es la culminación de dieciséis años de trabajo.',
  },
  p1: {
    en: "NWL has spent over sixteen years raising the bar for education in Mexico, beginning with childhood wellbeing, maturing into critical thinking, and growing into a complete international model. The kangaroo was never decoration; Australia has been in the school's DNA from the start.",
    es: 'NWL lleva más de dieciséis años elevando la educación en México: empezó con el bienestar infantil, maduró hacia el pensamiento crítico y creció hasta un modelo internacional completo. El canguro nunca fue decoración: Australia ha estado en nuestro ADN desde el inicio.',
  },
  p2: {
    en: 'Adopting a model inspired by the Australian curriculum makes explicit what the school has always built toward: students who think critically, lead with purpose, and belong to the world.',
    es: 'Adoptar un modelo inspirado en el currículo australiano hace explícito lo que siempre construimos: estudiantes que piensan críticamente, lideran con propósito y pertenecen al mundo.',
  },
  journey: [
    {
      title: { en: 'Childhood wellbeing', es: 'Bienestar infantil' },
      text: {
        en: 'Where it started: a school built around how children actually grow.',
        es: 'Donde empezó: un colegio construido en torno a cómo crecen realmente los niños.',
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
        en: 'An international mindset, aligned with the Australian curriculum: the culmination, not a detour.',
        es: 'Una mentalidad internacional, alineada con el currículo australiano: la culminación, no un desvío.',
      },
    },
  ],
  stats: [
    {
      n: '503',
      unit: '',
      text: {
        en: "Australia's PISA score in reading & science, above the OECD average of 487 and well ahead of memorization-led models.",
        es: 'Puntaje PISA de Australia en lectura y ciencias, por encima del promedio OCDE de 487 y muy adelante de modelos basados en memorización.',
      },
    },
    {
      n: '65',
      unit: '%',
      text: {
        en: 'of assessment comes from continuous work and real-world projects, not high-stakes final exams.',
        es: 'de la evaluación proviene de trabajo continuo y proyectos reales, no de exámenes finales de alto impacto.',
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

/* ---------- PISA grouped bar chart (HTML bars, hover tooltips) ---------- */
function PisaBars({ locale }: { locale: 'en' | 'es' }) {
  const [hover, setHover] = useState<{ g: number; s: number } | null>(null);
  const MAX = 550;
  const ticks = [0, 100, 200, 300, 400, 500];
  const pct = (v: number) => +((v / MAX) * 100).toFixed(2);

  return (
    <div>
      {/* legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-5">
        {PISA.series.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-[11px] text-paper/70">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
            {s.name[locale]}
          </span>
        ))}
      </div>

      <div className="space-y-5">
        {PISA.subjects.map((subj, g) => (
          <div key={g} className="grid grid-cols-[64px,1fr] items-center gap-3">
            <div className="text-[12px] font-semibold text-paper/75 text-right pr-1">{subj.label[locale]}</div>
            <div className="relative py-0.5">
              {ticks.map((t) => (
                <span key={t} aria-hidden="true" className="absolute top-0 bottom-0 w-px bg-paper/10" style={{ left: `${pct(t)}%` }} />
              ))}
              <div className="relative space-y-[3px]">
                {subj.values.map((v, si) => {
                  const isHover = hover !== null && hover.g === g && hover.s === si;
                  const dimmed = hover !== null && hover.g === g && hover.s !== si;
                  return (
                    <div
                      key={si}
                      className="relative h-[15px] cursor-pointer"
                      onMouseEnter={() => setHover({ g, s: si })}
                      onMouseLeave={() => setHover(null)}
                    >
                      <div
                        className="absolute inset-y-0 left-0 rounded-r-[4px] transition-all duration-200"
                        style={{
                          width: `${pct(v)}%`,
                          background: PISA.series[si].color,
                          filter: isHover ? 'brightness(1.3)' : 'none',
                          opacity: dimmed ? 0.45 : 1,
                        }}
                      />
                      <span
                        className="absolute top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold"
                        style={{ left: `calc(${pct(v)}% + 7px)`, color: PISA.series[si].labelColor }}
                      >
                        {v}
                      </span>
                      {isHover && (
                        <div
                          className="absolute z-10 -top-9 px-3 py-1.5 rounded-lg bg-[#071638] border border-gold/40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] whitespace-nowrap pointer-events-none"
                          style={{ left: `min(${pct(v)}%, 55%)` }}
                        >
                          <span className="text-[11px] text-paper">
                            {PISA.series[si].name[locale]} · {subj.label[locale]}:{' '}
                            <b className="text-gold-400 font-mono">{v}</b>
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* axis ticks */}
        <div className="grid grid-cols-[64px,1fr] gap-3">
          <span />
          <div className="relative h-4">
            {ticks.map((t) => (
              <span
                key={t}
                className={`absolute font-mono text-[9.5px] text-paper/45 ${t === 0 ? '' : '-translate-x-1/2'}`}
                style={{ left: `${pct(t)}%` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* screen-reader table */}
      <table className="sr-only">
        <caption>{PISA.caption[locale]}</caption>
        <thead>
          <tr>
            <th />

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
  const [hover, setHover] = useState<{ s: number; i: number } | null>(null);
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
      <div className="relative max-w-[460px] mx-auto">
      <svg viewBox={`0 0 ${W} ${S}`} className="w-full h-auto" role="img" aria-label={RADAR.caption[locale]}>
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
              const isHover = hover !== null && hover.s === si && hover.i === i;
              return (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={isHover ? 5.5 : 4}
                  fill={s.color}
                  stroke="#0B224E"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHover({ s: si, i })}
                  onMouseLeave={() => setHover(null)}
                />
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
      {hover !== null && (() => {
        const p = pt(hover.i, RADAR.series[hover.s].data[hover.i]);
        return (
          <div
            className="absolute z-10 px-3 py-1.5 rounded-lg bg-[#071638] border border-gold/40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] whitespace-nowrap pointer-events-none -translate-x-1/2 -translate-y-full"
            style={{ left: `${((p.x / W) * 100).toFixed(2)}%`, top: `calc(${((p.y / S) * 100).toFixed(2)}% - 10px)` }}
          >
            <span className="text-[11px] text-paper">
              {RADAR.series[hover.s].name[locale]} · {RADAR.axes[hover.i][locale]}:{' '}
              <b className="text-gold-400 font-mono">{RADAR.series[hover.s].data[hover.i]}/10</b>
            </span>
          </div>
        );
      })()}
      </div>
      <table className="sr-only">
        <caption>{RADAR.caption[locale]}</caption>
        <thead>
          <tr>
            <th />

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

  /* 3D tilt — the wheel leans toward the cursor inside a perspective container */
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const onWheelMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onWheelLeave = () => {
    mx.set(0);
    my.set(0);
  };

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
            <div
              className="relative w-full max-w-[620px] mx-auto aspect-square select-none [container-type:size]"
              style={{ perspective: 1400 }}
              onMouseMove={reduceMotion ? undefined : onWheelMove}
              onMouseLeave={reduceMotion ? undefined : onWheelLeave}
            >
              <motion.div
                className="relative w-full h-full"
                style={reduceMotion ? undefined : { rotateX: tiltX, rotateY: tiltY }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                variants={{
                  hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -42, scale: 0.84 },
                  show: {
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                {/* ambient dashed orbit — its own svg layer so the spin never
                    forces the wheel svg to repaint */}
                {!reduceMotion && (
                  <svg
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full overflow-visible animate-spin pointer-events-none"
                    style={{ animationDuration: '90s' }}
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="49.7"
                      fill="none"
                      stroke="var(--nwl-gold)"
                      strokeOpacity="0.25"
                      strokeWidth="0.22"
                      strokeDasharray="0.4 2.2"
                    />
                  </svg>
                )}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
                  {/* one group per slice: pastel band + wedge + capability sub-dividers.
                      The active slice pops outward along its mid-angle. */}
                  {MODEL_COMPONENTS.map((comp, i) => {
                    const start = i * SEG - SEG / 2;
                    const end = i * SEG + SEG / 2;
                    const { dx, dy } = sliceOffset(i, active);
                    const isActive = i === active;
                    return (
                      <motion.g
                        key={comp.id}
                        variants={{
                          hidden: { opacity: 0 },
                          show: { opacity: 1, transition: { duration: 0.4, delay: 0.3 + i * 0.07 } },
                        }}
                      >
                        <g
                          onClick={() => setActive(i)}
                          className="cursor-pointer"
                          style={{
                            transform: `translate(${dx}px, ${dy}px)`,
                            transition: `transform 0.5s ${POP_EASE}`,
                          }}
                        >
                          {/* pastel capability band, touching the ring */}
                          <path d={ringPath(R_OUTER, R_CAP_OUT, start, end)} fill={pastel(comp.color)} />
                          {/* component wedge */}
                          <path
                            d={ringPath(R_INNER, R_OUTER, start, end)}
                            fill={comp.color}
                            opacity={isActive ? 1 : 0.93}
                            className="transition-opacity duration-300"
                          />
                          {/* capability sub-dividers — dot at the ring edge, line all the
                              way to the outer perimeter, splitting the slice into thirds */}
                          {[1, 2].map((j) => {
                            const a = start + (j * SEG) / 3;
                            const p1 = polar(R_OUTER + 0.9, a);
                            const p2 = polar(R_CAP_OUT, a);
                            return (
                              <g key={j} className="pointer-events-none">
                                <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={comp.color} strokeWidth="0.35" />
                                <circle cx={p1.x} cy={p1.y} r="0.95" fill={comp.color} />
                              </g>
                            );
                          })}
                          {/* gold halo on the active slice (moves with the pop) */}
                          {isActive && (
                            <path
                              d={ringPath(R_INNER, R_CAP_OUT, start + 0.6, end - 0.6)}
                              fill="none"
                              stroke="var(--nwl-gold)"
                              strokeWidth="0.55"
                              className="pointer-events-none"
                            />
                          )}
                        </g>
                      </motion.g>
                    );
                  })}
                  {/* white dividers between the 7 slices — hub to outer perimeter */}
                  {MODEL_COMPONENTS.map((_, i) => {
                    const a = i * SEG + SEG / 2;
                    const p1 = polar(R_INNER - 0.4, a);
                    const p2 = polar(R_CAP_OUT + 0.2, a);
                    return (
                      <line
                        key={'div' + i}
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke="#FFFFFF"
                        strokeWidth="1.1"
                        className="pointer-events-none"
                      />
                    );
                  })}
                  {/* center */}
                  <circle cx="50" cy="50" r={R_HUB + 0.8} fill="var(--nwl-gold)" opacity="0.95" />
                  <circle cx="50" cy="50" r={R_HUB} fill="#071638" />
                </svg>

                {/* comet arc orbiting the hub ring — own svg layer, spins on
                    the compositor without repainting the wheel */}
                {!reduceMotion && (
                  <svg
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full animate-spin pointer-events-none"
                    style={{ animationDuration: '11s' }}
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r={R_HUB + 0.8}
                      fill="none"
                      stroke="#E3990F"
                      strokeOpacity="0.85"
                      strokeWidth="0.55"
                      strokeLinecap="round"
                      strokeDasharray="9 104.1"
                    />
                  </svg>
                )}

                {/* hub ambience — breathing gold glow + twinkling Southern Cross */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34.4%] aspect-square rounded-full overflow-hidden pointer-events-none">
                  {reduceMotion ? (
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 42%, rgba(227,153,15,0.13) 0%, rgba(227,153,15,0.04) 38%, transparent 66%)',
                      }}
                    />
                  ) : (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 42%, rgba(227,153,15,0.16) 0%, rgba(227,153,15,0.05) 38%, transparent 66%)',
                      }}
                      animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.1, 1] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  {HUB_STARS.map((s, i) => (
                    <motion.span
                      key={i}
                      className="absolute rounded-full bg-gold"
                      style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: s.r,
                        height: s.r,
                        marginLeft: -s.r / 2,
                        marginTop: -s.r / 2,
                        boxShadow: '0 0 6px 1px rgba(227,153,15,0.55)',
                      }}
                      initial={false}
                      animate={
                        reduceMotion
                          ? { opacity: 0.5 }
                          : { opacity: [0.15, 0.85, 0.15], scale: [1, 1.35, 1] }
                      }
                      transition={
                        reduceMotion
                          ? undefined
                          : { duration: 2.6 + i * 0.7, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }
                      }
                    />
                  ))}
                </div>

                {/* capability items — icon + name in the wedge color, centered inside
                    each sub-slice of the pastel band (no wrap-around, no overflow) */}
                {MODEL_COMPONENTS.map((comp, i) =>
                  comp.capabilities.map((cap, j) => {
                    const p = polar(R_CAP_LABEL, capMid(i, j));
                    const { dx, dy } = sliceOffset(i, active);
                    const isActive = i === active;
                    const isKnotion = cap.name.en === 'Knotion';
                    return (
                      <div
                        key={comp.id + '-capitem-' + j}
                        className="absolute w-[12.5%]"
                        style={{
                          left: `${p.x}%`,
                          top: `${p.y}%`,
                          transform: `translate(-50%, -50%) translate(${dx}cqw, ${dy}cqw)`,
                          transition: `transform 0.5s ${POP_EASE}`,
                        }}
                      >
                        <motion.button
                          onClick={() => setActive(i)}
                          aria-label={L(cap.name)}
                          title={L(cap.name)}
                          initial={false}
                          animate={
                            isActive
                              ? { opacity: 1, scale: 1.1, transition: { delay: 0.05 + j * 0.06, duration: 0.25 } }
                              : { opacity: 0.85, scale: 1 }
                          }
                          className="flex w-full flex-col items-center text-center"
                          style={{ color: comp.color }}
                        >
                          {isKnotion ? (
                            <Image
                              src="/images/logos/knotion.png"
                              alt="Knotion"
                              width={160}
                              height={45}
                              className="w-[74%] h-auto mb-0.5"
                            />
                          ) : (
                            <Icon name={cap.icon} size={15} className="mb-0.5" />
                          )}
                          <span className="hidden sm:block font-semibold text-[7.6px] md:text-[8.4px] leading-[1.15]">
                            {L(cap.name)}
                          </span>
                        </motion.button>
                      </div>
                    );
                  })
                )}

                {/* component labels — white icon, uppercase name, tagline */}
                {MODEL_COMPONENTS.map((comp, i) => {
                  const p = polar(R_LABEL, i * SEG);
                  const { dx, dy } = sliceOffset(i, active);
                  const isActive = i === active;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      className={`absolute flex flex-col items-center text-center w-[17%] text-white ${
                        isActive ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                      }`}
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        transform: `translate(-50%, -50%) translate(${dx}cqw, ${dy}cqw) scale(${isActive ? 1.04 : 1})`,
                        transition: `transform 0.5s ${POP_EASE}, opacity 0.3s ease`,
                      }}
                    >
                      <Icon name={comp.icon} size={15} className="mb-1 hidden sm:block" />
                      <span className="font-bold uppercase tracking-[0.04em] text-[7px] sm:text-[7.8px] md:text-[8.6px] leading-[1.2]">
                        {L(comp.name)}
                      </span>
                      <span className="hidden md:block text-[6.6px] leading-[1.25] text-white/85 mt-0.5">
                        {L(comp.tagline)}
                      </span>
                    </button>
                  );
                })}

                {/* center label */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] text-center pointer-events-none">
                  <span className="relative inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-gold/15 text-gold mb-1.5">
                    {!reduceMotion && (
                      <motion.span
                        className="absolute inset-0 rounded-full border border-gold/60"
                        animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                    <FiUser size={15} />
                  </span>
                  <div className="font-display text-[12px] md:text-[16px] font-semibold leading-tight text-white">
                    {L(UI.wheelCenterTitle)}
                  </div>
                  <div className="font-mono text-[6px] md:text-[7.2px] uppercase tracking-[0.08em] text-paper/55 mt-1">
                    {L(UI.wheelCenterSub)}
                  </div>
                </div>
              </motion.div>
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
                          {cap.pillars && (
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                              {cap.pillars.map((pl, k) => (
                                <span
                                  key={k}
                                  className="inline-flex items-baseline gap-1.5 rounded-full border px-2.5 py-1"
                                  style={{ borderColor: `${c.color}66`, background: `${c.color}26` }}
                                >
                                  <span className="font-mono text-[8.5px] text-paper/50">0{k + 1}</span>
                                  <span className="text-[10.5px] font-medium text-paper/90 leading-tight">{L(pl)}</span>
                                </span>
                              ))}
                            </div>
                          )}
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
                          {cap.pillars && (
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                              {cap.pillars.map((pl, k) => (
                                <span
                                  key={k}
                                  className="inline-flex items-baseline gap-1.5 rounded-full border px-2.5 py-1"
                                  style={{ borderColor: `${comp.color}40`, background: `${comp.color}12` }}
                                >
                                  <span className="font-mono text-[8.5px]" style={{ color: comp.color }}>0{k + 1}</span>
                                  <span className="text-[10.5px] font-medium text-navy/85 leading-tight">{L(pl)}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* component photo (placeholder fallback while a photo is pending) */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  {comp.image ? (
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-navy/10 shadow-[0_24px_60px_-32px_rgba(11,34,78,0.45)] nwl-grade">
                      <Image
                        src={comp.image.src}
                        alt={L(comp.image.alt)}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1.5"
                        style={{ background: comp.color }}
                      />
                    </div>
                  ) : (
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
                  )}
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
              <PisaBars locale={locale} />
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
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-8 items-center max-w-5xl mx-auto">
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
