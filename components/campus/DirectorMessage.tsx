'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { type CampusDirector, localized } from '@/lib/campus-data';

interface DirectorMessageProps {
  director: CampusDirector;
}

export default function DirectorMessage({ director }: DirectorMessageProps) {
  const { locale, t } = useLanguage();

  return (
    <section className="section-padding bg-ivory">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            {t.campusDetail.directorTitle}{' '}
            <span className="text-wine">{t.campusDetail.directorTitleAccent}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-center max-w-5xl mx-auto">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={director.image}
                alt={director.name}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="border-l-4 border-wine pl-6">
              <p className="font-display text-xl md:text-2xl text-charcoal/80 italic leading-relaxed mb-8">
                &ldquo;{localized(director.message, locale)}&rdquo;
              </p>
              <div>
                <p className="font-bold text-charcoal text-lg">{director.name}</p>
                <p className="text-wine text-sm font-medium">
                  {localized(director.title, locale)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
