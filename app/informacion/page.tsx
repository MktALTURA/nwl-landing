'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { informacionPages } from '@/lib/informacion-data';
import type { InformacionPage } from '@/lib/informacion-data';
import { levelLabels } from '@/components/informacion/InformacionLinks';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { BrochureProvider } from '@/lib/BrochureContext';
import FixedCTAButton from '@/components/FixedCTAButton';
import BrochureModal from '@/components/BrochureModal';

function groupByCategory(pages: InformacionPage[]) {
  const groups: Record<string, InformacionPage[]> = {};
  for (const page of pages) {
    const key = page.targetCampus || page.targetNeighborhood || 'general';
    if (!groups[key]) groups[key] = [];
    groups[key].push(page);
  }
  return groups;
}

const campusNames: Record<string, string> = {
  juriquilla: 'Juriquilla',
  milenio: 'Milenio',
  zibata: 'Zibatá',
  'san-miguel': 'San Miguel de Allende',
  corregidora: 'Corregidora',
  'Loma Dorada': 'Loma Dorada',
  'Centro Sur': 'Centro Sur',
  'El Mirador': 'El Mirador',
  'El Refugio': 'El Refugio',
  'Cumbres del Lago': 'Cumbres del Lago',
  'Gran Reserva': 'Gran Reserva',
  Candiles: 'Candiles / Tejeda',
  general: 'Querétaro',
};

function InformacionIndexContent() {
  const { locale } = useLanguage();
  const allPages = Object.values(informacionPages);
  const groups = groupByCategory(allPages);

  // Sort groups: campuses first, then neighborhoods, then general
  const campusOrder = ['juriquilla', 'milenio', 'zibata', 'san-miguel', 'corregidora'];
  const neighborhoodOrder = ['Loma Dorada', 'Centro Sur', 'El Mirador', 'El Refugio', 'Cumbres del Lago', 'Gran Reserva', 'Candiles'];
  const sortedKeys = [
    ...campusOrder.filter((k) => groups[k]),
    ...neighborhoodOrder.filter((k) => groups[k]),
    ...(groups['general'] ? ['general'] : []),
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden nwl-bg-dawn-deep">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/70 via-navy-900/40 to-transparent" />
        <div className="container-custom relative z-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center text-sm text-paper/60 gap-2">
              <li>
                <a href="/" className="hover:text-paper transition-colors">
                  NWL Australian School
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/90" aria-current="page">
                {locale === 'es' ? 'Información' : 'Information'}
              </li>
            </ol>
          </nav>
          <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-9 h-px bg-gold" aria-hidden="true" />
            {locale === 'es' ? 'Recursos para familias' : 'Resources for families'}
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-paper mb-4">
            {locale === 'es' ? (
              <>Información por <span className="italic text-gold">Campus y Nivel</span></>
            ) : (
              <>Information by <span className="italic text-gold">Campus & Level</span></>
            )}
          </h1>
          <p className="text-xl text-paper/80 max-w-2xl">
            {locale === 'es'
              ? 'Encuentra información detallada sobre nuestros programas educativos en cada campus y zona de Querétaro y San Miguel de Allende.'
              : 'Find detailed information about our educational programs at each campus and area in Querétaro and San Miguel de Allende.'}
          </p>
        </div>
      </section>

      {/* Page listing by group */}
      <section className="py-16">
        <div className="container-custom max-w-5xl">
          {sortedKeys.map((groupKey, groupIdx) => (
            <motion.div
              key={groupKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIdx * 0.05 }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-6 border-b-2 border-gold/30 pb-3">
                {campusNames[groupKey] || groupKey}
              </h2>
              <div className="grid gap-3">
                {groups[groupKey].map((page) => (
                  <Link
                    key={page.slug}
                    href={`/informacion/${page.slug}`}
                    className="group flex items-center justify-between p-4 rounded-xl hover:bg-paper transition-colors border border-transparent hover:border-n-200"
                  >
                    <div>
                      <p className="font-medium text-navy group-hover:text-gold transition-colors">
                        {page.h1}
                      </p>
                      <p className="text-sm text-navy/50 mt-1">
                        {page.targetLevel
                          ? levelLabels[page.targetLevel]?.[locale === 'es' ? 'es' : 'en'] ??
                            page.targetLevel.replace('/', '').replace(/-/g, ' ')
                          : locale === 'es'
                            ? 'Todos los niveles'
                            : 'All levels'}
                        {page.lang === 'en' && (
                          <span className="ml-2 inline-flex items-center bg-coral-sea/10 text-coral-sea text-xs px-2 py-0.5 rounded-full">
                            English
                          </span>
                        )}
                      </p>
                    </div>
                    <span className="text-navy/30 group-hover:text-gold transition-colors text-xl">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function InformacionIndex() {
  return (
    <LanguageProvider>
      <BrochureProvider>
        <Navigation />
        <FixedCTAButton />
        <BrochureModal />
        <InformacionIndexContent />
      </BrochureProvider>
    </LanguageProvider>
  );
}
