'use client';

import type { InformacionPage } from '@/lib/informacion-data';
import InformacionHero from './InformacionHero';
import InformacionContent from './InformacionContent';
import InformacionFAQ from './InformacionFAQ';
import InformacionLinks from './InformacionLinks';
import InformacionCTA from './InformacionCTA';
import Footer from '@/components/Footer';

interface InformacionPageTemplateProps {
  page: InformacionPage;
}

export default function InformacionPageTemplate({ page }: InformacionPageTemplateProps) {
  return (
    <main>
      <InformacionHero page={page} />
      <InformacionContent page={page} />
      <InformacionFAQ page={page} />
      <InformacionLinks page={page} />
      <InformacionCTA page={page} />
      <Footer />
    </main>
  );
}
