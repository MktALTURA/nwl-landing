'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { getInformacionBySlug } from '@/lib/informacion-data';
import InformacionPageTemplate from '@/components/informacion/InformacionPageTemplate';

export default function InformacionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const page = getInformacionBySlug(slug);

  if (!page) {
    notFound();
  }

  return <InformacionPageTemplate page={page} />;
}
