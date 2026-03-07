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
    <section className="py-12 md:py-16 bg-gradient-to-br from-wine to-wine/90 text-white relative overflow-hidden">
      {/* Decorative blurs — like homepage FinalCTA */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-80 h-80 bg-mustard rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-eucalyptus rounded-full blur-3xl" />
      </div>

      {/* Kangaroo watermark */}
      <div className="absolute left-[-3%] bottom-[-8%] w-[30vh] h-[30vh] opacity-[0.05] pointer-events-none">
        <img
          src="/images/brand/kangaroo-white-transparent.png"
          alt=""
          className="w-full h-full object-contain rotate-[-15deg]"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="w-16 h-[2px] bg-mustard mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {t.campusDetail.directorTitle}{' '}
            <span className="text-mustard">{t.campusDetail.directorTitleAccent}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-center max-w-5xl mx-auto">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl ring-4 ring-white/10">
              <Image
                src={director.image}
                alt={director.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
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
            <div className="border-l-4 border-mustard pl-6">
              <p className="font-display text-xl md:text-2xl text-white/90 italic leading-relaxed mb-6">
                &ldquo;{localized(director.message, locale)}&rdquo;
              </p>
              <div>
                <p className="font-bold text-white text-lg">{director.name}</p>
                <p className="text-mustard text-sm font-medium">
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
