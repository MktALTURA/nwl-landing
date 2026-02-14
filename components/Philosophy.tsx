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
            <div className="aspect-[4/3] bg-gradient-to-br from-wine/20 to-mustard/20 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-lg font-medium text-charcoal/60 mb-2">
                    [ Main Philosophy Image ]
                  </p>
                  <p className="text-sm text-charcoal/40">
                    /images/philosophy-main.jpg
                  </p>
                  <p className="text-xs text-charcoal/30 mt-2 max-w-xs mx-auto">
                    Students collaborating on a project, natural lighting
                  </p>
                </div>
              </div>
            </div>

            {/* Two smaller images below */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-gradient-to-br from-terracotta/20 to-eucalyptus/20 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-3">
                    <p className="text-xs font-medium text-charcoal/50 mb-1">
                      [ Secondary 1 ]
                    </p>
                    <p className="text-xs text-charcoal/30">
                      /images/philosophy-1.jpg
                    </p>
                  </div>
                </div>
              </div>
              <div className="aspect-square bg-gradient-to-br from-eucalyptus/20 to-skyblue/20 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-3">
                    <p className="text-xs font-medium text-charcoal/50 mb-1">
                      [ Secondary 2 ]
                    </p>
                    <p className="text-xs text-charcoal/30">
                      /images/philosophy-2.jpg
                    </p>
                  </div>
                </div>
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
