'use client';

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useBecas } from './BecasProvider';
import SectionHeading from './SectionHeading';

/**
 * Accordion. Unlike InformacionFAQ, closed answers stay in the DOM (hidden),
 * so the text that feeds the FAQPage JSON-LD is also on the page for crawlers.
 */
export default function BecasFAQ() {
  const { copy, track } = useBecas();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="faq" className="section-padding bg-white animate-section">
      <div className="container-custom max-w-3xl">
        <SectionHeading eyebrow={copy.faq.eyebrow} title={copy.faq.title} />
        <ul className="mt-10 divide-y divide-n-200 border-y border-n-200">
          {copy.faq.items.map((item) => {
            const isOpen = open === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${item.id}`}
                  onClick={() => {
                    setOpen(isOpen ? null : item.id);
                    if (!isOpen) track('becas_faq_open', { question_id: item.id });
                  }}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left font-display font-semibold text-lg text-navy hover:text-gold-600 transition-colors"
                >
                  {item.q}
                  <FiChevronDown className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold' : 'text-n-400'}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${item.id}`}
                      initial={reduce ? { height: 'auto' } : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? { height: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-n-600 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isOpen && (
                  <p id={`faq-${item.id}`} hidden>
                    {item.a}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
