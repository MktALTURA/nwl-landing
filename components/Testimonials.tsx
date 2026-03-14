'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const testimonialsData = [
  {
    author: 'María González',
    rating: 5,
    image: '/images/testimonials/maria.jpg',
  },
  {
    author: 'Carlos Mendoza',
    rating: 5,
    image: '/images/testimonials/carlos.jpg',
  },
  {
    author: 'Ana Torres',
    rating: 5,
    image: '/images/testimonials/ana.jpg',
  },
];

export default function Testimonials() {
  const { t } = useLanguage();
  const testimonials = testimonialsData.map((td, i) => ({ ...td, ...t.testimonials.items[i] }));

  return (
    <section className="section-padding bg-gradient-to-b from-white to-sand animate-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {t.testimonials.sectionTitle} <span className="text-wine">{t.testimonials.sectionTitleAccent}</span>
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            {t.testimonials.sectionSubtitle}
          </p>
        </div>

        {/* Testimonials Grid with Images */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Portrait */}
              <div className="aspect-square relative bg-sand">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.author} - ${testimonial.role}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="fill-mustard text-mustard" size={18} />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-charcoal/80 mb-6 leading-relaxed italic text-sm">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-wine/10 pt-4">
                  <p className="font-bold text-charcoal">{testimonial.author}</p>
                  <p className="text-sm text-charcoal/60">{testimonial.role}</p>
                </div>
              </div>

              {/* Accent */}
              <div className="absolute top-6 right-6 text-6xl text-wine/10 font-display">
                &ldquo;
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
