'use client';

import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { CampusTestimonial } from '@/lib/campus-data';

interface CampusTestimonialsProps {
  testimonials: CampusTestimonial[];
  googleRating: number;
  googleReviewCount: number;
}

export default function CampusTestimonials({ testimonials, googleRating, googleReviewCount }: CampusTestimonialsProps) {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-sand relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-10 w-40 h-40 bg-mustard/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-10 w-48 h-48 bg-sunshine/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="wine-divider mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            {t.campusDetail.testimonialsTitle}{' '}
            <span className="text-wine">{t.campusDetail.testimonialsTitleAccent}</span>
          </h2>

          {/* Google Rating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-md mt-6"
          >
            <FcGoogle size={24} />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={16}
                  className={i < Math.round(googleRating) ? 'text-mustard fill-mustard' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-charcoal">{googleRating}</span>
            <span className="text-sm text-charcoal/50">
              ({googleReviewCount}+ {t.campusDetail.testimonialsReviewsLabel})
            </span>
          </motion.div>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <FiStar key={j} size={14} className="text-mustard fill-mustard" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-charcoal/80 text-sm leading-relaxed flex-grow mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-sand pt-4">
                <p className="font-bold text-charcoal text-sm">{testimonial.author}</p>
                <p className="text-xs text-charcoal/50">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
