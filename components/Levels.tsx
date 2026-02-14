'use client';

import { motion } from 'framer-motion';
import { FiStar, FiBook, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { FaChild } from 'react-icons/fa';

const levels = [
  {
    icon: FiTrendingUp,
    name: 'Preparatoria',
    ageRange: '15-17 years',
    color: 'blueberry',
    description: 'College prep with global perspective and career readiness.',
    campuses: ['Juriquilla', 'Zibatá'],
    image: '/images/levels/preparatoria.jpg',
  },
  {
    icon: FiUsers,
    name: 'Secundaria',
    ageRange: '12-14 years',
    color: 'tangerine',
    description: 'Fostering independence, leadership, and self-discovery.',
    campuses: ['Juriquilla', 'Zibatá', 'SMA'],
    image: '/images/levels/secundaria.jpg',
  },
  {
    icon: FiBook,
    name: 'Primaria',
    ageRange: '6-11 years',
    color: 'ocean',
    description: 'Developing academic excellence and critical thinking skills.',
    campuses: ['All 5 Campuses'],
    image: '/images/levels/primaria.jpg',
  },
  {
    icon: FiStar,
    name: 'Kinder',
    ageRange: '4-5 years',
    color: 'coral',
    description: 'Building foundation skills through exploration and discovery.',
    campuses: ['All 5 Campuses'],
    image: '/images/levels/kinder.jpg',
  },
  {
    icon: FaChild,
    name: 'Maternal',
    ageRange: '2-3 years',
    color: 'sunshine',
    description: 'Early childhood development in a nurturing, play-based environment.',
    campuses: ['Juriquilla', 'Zibatá', 'Corregidora'],
    image: '/images/levels/maternal.jpg',
  },
];

const colorMap: Record<string, string> = {
  sunshine: 'bg-sunshine/30 text-sunshine-700 border-sunshine',
  coral: 'bg-coral/30 text-coral-700 border-coral',
  ocean: 'bg-ocean/30 text-ocean-700 border-ocean',
  tangerine: 'bg-tangerine/30 text-tangerine-700 border-tangerine',
  blueberry: 'bg-blueberry/30 text-blueberry-700 border-blueberry',
};

export default function Levels() {
  return (
    <section id="levels" className="section-padding bg-gradient-to-b from-white via-warmgray to-sand animate-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-sunshine via-coral to-ocean h-1 w-24 mx-auto mb-6 rounded-full" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Educational <span className="bg-gradient-to-r from-coral to-tangerine bg-clip-text text-transparent">Programs</span>
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
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-current"
              style={{ borderColor: `var(--${level.color})` }}
            >
              {/* Level Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={level.image} 
                  alt={`${level.name} students`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
                  <p className="text-xs text-charcoal/60 mb-2">Available at:</p>
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
                <button className={`mt-6 text-sm font-bold group-hover:underline ${colorMap[level.color].split(' ')[1]}`}>
                  Learn More →
                </button>
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
            Request Information
          </a>
        </motion.div>
      </div>
    </section>
  );
}
