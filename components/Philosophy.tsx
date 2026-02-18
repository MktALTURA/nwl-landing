'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const pillars = [
  {
    number: '01',
    title: 'Philosophy for Children (P4C)',
    subtitle: 'Critical thinking at every stage',
    description:
      'Students learn how to think, not what to think. Guided dialogue and philosophical inquiry develop autonomous, analytical thinkers.',
    logoInitials: 'P4C',
  },
  {
    number: '02',
    title: "I'm NWL Leader by Tec de Monterrey",
    subtitle: 'Unique program in Mexico - Exclusive to NWL',
    description:
      'Leadership, emotional intelligence, and social-emotional growth from early childhood onward. Endorsed by Tec de Monterrey exclusively for NWL.',
    logoInitials: 'NWL',
  },
  {
    number: '03',
    title: 'Knotion - International Methodology',
    subtitle: 'Real challenges, real learning',
    description:
      'Project-based learning through real-world challenges with social impact. No traditional homework, just creative problem solving.',
    logoInitials: 'K',
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
              The <span className="text-wine">NWL</span> Model
            </h2>
            <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
              Our educational model integrates three proven methodologies that
              develop the whole child: critical thinking, emotional leadership,
              and real-world problem solving.
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
                  className="flex gap-5 bg-white p-5 rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  {/* Logo placeholder */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg border-2 border-dashed border-wine/30 bg-wine/5 flex items-center justify-center">
                    <span className="text-wine font-bold text-sm text-center leading-tight">
                      {pillar.logoInitials}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-charcoal mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-base font-semibold text-wine mb-2">
                      {pillar.subtitle}
                    </p>
                    <p className="text-charcoal/70 text-sm leading-relaxed">
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
            <div className="aspect-[4/3] rounded-lg overflow-hidden relative bg-sand">
              <Image
                src="/images/philosophy/philosophy-main.jpg"
                alt="Students collaborating on a project at Newland"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Two smaller images below */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden relative bg-sand">
                <Image
                  src="/images/philosophy/philosophy-1.jpg"
                  alt="Outdoor learning at Newland"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden relative bg-sand">
                <Image
                  src="/images/philosophy/philosophy-2.jpg"
                  alt="Hands-on collaboration at Newland"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
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
