'use client';

import { motion } from 'framer-motion';
import { FiBook, FiUsers, FiCalendar, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { type CampusStat, localized } from '@/lib/campus-data';

const icons = [FiBook, FiUsers, FiCalendar, FiGlobe];

interface QuickFactsProps {
  stats: CampusStat[];
}

export default function QuickFacts({ stats }: QuickFactsProps) {
  const { locale } = useLanguage();

  return (
    <section className="bg-paper py-10 border-y border-gold/20">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <Icon size={24} className="text-gold-600 mb-3" />
                <span className="font-display text-xl md:text-2xl font-bold text-navy">
                  {localized(stat.value, locale)}
                </span>
                <span className="text-sm text-n-500 mt-1">
                  {localized(stat.label, locale)}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
