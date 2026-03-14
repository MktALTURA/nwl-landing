'use client';

import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiBook, FiAward, FiMonitor, FiGlobe, FiStar, FiUpload } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const stepIcons = [FiUser, FiBriefcase, FiBook, FiAward, FiMonitor, FiGlobe, FiStar, FiUpload];

const stepColors = [
  { bg: 'bg-wine/8', text: 'text-wine', ring: 'ring-wine/15' },
  { bg: 'bg-ocean/8', text: 'text-ocean', ring: 'ring-ocean/15' },
  { bg: 'bg-mustard/8', text: 'text-mustard', ring: 'ring-mustard/15' },
  { bg: 'bg-coral/8', text: 'text-coral', ring: 'ring-coral/15' },
  { bg: 'bg-blueberry/8', text: 'text-blueberry', ring: 'ring-blueberry/15' },
  { bg: 'bg-eucalyptus/8', text: 'text-eucalyptus', ring: 'ring-eucalyptus/15' },
  { bg: 'bg-sunshine/10', text: 'text-mustard', ring: 'ring-sunshine/15' },
  { bg: 'bg-wine/8', text: 'text-wine', ring: 'ring-wine/15' },
];

export default function ApplicationProcess() {
  const { t } = useLanguage();
  const steps = t.careers.processSteps;

  return (
    <section id="apply" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-sunshine/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-56 h-56 bg-ocean/8 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {t.careers.processTitle} <span className="text-wine">{t.careers.processTitleAccent}</span>
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            {t.careers.processSubtitle}
          </p>
        </motion.div>

        {/* Timeline - Desktop (2 rows of 4) */}
        <div className="hidden lg:block max-w-5xl mx-auto mb-16">
          {/* Row 1 */}
          <div className="relative mb-12">
            <div className="absolute top-8 left-[6%] right-[6%] h-0.5 bg-wine/15" />
            <div className="grid grid-cols-4 gap-6">
              {steps.slice(0, 4).map((step, i) => {
                const Icon = stepIcons[i];
                const colors = stepColors[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className={`relative w-16 h-16 rounded-full ${colors.bg} ring-4 ${colors.ring} bg-white flex items-center justify-center mb-4 z-10`}>
                      <Icon size={26} className={colors.text} />
                    </div>
                    <span className="text-xs font-bold text-wine/40 uppercase tracking-widest mb-1">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-sm font-bold text-charcoal mb-1 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-charcoal/50 leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          {/* Row 2 */}
          <div className="relative">
            <div className="absolute top-8 left-[6%] right-[6%] h-0.5 bg-wine/15" />
            <div className="grid grid-cols-4 gap-6">
              {steps.slice(4).map((step, i) => {
                const Icon = stepIcons[i + 4];
                const colors = stepColors[i + 4];
                return (
                  <motion.div
                    key={i + 4}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (i + 4) * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className={`relative w-16 h-16 rounded-full ${colors.bg} ring-4 ${colors.ring} bg-white flex items-center justify-center mb-4 z-10`}>
                      <Icon size={26} className={colors.text} />
                    </div>
                    <span className="text-xs font-bold text-wine/40 uppercase tracking-widest mb-1">
                      {i + 5}
                    </span>
                    <h3 className="font-display text-sm font-bold text-charcoal mb-1 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-charcoal/50 leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden max-w-md mx-auto mb-12">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-wine/15" />
            <div className="space-y-6">
              {steps.map((step, i) => {
                const Icon = stepIcons[i];
                const colors = stepColors[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="flex gap-5"
                  >
                    <div className={`relative w-16 h-16 min-w-[4rem] rounded-full ${colors.bg} ring-4 ${colors.ring} bg-white flex items-center justify-center z-10`}>
                      <Icon size={24} className={colors.text} />
                    </div>
                    <div className="pt-2">
                      <span className="text-xs font-bold text-wine/40 uppercase tracking-widest">
                        {i + 1}
                      </span>
                      <h3 className="font-display text-base font-bold text-charcoal mt-0.5 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-charcoal/50 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
