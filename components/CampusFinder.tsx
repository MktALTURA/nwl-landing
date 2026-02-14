'use client';

import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const campuses = [
  {
    name: 'Juriquilla',
    location: 'Querétaro, Qro.',
    levels: 'Maternal - Preparatoria',
    image: '/campus-juriquilla.jpg',
    description: 'Our flagship campus with complete educational offerings.',
  },
  {
    name: 'Zibatá',
    location: 'El Marqués, Qro.',
    levels: 'Maternal - Preparatoria',
    image: '/campus-zibata.jpg',
    description: 'Modern facilities in a growing community.',
  },
  {
    name: 'San Miguel de Allende',
    location: 'San Miguel de Allende, Gto.',
    levels: 'Kinder - Secundaria',
    image: '/campus-sma.jpg',
    description: 'Cultural richness meets academic excellence.',
  },
  {
    name: 'Corregidora',
    location: 'Corregidora, Qro.',
    levels: 'Maternal - Primaria',
    image: '/campus-corregidora.jpg',
    description: 'Welcoming environment for early learners.',
  },
  {
    name: 'Milenio',
    location: 'Querétaro, Qro.',
    levels: 'Kinder - Primaria',
    image: '/campus-milenio.jpg',
    description: 'Conveniently located with excellent facilities.',
  },
];

export default function CampusFinder() {
  return (
    <section id="campus" className="section-padding bg-gradient-to-b from-sand to-ivory animate-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Find Your <span className="text-wine">Campus</span>
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            With 5 locations across Querétaro and Guanajuato, there's a Newland campus near you
          </p>
        </div>

        {/* Campus Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campuses.map((campus, index) => (
            <motion.div
              key={campus.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-wine/20 to-mustard/20 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-charcoal/30">
                  {/* Replace with actual campus photos */}
                  <p className="text-sm text-center px-4">
                    [ {campus.name} Campus Photo ]
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-charcoal mb-2">
                  {campus.name}
                </h3>
                
                <div className="flex items-center text-sm text-charcoal/60 mb-4">
                  <FiMapPin className="mr-2 text-wine" />
                  {campus.location}
                </div>

                <p className="text-sm text-wine font-medium mb-3">
                  {campus.levels}
                </p>

                <p className="text-charcoal/70 mb-6">
                  {campus.description}
                </p>

                {/* CTA */}
                <a
                  href={`#campus-${campus.name.toLowerCase()}`}
                  className="inline-flex items-center text-wine font-medium group-hover:underline"
                >
                  Visit Campus →
                </a>
              </div>
            </motion.div>
          ))}

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: campuses.length * 0.1 }}
            viewport={{ once: true }}
            className="bg-wine text-white rounded-sm p-8 flex flex-col justify-center items-center text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Need Help Choosing?
            </h3>
            <p className="mb-6 opacity-90">
              Our admissions team will help you find the perfect campus for your family
            </p>

            <div className="space-y-3 mb-6">
              <a
                href="tel:+524421227791"
                className="flex items-center justify-center text-white/90 hover:text-white"
              >
                <FiPhone className="mr-2" />
                +52 442 122 7791
              </a>
              <a
                href="mailto:admissions@newland.edu.mx"
                className="flex items-center justify-center text-white/90 hover:text-white"
              >
                <FiMail className="mr-2" />
                admissions@newland.edu.mx
              </a>
            </div>

            <a
              href="https://wa.me/5214421227791"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-wine px-6 py-3 rounded-sm font-medium hover:bg-ivory transition-colors"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
