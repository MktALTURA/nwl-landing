'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import PartnerForm from '@/components/admin/PartnerForm';
import type { BenefitCategory } from '@/lib/beneficios/types';

export default function NuevoAliadoPage() {
  const [categories, setCategories] = useState<BenefitCategory[] | null>(null);

  useEffect(() => {
    fetch('/api/beneficios/categories')
      .then((r) => (r.ok ? r.json() : []))
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/admin/beneficios"
        className="inline-flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal mb-6"
      >
        <FiArrowLeft size={15} /> Volver
      </Link>
      <h1 className="font-display text-3xl font-bold text-charcoal mb-8">Nuevo aliado</h1>

      {categories === null ? (
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
      ) : (
        <PartnerForm categories={categories} />
      )}
    </div>
  );
}
