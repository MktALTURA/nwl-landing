'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload } from 'react-icons/fi';
import { useBrochure } from '@/lib/BrochureContext';
import { brochures } from '@/lib/brochures';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function BrochureModal() {
  const { isOpen, activeLevel, closeBrochure } = useBrochure();
  const { locale, t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Only render portal on client
  useEffect(() => setMounted(true), []);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBrochure();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeBrochure]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const config = activeLevel ? brochures[activeLevel] : null;

  // Get localized level name
  const levelDisplayName = config
    ? t.brochure.levels[config.labelKey as keyof typeof t.brochure.levels]
    : '';

  // Get locale-specific URLs
  const heyzineUrl = config ? config.heyzineUrl[locale] : '';
  const pdfUrl = config ? config.pdfDownloadUrl[locale] : '';

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && config && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={closeBrochure}
        >
          {/* Dark backdrop */}
          <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" />

          {/* Modal container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-[95vw] h-[90vh] max-w-7xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-charcoal/10 bg-ivory shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-[2px] bg-wine shrink-0" />
                <h3 className="font-display text-lg sm:text-xl font-bold text-charcoal truncate">
                  {levelDisplayName}
                  <span className="text-charcoal/50 font-sans text-xs sm:text-sm font-normal ml-2 sm:ml-3">
                    {t.brochure.modalSubtitle}
                  </span>
                </h3>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex btn-secondary text-sm px-4 py-2 items-center gap-2"
                  >
                    <FiDownload size={14} />
                    {t.brochure.downloadPdf}
                  </a>
                )}
                {/* Mobile download icon */}
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:hidden w-10 h-10 rounded-full bg-charcoal/5 hover:bg-charcoal/10 flex items-center justify-center text-charcoal transition-colors"
                    aria-label={t.brochure.downloadPdf}
                  >
                    <FiDownload size={18} />
                  </a>
                )}
                <button
                  onClick={closeBrochure}
                  className="w-10 h-10 rounded-full bg-charcoal/5 hover:bg-charcoal/10 flex items-center justify-center text-charcoal transition-colors"
                  aria-label={t.brochure.closeAriaLabel}
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Flip-book iframe */}
            <div className="flex-1 bg-sand">
              <iframe
                src={heyzineUrl}
                title={`${levelDisplayName} brochure`}
                className="w-full h-full border-0"
                allow="fullscreen; clipboard-write"
                loading="lazy"
                scrolling="no"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
