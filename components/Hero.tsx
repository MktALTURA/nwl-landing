'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import BrochureLevelDropdown from './BrochureLevelDropdown';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useLanguage } from '@/lib/i18n/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useLanguage();

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
          className="w-full h-full object-contain rotate-[15deg]"
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
          <h1 className="font-display text-6xl md:text-8xl font-bold text-charcoal mb-6 leading-tight">
            {/* Left side - drifts left and up */}
            <span className="headline-left inline-block">
              {t.hero.headlineLeft.map((word, i) => (
                <span key={i}>
                  <span className="word-wrap inline-block">{word}</span>
                  {i < t.hero.headlineLeft.length - 1 ? ' ' : ''}
                </span>
              ))}
            </span>
            <br />
            {/* Right side - drifts right and down */}
            <span className="headline-right inline-block">
              {t.hero.headlineRight.map((word, i) => (
                <span key={i}>
                  <span className="word-wrap inline-block text-wine">{word}</span>
                  {i < t.hero.headlineRight.length - 1 ? ' ' : ''}
                </span>
              ))}
            </span>
          </h1>

          {/* Subheadline with fade in */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-xl md:text-2xl font-display text-charcoal/70 mb-12 max-w-3xl leading-relaxed hero-subheadline"
          >
            {t.hero.subheadline}
          </motion.p>

          {/* CTAs with stagger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4 hero-ctas"
          >
            {/* Primary CTA */}
            <motion.a
              href="#admissions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center justify-center group"
            >
              {t.hero.ctaPrimary}
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            {/* Secondary CTA — brochure level dropdown */}
            <BrochureLevelDropdown
              className="btn-secondary inline-flex items-center justify-center"
            >
              <FiDownload className="mr-2" />
              {t.hero.ctaSecondary}
            </BrochureLevelDropdown>
          </motion.div>

          {/* Trust indicators with delayed reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="mt-16 flex flex-wrap items-center gap-8 text-sm text-charcoal/60 hero-trust"
          >
            {t.hero.trustIndicators.map((label, index) => ({ label, delay: index * 0.1 })).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 2.1 + item.delay }}
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
        transition={{ duration: 1, delay: 2.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-wine/30 rounded-full flex justify-center cursor-pointer"
          onClick={() => {
            const target = document.getElementById('benefits');
            const smoother = ScrollSmoother.get();
            if (target && smoother) {
              smoother.scrollTo(target, true, 'top top');
            } else if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
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
