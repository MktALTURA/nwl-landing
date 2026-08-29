'use client';

import { motion } from 'framer-motion';
import { FiFileText, FiEye, FiDownload, FiClock, FiCalendar } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { PortalDocument } from '@/lib/padres-data';
import type { Locale } from '@/lib/i18n/types';

interface DocumentCardProps {
  document: PortalDocument;
  locale: Locale;
  index: number;
}

// `new Date('2026-08-31')` is parsed as UTC midnight, which renders as the
// previous day in Mexico. Build the date from its parts so it stays local.
function formatDocumentDate(date: string, locale: Locale) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function DocumentCard({ document, locale, index }: DocumentCardProps) {
  const { t } = useLanguage();

  const title = document.title[locale];
  const isCalendar = Boolean(document.icsUrl);
  const isPending = document.pending || !(document.pdfUrl || document.icsUrl);
  const description = document.description?.[locale] ?? (isPending ? t.padres.pendingDocumentHint : undefined);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group bg-white rounded-2xl p-5 transition-all duration-300 ${
        isPending
          ? 'border border-dashed border-n-300'
          : 'border border-n-200 hover:shadow-lg hover:border-gold/40'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            isPending ? 'bg-n-100' : 'bg-gold/10 group-hover:bg-gold/15'
          }`}
        >
          {isPending ? (
            <FiClock className="w-5 h-5 text-n-400" />
          ) : isCalendar ? (
            <FiCalendar className="w-5 h-5 text-gold" />
          ) : (
            <FiFileText className="w-5 h-5 text-gold" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-sm leading-snug line-clamp-2 ${isPending ? 'text-navy/60' : 'text-navy'}`}>
            {title}
          </h3>
          {description && (
            <p className="text-navy/50 text-xs mt-1 line-clamp-2">{description}</p>
          )}
          {!isPending && document.date && (
            <p className="text-navy/35 text-xs mt-1.5">
              {formatDocumentDate(document.date, locale)}
            </p>
          )}
        </div>
      </div>

      {isPending ? (
        <div className="mt-4 pt-3 border-t border-n-100">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-n-500 bg-n-100 rounded-full">
            <FiClock className="w-3.5 h-3.5" />
            {t.padres.pendingDocument}
          </span>
        </div>
      ) : isCalendar ? (
        <div className="mt-4 pt-3 border-t border-n-100">
          <a
            href={document.icsUrl}
            download
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1C0F00] bg-gold rounded-full hover:bg-gold-400 transition-colors"
          >
            <FiDownload className="w-3.5 h-3.5" />
            {t.padres.downloadCalendar}
          </a>
        </div>
      ) : (
      <div className="flex gap-2 mt-4 pt-3 border-t border-n-100">
        <a
          href={document.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-navy border border-navy/20 rounded-full hover:border-gold hover:text-gold-600 transition-colors"
        >
          <FiEye className="w-3.5 h-3.5" />
          {t.padres.viewDocument}
        </a>
        <a
          href={document.pdfUrl}
          download
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1C0F00] bg-gold rounded-full hover:bg-gold-400 transition-colors"
        >
          <FiDownload className="w-3.5 h-3.5" />
          {t.padres.downloadDocument}
        </a>
      </div>
      )}
    </motion.div>
  );
}
