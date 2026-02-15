'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHeart, FiBook, FiUsers, FiGlobe } from 'react-icons/fi';

const benefits = [
  {
    icon: FiHeart,
    title: 'Emotional Development',
    description: 'We nurture confident, resilient students through a supportive and trusting environment.',
    image: '/images/benefits/emotional.jpg',
  },
  {
    icon: FiBook,
    title: 'Academic Excellence',
    description: 'Rigorous bilingual curriculum that prepares students for global opportunities.',
    image: '/images/benefits/academic.jpg',
  },
  {
    icon: FiUsers,
    title: 'Close Community',
    description: 'Small class sizes ensure personalized attention and meaningful relationships.',
    image: '/images/benefits/community.jpg',
  },
  {
    icon: FiGlobe,
    title: 'Global Mindset',
    description: 'We develop world-ready citizens with critical thinking and cultural awareness.',
    image: '/images/benefits/global.jpg',
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
            Discover Our Approach
          </a>
        </motion.div>
      </div>
    </section>
  );
}
