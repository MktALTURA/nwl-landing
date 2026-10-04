'use client';

import { FaWhatsapp } from 'react-icons/fa';
import SouthernCross from '@/components/ui/SouthernCross';
import { useBecas } from './BecasProvider';

export const BECAS_WHATSAPP = '5214421227791';

export default function BecasFinalCTA() {
  const { copy } = useBecas();
  const f = copy.finalCta;
  return (
    <section className="relative overflow-hidden nwl-bg-dawn-deep py-20 md:py-28 animate-section">
      <div className="absolute top-8 right-[8%] pointer-events-none hidden md:block">
        <SouthernCross height={90} color="var(--nwl-gold)" opacity={0.3} />
      </div>
      <div className="container-custom text-center">
        <h2 className="font-display font-bold text-4xl md:text-5xl text-paper">{f.title}</h2>
        <p className="mt-4 text-lg text-paper/75 max-w-xl mx-auto leading-relaxed">{f.body}</p>
        <a
          href={`https://wa.me/${BECAS_WHATSAPP}?text=${encodeURIComponent(f.whatsappText)}`}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="becas_final_whatsapp"
          className="btn-primary mt-9 inline-flex items-center gap-2 text-base"
        >
          <FaWhatsapp size={20} />
          {f.whatsapp}
        </a>
        <div className="mt-10 font-mono text-[11px] uppercase tracking-[0.24em] text-gold/80">{copy.brand.slogan}</div>
      </div>
    </section>
  );
}
