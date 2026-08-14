import BeneficiosScrollAnimations from '@/components/beneficios/BeneficiosScrollAnimations';
import BeneficiosHero from '@/components/beneficios/BeneficiosHero';
import BeneficiosCatalog from '@/components/beneficios/BeneficiosCatalog';
import BeneficiosHowTo from '@/components/beneficios/BeneficiosHowTo';
import PartnerApplyForm from '@/components/beneficios/PartnerApplyForm';
import Footer from '@/components/Footer';
import { getCatalogSafe } from '@/lib/db/beneficios';

/**
 * Server component so the partner copy is in the initial HTML (SEO) while the
 * catalog itself comes from Redis and can be edited from /admin/beneficios
 * without a redeploy. Writes call revalidateBeneficios(); this TTL is the
 * self-heal floor if that ever fails.
 */
export const revalidate = 3600;

export default async function BeneficiosPage() {
  const { partners, categories } = await getCatalogSafe();

  return (
    <>
      <BeneficiosScrollAnimations>
        <BeneficiosHero partnerCount={partners.length} categoryCount={categories.length} />
        <BeneficiosCatalog partners={partners} categories={categories} />
        <BeneficiosHowTo />
        <PartnerApplyForm />
      </BeneficiosScrollAnimations>
      <Footer />
    </>
  );
}
