'use client';

import { motion } from 'framer-motion';
import { FiHeart, FiBook, FiUsers, FiGlobe } from 'react-icons/fi';

const benefits = [
  {
    icon: FiHeart,
    title: 'Emotional Development',
    description: 'We nurture confident, resilient students through a supportive and trusting environment.',
    image: '/benefits/emotional.jpg',
  },
  {
    icon: FiBook,
    title: 'Academic Excellence',
    description: 'Rigorous bilingual curriculum that prepares students for global opportunities.',
    image: '/benefits/academic.jpg',
  },
  {
    icon: FiUsers,
    title: 'Close Community',
    description: 'Small class sizes ensure personalized attention and meaningful relationships.',
    image: '/benefits/community.jpg',
  },
  {
    icon: FiGlobe,
    title: 'Global Mindset',
    description: 'We develop world-ready citizens with critical thinking and cultural awareness.',
    image: '/benefits/global.jpg',
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

        {/* Benefits Grid with Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-ivory rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-wine/20 to-terracotta/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                    <benefit.icon size={48} className="mx-auto mb-2 text-wine/40" />
                    <p className="text-xs text-charcoal/40">
                      [ {benefit.title} Photo ]
                    </p>
                    <p className="text-xs text-charcoal/30 mt-1">
                      {benefit.image}
                    </p>
                  </div>
                </div>
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
          className="mt-16 rounded-lg overflow-hidden"
        >
          <div className="aspect-[21/9] bg-gradient-to-br from-wine/30 via-terracotta/20 to-mustard/20 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <FiHeart size={64} className="mx-auto mb-4 text-wine/40" />
                <p className="text-lg font-medium text-charcoal/60 mb-2">
                  [ Campus Life Hero Image ]
                </p>
                <p className="text-sm text-charcoal/40">
                  /images/campus-life-hero.jpg
                </p>
                <p className="text-sm text-charcoal/40 mt-2 max-w-md mx-auto">
                  Wide panoramic shot of students engaged in activities across campus
                </p>
              </div>
            </div>
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
            Discover Our Approach
          </a>
        </motion.div>
      </div>
    </section>
  );
}
