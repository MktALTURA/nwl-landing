'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { CampusGalleryImage } from '@/lib/campus-data';
import { localized } from '@/lib/campus-data';

interface CampusLifeProps {
  images: CampusGalleryImage[];
}

export default function CampusLife({ images }: CampusLifeProps) {
  const { locale, t } = useLanguage();
  const [active, setActive] = useState(0);

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-white to-sand relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-10 w-40 h-40 bg-mustard/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-10 w-48 h-48 bg-sunshine/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="wine-divider mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal">
            {t.campusDetail.galleryTitle}{' '}
            <span className="text-wine">{t.campusDetail.galleryTitleAccent}</span>
          </h2>
        </motion.div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Main Image */}
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl mb-4 bg-sand">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[active].src}
                  alt={`${localized(images[active].caption, locale)} – Newland School`}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
              <p className="font-display text-lg md:text-xl font-bold text-white">
                {localized(images[active].caption, locale)}
              </p>
            </div>

            {/* Nav Arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
              aria-label="Previous"
            >
              <FiChevronLeft size={20} className="text-charcoal" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
              aria-label="Next"
            >
              <FiChevronRight size={20} className="text-charcoal" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-md overflow-hidden transition-all duration-200 ${
                  i === active
                    ? 'ring-2 ring-wine opacity-100 scale-105'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  src={img.src}
                  alt={localized(img.caption, locale)}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
