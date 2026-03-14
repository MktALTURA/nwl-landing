'use client';

import { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

export default function ApplicationModal({ isOpen, onClose, jobTitle }: ApplicationModalProps) {
  const { t } = useLanguage();
  const formContainerRef = useRef<HTMLDivElement>(null);

  const buildIframe = useCallback(() => {
    const container = formContainerRef.current;
    if (!container) return;

    const formId = t.careers.applicationFormId;
    if (!formId || formId.startsWith('PLACEHOLDER')) {
      container.innerHTML = `
        <div class="text-center py-12 text-charcoal/40">
          <p class="text-lg font-medium">Form coming soon</p>
          <p class="text-sm mt-2">The application form will be available shortly.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    const iframe = document.createElement('iframe');
    const positionParam = jobTitle ? `?contact.position=${encodeURIComponent(jobTitle)}` : '';
    iframe.src = `https://api.leadconnectorhq.com/widget/form/${formId}${positionParam}`;
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.minHeight = '500px';
    iframe.id = `modal-${formId}`;
    iframe.dataset.layout = "{'id':'INLINE'}";
    iframe.dataset.triggerType = 'alwaysShow';
    iframe.dataset.triggerValue = '';
    iframe.dataset.activationtype = 'alwaysActivated';
    iframe.dataset.activationValue = '';
    iframe.dataset.deactivationtype = 'neverDeactivate';
    iframe.dataset.deactivationValue = '';
    iframe.dataset.overlayColor = 'rgba(0,0,0,0)';
    iframe.title = t.careers.applicationFormName;
    container.appendChild(iframe);

    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    container.appendChild(script);
  }, [t.careers.applicationFormId, t.careers.applicationFormName, jobTitle]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(buildIframe, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, buildIframe]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] overflow-y-auto"
        >
          {/* Backdrop — fixed so it stays while scrolling */}
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Scroll container */}
          <div className="relative min-h-full flex items-start justify-center pt-20 pb-8 px-4">
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl"
            >
              {/* Sticky Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-ivory/95 backdrop-blur-sm rounded-t-2xl">
                <div>
                  <h3 className="font-display text-xl font-bold text-charcoal">
                    {t.careers.applicationFormTitle}
                  </h3>
                  <p className="text-sm text-wine/80 mt-0.5">{jobTitle}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-charcoal/5 hover:bg-charcoal/10 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <FiX size={20} className="text-charcoal/60" />
                </button>
              </div>

              {/* Form Container — GHL expands iframe naturally, page scrolls */}
              <div
                ref={formContainerRef}
                className="p-4 md:p-6 min-h-[300px]"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
