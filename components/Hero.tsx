'use client';

import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-ivory to-sand overflow-hidden"
    >
      {/* Background Image - Replace with actual NWL photo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 to-transparent z-10" />
        {/* Placeholder for hero image */}
        <div className="w-full h-full bg-gradient-to-br from-warmgray to-sand" />
      </div>

      <div className="container-custom relative z-20 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Wine accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="wine-divider mb-8"
          />

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl font-bold text-charcoal mb-6 leading-tight"
          >
            At Newland,{' '}
            <span className="text-wine">we unlock greatness</span>
          </motion.h1>

          {/* Secondary headline option */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl font-display text-wine/80 mb-8"
          >
            Be proud, be Newland
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-charcoal/80 mb-12 max-w-2xl leading-relaxed"
          >
            At Newland, we drive the academic, emotional, and social development
            of our students in a close and trusting environment.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Primary CTA */}
            <a
              href="#admissions"
              className="btn-primary inline-flex items-center justify-center group"
            >
              Schedule a Visit
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary CTA - Download Brochure */}
            <a
              href="/brochure.pdf"
              target="_blank"
              className="btn-secondary inline-flex items-center justify-center"
            >
              <FiDownload className="mr-2" />
              Educational Model
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 flex flex-wrap items-center gap-8 text-sm text-charcoal/60"
          >
            <div className="flex items-center">
              <div className="w-12 h-[2px] bg-wine mr-3" />
              <span>5 Campuses</span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-[2px] bg-wine mr-3" />
              <span>Maternal - Preparatoria</span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-[2px] bg-wine mr-3" />
              <span>Bilingual Education</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-wine/30 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-wine/50 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
