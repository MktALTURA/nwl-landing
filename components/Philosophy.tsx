'use client';

import { motion } from 'framer-motion';

const pillars = [
  {
    number: '01',
    title: 'Academic Rigor',
    description: 'Challenging curriculum that develops critical thinking and problem-solving skills.',
    image: '/philosophy/academic.jpg',
  },
  {
    number: '02',
    title: 'Emotional Intelligence',
    description: 'Building self-awareness, empathy, and resilience in every student.',
    image: '/philosophy/emotional.jpg',
  },
  {
    number: '03',
    title: 'Community Connection',
    description: 'Strong partnerships between students, families, and educators.',
    image: '/philosophy/community.jpg',
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

            {/* Three Pillars with Images */}
            <div className="space-y-6 mb-8">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex gap-4 bg-white p-4 rounded-lg hover:shadow-md transition-all"
                >
                  {/* Small image preview */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gradient-to-br from-wine/20 to-terracotta/20 flex items-center justify-center">
                    <div className="text-2xl font-display font-bold text-wine/40">
                      {pillar.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-charcoal/70 text-sm">
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

          {/* Right: Large Image Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative space-y-4"
          >
            {/* Main large image */}
            <div className="aspect-[4/3] rounded-lg overflow-hidden relative shadow-lg">
              <img 
                src="/images/philosophy/philosophy-main.jpg" 
                alt="Students collaborating on a project"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Two smaller images below */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden relative shadow-md">
                <img 
                  src="/images/philosophy/philosophy-1.jpg" 
                  alt="Outdoor learning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden relative shadow-md">
                <img 
                  src="/images/philosophy/philosophy-2.jpg" 
                  alt="Hands-on collaboration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            {/* Accent decoration */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-wine/10 -z-10 rounded-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
