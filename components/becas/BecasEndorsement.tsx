'use client';

import { useBecas } from './BecasProvider';

/**
 * Endorsing-entity slot. Renders nothing until the program config carries a
 * confirmed entity name. Deliberately no government or embassy wording.
 */
export default function BecasEndorsement() {
  const { catalog, locale } = useBecas();
  const entidad = catalog?.programa.entidadAval;
  if (!entidad) return null;
  return (
    <section className="py-10 bg-white border-y border-n-200 animate-section">
      <div className="container-custom text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-n-500">
          {locale === 'es' ? 'Programa respaldado por' : 'Program endorsed by'}
        </span>
        <div className="font-display font-bold text-2xl text-navy mt-2">{entidad}</div>
      </div>
    </section>
  );
}
