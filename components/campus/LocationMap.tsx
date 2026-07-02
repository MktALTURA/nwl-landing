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

  // Build the embed URL from the campus name for a cleaner embed.
  // TODO(rebrand follow-up): this query intentionally keeps the legacy "Colegio Newland"
  // name — the Google Business listings have NOT been verified as renamed to
  // "NWL Australian School <campus>" yet (plan §3). Once the listings are renamed,
  // update this query AND the mapUrl entries in lib/campus-data.ts. Note: "Querétaro"
  // is hardcoded and is inaccurate for the San Miguel de Allende campus (Guanajuato).
  const embedQuery = encodeURIComponent(`Colegio Newland ${campusName}, Querétaro`);
  const embedUrl = `https://www.google.com/maps?q=${embedQuery}&output=embed`;

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-paper to-white relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />

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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            {t.campusDetail.locationTitle}{' '}
            <span className="italic text-gold">{t.campusDetail.locationTitleAccent}</span>
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
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
              <FiMapPin size={24} className="text-gold-600" />
            </div>

            <h3 className="font-display text-2xl font-bold text-navy mb-2">
              Campus {campusName}
            </h3>

            <p className="text-navy/70 leading-relaxed mb-4 text-sm">
              {address}
            </p>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-center w-fit"
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
