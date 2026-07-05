'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiChevronRight, FiStar, FiSun, FiCompass, FiHexagon, FiFeather } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { campusPortals } from '@/lib/padres-data';

const campusIcons: Record<string, { icon: typeof FiStar; color: string }> = {
  juriquilla: { icon: FiStar, color: 'text-gold' },
  milenio: { icon: FiSun, color: 'text-gold' },
  corregidora: { icon: FiCompass, color: 'text-gold' },
  zibata: { icon: FiHexagon, color: 'text-gold' },
  'san-miguel': { icon: FiFeather, color: 'text-gold' },
};

export default function CampusSelector() {
  const { locale } = useLanguage();
  const campuses = Object.values(campusPortals);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {campuses.map((campus, index) => {
        const { icon: Icon } = campusIcons[campus.campusSlug] || { icon: FiStar };
        return (
          <motion.div
            key={campus.campusSlug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/padres/${campus.campusSlug}`}
              className="group block bg-white rounded-2xl border border-n-200 p-6 hover:shadow-lg hover:border-gold/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gold/15 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-navy group-hover:text-gold transition-colors">
                    {campus.campusName}
                  </h3>
                  <p className="text-sm text-navy/50 mt-1">
                    {campus.city[locale]}
                  </p>
                </div>
                <FiChevronRight className="w-5 h-5 text-n-300 group-hover:text-gold group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
