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
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
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
            <ol className="flex items-center text-sm text-white/70 gap-2">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Newland School
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href="/informacion" className="hover:text-white transition-colors">
                  {page.lang === 'es' ? 'Información' : 'Information'}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90 truncate max-w-[200px]" aria-current="page">
                {page.h1}
              </li>
            </ol>
          </nav>

          {/* H1 */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {page.h1}
          </h1>

          {/* Unique intro */}
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
            {page.uniqueIntro}
          </p>
        </motion.div>
      </div>

      {/* Kangaroo Watermark */}
      <div className="absolute right-[-5%] bottom-[-5%] w-[30vh] h-[30vh] opacity-[0.06] pointer-events-none">
        <img
          src="/images/brand/kangaroo-white-transparent.png"
          alt=""
          className="w-full h-full object-contain rotate-[15deg]"
        />
      </div>
    </section>
  );
}
