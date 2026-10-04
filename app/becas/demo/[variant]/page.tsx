import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BecasPage from '@/components/becas/BecasPage';
import { demoCatalog, getCatalogSafe } from '@/lib/becas/catalog';
import type { BecasVariant } from '@/lib/becas/contract';

/**
 * Demo variants for partner walkthroughs: /becas/demo/precios and
 * /becas/demo/ahorro force one calculator variant regardless of the worker's
 * setting. Cookie-gated in middleware even after public launch; delete after
 * the program settles on a variant.
 */
const VARIANTS: BecasVariant[] = ['precios', 'ahorro'];

export const dynamicParams = false;
export const revalidate = 60;

export function generateStaticParams() {
  return VARIANTS.map((variant) => ({ variant }));
}

export const metadata: Metadata = {
  title: 'Programa de Becas (demo)',
  robots: { index: false, follow: false },
};

export default async function DemoPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!VARIANTS.includes(variant as BecasVariant)) notFound();
  const v = variant as BecasVariant;

  // Prefer the real catalog reshaped to the requested variant; when the worker
  // has no prices to show (ahorro mode or offline), the 'precios' demo falls
  // back to fixtures under a visible ribbon.
  const live = await getCatalogSafe(v);
  const hasPrices = live?.campuses.some((c) => Object.values(c.ciclos).some((ci) => ci.grados.some((g) => g.quote)));
  const catalog = live && (v === 'ahorro' || hasPrices) ? live : demoCatalog(v);

  return <BecasPage catalog={catalog} demo />;
}
