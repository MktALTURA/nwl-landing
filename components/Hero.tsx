'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
      // Split & Drift Effect - Left side of headline
      gsap.fromTo('.headline-left',
        { x: 0, y: 0, opacity: 1 },
        {
          x: -100,
          y: -50,
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      // Split & Drift Effect - Right side of headline
      gsap.fromTo('.headline-right',
        { x: 0, y: 0, opacity: 1 },
        {
          x: 100,
          y: 50,
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      // Tagline scales up and fades
      gsap.fromTo('.hero-tagline',
        { scale: 1, opacity: 1 },
        {
          scale: 1.3,
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      // Subheadline fades faster
      gsap.fromTo('.hero-subheadline',
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: 30,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'center top',
            scrub: 1,
          },
        }
      );

      // CTAs fade out first
      gsap.fromTo('.hero-ctas',
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '30% top',
            scrub: 1,
          },
        }
      );

      // Trust indicators fade
      gsap.fromTo('.hero-trust',
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '40% top',
            scrub: 1,
          },
        }
      );

      // Wine divider stays longer then fades
      gsap.fromTo('.hero-divider',
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: '20% top',
            end: 'center top',
            scrub: 1,
          },
        }
      );

      // Animated tagline - characters reveal with stagger (initial load)
      gsap.from('.tagline-char', {
        opacity: 0,
        y: 20,
        rotateX: -90,
        stagger: 0.04,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 1.6,
      });

      // Main headline word animation (initial load)
      gsap.from('.word-wrap', {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.6,
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

      {/* Kangaroo Watermark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute right-[-5%] top-[10%] w-[60vh] h-[60vh] z-[5] pointer-events-none"
      >
        <img 
          src="/images/brand/kangaroo-wine.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.jpg"
          alt="NWL School campus with students"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/90 via-ivory/70 to-ivory/50 z-10" />
      </div>

      <div className="container-custom relative z-20 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Wine accent line with animation */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="wine-divider mb-8 hero-divider"
          />

          {/* Main Headline - Split into Left and Right for drift effect */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-charcoal mb-8 leading-tight">
            {/* Left side - drifts left and up */}
            <span className="headline-left inline-block">
              <span className="word-wrap inline-block">At</span>{' '}
              <span className="word-wrap inline-block">NWL,</span>
            </span>
            <br />
            {/* Right side - drifts right and down */}
            <span className="headline-right inline-block">
              <span className="word-wrap inline-block text-wine">we</span>{' '}
              <span className="word-wrap inline-block text-wine">unlock</span>{' '}
              <span className="word-wrap inline-block text-wine">greatness</span>
            </span>
          </h1>

          {/* Tagline - Scales up and fades */}
          <div className="relative mb-12 hero-tagline">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
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
            transition={{ duration: 0.8, delay: 2.2 }}
            className="text-lg md:text-xl text-charcoal/80 mb-12 max-w-2xl leading-relaxed hero-subheadline"
          >
            At NWL, we drive the academic, emotional, and social development
            of our students in a close and trusting environment.
          </motion.p>

          {/* CTAs with stagger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="flex flex-col sm:flex-row gap-4 hero-ctas"
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
            transition={{ duration: 0.8, delay: 2.8 }}
            className="mt-16 flex flex-wrap items-center gap-8 text-sm text-charcoal/60 hero-trust"
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
                transition={{ duration: 0.5, delay: 2.9 + item.delay }}
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
        transition={{ duration: 1, delay: 3.2 }}
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
