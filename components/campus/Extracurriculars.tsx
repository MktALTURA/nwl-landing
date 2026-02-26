'use client';

import { motion } from 'framer-motion';
import { FiActivity, FiMusic, FiCpu, FiFeather } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { type CampusActivity, localized } from '@/lib/campus-data';

const activityIcons = [FiActivity, FiFeather, FiCpu, FiMusic];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  ocean: { bg: 'bg-ocean/10', text: 'text-ocean', border: 'border-ocean/30' },
  coral: { bg: 'bg-coral/10', text: 'text-coral', border: 'border-coral/30' },
  blueberry: { bg: 'bg-blueberry/10', text: 'text-blueberry', border: 'border-blueberry/30' },
  sunshine: { bg: 'bg-sunshine/10', text: 'text-sunshine', border: 'border-sunshine/30' },
};

interface ExtracurricularsProps {
  activities: CampusActivity[];
}

export default function Extracurriculars({ activities }: ExtracurricularsProps) {
  const { locale, t } = useLanguage();

  return (
    <section className="section-padding bg-gradient-to-b from-white via-sand to-ivory">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            {t.campusDetail.activitiesTitle}{' '}
            <span className="text-wine">{t.campusDetail.activitiesTitleAccent}</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, i) => {
            const Icon = activityIcons[i % activityIcons.length];
            const colors = colorMap[activity.color] || colorMap.ocean;

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
                <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                  {localized(activity.name, locale)}
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
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
