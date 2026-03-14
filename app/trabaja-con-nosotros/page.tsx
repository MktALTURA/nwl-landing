'use client';

import CareersHero from '@/components/careers/CareersHero';
import WhyNWL from '@/components/careers/WhyNWL';
import JobListings from '@/components/careers/JobListings';
import ApplicationProcess from '@/components/careers/ApplicationProcess';
import BecomePartner from '@/components/careers/BecomePartner';
import Footer from '@/components/Footer';

export default function CareersPage() {
  return (
    <>
      <main>
        <CareersHero />
        <WhyNWL />
        <JobListings />
        <ApplicationProcess />
        <BecomePartner />
      </main>
      <Footer />
    </>
  );
}
