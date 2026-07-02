'use client';

import { motion } from 'framer-motion';
import { FiActivity, FiMusic, FiCpu, FiFeather } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { type CampusActivity, localized } from '@/lib/campus-data';

const activityIcons = [FiActivity, FiFeather, FiCpu, FiMusic];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  gold: { bg: 'bg-gold/10', text: 'text-gold-600', border: 'border-gold/30' },
  'coral-sea': { bg: 'bg-coral-sea/10', text: 'text-coral-sea', border: 'border-coral-sea/30' },
  jacaranda: { bg: 'bg-jacaranda/10', text: 'text-jacaranda', border: 'border-jacaranda/30' },
  navy: { bg: 'bg-navy/10', text: 'text-navy', border: 'border-navy/20' },
};

interface ExtracurricularsProps {
  activities: CampusActivity[];
}

export default function Extracurriculars({ activities }: ExtracurricularsProps) {
  const { locale, t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white via-paper to-paper relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-10 left-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-56 h-56 bg-navy/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="wine-divider mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">
            {t.campusDetail.activitiesTitle}{' '}
            <span className="italic text-gold">{t.campusDetail.activitiesTitleAccent}</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, i) => {
            const Icon = activityIcons[i % activityIcons.length];
            const colors = colorMap[activity.color] || colorMap.gold;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-lg p-6 border ${colors.border} hover:shadow-xl transition-shadow duration-300`}
              >
                <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center mb-4`}>
                  <Icon size={24} className={colors.text} />
                </div>
                <h3 className="font-display text-xl font-bold text-navy mb-2">
                  {localized(activity.name, locale)}
                </h3>
                <p className="text-sm text-navy/70 leading-relaxed">
                  {localized(activity.description, locale)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
