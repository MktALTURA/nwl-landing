'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { InformacionPage } from '@/lib/informacion-data';

interface InformacionHeroProps {
  page: InformacionPage;
}

export default function InformacionHero({ page }: InformacionHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={page.images.hero}
          alt={page.h1}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy-900/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center text-sm text-paper/70 gap-2">
              <li>
                <a href="/" className="hover:text-paper transition-colors">
                  NWL Australian School
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href="/informacion" className="hover:text-paper transition-colors">
                  {page.lang === 'es' ? 'Información' : 'Information'}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/90 truncate max-w-[200px]" aria-current="page">
                {page.h1}
              </li>
            </ol>
          </nav>

          {/* Eyebrow */}
          <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-9 h-px bg-gold" aria-hidden="true" />
            {page.lang === 'es' ? 'Información para familias' : 'Information for families'}
          </span>

          {/* H1 */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-paper mb-6 leading-tight">
            {page.h1}
          </h1>

          {/* Unique intro */}
          <p className="text-lg md:text-xl text-paper/90 leading-relaxed max-w-2xl">
            {page.uniqueIntro}
          </p>
        </motion.div>
      </div>

      {/* Kangaroo Watermark */}
      <div className="absolute right-[-5%] bottom-[-5%] w-[30vh] h-[30vh] opacity-[0.06] pointer-events-none">
        <img
          src="/images/brand/nwl-as-kangaroo-white.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
}
