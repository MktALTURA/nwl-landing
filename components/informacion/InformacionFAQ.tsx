'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import type { InformacionPage } from '@/lib/informacion-data';

interface InformacionFAQProps {
  page: InformacionPage;
}

export default function InformacionFAQ({ page }: InformacionFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { faqs, lang } = page;

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-16 bg-paper">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-4">
            <span className="w-9 h-px bg-gold" aria-hidden="true" />
            FAQ
            <span className="w-9 h-px bg-gold" aria-hidden="true" />
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            {lang === 'es' ? (
              <>Preguntas <span className="italic text-gold">Frecuentes</span></>
            ) : (
              <>Frequently Asked <span className="italic text-gold">Questions</span></>
            )}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                openIndex === index ? 'border-gold/40 shadow-lg' : 'border-n-200 hover:shadow-lg'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-navy/[0.02] transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-display text-lg font-semibold text-navy pr-4">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-gold"
                >
                  <FiChevronDown size={24} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-navy/70 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
