'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiUsers, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface ParentsPortalBannerProps {
  campusSlug: string;
}

export default function ParentsPortalBanner({ campusSlug }: ParentsPortalBannerProps) {
  const { t } = useLanguage();

  return (
    <section className="py-8">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            href={`/padres/${campusSlug}`}
            className="group block bg-gradient-to-r from-paper to-paper/50 border border-n-200 rounded-2xl p-6 md:p-8 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                <FiUsers className="w-6 h-6 text-gold-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-display font-bold text-navy group-hover:text-gold-600 transition-colors">
                  {t.padres.campusPortalTitle}
                </h3>
                <p className="text-n-500 text-sm mt-0.5">
                  {t.padres.campusPortalDescription}
                </p>
              </div>
              <div className="flex-shrink-0 hidden sm:flex items-center gap-2 px-4 py-2 bg-gold text-[#1C0F00] text-sm font-medium rounded-lg group-hover:bg-gold-400 transition-colors">
                {t.padres.campusPortalCta}
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
