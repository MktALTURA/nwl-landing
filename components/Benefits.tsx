'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHeart, FiBook, FiUsers, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const benefitsData = [
  { icon: FiHeart, image: '/images/benefits/emotional.jpg' },
  { icon: FiBook, image: '/images/benefits/academic.jpg' },
  { icon: FiUsers, image: '/images/benefits/community.jpg' },
  { icon: FiGlobe, image: '/images/benefits/global.jpg' },
];

export default function Benefits() {
  const { t } = useLanguage();
  const benefits = benefitsData.map((b, i) => ({ ...b, ...t.benefits.items[i] }));

  return (
    <section id="about" className="section-padding bg-white relative animate-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {t.benefits.sectionTitle} <span className="text-wine">{t.benefits.sectionTitleAccent}</span>
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            {t.benefits.sectionSubtitle}
          </p>
        </div>

        {/* Benefits Grid with Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-ivory rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Yellow brand accent bar */}
              <div className="h-[3px] bg-nwl-yellow" />

              {/* Benefit Image */}
              <div className="aspect-[4/3] relative overflow-hidden bg-sand">
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-charcoal mb-3">
                  {benefit.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Large Featured Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 rounded-lg overflow-hidden shadow-xl"
        >
          <div className="aspect-[21/9] relative bg-sand">
            <Image
              src="/images/campus-life-hero.jpg"
              alt="Students engaged in activities across the Newland campus"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="#admissions" className="btn-primary">
            {t.benefits.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
