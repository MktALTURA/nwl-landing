'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import PartnerForm from '@/components/admin/PartnerForm';
import type { BenefitCategory, BenefitPartner } from '@/lib/beneficios/types';

export default function EditarAliadoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [partner, setPartner] = useState<BenefitPartner | null>(null);
  const [categories, setCategories] = useState<BenefitCategory[] | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/beneficios/partners/${id}`).then((r) => (r.ok ? r.json() : null)),
      fetch('/api/beneficios/categories').then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([p, c]) => {
        if (!p) setMissing(true);
        setPartner(p);
        setCategories(c);
      })
      .catch(() => setMissing(true));
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/admin/beneficios"
        className="inline-flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal mb-6"
      >
        <FiArrowLeft size={15} /> Volver
      </Link>
      <h1 className="font-display text-3xl font-bold text-charcoal mb-8">
        {partner ? partner.name : 'Editar aliado'}
      </h1>

      {missing ? (
        <p className="text-charcoal/60">Ese aliado ya no existe.</p>
      ) : !partner || !categories ? (
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
      ) : (
        <PartnerForm categories={categories} initial={partner} />
      )}
    </div>
  );
}
