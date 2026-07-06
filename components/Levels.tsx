'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Crest from './ui/Crest';

// Escudo level mapping (NWL Australian School): Maternal + Kinder → Galah,
// Elementary → Eucalyptus, Middle → Coral Sea, High School → Jacaranda.
type CrestLevel = 'kinder' | 'elementary' | 'middle' | 'high';
const levelsData: { crest: CrestLevel; color: string; image: string }[] = [
  { crest: 'kinder', color: 'var(--nwl-galah)', image: '/images/levels/maternal.jpg' },
  { crest: 'kinder', color: 'var(--nwl-galah)', image: '/images/levels/kinder.jpg' },
  { crest: 'elementary', color: 'var(--nwl-eucalyptus)', image: '/images/levels/primaria.jpg' },
  { crest: 'middle', color: 'var(--nwl-coral-sea)', image: '/images/levels/secundaria/nwl-secundaria-lab-team-fist-bump.jpg' },
  { crest: 'high', color: 'var(--nwl-jacaranda)', image: '/images/levels/preparatoria.jpg' },
];

export default function Levels() {
  const { t } = useLanguage();
  const router = useRouter();
  const levels = levelsData.map((l, i) => ({ ...l, ...t.levels.items[i] }));

  return (
    <section id="levels" className="section-padding bg-paper animate-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-9 h-px bg-gold" />
            {t.levels.sectionSubtitle}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-[-0.02em] text-navy mb-4">
            {t.levels.sectionTitle} <span className="italic text-gold">{t.levels.sectionTitleAccent}</span>
          </h2>
        </div>

        {/* Levels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {levels.map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={(e) => {
                // Whole card navigates, but the inner Learn More link keeps its own behavior
                if ((e.target as HTMLElement).closest('a')) return;
                router.push(level.href);
              }}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-navy/10 shadow-navy-sm hover:shadow-navy-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Level color accent edge */}
              <span aria-hidden="true" className="block h-[3px] w-full" style={{ background: level.color }} />

              {/* Level Image with escudo crest + golden-hour grade */}
              <div className="aspect-[4/3] relative overflow-hidden bg-paper nwl-grade">
                <Image
                  src={level.image}
                  alt={`${level.name} — NWL Australian School (${level.ageRange})`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 z-10 drop-shadow">
                  <Crest level={level.crest} size={64} showBanner={false} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-navy mb-1">
                  {level.name}
                </h3>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.18em] mb-4"
                  style={{ color: level.color }}
                >
                  {level.ageRange}
                </p>
                <p className="text-navy/70 mb-4 leading-relaxed">
                  {level.description}
                </p>

                {/* Campuses */}
                <div className="pt-4 border-t border-navy/10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-n-500 mb-2">{t.levels.availableAt}</p>
                  <div className="flex flex-wrap gap-2">
                    {level.campuses.map((campus) => (
                      <span
                        key={campus}
                        className="font-mono text-[10px] uppercase tracking-[0.06em] px-2.5 py-1 rounded-full border"
                        style={{ color: level.color, borderColor: level.color }}
                      >
                        {campus}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={level.href}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-600 hover:gap-2 transition-all"
                >
                  {t.levels.learnMore} <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#admissions" className="btn-primary">
            {t.levels.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
