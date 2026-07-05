'use client';

import { motion } from 'framer-motion';
import { FiUserCheck, FiCreditCard, FiGift } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const stepIcons = [FiUserCheck, FiCreditCard, FiGift];

export default function BeneficiosHowTo() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-gradient-to-b from-white to-paper animate-section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
            {t.beneficios.howToTitle}{' '}
            <span className="italic text-gold">{t.beneficios.howToTitleAccent}</span>
          </h2>
          <p className="text-lg text-navy/70 max-w-2xl mx-auto leading-relaxed">
            {t.beneficios.howToSubtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {t.beneficios.howToSteps.map((step, index) => {
            const Icon = stepIcons[index] ?? FiGift;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl p-6 border border-n-200 hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy text-paper shadow-navy-md mb-5">
                  <Icon size={26} />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold text-[#1C0F00] text-sm font-bold flex items-center justify-center border-2 border-white">
                    {index + 1}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-navy/70 leading-relaxed">
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
