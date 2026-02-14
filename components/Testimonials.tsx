'use client';

import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    quote: "Newland has been transformational for our daughter. The teachers genuinely care about her growth, not just academically but emotionally too.",
    author: "María González",
    role: "Parent - Kinder, Juriquilla",
    rating: 5,
  },
  {
    quote: "The bilingual program is excellent. My son switched from another school and his English improved dramatically in just one year.",
    author: "Carlos Mendoza",
    role: "Parent - Primaria, Zibatá",
    rating: 5,
  },
  {
    quote: "What impressed us most was the sense of community. Parents, teachers, and students all feel like one big family.",
    author: "Ana Torres",
    role: "Parent - Secundaria, SMA",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-white animate-section">
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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-ivory p-8 rounded-sm relative"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="fill-mustard text-mustard" size={18} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-charcoal/80 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-wine/10 pt-4">
                <p className="font-bold text-charcoal">{testimonial.author}</p>
                <p className="text-sm text-charcoal/60">{testimonial.role}</p>
              </div>

              {/* Accent */}
              <div className="absolute top-6 right-6 text-6xl text-wine/10 font-display">
                "
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
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
