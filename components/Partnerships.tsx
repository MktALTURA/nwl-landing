'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const getPartners = (locale: string) => [
  { name: 'Apple Distinguished School', src: '/images/logos/partners/Apple-Distinguished-School.png', scale: '' },
  { name: 'Knotion', src: '/images/logos/partners/knotion.png', scale: '' },
  { name: 'Universidad Mondragón México', src: '/images/logos/partners/universidad-mondragon-mexico.png', scale: '' },
  { name: 'Hokku Academy', src: '/images/logos/partners/hokku-academy.webp', scale: '' },
  { name: locale === 'en' ? 'Philosophy for Children' : 'CFPN - Filosofía para Niños', src: `/images/logos/partners/CFPN-${locale}.png`, scale: 'large' },
  { name: 'Tecnológico de Monterrey', src: '/images/logos/partners/tecnologico-de-monterrey.png', scale: '' },
  { name: 'Cognia Accreditation', src: '/images/logos/partners/Cognia_ACCRED-Badge-GREY-684x684-1.png', scale: '' },
  { name: locale === 'en' ? "I'm NWL Leader" : 'Yo Soy Líder NWL', src: `/images/logos/partners/Yo_soy_lider_nwl-${locale}.png`, scale: '' },
];

export default function Partnerships() {
  const { t, locale } = useLanguage();
  const partners = getPartners(locale);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-sand">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="wine-divider mx-auto mb-6" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4"
          >
            {t.partnerships.sectionTitle}{' '}
            <span className="text-wine">{t.partnerships.sectionTitleAccent}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-lg text-charcoal/70 max-w-2xl mx-auto"
          >
            {t.partnerships.sectionSubtitle}
          </motion.p>
        </div>

        {/* Infinite Marquee */}
        <div className="relative overflow-hidden group/marquee">
          <div className="marquee-track flex gap-16 md:gap-24 group-hover/marquee:[animation-play-state:paused]">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-16 md:gap-24 items-center shrink-0">
                {partners.map((partner, i) => (
                  <div
                    key={i}
                    className="group/logo flex flex-col items-center justify-center shrink-0 relative"
                  >
                    <div className="flex items-center justify-center h-20 md:h-28">
                      <img
                        src={partner.src}
                        alt={partner.name}
                        className={`${
                          partner.scale === 'large'
                            ? 'h-[4.5rem] md:h-[6rem]'
                            : 'h-14 md:h-[4.5rem]'
                        } w-auto object-contain grayscale opacity-50 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-500`}
                      />
                    </div>
                    {/* Name tooltip on hover */}
                    <span className="absolute -bottom-6 whitespace-nowrap text-xs font-medium text-charcoal/70 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 35s linear infinite;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
