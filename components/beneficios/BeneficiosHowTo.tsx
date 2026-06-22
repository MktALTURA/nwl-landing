'use client';

import { motion } from 'framer-motion';
import { FiUserCheck, FiCreditCard, FiGift } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const stepIcons = [FiUserCheck, FiCreditCard, FiGift];

export default function BeneficiosHowTo() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-gradient-to-b from-white to-sand animate-section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {t.beneficios.howToTitle}{' '}
            <span className="text-wine">{t.beneficios.howToTitleAccent}</span>
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            {t.beneficios.howToSubtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.beneficios.howToSteps.map((step, index) => {
            const Icon = stepIcons[index] ?? FiGift;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative text-center px-4"
              >
                {/* Connector line (desktop) */}
                {index < t.beneficios.howToSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-warmgray -z-10" />
                )}

                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-wine text-white shadow-lg mb-5">
                  <Icon size={26} />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-mustard text-charcoal text-sm font-bold flex items-center justify-center border-2 border-white">
                    {index + 1}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
