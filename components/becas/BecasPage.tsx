import Footer from '@/components/Footer';
import type { PublicCatalog } from '@/lib/becas/catalog';
import { BecasProvider } from './BecasProvider';
import BecasScrollAnimations from './BecasScrollAnimations';
import BecasHero from './BecasHero';
import BecasCategories from './BecasCategories';
import BecasCalculator from './BecasCalculator';
import BecasHowItWorks from './BecasHowItWorks';
import BecasApplication from './BecasApplication';
import BecasRules from './BecasRules';
import BecasReferrals from './BecasReferrals';
import BecasEndorsement from './BecasEndorsement';
import BecasFAQ from './BecasFAQ';
import BecasFinalCTA from './BecasFinalCTA';
import BecasTracking from './BecasTracking';
import DemoRibbon from './DemoRibbon';

/**
 * Composition shared by /becas and the /becas/demo/[variant] routes.
 * Server component: the sections below are client components that read the
 * catalog from the provider; their copy is still in the initial HTML.
 */
export default function BecasPage({ catalog, demo = false }: { catalog: PublicCatalog | null; demo?: boolean }) {
  return (
    <BecasProvider catalog={catalog} demo={demo}>
      {(demo || catalog?.mock) && <DemoRibbon />}
      <BecasTracking />
      <BecasScrollAnimations>
        <BecasHero />
        <BecasCategories />
        <BecasCalculator />
        <BecasHowItWorks />
        <BecasApplication />
        <BecasRules />
        <BecasReferrals />
        <BecasEndorsement />
        <BecasFAQ />
        <BecasFinalCTA />
      </BecasScrollAnimations>
      <Footer />
    </BecasProvider>
  );
}
