'use client';

import { motion } from 'framer-motion';
import { FiFileText, FiEye, FiDownload } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { PortalDocument } from '@/lib/padres-data';
import type { Locale } from '@/lib/i18n/types';

interface DocumentCardProps {
  document: PortalDocument;
  locale: Locale;
  index: number;
}

export default function DocumentCard({ document, locale, index }: DocumentCardProps) {
  const { t } = useLanguage();

  const title = document.title[locale];
  const description = document.description?.[locale];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-2xl border border-n-200 p-5 hover:shadow-lg hover:border-gold/40 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/15 transition-colors">
          <FiFileText className="w-5 h-5 text-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-navy text-sm leading-snug line-clamp-2">
            {title}
          </h3>
          {description && (
            <p className="text-navy/50 text-xs mt-1 line-clamp-2">{description}</p>
          )}
          {document.date && (
            <p className="text-navy/35 text-xs mt-1.5">
              {new Date(document.date).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>

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
    </motion.div>
  );
}
