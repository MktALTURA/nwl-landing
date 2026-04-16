'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiHeart, FiTarget } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const campusesData = [
  {
    name: 'Juriquilla',
    location: 'Anillo Vial Fray Junípero Serra, Juriquilla',
    mapUrl: 'https://www.google.com/maps/search/Colegio+Newland+Juriquilla+Queretaro',
    image: '/images/campus/juriquilla.jpg',
    color: 'sunshine',
    accent: 'coral',
  },
  {
    name: 'Milenio',
    location: 'Cerrada Panorámica, Distrito Piamonte',
    mapUrl: 'https://www.google.com/maps/search/Colegio+Newland+Milenio+Queretaro',
    image: '/images/campus/milenio.jpg',
    color: 'coral',
    accent: 'ocean',
  },
  {
    name: 'San Miguel de Allende',
    location: 'Carr. SMA – Querétaro, San José de la Posta',
    mapUrl: 'https://www.google.com/maps/search/Colegio+Newland+San+Miguel+de+Allende',
    image: '/images/campus/sma.jpg',
    color: 'bubblegum',
    accent: 'blueberry',
  },
  {
    name: 'Corregidora',
    location: 'Libramiento Sur Poniente, El Pueblito',
    mapUrl: 'https://www.google.com/maps/search/Colegio+Newland+Corregidora+Queretaro',
    image: '/images/campus/corregidora.jpg',
    color: 'lime',
    accent: 'sunshine',
  },
  {
    name: 'Zibatá',
    location: 'Paseo de las Pitahayas, Zibatá',
    mapUrl: 'https://www.google.com/maps/search/Colegio+Newland+Zibata+El+Marques+Queretaro',
    image: '/images/campus/zibata.jpg',
    color: 'ocean',
    accent: 'tangerine',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  sunshine: {
    bg: 'bg-sunshine/20',
    text: 'text-sunshine-700',
    border: 'border-sunshine',
    gradient: 'from-sunshine/30 to-coral/30'
  },
  coral: {
    bg: 'bg-coral/20',
    text: 'text-coral-700',
    border: 'border-coral',
    gradient: 'from-coral/30 to-bubblegum/30'
  },
  ocean: {
    bg: 'bg-ocean/20',
    text: 'text-ocean-700',
    border: 'border-ocean',
    gradient: 'from-ocean/30 to-lime/30'
  },
  tangerine: {
    bg: 'bg-tangerine/20',
    text: 'text-tangerine-700',
    border: 'border-tangerine',
    gradient: 'from-tangerine/30 to-sunshine/30'
  },
  blueberry: {
    bg: 'bg-blueberry/20',
    text: 'text-blueberry-700',
    border: 'border-blueberry',
    gradient: 'from-blueberry/30 to-bubblegum/30'
  },
  bubblegum: {
    bg: 'bg-bubblegum/20',
    text: 'text-bubblegum-700',
    border: 'border-bubblegum',
    gradient: 'from-bubblegum/30 to-coral/30'
  },
  lime: {
    bg: 'bg-lime/20',
    text: 'text-lime-700',
    border: 'border-lime',
    gradient: 'from-lime/30 to-ocean/30'
  },
};

export default function CampusFinder() {
  const { t } = useLanguage();
  const campuses = campusesData.map((c, i) => ({ ...c, ...t.campus.items[i] }));

  return (
    <section id="campus" className="section-padding bg-gradient-to-b from-sand via-bubblegum/10 to-lime/10 animate-section overflow-hidden relative">
      {/* Playful Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-sunshine/20 blur-3xl" />
        <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-coral/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-ocean/20 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header - Playful & Bold */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="h-2 w-2 rounded-full bg-sunshine animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="h-2 w-2 rounded-full bg-coral animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="h-2 w-2 rounded-full bg-ocean animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="h-2 w-2 rounded-full bg-tangerine animate-bounce" style={{ animationDelay: '0.3s' }} />
            <div className="h-2 w-2 rounded-full bg-bubblegum animate-bounce" style={{ animationDelay: '0.4s' }} />
          </motion.div>

          <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-coral via-tangerine to-sunshine bg-clip-text text-transparent">
              {t.campus.sectionTitleLine1}
            </span>
            <br />
            <span className="bg-gradient-to-r from-ocean via-blueberry to-bubblegum bg-clip-text text-transparent">
              {t.campus.sectionTitleLine2}
            </span>
          </h2>
          <p className="text-xl text-charcoal/80 max-w-2xl mx-auto font-medium">
            {t.campus.sectionSubtitle}
          </p>
        </div>

        {/* Campus Cards - Vibrant & Playful */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campuses.map((campus, index) => (
            <motion.div
              key={campus.name}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, rotate: 1, transition: { duration: 0.2 } }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border-4 border-transparent hover:border-current"
              style={{ color: `var(--${campus.accent})` }}
            >
              {/* Campus Image */}
              <div className="aspect-[4/3] overflow-hidden relative bg-sand">
                <Image
                  src={campus.image}
                  alt={`Newland ${campus.name} campus - ${campus.location}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Playful Badge */}
                <div className={`absolute top-4 right-4 z-10 ${colorClasses[campus.color]?.bg} ${colorClasses[campus.color]?.text} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm`}>
                  <FiHeart size={12} />
                  Campus #{index + 1}
                </div>
              </div>

              {/* Content - Playful Typography */}
              <div className="p-6">
                <h3 className={`text-3xl font-black ${colorClasses[campus.color]?.text} mb-2 tracking-tight`}>
                  {campus.name}
                </h3>

                <a
                  href={campus.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-charcoal/60 mb-3 font-medium hover:text-charcoal/90 transition-colors group/loc"
                >
                  <FiMapPin className={`mr-2 ${colorClasses[campus.accent]?.text} flex-shrink-0`} size={16} />
                  <span className="group-hover/loc:underline underline-offset-2">{campus.location}</span>
                </a>

                <div className={`inline-block ${colorClasses[campus.accent]?.bg} ${colorClasses[campus.accent]?.text} px-3 py-1 rounded-full text-xs font-bold mb-4`}>
                  {campus.levels}
                </div>

                <p className="text-charcoal/70 mb-6 leading-relaxed">
                  {campus.description}
                </p>

                {/* Playful CTA */}
                <a
                  href={campus.href}
                  className={`block w-full text-center ${colorClasses[campus.color]?.bg} ${colorClasses[campus.color]?.text} font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-200 border-2 ${colorClasses[campus.color]?.border}`}
                >
                  {t.campus.exploreCta}
                </a>
              </div>
            </motion.div>
          ))}

          {/* Contact Card - Super Playful */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.5, delay: campuses.length * 0.1, type: "spring" }}
            viewport={{ once: true }}
            whileHover={{ y: -8, rotate: -1, transition: { duration: 0.2 } }}
            className="bg-gradient-to-br from-blueberry via-bubblegum to-coral text-white rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-xl relative overflow-hidden"
          >
            {/* Playful background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white" />
              <div className="absolute bottom-8 right-8 w-20 h-20 rounded-full bg-white" />
              <div className="absolute top-1/2 left-1/3 w-12 h-12 rounded-full bg-white" />
            </div>

            <div className="relative z-10">
              <FiTarget size={56} className="mx-auto mb-4 opacity-90" />
              <h3 className="text-3xl font-black mb-4">
                {t.campus.contactCard.title}
              </h3>
              <p className="mb-6 opacity-95 text-lg font-medium">
                {t.campus.contactCard.description}
              </p>

              <div className="space-y-3 mb-6">
                <a
                  href="tel:+524424541010"
                  className="flex items-center justify-center text-white/90 hover:text-white hover:scale-105 transition-transform font-medium"
                >
                  <FiPhone className="mr-2" />
                  +52 (442) 454 10 10
                </a>
                <a
                  href="mailto:contacto@colegionwl.edu.mx"
                  className="flex items-center justify-center text-white/90 hover:text-white hover:scale-105 transition-transform font-medium"
                >
                  <FiMail className="mr-2" />
                  contacto@colegionwl.edu.mx
                </a>
              </div>

              <a
                href="https://wa.me/524424540522"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-blueberry px-8 py-4 rounded-full font-black text-lg hover:scale-110 hover:shadow-2xl transition-all duration-200"
              >
                <FaWhatsapp className="inline mr-2" />
                {t.campus.contactCard.whatsappCta}
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
