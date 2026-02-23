'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiStar, FiBook, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { FaChild } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const levelsData = [
  { icon: FaChild, color: 'sunshine', image: '/images/levels/maternal.jpg' },
  { icon: FiStar, color: 'coral', image: '/images/levels/kinder.jpg' },
  { icon: FiBook, color: 'ocean', image: '/images/levels/primaria.jpg' },
  { icon: FiUsers, color: 'tangerine', image: '/images/levels/secundaria.jpg' },
  { icon: FiTrendingUp, color: 'blueberry', image: '/images/levels/preparatoria.jpg' },
];

const colorMap: Record<string, string> = {
  sunshine: 'bg-sunshine/30 text-sunshine-700 border-sunshine',
  coral: 'bg-coral/30 text-coral-700 border-coral',
  ocean: 'bg-ocean/30 text-ocean-700 border-ocean',
  tangerine: 'bg-tangerine/30 text-tangerine-700 border-tangerine',
  blueberry: 'bg-blueberry/30 text-blueberry-700 border-blueberry',
};

export default function Levels() {
  const { t } = useLanguage();
  const levels = levelsData.map((l, i) => ({ ...l, ...t.levels.items[i] }));

  return (
    <section id="levels" className="section-padding bg-gradient-to-b from-white via-warmgray to-sand animate-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-sunshine via-coral to-ocean h-1 w-24 mx-auto mb-6 rounded-full" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {t.levels.sectionTitle} <span className="bg-gradient-to-r from-coral to-tangerine bg-clip-text text-transparent">{t.levels.sectionTitleAccent}</span>
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            {t.levels.sectionSubtitle}
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {levels.map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-current"
              style={{ borderColor: `var(--${level.color})` }}
            >
              {/* Level Image */}
              <div className="aspect-[4/3] relative overflow-hidden bg-sand">
                <Image
                  src={level.image}
                  alt={`${level.name} program at Newland - ${level.ageRange}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-charcoal mb-2">
                  {level.name}
                </h3>
                <p className={`text-sm font-bold mb-4 ${colorMap[level.color].split(' ')[1]}`}>
                  {level.ageRange}
                </p>
                <p className="text-charcoal/70 mb-4 leading-relaxed">
                  {level.description}
                </p>

                {/* Campuses */}
                <div className="pt-4 border-t border-charcoal/10">
                  <p className="text-xs text-charcoal/60 mb-2">{t.levels.availableAt}</p>
                  <div className="flex flex-wrap gap-2">
                    {level.campuses.map((campus) => (
                      <span
                        key={campus}
                        className={`text-xs px-2 py-1 rounded-full ${colorMap[level.color].split(' ')[0]} font-medium`}
                      >
                        {campus}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a href={level.href} className={`mt-6 inline-block text-sm font-bold group-hover:underline ${colorMap[level.color].split(' ')[1]}`}>
                  {t.levels.learnMore}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#admissions" className="btn-primary">
            {t.levels.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
