'use client';

import { motion } from 'framer-motion';
import { FiStar, FiBook, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { FaChild } from 'react-icons/fa';

const levels = [
  {
    icon: FaChild,
    name: 'Maternal',
    ageRange: '2-3 years',
    color: 'eucalyptus',
    description: 'Early childhood development in a nurturing, play-based environment.',
    campuses: ['Juriquilla', 'Zibatá', 'Corregidora'],
  },
  {
    icon: FiStar,
    name: 'Kinder',
    ageRange: '4-5 years',
    color: 'mustard',
    description: 'Building foundation skills through exploration and discovery.',
    campuses: ['All 5 Campuses'],
  },
  {
    icon: FiBook,
    name: 'Primaria',
    ageRange: '6-11 years',
    color: 'skyblue',
    description: 'Developing academic excellence and critical thinking skills.',
    campuses: ['All 5 Campuses'],
  },
  {
    icon: FiUsers,
    name: 'Secundaria',
    ageRange: '12-14 years',
    color: 'terracotta',
    description: 'Fostering independence, leadership, and self-discovery.',
    campuses: ['Juriquilla', 'Zibatá', 'SMA'],
  },
  {
    icon: FiTrendingUp,
    name: 'Preparatoria',
    ageRange: '15-17 years',
    color: 'wine',
    description: 'College prep with global perspective and career readiness.',
    campuses: ['Juriquilla', 'Zibatá'],
  },
];

const colorMap: Record<string, string> = {
  eucalyptus: 'bg-eucalyptus/20 text-eucalyptus border-eucalyptus',
  mustard: 'bg-mustard/20 text-mustard border-mustard',
  skyblue: 'bg-skyblue/20 text-skyblue border-skyblue',
  terracotta: 'bg-terracotta/20 text-terracotta border-terracotta',
  wine: 'bg-wine/20 text-wine border-wine',
};

export default function Levels() {
  return (
    <section id="levels" className="section-padding bg-white animate-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Educational <span className="text-wine">Programs</span>
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            From early childhood through high school, we guide your child's complete educational journey
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {levels.map((level, index) => (
            <motion.div
              key={level.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-ivory p-8 rounded-sm border-2 border-transparent hover:border-wine/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${colorMap[level.color]}`}>
                <level.icon size={28} />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-charcoal mb-2">
                {level.name}
              </h3>
              <p className="text-sm text-wine mb-4">{level.ageRange}</p>
              <p className="text-charcoal/70 mb-4 leading-relaxed">
                {level.description}
              </p>

              {/* Campuses */}
              <div className="pt-4 border-t border-charcoal/10">
                <p className="text-xs text-charcoal/60 mb-2">Available at:</p>
                <div className="flex flex-wrap gap-2">
                  {level.campuses.map((campus) => (
                    <span
                      key={campus}
                      className="text-xs px-2 py-1 bg-wine/10 text-wine rounded-sm"
                    >
                      {campus}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="mt-6 text-sm text-wine font-medium group-hover:underline">
                Learn More →
              </button>
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
            Request Information
          </a>
        </motion.div>
      </div>
    </section>
  );
}
