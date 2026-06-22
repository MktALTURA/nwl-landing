'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  benefitCategories,
  benefitPartners,
  getCategory,
  t as tr,
  type BenefitPartner,
} from '@/lib/beneficios-data';

/**
 * Static color-class map so Tailwind keeps these classes at build time
 * (dynamic `bg-${token}` strings would be purged). Keyed by the category's
 * `color` token in lib/beneficios-data.ts.
 */
const COLOR: Record<
  string,
  { bar: string; chip: string; tile: string; pill: string }
> = {
  eucalyptus: {
    bar: 'bg-eucalyptus',
    chip: 'bg-eucalyptus border-eucalyptus text-charcoal',
    tile: 'from-eucalyptus/30 to-eucalyptus/10',
    pill: 'bg-eucalyptus/20 text-charcoal',
  },
  skyblue: {
    bar: 'bg-skyblue',
    chip: 'bg-skyblue border-skyblue text-charcoal',
    tile: 'from-skyblue/30 to-skyblue/10',
    pill: 'bg-skyblue/20 text-charcoal',
  },
  terracotta: {
    bar: 'bg-terracotta',
    chip: 'bg-terracotta border-terracotta text-white',
    tile: 'from-terracotta/30 to-terracotta/10',
    pill: 'bg-terracotta/20 text-charcoal',
  },
  mustard: {
    bar: 'bg-mustard',
    chip: 'bg-mustard border-mustard text-charcoal',
    tile: 'from-mustard/30 to-mustard/10',
    pill: 'bg-mustard/20 text-charcoal',
  },
  coral: {
    bar: 'bg-coral',
    chip: 'bg-coral border-coral text-white',
    tile: 'from-coral/30 to-coral/10',
    pill: 'bg-coral/20 text-charcoal',
  },
};

const initials = (name: string) => {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

export default function BeneficiosCatalog() {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState<string>('all');

  const filtered =
    active === 'all'
      ? benefitPartners
      : benefitPartners.filter((p) => p.categoryKey === active);

  return (
    <section id="catalogo" className="section-padding bg-ivory animate-section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {t.beneficios.catalogTitle}{' '}
            <span className="text-wine">{t.beneficios.catalogTitleAccent}</span>
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            {t.beneficios.catalogSubtitle}
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <FilterChip
            label={t.beneficios.filterAll}
            isActive={active === 'all'}
            activeClass="bg-wine border-wine text-white"
            onClick={() => setActive('all')}
          />
          {benefitCategories.map((cat) => (
            <FilterChip
              key={cat.key}
              label={cat.label[locale]}
              isActive={active === cat.key}
              activeClass={COLOR[cat.color]?.chip ?? 'bg-wine border-wine text-white'}
              onClick={() => setActive(cat.key)}
            />
          ))}
        </div>

        {/* Card grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((partner) => (
              <PartnerCard key={partner.slug} partner={partner} locale={locale} t={t} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-charcoal/60 mt-10">{t.beneficios.noResults}</p>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  label,
  isActive,
  activeClass,
  onClick,
}: {
  label: string;
  isActive: boolean;
  activeClass: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all duration-300 ${
        isActive
          ? `${activeClass} shadow-md`
          : 'bg-white border-warmgray text-charcoal/70 hover:border-charcoal/40 hover:text-charcoal'
      }`}
    >
      {label}
    </button>
  );
}

function PartnerCard({
  partner,
  locale,
  t,
}: {
  partner: BenefitPartner;
  locale: 'es' | 'en';
  t: ReturnType<typeof useLanguage>['t'];
}) {
  const category = getCategory(partner.categoryKey);
  const c = COLOR[category.color] ?? COLOR.mustard;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Category accent bar */}
      <div className={`h-1 ${c.bar}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Logo band — real logos sit on a clean white panel; partners without
            a logo fall back to a category-tinted monogram tile. */}
        <div
          className={`relative h-28 rounded-lg flex items-center justify-center px-5 mb-5 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] ${
            partner.logo
              ? 'bg-white ring-1 ring-warmgray/60'
              : `bg-gradient-to-br ${c.tile}`
          }`}
        >
          {partner.logo ? (
            partner.logoStyle === 'badge' ? (
              // Logo with its own colored background → framed as a rounded badge.
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="h-[5.5rem] w-auto object-contain rounded-lg shadow-sm"
              />
            ) : (
              // Transparent / white-background wordmark → shown wide via contain.
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="max-h-20 max-w-[90%] w-auto object-contain"
              />
            )
          ) : (
            <span className="font-display text-3xl font-bold text-charcoal/80">
              {initials(partner.name)}
            </span>
          )}
        </div>

        {/* Category + name */}
        <span
          className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-3 ${c.pill}`}
        >
          {category.label[locale]}
        </span>
        <h3 className="font-display text-xl font-bold text-charcoal mb-3">
          {partner.name}
        </h3>

        {/* Discount — focal element */}
        <p className="text-wine font-bold text-2xl leading-tight mb-2">
          {tr(partner.discount, locale)}
        </p>

        {/* Detail */}
        {partner.detail && (
          <p className="text-sm text-charcoal/70 leading-relaxed mb-3">
            {tr(partner.detail, locale)}
          </p>
        )}

        {/* Restrictions / fine print */}
        {partner.restrictions && (
          <p className="text-[11px] text-charcoal/45 italic leading-snug mb-4">
            {tr(partner.restrictions, locale)}
          </p>
        )}

        {/* Footer: vigencia + link */}
        <div className="mt-auto pt-4 border-t border-warmgray/60 flex items-center justify-between gap-3">
          {partner.vigencia ? (
            <span className="text-xs text-charcoal/50">
              {tr(partner.vigencia, locale)}
            </span>
          ) : (
            <span />
          )}
          {partner.url && (
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-wine hover:text-deep-ember transition-colors whitespace-nowrap"
            >
              {t.beneficios.viewMore}
              <FiExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
