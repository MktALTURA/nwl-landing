'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiMaximize2, FiX } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getColor } from '@/lib/beneficios/colors';
import { tr, type BenefitPartner, type BenefitCategory } from '@/lib/beneficios/types';

const initials = (name: string) => {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

interface BeneficiosCatalogProps {
  partners: BenefitPartner[];
  categories: BenefitCategory[];
}

export default function BeneficiosCatalog({ partners, categories }: BeneficiosCatalogProps) {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState<string>('all');
  // Lightbox: the promo image currently expanded (with its alt), or null.
  const [promo, setPromo] = useState<{ src: string; alt: string } | null>(null);

  const filtered =
    active === 'all'
      ? partners
      : partners.filter((p) => p.categoryKey === active);

  // Close on Escape and lock body scroll while the lightbox is open.
  useEffect(() => {
    if (!promo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPromo(null);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [promo]);

  return (
    <section id="catalogo" className="section-padding bg-paper animate-section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
            {t.beneficios.catalogTitle}{' '}
            <span className="italic text-gold">{t.beneficios.catalogTitleAccent}</span>
          </h2>
          <p className="text-lg text-navy/70 max-w-2xl mx-auto leading-relaxed">
            {t.beneficios.catalogSubtitle}
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <FilterChip
            label={t.beneficios.filterAll}
            isActive={active === 'all'}
            onClick={() => setActive('all')}
          />
          {categories.map((cat) => (
            <FilterChip
              key={cat.key}
              label={tr(cat.label, locale)}
              isActive={active === cat.key}
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
              <PartnerCard
                key={partner.slug}
                partner={partner}
                categories={categories}
                locale={locale}
                t={t}
                onOpenPromo={setPromo}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-navy/60 mt-10">{t.beneficios.noResults}</p>
        )}
      </div>

      {/* Promo lightbox — rendered via a portal to escape the GSAP
          ScrollSmoother transform (a fixed element inside it would otherwise
          be positioned relative to the transformed wrapper, off-screen). */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {promo && (
              <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPromo(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/80 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out"
            role="dialog"
            aria-modal="true"
            aria-label={promo.alt}
          >
            <button
              type="button"
              onClick={() => setPromo(null)}
              aria-label={t.beneficios.closeLabel}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center w-11 h-11 rounded-full bg-paper/15 hover:bg-paper/25 text-paper transition-colors"
            >
              <FiX size={22} />
            </button>
            <motion.img
              key={promo.src}
              src={promo.src}
              alt={promo.alt}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-full w-auto h-auto bg-white rounded-2xl shadow-navy-xl cursor-default"
            />
          </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all duration-300 ${
        isActive
          ? 'bg-gold border-gold text-[#1C0F00] shadow-gold'
          : 'bg-white border-navy/25 text-navy hover:border-gold'
      }`}
    >
      {label}
    </button>
  );
}

function PartnerCard({
  partner,
  categories,
  locale,
  t,
  onOpenPromo,
}: {
  partner: BenefitPartner;
  categories: BenefitCategory[];
  locale: 'es' | 'en';
  t: ReturnType<typeof useLanguage>['t'];
  onOpenPromo: (promo: { src: string; alt: string }) => void;
}) {
  const category = categories.find((cat) => cat.key === partner.categoryKey);
  const c = getColor(category?.color ?? '');
  const promoAlt =
    locale === 'es'
      ? `Promoción ${partner.name}, comunidad NWL`
      : `${partner.name} promotion, NWL community`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden border border-n-200 shadow-navy-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Category accent bar */}
      <div className={`h-1 ${c.bar}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Logo band — real logos sit on a clean white panel; partners without
            a logo fall back to a category-tinted monogram tile. */}
        <div
          className={`relative h-28 rounded-lg flex items-center justify-center px-5 mb-5 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] ${
            partner.logo
              ? 'bg-white ring-1 ring-n-200'
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
            <span className="font-display text-3xl font-bold text-navy/80">
              {initials(partner.name)}
            </span>
          )}
        </div>

        {/* Category + name */}
        <span
          className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-3 ${c.pill}`}
        >
          {category ? tr(category.label, locale) : partner.categoryKey}
        </span>
        <h3 className="font-display text-xl font-bold text-navy mb-3">
          {partner.name}
        </h3>

        {/* Discount — focal element */}
        <p className="text-gold font-bold text-2xl leading-tight mb-2">
          {tr(partner.discount, locale)}
        </p>

        {/* Detail */}
        {partner.detail && (
          <p className="text-sm text-navy/70 leading-relaxed mb-3">
            {tr(partner.detail, locale)}
          </p>
        )}

        {/* Promo flyers — clickable thumbnails that open the lightbox */}
        {partner.promoImages && partner.promoImages.length > 0 && (
          <div
            className={`grid gap-2 mb-3 ${
              partner.promoImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {partner.promoImages.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => onOpenPromo({ src, alt: promoAlt })}
                aria-label={t.beneficios.viewPromo}
                className="group/promo relative w-full overflow-hidden rounded-lg ring-1 ring-n-200 cursor-zoom-in"
              >
                {/* Capped-height preview band (object-top) so tall portrait
                    flyers stay compact; the full image opens in the lightbox. */}
                <img
                  src={src}
                  alt={promoAlt}
                  loading="lazy"
                  className="w-full h-40 object-cover object-top transition-transform duration-300 group-hover/promo:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-900/25 to-transparent group-hover/promo:from-navy-900/40 transition-colors duration-300" />
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-navy-900/70 px-2.5 py-1 text-[11px] font-medium text-paper backdrop-blur-sm">
                  <FiMaximize2 size={12} />
                  {partner.promoImages!.length === 1 && t.beneficios.viewPromo}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Restrictions / fine print */}
        {partner.restrictions && (
          <p className="text-[11px] text-navy/45 italic leading-snug mb-4">
            {tr(partner.restrictions, locale)}
          </p>
        )}

        {/* Footer: vigencia + link */}
        <div className="mt-auto pt-4 border-t border-n-200 flex items-center justify-between gap-3">
          {partner.vigencia ? (
            <span className="text-xs text-navy/50">
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
              className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-gold transition-colors whitespace-nowrap"
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
