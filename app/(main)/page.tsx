'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/components/Hero';
import BeSection from '@/components/BeSection';
import KangarooSpirit from '@/components/KangarooSpirit';
import Benefits from '@/components/Benefits';
import Levels from '@/components/Levels';
import CampusFinder from '@/components/CampusFinder';
import Philosophy from '@/components/Philosophy';
import Partnerships from '@/components/Partnerships';
import Testimonials from '@/components/Testimonials';
import TrustNumbers from '@/components/TrustNumbers';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // GSAP scroll-triggered animations
    const ctx = gsap.context(() => {
      // Fade-in animations for sections
      gsap.utils.toArray('.animate-section').forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            // Mobile: fire-once trigger instead of scrub to avoid jitter
            ...(isMobile
              ? { toggleActions: 'play none none reverse' }
              : { end: 'top 50%', scrub: 1 }),
          },
        });
      });

      // Wine divider animations
      gsap.utils.toArray('.wine-divider').forEach((divider: any) => {
        gsap.from(divider, {
          width: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: divider,
            start: 'top 85%',
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main ref={mainRef}>
        <Hero />
        <KangarooSpirit />
        <BeSection />
        <Benefits />
        <Philosophy />
        <Levels />
        <CampusFinder />
        {/* <Testimonials /> — hidden until real testimonials are ready */}
        <Partnerships />
        <TrustNumbers />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
