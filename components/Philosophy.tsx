'use client';

import { motion } from 'framer-motion';

const pillars = [
  {
    number: '01',
    title: 'Academic Rigor',
    description: 'Challenging curriculum that develops critical thinking and problem-solving skills.',
  },
  {
    number: '02',
    title: 'Emotional Intelligence',
    description: 'Building self-awareness, empathy, and resilience in every student.',
  },
  {
    number: '03',
    title: 'Community Connection',
    description: 'Strong partnerships between students, families, and educators.',
  },
];

export default function Philosophy() {
  return (
    <section className="section-padding bg-sand animate-section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="wine-divider mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
              The <span className="text-wine">Newland</span> Model
            </h2>
            <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
              Our educational philosophy is built on three fundamental pillars that
              guide everything we do. We believe in nurturing the whole child—
              academically, emotionally, and socially.
            </p>

            {/* Three Pillars */}
            <div className="space-y-8 mb-8">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="text-3xl font-display font-bold text-wine/20">
                      {pillar.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-charcoal/70">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a href="/modelo-educativo.pdf" className="btn-secondary">
              Download Full Model (PDF)
            </a>
          </div>

          {/* Right: Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Placeholder for campus photo */}
            <div className="aspect-[4/3] bg-gradient-to-br from-wine/20 to-mustard/20 rounded-sm overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-charcoal/30">
                {/* Replace with actual photo */}
                <p className="text-sm">[ Campus Photo: Natural light, outdoor space ]</p>
              </div>
            </div>

            {/* Accent decoration */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-wine/10 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
