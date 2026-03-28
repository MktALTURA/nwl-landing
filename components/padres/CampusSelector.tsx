'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiChevronRight, FiStar, FiSun, FiCompass, FiHexagon, FiFeather } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { campusPortals } from '@/lib/padres-data';

const campusIcons: Record<string, { icon: typeof FiStar; color: string }> = {
  juriquilla: { icon: FiStar, color: 'text-wine' },
  milenio: { icon: FiSun, color: 'text-wine' },
  corregidora: { icon: FiCompass, color: 'text-wine' },
  zibata: { icon: FiHexagon, color: 'text-wine' },
  'san-miguel': { icon: FiFeather, color: 'text-wine' },
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
              className="group block bg-white rounded-xl border border-charcoal/10 p-6 hover:shadow-lg hover:border-wine/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-10 h-10 bg-wine/8 rounded-lg flex items-center justify-center mb-3 group-hover:bg-wine/12 transition-colors">
                    <Icon className="w-5 h-5 text-wine" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-charcoal group-hover:text-wine transition-colors">
                    {campus.campusName}
                  </h3>
                  <p className="text-sm text-charcoal/50 mt-1">
                    {campus.city[locale]}
                  </p>
                </div>
                <FiChevronRight className="w-5 h-5 text-charcoal/30 group-hover:text-wine group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
