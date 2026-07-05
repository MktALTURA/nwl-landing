'use client';

import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiBook, FiAward, FiMonitor, FiGlobe, FiStar, FiUpload } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Eyebrow from '@/components/ui/Eyebrow';

const stepIcons = [FiUser, FiBriefcase, FiBook, FiAward, FiMonitor, FiGlobe, FiStar, FiUpload];

/* Level-palette accent chips, cycling gold / coral-sea / wattle / jacaranda.
   Full class literals: no Tailwind safelist. */
const stepChips = [
  'bg-gold/10 text-gold-600',
  'bg-coral-sea/10 text-coral-sea',
  'bg-wattle/20 text-gold-600',
  'bg-jacaranda/10 text-jacaranda',
  'bg-gold/10 text-gold-600',
  'bg-coral-sea/10 text-coral-sea',
  'bg-wattle/20 text-gold-600',
  'bg-jacaranda/10 text-jacaranda',
];

export default function ApplicationProcess() {
  const { t, locale } = useLanguage();
  const steps = t.careers.processSteps;

  return (
    <section id="apply" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-56 h-56 bg-coral-sea/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="mb-5">
            <Eyebrow>{locale === 'es' ? 'Cómo aplicar' : 'How to apply'}</Eyebrow>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
            {t.careers.processTitle} <span className="italic text-gold">{t.careers.processTitleAccent}</span>
          </h2>
          <p className="text-lg text-navy/70 max-w-2xl mx-auto leading-relaxed">
            {t.careers.processSubtitle}
          </p>
        </motion.div>

        {/* Numbered step cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-12">
          {steps.map((step, i) => {
            const Icon = stepIcons[i];
            const chip = stepChips[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl p-6 border border-n-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${chip}`}>
                    <Icon size={22} />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-navy mb-1.5 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-navy/60 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
