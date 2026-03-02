'use client';

import { motion } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function CampusCTA() {
  const { t } = useLanguage();

  return (
    <section id="campus-admissions" className="py-12 md:py-16 bg-gradient-to-br from-wine to-wine/90 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mustard rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-eucalyptus rounded-full blur-3xl" />
      </div>

      {/* Kangaroo Watermark */}
      <div className="absolute right-[-5%] bottom-[-10%] w-[40vh] h-[40vh] opacity-[0.06] pointer-events-none">
        <img
          src="/images/brand/kangaroo-white-transparent.png"
          alt=""
          className="w-full h-full object-contain rotate-[15deg]"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            {t.campusDetail.ctaTitle}{' '}
            <span className="text-mustard">{t.campusDetail.ctaTitleAccent}</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            {t.campusDetail.ctaSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#admissions"
              className="inline-flex items-center justify-center gap-2 bg-white text-wine px-8 py-4 rounded-sm font-bold hover:bg-white/90 transition-colors duration-300"
            >
              <FiCalendar size={20} />
              {t.campusDetail.ctaScheduleVisit}
            </a>
            <a
              href="https://wa.me/5214421227791"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-sm font-bold hover:bg-white hover:text-wine transition-colors duration-300"
            >
              <FaWhatsapp size={20} />
              {t.campusDetail.ctaWhatsapp}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
