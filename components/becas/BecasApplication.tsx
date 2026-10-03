'use client';

import { useBecas } from './BecasProvider';
import SectionHeading from './SectionHeading';

/** Placeholder until the stepper lands (next commit). Keeps the #solicitud anchor. */
export default function BecasApplication() {
  const { copy } = useBecas();
  return (
    <section id="solicitud" className="section-padding bg-paper animate-section">
      <div className="container-custom">
        <SectionHeading eyebrow={copy.apply.eyebrow} title={copy.apply.title} accent={copy.apply.titleAccent} intro={copy.apply.intro} />
      </div>
    </section>
  );
}
