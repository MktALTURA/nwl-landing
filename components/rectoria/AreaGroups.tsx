'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Eyebrow from '@/components/ui/Eyebrow';
import Tag from '@/components/ui/Tag';
import Portrait from './Portrait';
import { localized, type RectoriaArea, type RectoriaPerson } from '@/lib/rectoria-data';
import type { Locale } from '@/lib/i18n/types';

const altFor = (p: RectoriaPerson, locale: Locale) =>
  `${p.name} — ${localized(p.title, locale)}, NWL Australian School`;

/* ── Person card: portrait column beside the copy. Leads get the larger
      portrait and a gold rule; team members the same shape, one size down. ── */
function PersonCard({ person, tier }: { person: RectoriaPerson; tier: 'lead' | 'team' }) {
  const { locale } = useLanguage();
  const lead = tier === 'lead';

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden border border-navy/10 shadow-navy-sm transition-shadow duration-300 hover:shadow-navy-md grid ${
        lead ? 'grid-cols-[132px_1fr] sm:grid-cols-[200px_1fr]' : 'grid-cols-[112px_1fr] sm:grid-cols-[150px_1fr]'
      }`}
    >
      <Portrait
        name={person.name}
        image={person.image}
        alt={altFor(person, locale)}
        shape="fill"
        sizes={lead ? '(max-width: 640px) 132px, 200px' : '(max-width: 640px) 112px, 150px'}
        className={lead ? 'min-h-[176px] sm:min-h-[240px]' : 'min-h-[150px] sm:min-h-[190px]'}
      />
      <div className={`${lead ? 'p-5 md:p-6 border-l-[3px] border-gold' : 'p-4 md:p-5'} self-center`}>
        <h4 className={`font-bold text-navy leading-snug ${lead ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
          {person.name}
        </h4>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
          {localized(person.title, locale)}
        </p>
        <p className={`mt-3 text-navy/70 leading-relaxed ${lead ? 'text-sm md:text-base' : 'text-sm'}`}>
          {localized(person.bio, locale)}
        </p>
        {person.facts && person.facts.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {person.facts.map((f) => (
              <Tag key={f.en} tone="navy" style={{ fontSize: '0.5625rem' }}>
                {localized(f, locale)}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Area row: name + one-line purpose on the left, its people on the right ── */
function AreaRow({ area, index }: { area: RectoriaArea; index: number }) {
  const { locale, t } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="grid lg:grid-cols-[minmax(220px,1fr)_2.2fr] gap-6 lg:gap-10 bg-paper border border-n-200 rounded-[22px] p-6 md:p-8 shadow-navy-sm"
    >
      <div className="lg:pt-1">
        <Eyebrow>{`0${index + 1}`}</Eyebrow>
        <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold text-navy leading-tight">
          {localized(area.name, locale)}
        </h3>
        <p className="mt-3 text-navy/70 leading-relaxed">{localized(area.summary, locale)}</p>
      </div>

      <div className="space-y-5">
        {area.leads.map((lead) => (
          <PersonCard key={lead.id} person={lead} tier="lead" />
        ))}

        {area.team.length > 0 && (
          <div className="pt-5 border-t border-n-200 space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-n-500">{t.rectoria.teamLabel}</p>
            {area.team.map((member) => (
              <PersonCard key={member.id} person={member} tier="team" />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function AreaGroups({ areas }: { areas: RectoriaArea[] }) {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <Eyebrow className="justify-center mb-5">{t.rectoria.areasEyebrow}</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
            {t.rectoria.areasTitle} <span className="italic text-gold">{t.rectoria.areasTitleAccent}</span>
          </h2>
          <p className="text-lg text-navy/70 max-w-2xl mx-auto">{t.rectoria.areasSubtitle}</p>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {areas.map((area, i) => (
            <AreaRow key={area.id} area={area} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
