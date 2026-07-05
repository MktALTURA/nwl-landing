'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BeneficiosHero from '@/components/beneficios/BeneficiosHero';
import BeneficiosCatalog from '@/components/beneficios/BeneficiosCatalog';
import BeneficiosHowTo from '@/components/beneficios/BeneficiosHowTo';
import PartnerApplyForm from '@/components/beneficios/PartnerApplyForm';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BeneficiosPage() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.animate-section').forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });

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
        <BeneficiosHero />
        <BeneficiosCatalog />
        <BeneficiosHowTo />
        <PartnerApplyForm />
      </main>
      <Footer />
    </>
  );
}
