'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { type CampusFacility, localized } from '@/lib/campus-data';

interface FacilitiesProps {
  facilities: CampusFacility[];
}

export default function Facilities({ facilities }: FacilitiesProps) {
  const { locale, t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-ocean/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-mustard/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="wine-divider mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            {t.campusDetail.facilitiesTitle}{' '}
            <span className="text-wine">{t.campusDetail.facilitiesTitleAccent}</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.filter((f) => f.image).map((facility, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={facility.image}
                alt={localized(facility.name, locale)}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay with label */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-lg font-bold text-white">
                  {localized(facility.name, locale)}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
