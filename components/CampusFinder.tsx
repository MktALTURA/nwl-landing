'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiArrowUpRight, FiTarget } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const campusesData = [
  {
    name: 'Juriquilla',
    location: 'Anillo Vial Fray Junípero Serra, Juriquilla',
    mapUrl: 'https://www.google.com/maps/search/Colegio+Newland+Juriquilla+Queretaro',
    image: '/images/campus/juriquilla.jpg',
  },
  {
    name: 'Milenio',
    location: 'Cerrada Panorámica, Distrito Piamonte',
    mapUrl: 'https://www.google.com/maps/search/Colegio+Newland+Milenio+Queretaro',
    image: '/images/campus/milenio.jpg',
  },
  {
    name: 'San Miguel de Allende',
    location: 'Carr. SMA – Querétaro, San José de la Posta',
    mapUrl: 'https://www.google.com/maps/search/Colegio+Newland+San+Miguel+de+Allende',
    image: '/images/campus/sma.jpg',
  },
  {
    name: 'Corregidora',
    location: 'Libramiento Sur Poniente, El Pueblito',
    mapUrl: 'https://www.google.com/maps/search/Colegio+Newland+Corregidora+Queretaro',
    image: '/images/campus/corregidora.jpg',
  },
  {
    name: 'Zibatá',
    location: 'Paseo de las Pitahayas, Zibatá',
    mapUrl: 'https://www.google.com/maps/search/Colegio+Newland+Zibata+El+Marques+Queretaro',
    image: '/images/campus/zibata.jpg',
  },
];

export default function CampusFinder() {
  const { t } = useLanguage();
  const campuses = campusesData.map((c, i) => ({ ...c, ...t.campus.items[i] }));

  return (
    <section id="campus" className="section-padding nwl-bg-dawn animate-section overflow-hidden relative">
      {/* Ambient background wash */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-navy/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-gold/[0.07] blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-gold/60" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-gold">
              {t.campus.sectionTitleLine1}
            </span>
          </motion.div>

          <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 text-navy tracking-tight">
            {t.campus.sectionTitleLine2}
          </h2>
          <p className="text-xl text-navy/70 max-w-2xl mx-auto font-medium">
            {t.campus.sectionSubtitle}
          </p>
        </div>

        {/* Campus Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campuses.map((campus, index) => (
            <motion.div
              key={campus.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group bg-white rounded-2xl overflow-hidden border border-navy/10 shadow-[0_18px_40px_-24px_rgba(11,34,78,0.45)] hover:shadow-[0_28px_60px_-26px_rgba(11,34,78,0.55)] transition-shadow duration-300"
            >
              {/* Campus Image — golden-hour overlay */}
              <div className="aspect-[4/3] overflow-hidden relative bg-paper nwl-grade">
                <Image
                  src={campus.image}
                  alt={`Newland ${campus.name} campus - ${campus.location}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Index badge — full pill */}
                <div className="absolute top-4 right-4 z-10 bg-navy/85 text-paper px-3 py-1 rounded-full text-xs font-semibold tracking-wide backdrop-blur-sm">
                  Campus #{index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-3xl font-bold text-navy mb-2 tracking-tight">
                  {campus.name}
                </h3>

                <a
                  href={campus.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-navy/60 mb-3 font-medium hover:text-navy transition-colors group/loc"
                >
                  <FiMapPin className="mr-2 text-gold flex-shrink-0" size={16} />
                  <span className="group-hover/loc:underline underline-offset-2">{campus.location}</span>
                </a>

                <div className="inline-block bg-gold/10 text-gold-600 px-3 py-1 rounded-full text-xs font-semibold mb-4 tracking-wide">
                  {campus.levels}
                </div>

                <p className="text-navy/70 mb-6 leading-relaxed">
                  {campus.description}
                </p>

                {/* CTA — full pill */}
                <a
                  href={campus.href}
                  className="flex w-full items-center justify-center gap-2 text-center bg-navy text-paper font-semibold py-3 rounded-full hover:bg-navy-800 transition-colors duration-200"
                >
                  {t.campus.exploreCta}
                  <FiArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: campuses.length * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-navy text-paper rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-[0_24px_60px_-24px_rgba(11,34,78,0.6)] relative overflow-hidden"
          >
            {/* Subtle background wash */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold/15 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-gold/10 blur-3xl" />
            </div>

            <div className="relative z-10">
              <FiTarget size={48} className="mx-auto mb-4 text-gold" />
              <h3 className="font-display text-3xl font-bold mb-4">
                {t.campus.contactCard.title}
              </h3>
              <p className="mb-6 text-paper/80 text-lg font-medium">
                {t.campus.contactCard.description}
              </p>

              <div className="space-y-3 mb-6">
                <a
                  href="tel:+524424541010"
                  className="flex items-center justify-center text-paper/85 hover:text-paper transition-colors font-medium"
                >
                  <FiPhone className="mr-2 text-gold" />
                  +52 (442) 454 10 10
                </a>
                <a
                  href="mailto:contacto@colegionwl.edu.mx"
                  className="flex items-center justify-center text-paper/85 hover:text-paper transition-colors font-medium"
                >
                  <FiMail className="mr-2 text-gold" />
                  contacto@colegionwl.edu.mx
                </a>
              </div>

              <a
                href="https://wa.me/5214421227791"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold-400 transition-colors duration-200"
              >
                <FaWhatsapp className="inline" />
                {t.campus.contactCard.whatsappCta}
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
