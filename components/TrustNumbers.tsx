'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function TrustNumbers() {
  const { locale, t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-paper border-y border-navy/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {t.testimonials.stats.map((stat, i) => {
            // Auto-update years of excellence every August (founded 2009)
            const value = i === 1
              ? (() => {
                  const now = new Date();
                  const years = now.getMonth() >= 7
                    ? now.getFullYear() - 2009
                    : now.getFullYear() - 2009 - 1;
                  return locale === 'es' ? `+${years}` : `${years}+`;
                })()
              : stat.value;
            return (
              <div key={i}>
                <div className="font-display text-4xl md:text-5xl font-medium tracking-[-0.02em] text-navy mb-2">{value}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-n-500">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
