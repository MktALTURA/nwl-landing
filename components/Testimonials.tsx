'use client';

import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    quote: "Newland has been transformational for our daughter. The teachers genuinely care about her growth, not just academically but emotionally too.",
    author: "María González",
    role: "Parent - Kinder, Juriquilla",
    rating: 5,
    image: '/testimonials/maria.jpg',
  },
  {
    quote: "The bilingual program is excellent. My son switched from another school and his English improved dramatically in just one year.",
    author: "Carlos Mendoza",
    role: "Parent - Primaria, Zibatá",
    rating: 5,
    image: '/testimonials/carlos.jpg',
  },
  {
    quote: "What impressed us most was the sense of community. Parents, teachers, and students all feel like one big family.",
    author: "Ana Torres",
    role: "Parent - Secundaria, SMA",
    rating: 5,
    image: '/testimonials/ana.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-sand animate-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            What <span className="text-wine">Parents Say</span>
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            Hear from families who have chosen Newland for their children's education
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
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              {/* Portrait placeholder */}
              <div className="aspect-square bg-gradient-to-br from-wine/20 to-eucalyptus/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-20 h-20 rounded-full bg-white/50 mx-auto mb-2" />
                    <p className="text-xs text-charcoal/40">
                      [ Parent Photo ]
                    </p>
                    <p className="text-xs text-charcoal/30 mt-1">
                      {testimonial.image}
                    </p>
                  </div>
                </div>
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
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="border-t border-wine/10 pt-4">
                  <p className="font-bold text-charcoal">{testimonial.author}</p>
                  <p className="text-sm text-charcoal/60">{testimonial.role}</p>
                </div>
              </div>

              {/* Accent */}
              <div className="absolute top-6 right-6 text-6xl text-wine/10 font-display">
                "
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video testimonial section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="aspect-video bg-gradient-to-br from-wine/30 to-terracotta/20 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-wine border-b-[10px] border-b-transparent ml-1" />
                </div>
                <p className="text-lg font-medium text-charcoal/60 mb-2">
                  [ Video Testimonial ]
                </p>
                <p className="text-sm text-charcoal/40">
                  /videos/parent-testimonial.mp4
                </p>
                <p className="text-xs text-charcoal/30 mt-2 max-w-md mx-auto">
                  Parent interview discussing their child's journey at Newland
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-bold text-wine mb-2">500+</div>
            <div className="text-sm text-charcoal/60">Happy Families</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-wine mb-2">15+</div>
            <div className="text-sm text-charcoal/60">Years of Excellence</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-wine mb-2">95%</div>
            <div className="text-sm text-charcoal/60">Family Satisfaction</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-wine mb-2">5</div>
            <div className="text-sm text-charcoal/60">Campus Locations</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
