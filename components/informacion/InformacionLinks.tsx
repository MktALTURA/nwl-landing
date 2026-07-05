'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { campuses } from '@/lib/campus-data';
import type { InformacionPage } from '@/lib/informacion-data';

interface InformacionLinksProps {
  page: InformacionPage;
}

const levelLabels: Record<string, { en: string; es: string; image: string; chip: string }> = {
  '/maternal': { en: 'Maternal Program', es: 'Programa Maternal', image: '/images/levels/maternal.jpg', chip: 'bg-eucalyptus/15 text-navy' },
  '/kinder': { en: 'Kinder Program', es: 'Programa Kinder', image: '/images/levels/kinder.jpg', chip: 'bg-eucalyptus/15 text-navy' },
  '/elementary': { en: 'Elementary School', es: 'Primaria', image: '/images/levels/primaria.jpg', chip: 'bg-wattle/15 text-navy' },
  '/middle-school': { en: 'Middle School', es: 'Secundaria', image: '/images/levels/secundaria.jpg', chip: 'bg-coral-sea/10 text-coral-sea' },
  '/high-school': { en: 'High School', es: 'Preparatoria', image: '/images/levels/preparatoria.jpg', chip: 'bg-jacaranda/10 text-jacaranda' },
};

export default function InformacionLinks({ page }: InformacionLinksProps) {
  const { locale } = useLanguage();
  const campus = page.targetCampus ? campuses[page.targetCampus] : null;
  const level = page.targetLevel ? levelLabels[page.targetLevel] : null;

  if (!campus && !level) return null;

  return (
    <section className="py-16">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
            {locale === 'es' ? (
              <>Conoce <span className="italic text-gold">más</span></>
            ) : (
              <>Learn <span className="italic text-gold">More</span></>
            )}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Campus link card */}
          {campus && (
            <motion.a
              href={`/campus/${page.targetCampus}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group bg-white rounded-2xl border border-n-200 hover:shadow-lg transition-shadow overflow-hidden block"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={campus.heroImage}
                  alt={`Campus ${campus.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
              </div>
              <div className="p-6">
                <span className="inline-flex items-center bg-gold/15 text-navy text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
                  Campus
                </span>
                <p className="font-display text-2xl font-bold text-navy group-hover:text-gold transition-colors">
                  Campus {campus.name}
                </p>
                <p className="text-sm text-navy/60 mt-1">
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
              className="group bg-white rounded-2xl border border-n-200 hover:shadow-lg transition-shadow overflow-hidden block"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={level.image}
                  alt={locale === 'es' ? level.es : level.en}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
              </div>
              <div className="p-6">
                <span className={`inline-flex items-center text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3 ${level.chip}`}>
                  {locale === 'es' ? 'Programa' : 'Program'}
                </span>
                <p className="font-display text-2xl font-bold text-navy group-hover:text-gold transition-colors">
                  {locale === 'es' ? level.es : level.en}
                </p>
                <p className="text-sm text-navy/60 mt-1">
                  {locale === 'es' ? 'Conoce el programa' : 'Explore the program'}
                </p>
              </div>
            </motion.a>
          )}
        </div>
      </div>
    </section>
  );
}
