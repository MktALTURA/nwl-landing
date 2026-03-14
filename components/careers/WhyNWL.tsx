'use client';

import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiZap, FiHeart } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const icons = [FiTrendingUp, FiUsers, FiZap, FiHeart];

export default function WhyNWL() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white relative">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {t.careers.whyTitle} <span className="text-wine">{t.careers.whyTitleAccent}</span>
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            {t.careers.whySubtitle}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.careers.whyBenefits.map((benefit, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-ivory rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-wine/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-wine/15 transition-colors">
                  <Icon size={28} className="text-wine" />
                </div>
                <h3 className="text-lg font-bold text-charcoal mb-3">{benefit.title}</h3>
                <p className="text-charcoal/60 leading-relaxed text-sm">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
