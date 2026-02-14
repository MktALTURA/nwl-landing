'use client';

import { motion } from 'framer-motion';
import { FiHeart, FiBook, FiUsers, FiGlobe } from 'react-icons/fi';

const benefits = [
  {
    icon: FiHeart,
    title: 'Emotional Development',
    description: 'We nurture confident, resilient students through a supportive and trusting environment.',
  },
  {
    icon: FiBook,
    title: 'Academic Excellence',
    description: 'Rigorous bilingual curriculum that prepares students for global opportunities.',
  },
  {
    icon: FiUsers,
    title: 'Close Community',
    description: 'Small class sizes ensure personalized attention and meaningful relationships.',
  },
  {
    icon: FiGlobe,
    title: 'Global Mindset',
    description: 'We develop world-ready citizens with critical thinking and cultural awareness.',
  },
];

export default function Benefits() {
  return (
    <section className="section-padding bg-white relative animate-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Why Choose <span className="text-wine">Newland</span>
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Our comprehensive approach to education focuses on the whole child
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wine/10 text-wine group-hover:bg-wine group-hover:text-white transition-all duration-300">
                  <benefit.icon size={28} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-charcoal mb-3">
                {benefit.title}
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                {benefit.description}
              </p>

              {/* Hover underline */}
              <div className="mt-4 h-[2px] w-0 bg-wine group-hover:w-12 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#admissions" className="btn-primary">
            Discover Our Approach
          </a>
        </motion.div>
      </div>
    </section>
  );
}
