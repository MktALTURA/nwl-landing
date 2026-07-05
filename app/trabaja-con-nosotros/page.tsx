'use client';

import CareersHero from '@/components/careers/CareersHero';
import WhyNWL from '@/components/careers/WhyNWL';
import JobListings from '@/components/careers/JobListings';
import ApplicationProcess from '@/components/careers/ApplicationProcess';
import SubmitCV from '@/components/careers/SubmitCV';
import Footer from '@/components/Footer';

export default function CareersPage() {
  return (
    <>
      <main>
        <CareersHero />
        <WhyNWL />
        <JobListings />
        <ApplicationProcess />
        <SubmitCV />
      </main>
      <Footer />
    </>
  );
}
