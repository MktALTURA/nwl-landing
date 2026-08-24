'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import BrochureLevelDropdown from './BrochureLevelDropdown';
import SouthernCross from './ui/SouthernCross';
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

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: no scroll-triggered animations — hero just scrolls away
        // naturally. toggleActions + ScrollSmoother causes stuttering on
        // real touch devices due to rapid play/reverse at trigger boundaries.
      } else {
        // Desktop: scrub-based scroll animations (unchanged)
        const heroScrollBase = { trigger: heroRef.current, start: 'top top' };

        gsap.fromTo('.headline-left',
          { x: 0, y: 0, opacity: 1 },
          {
            x: -100, y: -50, opacity: 0,
            scrollTrigger: { ...heroScrollBase, end: 'bottom top', scrub: 1.5 },
          }
        );

        gsap.fromTo('.headline-right',
          { x: 0, y: 0, opacity: 1 },
          {
            x: 100, y: 50, opacity: 0,
            scrollTrigger: { ...heroScrollBase, end: 'bottom top', scrub: 1.5 },
          }
        );

        gsap.fromTo('.hero-subheadline',
          { opacity: 1, y: 0 },
          {
            opacity: 0, y: 30,
            scrollTrigger: { ...heroScrollBase, end: 'center top', scrub: 1 },
          }
        );

        gsap.fromTo('.hero-ctas',
          { opacity: 1, y: 0 },
          {
            opacity: 0, y: 20,
            scrollTrigger: { ...heroScrollBase, end: '30% top', scrub: 1 },
          }
        );

        gsap.fromTo('.hero-trust',
          { opacity: 1 },
          {
            opacity: 0,
            scrollTrigger: { ...heroScrollBase, end: '40% top', scrub: 1 },
          }
        );

        gsap.fromTo('.hero-divider',
          { opacity: 1 },
          {
            opacity: 0,
            scrollTrigger: { ...heroScrollBase, start: '20% top', end: 'center top', scrub: 1 },
          }
        );
      }

      // Main headline word animation (initial load).
      // Paid-traffic visitors bounce in seconds — everything load-bearing
      // (headline, CTAs) must be readable well under 1s.
      gsap.from('.word-wrap', {
        opacity: 0,
        y: 50,
        stagger: 0.07,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.15,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center nwl-bg-dawn-deep overflow-hidden"
    >
      {/* Soft navy/gold blooms — CSS animation on mobile, Framer on desktop */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-navy rounded-full blur-3xl opacity-60 md:hidden animate-[orb1_20s_ease-in-out_infinite]" style={{ mixBlendMode: 'screen' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-gold/15 rounded-full blur-3xl md:hidden animate-[orb2_25s_ease-in-out_2s_infinite]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-navy rounded-full blur-3xl opacity-60 hidden md:block"
          style={{ mixBlendMode: 'screen' }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-gold/15 rounded-full blur-3xl hidden md:block"
        />
      </div>

      {/* Southern Cross — quiet corner motif */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="absolute top-[14%] right-[6%] z-[5] pointer-events-none hidden md:block"
      >
        <SouthernCross height={170} color="var(--nwl-paper)" opacity={0.42} />
      </motion.div>

      {/* Gold kangaroo watermark (existing silhouette, recolored via mask) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute right-[-5%] bottom-[2%] w-[55vh] h-[55vh] z-[4] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'var(--nwl-gold)',
          WebkitMaskImage: 'url(/images/brand/nwl-as-kangaroo-white.png)',
          maskImage: 'url(/images/brand/nwl-as-kangaroo-white.png)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />

      <div className="container-custom relative z-20 pt-28 md:pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow — mono kicker, instant message match for paid traffic */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="hero-divider mb-5 md:mb-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-gold"
          >
            <span className="w-10 h-[1px] bg-gold shrink-0" />
            {t.hero.eyebrow}
          </motion.p>

          {/* Main Headline - Split into Left and Right for drift effect */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-paper mb-5 md:mb-6 leading-[1.02] tracking-[-0.02em]">
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
                  <span className="word-wrap inline-block italic text-gold">{word}</span>
                  {i < t.hero.headlineRight.length - 1 ? ' ' : ''}
                </span>
              ))}
            </span>
          </h1>

          {/* Subheadline with fade in */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-paper/70 mb-8 md:mb-10 max-w-3xl leading-relaxed hero-subheadline"
          >
            {t.hero.subheadline}
          </motion.p>

          {/* CTAs — visible fast; primary = visit, secondary = WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hero-ctas"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Primary CTA */}
              <motion.a
                href="#admissions"
                data-cta="hero_schedule_visit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center justify-center group"
              >
                {t.hero.ctaPrimary}
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              {/* Secondary CTA — WhatsApp (ghost pill on dark) */}
              <motion.a
                href="https://wa.me/5214421227791"
                target="_blank"
                rel="noopener noreferrer"
                data-cta="hero_whatsapp"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold bg-paper/5 text-paper border border-paper/25 backdrop-blur-sm hover:border-[#25D366]/60 transition-colors duration-300"
              >
                <FaWhatsapp className="mr-2 text-[#25D366]" size={20} />
                {t.hero.ctaWhatsapp}
              </motion.a>
            </div>

            {/* Tertiary — brochure download as quiet text link */}
            <BrochureLevelDropdown dataCta="hero_brochure" className="mt-5 inline-flex items-center text-sm text-paper/70 underline underline-offset-4 decoration-gold/50 hover:text-gold transition-colors">
              <FiDownload className="mr-2" />
              {t.hero.ctaBrochure}
            </BrochureLevelDropdown>

            {/* Coordinates micro-type — Southern Cross rides along on mobile,
                where the desktop corner constellation is hidden */}
            <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45 flex items-center gap-2">
              <span className="text-gold">QRO 20.59° N</span>
              <span>·</span><span>↔</span><span>·</span>
              <span className="text-gold">SYD 33.87° S</span>
              <span className="ml-auto mr-1 md:hidden" aria-hidden="true">
                <SouthernCross height={46} color="var(--nwl-gold)" opacity={0.75} />
              </span>
            </div>
          </motion.div>

          {/* Trust indicators with delayed reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 md:mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-paper/70 hero-trust"
          >
            {t.hero.trustIndicators.map((label, index) => ({ label, delay: index * 0.08 })).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.75 + item.delay }}
                className="flex items-center"
              >
                <div className="w-12 h-[2px] bg-gold mr-3" />
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
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gold/40 rounded-full flex justify-center cursor-pointer"
          onClick={() => {
            // Benefits section's id is "about" — 'benefits' doesn't exist
            const target = document.getElementById('about');
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
            className="w-1 h-3 bg-gold/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Decorative fade into the next (light) section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-paper to-transparent z-10" />
    </section>
  );
}
