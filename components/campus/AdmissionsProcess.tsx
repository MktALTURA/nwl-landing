'use client';

import { motion } from 'framer-motion';
import { FiMessageCircle, FiCalendar, FiClipboard, FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const stepIcons = [FiMessageCircle, FiCalendar, FiClipboard, FiCheckCircle, null];

const stepColors = [
  { bg: 'bg-ocean/8', text: 'text-ocean', ring: 'ring-ocean/15' },
  { bg: 'bg-mustard/8', text: 'text-mustard', ring: 'ring-mustard/15' },
  { bg: 'bg-coral/8', text: 'text-coral', ring: 'ring-coral/15' },
  { bg: 'bg-blueberry/8', text: 'text-blueberry', ring: 'ring-blueberry/15' },
  { bg: 'bg-wine/8', text: 'text-wine', ring: 'ring-wine/15' },
];

export default function AdmissionsProcess() {
  const { t } = useLanguage();

  const steps = t.campusDetail.admissionsSteps;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-ivory via-white to-warmgray/30 relative overflow-hidden">
      {/* Decorative blurs like CampusFinder */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-sunshine/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-56 h-56 bg-ocean/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-coral/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="wine-divider mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            {t.campusDetail.admissionsTitle}{' '}
            <span className="text-wine">{t.campusDetail.admissionsTitleAccent}</span>
          </h2>
          <p className="text-charcoal/60 mt-4 text-lg max-w-2xl mx-auto">
            {t.campusDetail.admissionsSubtitle}
          </p>
        </motion.div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block max-w-5xl mx-auto">
          {/* Connector line */}
          <div className="relative">
            <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-wine/15" />

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step: { title: string; description: string }, i: number) => {
                const Icon = stepIcons[i];
                const colors = stepColors[i];

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Step number + icon */}
                    <div className={`relative w-16 h-16 rounded-full ${colors.bg} ring-4 ${colors.ring} bg-white flex items-center justify-center mb-5 z-10`}>
                      {Icon ? (
                        <Icon size={26} className={colors.text} />
                      ) : (
                        <img src="/images/brand/kangaroo-wine.png" alt="NWL" className="w-8 h-8 object-contain rotate-[15deg]" />
                      )}
                    </div>

                    {/* Step number badge */}
                    <span className="text-xs font-bold text-wine/50 uppercase tracking-widest mb-2">
                      {t.campusDetail.admissionsStepLabel} {i + 1}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-base font-bold text-charcoal mb-2 leading-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-charcoal/60 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden max-w-md mx-auto">
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-wine/15" />

            <div className="space-y-8">
              {steps.map((step: { title: string; description: string }, i: number) => {
                const Icon = stepIcons[i];
                const colors = stepColors[i];

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-5"
                  >
                    {/* Icon */}
                    <div className={`relative w-16 h-16 min-w-[4rem] rounded-full ${colors.bg} ring-4 ${colors.ring} bg-white flex items-center justify-center z-10`}>
                      {Icon ? (
                        <Icon size={24} className={colors.text} />
                      ) : (
                        <img src="/images/brand/kangaroo-wine.png" alt="NWL" className="w-7 h-7 object-contain rotate-[15deg]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pt-2">
                      <span className="text-xs font-bold text-wine/50 uppercase tracking-widest">
                        {t.campusDetail.admissionsStepLabel} {i + 1}
                      </span>
                      <h3 className="font-display text-lg font-bold text-charcoal mt-1 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-charcoal/60 leading-relaxed">
                        {step.description}
                      </p>
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
