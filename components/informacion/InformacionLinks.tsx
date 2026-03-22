'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { campuses } from '@/lib/campus-data';
import type { InformacionPage } from '@/lib/informacion-data';

interface InformacionLinksProps {
  page: InformacionPage;
}

const levelLabels: Record<string, { en: string; es: string; image: string }> = {
  '/maternal': { en: 'Maternal Program', es: 'Programa Maternal', image: '/images/levels/maternal.jpg' },
  '/kinder': { en: 'Kinder Program', es: 'Programa Kinder', image: '/images/levels/kinder.jpg' },
  '/elementary': { en: 'Elementary School', es: 'Primaria', image: '/images/levels/primaria.jpg' },
  '/middle-school': { en: 'Middle School', es: 'Secundaria', image: '/images/levels/secundaria.jpg' },
  '/high-school': { en: 'High School', es: 'Preparatoria', image: '/images/levels/preparatoria.jpg' },
};

export default function InformacionLinks({ page }: InformacionLinksProps) {
  const { locale } = useLanguage();
  const campus = page.targetCampus ? campuses[page.targetCampus] : null;
  const level = page.targetLevel ? levelLabels[page.targetLevel] : null;

  if (!campus && !level) return null;

  return (
    <section className="py-16">
      <div className="container-custom max-w-4xl">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-8 text-center">
          {locale === 'es' ? 'Conoce más' : 'Learn More'}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Campus link card */}
          {campus && (
            <motion.a
              href={`/campus/${page.targetCampus}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl h-[250px] block"
            >
              <Image
                src={campus.heroImage}
                alt={`Campus ${campus.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/70 text-sm mb-1">
                  {locale === 'es' ? 'Visita el campus' : 'Visit campus'}
                </p>
                <p className="text-white font-display text-2xl font-bold">
                  Campus {campus.name}
                </p>
                <p className="text-white/80 text-sm mt-1">
                  {locale === 'es' ? campus.tagline.es : campus.tagline.en}
                </p>
              </div>
            </motion.a>
          )}

          {/* Level link card */}
          {level && (
            <motion.a
              href={page.targetLevel!}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl h-[250px] block"
            >
              <Image
                src={level.image}
                alt={locale === 'es' ? level.es : level.en}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/70 text-sm mb-1">
                  {locale === 'es' ? 'Conoce el programa' : 'Explore the program'}
                </p>
                <p className="text-white font-display text-2xl font-bold">
                  {locale === 'es' ? level.es : level.en}
                </p>
              </div>
            </motion.a>
          )}
        </div>
      </div>
    </section>
  );
}
