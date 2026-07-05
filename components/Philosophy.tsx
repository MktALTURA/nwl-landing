'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import BrochureLevelDropdown from './BrochureLevelDropdown';

const pillarsData = [
  { number: '01', logoInitials: 'P4C', logoImage: { es: '/images/logos/partners/CFPN-es.png', en: '/images/logos/partners/CFPN-en.png' } },
  { number: '02', logoInitials: 'NWL', logoImage: { es: '/images/logos/partners/Yo_soy_lider_nwl-es.png', en: '/images/logos/partners/Yo_soy_lider_nwl-en.png' } },
  { number: '03', logoInitials: 'K', logoImage: '/images/logos/knotion.png' },
];

export default function Philosophy() {
  const { t, locale } = useLanguage();
  const pillars = pillarsData.map((p, i) => ({
    ...p,
    ...t.philosophy.pillars[i],
    logoImage: typeof p.logoImage === 'string' ? p.logoImage : p.logoImage[locale],
  }));

  return (
    <section className="section-padding bg-paper animate-section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
              <span className="w-9 h-px bg-gold" />
              {locale === 'en' ? 'Educational Model' : 'Modelo educativo'}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy tracking-tight mb-6">
              {t.philosophy.sectionTitle} <span className="italic text-gold">{t.philosophy.sectionTitleAccent}</span>{t.philosophy.sectionTitleEnd ? ` ${t.philosophy.sectionTitleEnd}` : ''}
            </h2>
            <p className="text-lg text-navy/70 mb-8 leading-relaxed">
              {t.philosophy.sectionDescription}
            </p>

            {/* Three Pillars with Images */}
            <div className="space-y-6 mb-8">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-5 bg-white p-5 rounded-2xl border border-navy/10 border-l-4 border-l-transparent shadow-[0_12px_32px_-20px_rgba(11,34,78,0.28)] hover:shadow-[0_18px_44px_-18px_rgba(11,34,78,0.32)] hover:border-l-gold transition-all duration-300"
                >
                  {/* Logo */}
                  <div className={`flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center overflow-hidden ${pillar.logoImage ? '' : 'border-2 border-dashed border-gold/30 bg-gold/5'}`}>
                    {pillar.logoImage ? (
                      <Image
                        src={pillar.logoImage}
                        alt={pillar.title}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-gold-600 font-bold text-sm text-center leading-tight">
                        {pillar.logoInitials}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-base font-semibold text-gold-600 italic mb-2">
                      {pillar.subtitle}
                    </p>
                    <p className="text-navy/70 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a href="/modelo" className="btn-primary inline-flex items-center gap-2">
                {t.philosophy.modelCta}
                <span aria-hidden="true">→</span>
              </a>
              <BrochureLevelDropdown
                className="btn-secondary inline-flex items-center"
              >
                {t.philosophy.cta}
              </BrochureLevelDropdown>
            </div>
          </div>

          {/* Right: Large Image Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative space-y-4"
          >
            {/* Main large image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-paper ring-1 ring-navy/10 nwl-grade">
              <Image
                src="/images/philosophy/philosophy-main.jpg"
                alt="Students collaborating on a project at NWL Australian School"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Two smaller images below */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden relative bg-paper ring-1 ring-navy/10 nwl-grade">
                <Image
                  src="/images/philosophy/philosophy-1.jpg"
                  alt="Outdoor learning at NWL Australian School"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden relative bg-paper ring-1 ring-navy/10 nwl-grade">
                <Image
                  src="/images/philosophy/philosophy-2.jpg"
                  alt="Hands-on collaboration at NWL Australian School"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Accent decoration */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold/15 -z-10 rounded-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
