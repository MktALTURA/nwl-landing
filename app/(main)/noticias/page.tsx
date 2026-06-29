'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import Footer from '@/components/Footer';

interface NewsPost {
  slug: string;
  category: string;
  date: string;
  readingTime: string;
  title: string;
  excerpt: string;
  image: string;
  featured?: boolean;
}

const posts: NewsPost[] = [
  {
    slug: 'newland-knotion',
    category: 'Actualización de metodología',
    date: '18 de junio, 2026',
    readingTime: '6 min',
    title: 'Newland × Knotion: A Smarter, Braver Way to Learn',
    excerpt:
      'Introducción gradual de Knotion en Kinder con Kn·Spark Sense y descuentos exclusivos en los campus Milenio, San Miguel y Corregidora. Una actualización importante sobre nuestra metodología y lo que significa para tu familia.',
    image: '/images/levels/kinder/kinder-digital-learning.jpg',
    featured: true,
  },
];

export default function NoticiasIndex() {
  const [featured, ...rest] = posts;

  return (
    <main className="bg-ivory">
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-white pt-32 md:pt-36 pb-16">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(circle at 15% 25%, rgba(139,35,50,0.5) 0%, transparent 55%), radial-gradient(circle at 85% 20%, rgba(230,169,68,0.16) 0%, transparent 50%), linear-gradient(160deg, #2c2c2c 0%, #3D3D3D 60%, #2a1416 100%)',
          }}
        />
        <div className="container-custom relative z-10 max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center text-sm text-white/55 gap-2">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Newland School
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90" aria-current="page">
                Noticias
              </li>
            </ol>
          </nav>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-mustard mb-4">
            <span className="w-6 h-[2px] bg-mustard" />
            News &amp; Updates
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
            Noticias Newland
          </h1>
          <p className="mt-5 text-xl text-white/75 max-w-2xl leading-relaxed">
            Actualizaciones oficiales sobre metodología, alianzas, campus y
            comunidad, para familias, docentes y nuestro equipo de admisiones.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="container-custom max-w-5xl py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={`/noticias/${featured.slug}`}
            className="group grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-charcoal/10 bg-white hover:shadow-xl transition-shadow"
          >
            <div className="relative overflow-hidden h-56 md:h-auto">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 rounded-full bg-mustard text-charcoal text-[11px] font-bold uppercase tracking-wider px-3 py-1">
                Destacado
              </span>
            </div>
            <div className="p-7 md:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-charcoal/55">
                <span className="font-semibold uppercase tracking-wider text-wine">
                  {featured.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <FiClock size={12} /> {featured.readingTime}
                </span>
                <span>· {featured.date}</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal leading-snug mb-4 group-hover:text-wine transition-colors">
                {featured.title}
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-wine font-medium">
                Leer la actualización
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Future posts grid */}
        {rest.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3 mt-10">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/noticias/${post.slug}`}
                className="group rounded-2xl overflow-hidden border border-charcoal/10 bg-white hover:shadow-lg transition-shadow"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-wine mb-2">
                    {post.category}
                  </p>
                  <h3 className="font-display text-lg font-bold text-charcoal leading-snug group-hover:text-wine transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
