'use client';

import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiClock,
  FiHeart,
  FiGlobe,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Footer from '@/components/Footer';
import SouthernCross from '@/components/ui/SouthernCross';

/* ──────────────────────────────────────────────────────────
   Newland → NWL Australian School · Institutional announcement
   Headers in English · Body in Spanish · Brand constants kept
   ────────────────────────────────────────────────────────── */

const PUBLISHED = '14 de julio, 2026';

const modelPillars = [
  {
    icon: FiHeart,
    title: 'Bienestar con rigor',
    body: 'El modelo australiano demuestra que el bienestar del alumno y la exigencia académica no compiten: se potencian. Alumnos que se sienten seguros aprenden más y mejor.',
  },
  {
    icon: FiGlobe,
    title: 'Inglés como motor',
    body: 'La inmersión en inglés deja de ser una materia y se convierte en el vehículo natural del aprendizaje, todos los días, desde Maternal.',
  },
  {
    icon: FiTrendingUp,
    title: 'Aprendizaje activo',
    body: 'Proyectos reales, pensamiento crítico y resolución de problemas — la forma de trabajar de las mejores aulas australianas, alineada con Knotion y Filosofía para Niños.',
  },
  {
    icon: FiUsers,
    title: 'Comunidad que protege',
    body: 'Como la bolsa del canguro: una comunidad cercana que carga, protege e impulsa a cada alumno hasta que está listo para saltar por sí mismo.',
  },
];

const staysTheSame = [
  {
    tag: 'Nuestra comunidad',
    body: 'Las mismas familias, los mismos docentes y los mismos 5 campus en Querétaro y San Miguel de Allende. Más de 16 ciclos escolares de historia desde 2009 nos respaldan.',
  },
  {
    tag: 'Nuestro proyecto educativo',
    body: 'Knotion sin tarea tradicional, Filosofía para Niños, Yo Soy Líder NWL by Tec de Monterrey, doble diploma con Hokku Academy y acreditación internacional Cognia. Todo continúa.',
  },
  {
    tag: 'Nuestros valores',
    body: 'Seguimos creyendo que cada niño lleva dentro el potencial de la grandeza. Lo que cambia es el nombre que le ponemos al camino, no el destino.',
  },
];

/* ── Reusable bits ── */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
      <span className="w-9 h-px bg-gold" />
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.1] font-bold text-navy mt-4">
        {children}
      </h2>
    </div>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-lg md:text-xl text-navy/70 leading-relaxed">{children}</p>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-[1.05rem] text-navy/80 leading-[1.8]">{children}</p>;
}

function PullQuote({ children, attribution }: { children: React.ReactNode; attribution?: string }) {
  return (
    <motion.figure {...fadeUp} className="my-12 md:my-16 text-center">
      <p className="font-display text-2xl md:text-4xl leading-snug text-gold-600 italic">
        “{children}”
      </p>
      {attribution && (
        <figcaption className="mt-4 text-sm uppercase tracking-wider text-navy/50">
          {attribution}
        </figcaption>
      )}
      <span className="mx-auto mt-6 block w-12 h-[3px] bg-gold rounded-full" />
    </motion.figure>
  );
}

export default function NwlAustralianSchoolNews() {
  return (
    <main className="bg-paper">
      {/* ───────── Masthead / Hero ───────── */}
      <header className="relative overflow-hidden nwl-bg-dawn-deep text-paper pt-32 md:pt-36 pb-0">
        <div
          className="hidden md:block absolute top-24 right-[5%] pointer-events-none"
          aria-hidden="true"
        >
          <SouthernCross height={130} color="var(--nwl-gold)" opacity={0.32} />
        </div>
        <div className="container-custom relative z-10 max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center text-sm text-paper/55 gap-2">
              <li>
                <a href="/" className="hover:text-paper transition-colors">
                  NWL Australian School
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href="/noticias" className="hover:text-paper transition-colors">
                  Noticias
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/90" aria-current="page">
                NWL Australian School
              </li>
            </ol>
          </nav>

          {/* Category + date */}
          <div className="flex flex-wrap items-center gap-4 mb-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 border border-gold/40 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-400">
              Anuncio institucional
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-paper/60">
              <FiClock size={14} /> {PUBLISHED}
            </span>
            <span className="text-sm text-paper/40">· 5 min de lectura</span>
          </div>

          {/* Brand lockup */}
          <div className="flex items-center gap-4 md:gap-5 mb-8">
            <img
              src="/images/brand/nwl-as-kangaroo-gold.png"
              alt="Canguro NWL"
              className="h-10 md:h-12 w-auto"
            />
            <img
              src="/images/brand/nwl-as-logo-white.png"
              alt="NWL Australian School"
              className="h-8 md:h-10 w-auto"
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl md:text-6xl font-bold leading-[1.05] max-w-3xl"
          >
            Newland es ahora{' '}
            <span className="italic text-gold-400">NWL Australian School</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-xl md:text-2xl text-paper/75 max-w-2xl leading-relaxed"
          >
            La misma comunidad. El mismo proyecto. Un nombre que por fin dice a
            dónde vamos.
          </motion.p>

          {/* Hero image overlaps into the body */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mt-12 -mb-16 md:-mb-24 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl"
          >
            <img
              src="/images/hero-background.jpg"
              alt="Alumnos de NWL Australian School en el campus"
              className="w-full h-[40vh] md:h-[52vh] object-cover"
            />
            <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4 text-xs text-paper/80">
              La comunidad de siempre, con una identidad que mira hacia adelante.
            </figcaption>
          </motion.figure>
        </div>
      </header>

      {/* ───────── Article body ───────── */}
      <article className="container-custom max-w-3xl pt-24 md:pt-32 pb-10">
        {/* Intro */}
        <motion.div {...fadeUp} className="space-y-6">
          <Lead>
            Desde 2009, esta comunidad ha crecido con un mismo propósito:
            desbloquear la grandeza que cada niño lleva dentro.
          </Lead>
          <Body>
            Hoy ese propósito tiene un nombre que lo dice completo.{' '}
            <strong className="text-navy">Colegio Newland evoluciona a NWL
            Australian School</strong>: la misma institución, las mismas familias
            y los mismos 5 campus, con una identidad que refleja con claridad el
            modelo educativo que nos define.
          </Body>
          <Body>
            No es un cambio de rumbo. Es ponerle nombre al rumbo que ya
            llevábamos.
          </Body>
        </motion.div>

        <PullQuote>The Australian way of learning.</PullQuote>

        {/* Why Australia */}
        <motion.section {...fadeUp} className="scroll-mt-28">
          <SectionHeading eyebrow="Why Australia">
            ¿Por qué un modelo australiano?
          </SectionHeading>
          <div className="space-y-6">
            <Body>
              Australia construyó uno de los sistemas educativos más admirados
              del mundo sobre una idea simple:{' '}
              <strong className="text-navy">el bienestar del alumno y la
              excelencia académica no son opuestos — son socios</strong>. Aulas
              activas, aprendizaje por proyectos, inglés como lengua de trabajo
              y una cultura escolar donde cada niño es visto, conocido y
              acompañado.
            </Body>
            <Body>
              Si eso suena familiar, es porque es exactamente lo que Newland ha
              practicado durante años con Knotion, Filosofía para Niños y la
              inmersión en inglés. El modelo australiano no llega a
              reemplazarnos: llega a articular, con estándares internacionales,
              lo que ya éramos.
            </Body>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {modelPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-n-200 bg-white p-5"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-coral-sea/15 text-coral-sea mb-4">
                    <Icon size={20} />
                  </span>
                  <p className="font-display text-lg font-bold text-navy mb-1.5">
                    {p.title}
                  </p>
                  <p className="text-sm text-navy/70 leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border-l-4 border-gold bg-gold/10 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-navy/50 mb-2">
              Conoce el modelo completo
            </p>
            <p className="text-navy/80 leading-relaxed">
              Los 7 componentes y las 21 capacidades del modelo educativo NWL —
              y cómo se viven en el aula — están explicados en nuestra nueva
              página del modelo.{' '}
              <a
                href="/modelo"
                className="font-semibold text-gold-600 hover:underline"
              >
                Explora el Modelo Educativo →
              </a>
            </p>
          </div>
        </motion.section>

        {/* What stays the same */}
        <motion.section {...fadeUp} className="mt-16">
          <SectionHeading eyebrow="What Stays">
            Lo que no cambia
          </SectionHeading>
          <Body>
            Para las familias que llevan años con nosotros, lo más importante
            del anuncio es lo que permanece igual:
          </Body>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {staysTheSame.map((card) => (
              <div
                key={card.tag}
                className="rounded-2xl border border-n-200 bg-white p-5 flex flex-col"
              >
                <span className="self-start rounded-full bg-gold/15 text-navy text-[11px] font-bold uppercase tracking-wider px-3 py-1 mb-3">
                  {card.tag}
                </span>
                <p className="text-sm text-navy/75 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          <figure className="my-9 rounded-2xl overflow-hidden shadow-lg ring-1 ring-navy/5">
            <img
              src="/images/philosophy/philosophy-main.jpg"
              alt="Alumnos de NWL Australian School colaborando en un proyecto"
              className="w-full h-[34vh] md:h-[42vh] object-cover"
              loading="lazy"
            />
          </figure>
        </motion.section>

        {/* The kangaroo */}
        <motion.section {...fadeUp} className="mt-16">
          <SectionHeading eyebrow="Our Spirit">
            ¿Por qué un canguro?
          </SectionHeading>
          <div className="space-y-6">
            <Body>
              Nuestra nueva identidad tiene un símbolo al centro, y no es
              casualidad. El canguro cría a su joey en la bolsa: lo carga, lo
              protege y lo alimenta hasta que está listo para saltar por sí
              mismo. Así entendemos nuestra tarea con cada alumno.
            </Body>
            <div className="rounded-2xl bg-navy text-paper p-6 md:p-8 flex items-center gap-6">
              <img
                src="/images/brand/nwl-as-kangaroo-gold.png"
                alt="Canguro NWL"
                className="h-14 md:h-20 w-auto shrink-0"
              />
              <p className="text-paper/85 leading-relaxed">
                Y hay un detalle más: por su anatomía,{' '}
                <strong className="text-paper">los canguros no pueden caminar
                hacia atrás</strong>. Nosotros tampoco. Siempre hacia adelante —
                always forward.
              </p>
            </div>
          </div>
        </motion.section>
      </article>

      {/* ───────── WhatsApp CTA ───────── */}
      <section className="container-custom max-w-4xl pb-16">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-3xl nwl-bg-dawn-deep text-paper px-7 py-10 md:px-12 md:py-14"
        >
          <div
            className="hidden md:block absolute top-8 right-8 pointer-events-none"
            aria-hidden="true"
          >
            <SouthernCross height={110} color="var(--nwl-gold)" opacity={0.3} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <Eyebrow>
              <span className="text-gold-400">Questions? We&apos;re on WhatsApp</span>
            </Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
              Conoce el modelo australiano en persona.
            </h2>
            <p className="text-paper/75 leading-relaxed mb-8">
              Si quieres entender qué significa el cambio para tu familia — o
              conocer NWL por primera vez — agenda una visita guiada en el campus
              más cercano. Nuestro equipo de admisiones está disponible.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/5214421227791"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-pill bg-green-500 hover:bg-green-600 text-white px-7 py-3.5 font-medium transition-colors"
              >
                <FaWhatsapp size={20} /> WhatsApp: +52 442 122 7791
              </a>
              <a
                href="/#admissions"
                className="inline-flex items-center justify-center gap-2 rounded-pill bg-white/10 border border-white/30 hover:bg-white hover:text-navy text-paper px-7 py-3.5 font-medium transition-colors"
              >
                Agenda una visita guiada <FiArrowRight size={18} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Closing banner */}
        <motion.p
          {...fadeUp}
          className="text-center font-display text-2xl md:text-3xl font-bold text-gold-600 mt-12"
        >
          Be Proud. Be NWL.
        </motion.p>
      </section>

      <Footer />
    </main>
  );
}
