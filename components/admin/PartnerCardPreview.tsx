'use client';

import { FiExternalLink, FiMaximize2 } from 'react-icons/fi';
import { getColor } from '@/lib/beneficios/colors';
import type { BenefitCategory } from '@/lib/beneficios/types';

/**
 * A faithful copy of the public PartnerCard for the admin preview pane.
 *
 * Deliberately a separate component rather than reusing BeneficiosCatalog's
 * internal card: that one is coupled to the catalog's lightbox state and the
 * i18n context, and it only ever renders saved data. This one renders whatever
 * is currently typed in the form, so Marlene sees the card before saving —
 * which is the single most useful check in the whole panel.
 *
 * Keep the classes in sync with components/beneficios/BeneficiosCatalog.tsx.
 */
interface PreviewProps {
  name: string;
  category?: BenefitCategory;
  logo: string | null;
  logoStyle: 'wordmark' | 'badge';
  discount: string;
  detail: string;
  restrictions: string;
  vigencia: string;
  url: string;
  promoImages: string[];
}

const initials = (name: string) => {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase() || '??';
};

export default function PartnerCardPreview({
  name,
  category,
  logo,
  logoStyle,
  discount,
  detail,
  restrictions,
  vigencia,
  url,
  promoImages,
}: PreviewProps) {
  const c = getColor(category?.color ?? '');

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-n-200 shadow-navy-sm flex flex-col">
      <div className={`h-1 ${c.bar}`} />

      <div className="p-6 flex flex-col flex-1">
        <div
          className={`relative h-28 rounded-lg flex items-center justify-center px-5 mb-5 overflow-hidden ${
            logo ? 'bg-white ring-1 ring-n-200' : `bg-gradient-to-br ${c.tile}`
          }`}
        >
          {logo ? (
            logoStyle === 'badge' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="" className="h-[5.5rem] w-auto object-contain rounded-lg shadow-sm" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="" className="max-h-20 max-w-[90%] w-auto object-contain" />
            )
          ) : (
            <span className="font-display text-3xl font-bold text-navy/80">{initials(name)}</span>
          )}
        </div>

        <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-3 ${c.pill}`}>
          {category ? category.label.es : 'Sin categoría'}
        </span>
        <h3 className="font-display text-xl font-bold text-navy mb-3">{name || 'Nombre del aliado'}</h3>

        <p className="text-gold font-bold text-2xl leading-tight mb-2">
          {discount || 'Descuento principal'}
        </p>

        {detail && <p className="text-sm text-navy/70 leading-relaxed mb-3">{detail}</p>}

        {promoImages.length > 0 && (
          <div className={`grid gap-2 mb-3 ${promoImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {promoImages.map((src) => (
              <div key={src} className="relative w-full overflow-hidden rounded-lg ring-1 ring-n-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-40 object-cover object-top" />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-900/25 to-transparent" />
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-navy-900/70 px-2.5 py-1 text-[11px] font-medium text-paper">
                  <FiMaximize2 size={12} />
                  {promoImages.length === 1 && 'Ver promoción'}
                </span>
              </div>
            ))}
          </div>
        )}

        {restrictions && (
          <p className="text-[11px] text-navy/45 italic leading-snug mb-4">{restrictions}</p>
        )}

        <div className="mt-auto pt-4 border-t border-n-200 flex items-center justify-between gap-3">
          {vigencia ? <span className="text-xs text-navy/50">{vigencia}</span> : <span />}
          {url && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy whitespace-nowrap">
              Visitar aliado
              <FiExternalLink size={14} />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
