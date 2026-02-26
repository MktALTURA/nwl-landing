'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { campuses } from '@/lib/campus-data';
import CampusHero from '@/components/campus/CampusHero';
import QuickFacts from '@/components/campus/QuickFacts';
import Facilities from '@/components/campus/Facilities';
import Extracurriculars from '@/components/campus/Extracurriculars';
import DirectorMessage from '@/components/campus/DirectorMessage';
import CampusCTA from '@/components/campus/CampusCTA';
import Footer from '@/components/Footer';

export default function CampusPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const campus = campuses[slug];

  if (!campus) {
    notFound();
  }

  return (
    <main>
      <CampusHero campus={campus} />
      <QuickFacts stats={campus.stats} />
      <Facilities facilities={campus.facilities} />
      <Extracurriculars activities={campus.activities} />
      <DirectorMessage director={campus.director} />
      <CampusCTA />
      <Footer />
    </main>
  );
}
