'use client';

import { motion } from 'framer-motion';
import { FiMapPin, FiNavigation } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface LocationMapProps {
  address: string;
  mapUrl: string;
  campusName: string;
}

export default function LocationMap({ address, mapUrl, campusName }: LocationMapProps) {
  const { t } = useLanguage();

  // Build the embed URL from the campus name for a cleaner embed
  const embedQuery = encodeURIComponent(`Colegio Newland ${campusName}, Querétaro`);
  const embedUrl = `https://www.google.com/maps?q=${embedQuery}&output=embed`;

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-sand to-ivory relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-eucalyptus/8 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="wine-divider mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
            {t.campusDetail.locationTitle}{' '}
            <span className="text-wine">{t.campusDetail.locationTitleAccent}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${campusName} campus map`}
            />
          </motion.div>

          {/* Address Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-wine/10 flex items-center justify-center mb-4">
              <FiMapPin size={24} className="text-wine" />
            </div>

            <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
              Campus {campusName}
            </h3>

            <p className="text-charcoal/70 leading-relaxed mb-4 text-sm">
              {address}
            </p>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wine text-white px-6 py-3 rounded-sm font-bold hover:bg-wine/90 transition-colors duration-300 w-fit"
            >
              <FiNavigation size={18} />
              {t.campusDetail.getDirections}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
