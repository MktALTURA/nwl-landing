'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Parallax effect on hero content
      gsap.to('.hero-content', {
        y: 100,
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Animated tagline - characters reveal with stagger
      gsap.from('.tagline-char', {
        opacity: 0,
        y: 20,
        rotateX: -90,
        stagger: 0.03,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 1.2,
      });

      // Main headline word animation
      gsap.from('.word-wrap', {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isMounted]);

  // Split tagline into characters
  const taglineText = "Be proud, be Newland";
  const taglineChars = taglineText.split('').map((char, i) => (
    <span key={i} className="tagline-char inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-ivory via-sand to-warmgray overflow-hidden"
    >
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-wine/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-terracotta/10 rounded-full blur-3xl"
        />
      </div>

      {/* Background Image Placeholder */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/30 to-transparent z-10" />
        <div className="w-full h-full bg-gradient-to-br from-warmgray to-sand relative">
          <div className="absolute inset-0 flex items-center justify-center text-charcoal/20">
            <div className="text-center">
              <p className="text-sm font-medium mb-2">[ Hero Background Image ]</p>
              <p className="text-xs">/images/hero-background.jpg</p>
              <p className="text-xs mt-2 max-w-md">
                Campus exterior or students in action, wide shot
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom relative z-20 pt-32 pb-20 hero-content">
        <div className="max-w-4xl">
          {/* Wine accent line with animation */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="wine-divider mb-8"
          />

          {/* Main Headline - Animated word by word */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-charcoal mb-8 leading-tight">
            <span className="word-wrap inline-block">At</span>{' '}
            <span className="word-wrap inline-block">Newland,</span>{' '}
            <span className="word-wrap inline-block text-wine">we</span>{' '}
            <span className="word-wrap inline-block text-wine">unlock</span>{' '}
            <span className="word-wrap inline-block text-wine">greatness</span>
          </h1>

          {/* Tagline - Character-by-character reveal */}
          <div className="relative mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -inset-4 bg-gradient-to-r from-wine/5 via-terracotta/5 to-transparent rounded-lg blur-xl"
            />
            <div
              className="relative text-3xl md:text-5xl font-display font-black text-wine leading-tight tracking-tight"
              style={{
                textShadow: '2px 2px 0px rgba(139, 35, 50, 0.1)',
              }}
            >
              {taglineChars}
            </div>
          </div>

          {/* Subheadline with fade in */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-lg md:text-xl text-charcoal/80 mb-12 max-w-2xl leading-relaxed"
          >
            At Newland, we drive the academic, emotional, and social development
            of our students in a close and trusting environment.
          </motion.p>

          {/* CTAs with stagger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Primary CTA */}
            <motion.a
              href="#admissions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center justify-center group"
            >
              Schedule a Visit
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="/brochure.pdf"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center justify-center"
            >
              <FiDownload className="mr-2" />
              Educational Model
            </motion.a>
          </motion.div>

          {/* Trust indicators with delayed reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="mt-16 flex flex-wrap items-center gap-8 text-sm text-charcoal/60"
          >
            {[
              { label: '5 Campuses', delay: 0 },
              { label: 'Maternal - Preparatoria', delay: 0.1 },
              { label: 'Bilingual Education', delay: 0.2 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 2.3 + item.delay }}
                className="flex items-center"
              >
                <div className="w-12 h-[2px] bg-wine mr-3" />
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - Animated bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-wine/30 rounded-full flex justify-center cursor-pointer"
          onClick={() => {
            document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-wine/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
