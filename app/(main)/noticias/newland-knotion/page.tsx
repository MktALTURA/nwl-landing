'use client';

import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiClock,
  FiSmartphone,
  FiSun,
  FiLayers,
  FiAward,
  FiUser,
  FiTag,
  FiExternalLink,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Footer from '@/components/Footer';

/* ──────────────────────────────────────────────────────────
   Newland × Knotion · News / methodology update
   Headers in English · Body in Spanish · Brand constants kept
   ────────────────────────────────────────────────────────── */

const PUBLISHED = '18 de junio, 2026';

const sensePillars = [
  {
    icon: FiSun,
    title: 'Sensory Learning',
    body: 'Actividades con pasos sensoriales interactivos que mantienen al niño comprometido de formas apropiadas para su edad.',
  },
  {
    icon: FiUser,
    title: 'Creación de Avatar',
    body: 'Los niños diseñan su perfil digital, un primer paso en identidad digital positiva.',
  },
  {
    icon: FiLayers,
    title: 'Contenido transdisciplinar',
    body: 'Currículo que cruza materias de forma integrada, tal como el cerebro de un niño conecta naturalmente el conocimiento.',
  },
  {
    icon: FiAward,
    title: 'Gamificación con propósito',
    body: 'Retos y recompensas alineados a competencias reales, no a tiempo de pantalla por el tiempo de pantalla.',
  },
];

const kinderSteps = [
  {
    label: 'Kinder 1',
    title: 'Sin iPad propio',
    body: 'El niño no necesita traer iPad. El enfoque es completamente físico y socioemocional; cualquier acercamiento a lo digital es puntual y guiado por la maestra en dispositivos del aula.',
  },
  {
    label: 'Kinder 2',
    title: 'Sin iPad, acercamiento guiado',
    body: 'Tampoco se requiere traer iPad. Los niños empiezan a familiarizarse con herramientas digitales de forma guiada, sentando las bases de ciudadanía digital que Knotion promueve.',
  },
  {
    label: 'Kinder 3',
    title: 'iPad propio + Knotion Sense',
    body: 'A partir de Kinder 3 el niño cuenta con su propio iPad, con un uso moderado de alrededor de 5 horas por semana, ya integrado de lleno con Knotion Sense.',
  },
];

const familyCards = [
  {
    tag: 'Para Maternal',
    body: 'Tu hijo vivirá una etapa de Maternal sensorial, afectiva y sin pantallas, acompañado de cerca por docentes especializados en primera infancia. Una base sólida para todo lo que viene después.',
    badge: 'bg-bubblegum/20',
  },
  {
    tag: 'Para Kinder',
    body: 'El camino hacia la tecnología es gradual e intencional, guiado por el modelo de Knotion. Tu hijo llegará a Primaria no solo sabiendo usar un iPad, sino sabiendo por qué y para qué lo usa.',
    badge: 'bg-ocean/20',
  },
  {
    tag: 'Primaria y Secundaria · Milenio, SMA y Corregidora',
    body: 'El acceso a la plataforma Knotion completa ahora es más accesible, sin ningún compromiso en calidad. El modelo es el mismo. La inversión es menor.',
    badge: 'bg-mustard/25',
  },
];

const pricingRows = [
  { level: 'Kinder', be: '10%', sense: '+10% (Knotion Sense)', total: 'hasta 20%' },
  { level: 'Primaria', be: '20%', sense: 'No aplica', total: '20%' },
  { level: 'Secundaria', be: '15%', sense: 'No aplica', total: '15%' },
];

const sources = [
  { label: 'Knotion · Knowledge in Action', href: 'https://www.knotion.com/' },
  { label: 'Knotion · Para Escuelas', href: 'https://www.knotion.com/for-schools' },
  { label: 'Knotion · Somos únicos', href: 'https://www.knotion.com/we-are' },
  { label: 'Knotion en Smartium MX', href: 'https://smartium.mx/en/knotion-2/' },
  {
    label: 'Knotion · ResearchGate: An Analysis of a Learning Ecosystem',
    href: 'https://www.researchgate.net/publication/397393336_An_An_Analysis_of_a_Learning_Ecosystem_The_Knotion_CMS',
  },
  {
    label: 'Knotion App Developer · Apple App Store',
    href: 'https://apps.apple.com/us/developer/knotion/id1193743798',
  },
  {
    label: 'Knotion · HeartMath Institute',
    href: 'https://www.heartmath.org/articles-of-the-heart/knotion/',
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
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-wine">
      <span className="w-6 h-[2px] bg-wine" />
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
      <h2 className="font-display text-3xl md:text-[2.6rem] leading-[1.1] font-bold text-charcoal mt-4">
        {children}
      </h2>
    </div>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed">{children}</p>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-[1.05rem] text-charcoal/80 leading-[1.8]">{children}</p>;
}

function PullQuote({ children, attribution }: { children: React.ReactNode; attribution?: string }) {
  return (
    <motion.figure {...fadeUp} className="my-12 md:my-16 text-center">
      <p className="font-display text-2xl md:text-4xl leading-snug text-wine italic">
        “{children}”
      </p>
      {attribution && (
        <figcaption className="mt-4 text-sm uppercase tracking-wider text-charcoal/50">
          {attribution}
        </figcaption>
      )}
      <span className="mx-auto mt-6 block w-12 h-[3px] bg-mustard rounded-full" />
    </motion.figure>
  );
}

export default function NewlandKnotionNews() {
  return (
    <main className="bg-ivory">
      {/* ───────── Masthead / Hero ───────── */}
      <header className="relative bg-charcoal text-white pt-32 md:pt-36 pb-0">
        {/* ambient brand wash */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(circle at 18% 20%, rgba(139,35,50,0.55) 0%, transparent 55%), radial-gradient(circle at 85% 15%, rgba(230,169,68,0.18) 0%, transparent 50%), linear-gradient(160deg, #2c2c2c 0%, #3D3D3D 60%, #2a1416 100%)',
          }}
        />
        <div className="container-custom relative z-10 max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center text-sm text-white/55 gap-2">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Newland School
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href="/noticias" className="hover:text-white transition-colors">
                  Noticias
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90" aria-current="page">
                Newland × Knotion
              </li>
            </ol>
          </nav>

          {/* Category + date */}
          <div className="flex flex-wrap items-center gap-4 mb-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-mustard/20 border border-mustard/40 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-mustard">
              Actualización de metodología
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-white/60">
              <FiClock size={14} /> {PUBLISHED}
            </span>
            <span className="text-sm text-white/40">· 6 min de lectura</span>
          </div>

          {/* Newland × Knotion lockup */}
          <div className="flex items-center gap-4 md:gap-5 mb-8">
            <span className="flex items-center gap-2">
              <img
                src="/images/brand/kangaroo-white-transparent.png"
                alt="Newland"
                className="h-10 md:h-12 w-auto rotate-[15deg]"
              />
              <img
                src="/images/brand/nwl-logo-white.png"
                alt="Colegio Newland"
                className="h-7 md:h-9 w-auto"
              />
            </span>
            <span className="font-display text-2xl md:text-3xl text-white/40">×</span>
            <span className="rounded-lg bg-white px-3 py-2 shadow-lg">
              <img
                src="/images/logos/partners/knotion.png"
                alt="Knotion"
                className="h-6 md:h-7 w-auto"
              />
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl md:text-6xl font-bold leading-[1.05] max-w-3xl"
          >
            A Smarter, Braver Way to Learn
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-xl md:text-2xl text-white/75 max-w-2xl leading-relaxed"
          >
            Una actualización importante sobre nuestra metodología y lo que
            significa para tu familia.
          </motion.p>

          {/* Hero image overlaps into the body */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mt-12 -mb-16 md:-mb-24 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl"
          >
            <img
              src="/images/levels/kinder/kinder-digital-learning.jpg"
              alt="Niño de Newland aprendiendo con tecnología guiada por su maestra"
              className="w-full h-[40vh] md:h-[52vh] object-cover"
            />
            <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4 text-xs text-white/80">
              Tecnología al servicio del aprendizaje, introducida cuando el niño está listo.
            </figcaption>
          </motion.figure>
        </div>
      </header>

      {/* ───────── Article body ───────── */}
      <article className="container-custom max-w-3xl pt-24 md:pt-32 pb-10">
        {/* Intro */}
        <motion.div {...fadeUp} className="space-y-6">
          <Lead>
            En Colegio Newland, no hacemos cambios por hacer cambios.
          </Lead>
          <Body>
            Cada decisión que tomamos sobre cómo aprenden nuestros alumnos, qué
            herramientas usan y cuándo las usan, pasa primero por una pregunta:{' '}
            <strong className="text-charcoal">¿esto sirve al desarrollo real del niño?</strong>
          </Body>
          <Body>
            Esta temporada compartimos una de las actualizaciones más
            significativas a nuestra implementación Knotion en años. No es solo un
            ajuste operativo. Es una declaración de lo que creemos sobre la
            infancia, la tecnología y el aprendizaje auténtico.
          </Body>
        </motion.div>

        <PullQuote>It starts with the child. Not the screen.</PullQuote>

        {/* What is Knotion */}
        <motion.section {...fadeUp} className="scroll-mt-28">
          <SectionHeading eyebrow="The Foundation">
            What Is Knotion &amp; Why Newland Chose It
          </SectionHeading>
          <div className="space-y-6">
            <Body>
              Para quienes son nuevos en nuestra comunidad: Knotion es el
              ecosistema de aprendizaje transdisciplinar que utilizamos en Newland
              desde hace varios años. Su modelo pedagógico, llamado{' '}
              <strong className="text-charcoal">IMPACT® Learning</strong>, combina
              design thinking, retos del mundo real y tecnología para generar
              aprendizaje basado en acciones concretas, no en memorización.
            </Body>
            <div className="rounded-2xl bg-sand border border-charcoal/5 p-6 flex items-start gap-4">
              <img
                src="/images/logos/partners/knotion.png"
                alt="Knotion"
                className="h-6 w-auto mt-1 shrink-0"
              />
              <p className="text-charcoal/80 leading-relaxed">
                Sin tareas tradicionales. Sin hojas de trabajo repetitivas. En su
                lugar: <strong className="text-charcoal">proyectos reales, pensamiento
                crítico, colaboración.</strong> Es por eso que Newland eligió Knotion.
                Y es por eso que seguimos evolucionando junto a ellos.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Maternal */}
        <motion.section {...fadeUp} className="mt-16">
          <SectionHeading eyebrow="Maternal · Ages 2-3">
            Screen-Free. By Design.
          </SectionHeading>
          <div className="space-y-6">
            <Body>
              En Maternal, el aprendizaje continúa{' '}
              <strong className="text-charcoal">sin el uso de iPad</strong>. En esta
              etapa, la experiencia es sensorial, afectiva y humana: los niños
              aprenden a través del cuerpo, del juego y del vínculo con sus maestras.
            </Body>
          </div>

          <figure className="my-9 rounded-2xl overflow-hidden shadow-lg ring-1 ring-charcoal/5">
            <img
              src="/images/levels/maternal/maternal-playtime.jpg"
              alt="Alumnos de Maternal aprendiendo a través del juego sensorial, sin pantallas"
              className="w-full h-[34vh] md:h-[42vh] object-cover"
              loading="lazy"
            />
          </figure>

          <div className="space-y-6">
            <Body>
              En los primeros años, el aprendizaje más poderoso ocurre a través de la
              experiencia directa y de los vínculos: tocar, explorar, escuchar,
              hablar, moverse y relacionarse. Por eso Maternal es una etapa
              profundamente sensorial, acompañada de cerca por docentes especializados
              en primera infancia.
            </Body>

            {/* Sensory learning callout */}
            <div className="rounded-2xl border-l-4 border-eucalyptus bg-eucalyptus/10 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2">
                Aprender con todos los sentidos
              </p>
              <p className="text-charcoal/80 leading-relaxed">
                Los niños de Maternal trabajan con retos sensoriales, materiales
                reales, exploración guiada, narración oral y juego simbólico.
                Competencias como la{' '}
                <strong>curiosidad, la comunicación y la colaboración</strong> se
                desarrollan de forma plena en esta etapa, a su propio ritmo.
              </p>
            </div>

            <Body>
              El resultado: una base sensorial, emocional y social sólida sobre la
              cual el niño construirá todo lo que viene después.
            </Body>
          </div>
        </motion.section>

        {/* Kinder */}
        <motion.section {...fadeUp} className="mt-16">
          <SectionHeading eyebrow="Kinder · Ages 3-5">
            A Gradual Path Into Digital
          </SectionHeading>
          <Body>
            En Kinder, la tecnología se introduce de manera intencional, progresiva y
            siempre al servicio del aprendizaje, guiada por el modelo de Knotion.
          </Body>

          {/* Stepped progression */}
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {kinderSteps.map((step, i) => (
              <div
                key={step.label}
                className="relative rounded-2xl border border-charcoal/10 bg-white p-5 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blueberry/15 text-blueberry font-bold text-sm">
                    {i + 1}
                  </span>
                  <FiSmartphone
                    size={18}
                    className="text-charcoal/30"
                    style={{ opacity: 0.35 + i * 0.32 }}
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-blueberry mb-1">
                  {step.label}
                </p>
                <p className="font-display text-lg font-bold text-charcoal mb-2 leading-snug">
                  {step.title}
                </p>
                <p className="text-sm text-charcoal/70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>

          <figure className="my-9 rounded-2xl overflow-hidden shadow-lg ring-1 ring-charcoal/5">
            <img
              src="/images/levels/kinder/kinder-tablets.jpg"
              alt="Alumnos de Kinder usando iPads de forma guiada como parte de Knotion"
              className="w-full h-[34vh] md:h-[42vh] object-cover"
              loading="lazy"
            />
          </figure>

          <div className="rounded-2xl border-l-4 border-blueberry bg-blueberry/[0.06] p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2">
              ¿Por qué gradual?
            </p>
            <p className="text-charcoal/80 leading-relaxed">
              Porque Knotion está diseñado para acompañar el desarrollo del niño.
              Conforme maduran la atención, la autorregulación y las habilidades de{' '}
              <strong>ciudadanía digital</strong>, la plataforma incorpora nuevas
              herramientas. Así, cuando el iPad llega, lo hace de la mano de la
              maestra y con un propósito claro, sumando a un aprendizaje que ya tiene
              bases sólidas.
            </p>
          </div>
        </motion.section>

        {/* Knotion Sense */}
        <motion.section {...fadeUp} className="mt-16">
          <SectionHeading eyebrow="New Platform">
            Introducing Knotion Sense
          </SectionHeading>
          <Body>
            <strong className="text-charcoal">Kn·Spark Sense</strong> es la nueva
            plataforma de Knotion diseñada específicamente para preescolar. No es una
            versión reducida del sistema principal: es una aplicación construida
            desde cero para las características del aprendizaje en primera infancia.
          </Body>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {sensePillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-charcoal/10 bg-white p-5"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-ocean/15 text-ocean mb-4">
                    <Icon size={20} />
                  </span>
                  <p className="font-display text-lg font-bold text-charcoal mb-1.5">
                    {p.title}
                  </p>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 space-y-6">
            <Body>
              A diferencia de las apps genéricas de entretenimiento, Knotion Sense fue
              desarrollada en colaboración con instituciones educativas líderes en
              América Latina y probada en entornos 1:1 con resultados documentados en
              desarrollo de competencias globales.
            </Body>
            <div className="rounded-2xl bg-charcoal text-white p-6 flex items-center gap-5">
              <div className="shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-mustard text-charcoal">
                <FiTag size={20} />
                <span className="font-display text-xl font-bold leading-none mt-1">-10%</span>
              </div>
              <p className="text-white/85 leading-relaxed">
                Knotion Sense para Kinder tendrá un costo{' '}
                <strong className="text-white">10% menor</strong> que la plataforma
                completa, porque fue diseñada con precisión para esa etapa, y el
                precio debe reflejarlo.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Pricing */}
        <motion.section {...fadeUp} className="mt-16">
          <SectionHeading eyebrow="Milenio · San Miguel · Corregidora">
            Exclusive Pricing for Three Campuses
          </SectionHeading>
          <Body>
            Las familias de los campus <strong className="text-charcoal">Milenio, San
            Miguel de Allende y Corregidora</strong> tendrán acceso a descuentos
            adicionales en Knotion este ciclo, gracias al respaldo del{' '}
            <strong className="text-charcoal">British Endowment Foundation (B.E.)
            Program</strong>, un programa de apoyo a la excelencia educativa que
            Newland ha incorporado en estos campus.
          </Body>

          <div className="mt-8 overflow-hidden rounded-2xl border border-charcoal/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-wine text-white">
                  <th className="px-4 py-3 text-sm font-semibold">Nivel</th>
                  <th className="px-4 py-3 text-sm font-semibold">Descuento B.E.</th>
                  <th className="px-4 py-3 text-sm font-semibold hidden sm:table-cell">
                    Adicional Sense
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold">Total máx.</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row, i) => (
                  <tr
                    key={row.level}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-sand/60'}
                  >
                    <td className="px-4 py-3 font-medium text-charcoal">{row.level}</td>
                    <td className="px-4 py-3 text-charcoal/80">{row.be}</td>
                    <td className="px-4 py-3 text-charcoal/80 hidden sm:table-cell">
                      {row.sense}
                    </td>
                    <td className="px-4 py-3 font-bold text-wine">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-charcoal/50 leading-relaxed">
            Los descuentos aplican sobre el costo de la plataforma Knotion. No son
            acumulables con otros programas de apoyo. Consulta con tu CAP para los
            detalles de aplicación por campus.
          </p>

          <PullQuote>
            Este beneficio está vinculado al British Endowment Foundation Program y es
            un reconocimiento a las familias que forman parte de la comunidad Newland
            en estos campus.
          </PullQuote>
        </motion.section>

        {/* What this means for your family */}
        <motion.section {...fadeUp} className="mt-16">
          <SectionHeading eyebrow="For Your Family">
            What This Means for You
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-3">
            {familyCards.map((card) => (
              <div
                key={card.tag}
                className="rounded-2xl border border-charcoal/10 bg-white p-5 flex flex-col"
              >
                <span
                  className={`self-start rounded-full ${card.badge} text-charcoal text-[11px] font-bold uppercase tracking-wider px-3 py-1 mb-3`}
                >
                  {card.tag}
                </span>
                <p className="text-sm text-charcoal/75 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </article>

      {/* ───────── WhatsApp CTA ───────── */}
      <section className="container-custom max-w-4xl pb-16">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-3xl bg-charcoal text-white px-7 py-10 md:px-12 md:py-14"
        >
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                'radial-gradient(circle at 80% 20%, rgba(139,35,50,0.5) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(230,169,68,0.18) 0%, transparent 50%), linear-gradient(135deg, #2c2c2c, #3D3D3D)',
            }}
          />
          <div className="relative z-10 max-w-2xl">
            <Eyebrow>
              <span className="text-mustard">Questions? We&apos;re on WhatsApp</span>
            </Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
              Hablemos sobre lo que esto significa para tu hijo.
            </h2>
            <p className="text-white/75 leading-relaxed mb-8">
              Si tienes dudas sobre cómo aplican estos cambios en el campus de tu
              hijo, o quieres entender mejor la metodología antes de inscribir,
              nuestro equipo de admisiones está disponible.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/5214421227791"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-green-500 hover:bg-green-600 text-white px-7 py-3.5 font-medium transition-colors"
              >
                <FaWhatsapp size={20} /> WhatsApp: +52 442 122 7791
              </a>
              <a
                href="/#admissions"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-white/10 border border-white/30 hover:bg-white hover:text-charcoal text-white px-7 py-3.5 font-medium transition-colors"
              >
                Agenda una visita guiada <FiArrowRight size={18} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Closing banner */}
        <motion.p
          {...fadeUp}
          className="text-center font-display text-2xl md:text-3xl font-bold text-wine mt-12"
        >
          Be Proud. Be Newland.
        </motion.p>
      </section>

      {/* ───────── Sources ───────── */}
      <section className="bg-ivory border-t border-charcoal/10 py-12">
        <div className="container-custom max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-charcoal/50 mb-5">
            Fuentes
          </p>
          <ol className="grid gap-2 sm:grid-cols-2 list-decimal list-outside pl-5 marker:text-charcoal/40">
            {sources.map((s) => (
              <li key={s.label} className="text-sm leading-relaxed">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/70 hover:text-wine transition-colors inline-flex items-start gap-1"
                >
                  {s.label}
                  <FiExternalLink size={12} className="mt-1 shrink-0 opacity-50" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </main>
  );
}
