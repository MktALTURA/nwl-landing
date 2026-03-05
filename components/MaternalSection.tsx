'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiGlobe, FiStar, FiHeart, FiShield, FiUsers } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const featureIcons = [FiGlobe, FiStar, FiHeart, FiShield, FiUsers];
const featureColors = [
  { bg: 'bg-sunshine/10', text: 'text-sunshine-700', iconBg: 'bg-sunshine/20', border: 'border-sunshine/30' },
  { bg: 'bg-coral/10', text: 'text-coral-700', iconBg: 'bg-coral/20', border: 'border-coral/30' },
  { bg: 'bg-lime/10', text: 'text-lime-700', iconBg: 'bg-lime/20', border: 'border-lime/30' },
  { bg: 'bg-ocean/10', text: 'text-ocean-700', iconBg: 'bg-ocean/20', border: 'border-ocean/30' },
  { bg: 'bg-bubblegum/10', text: 'text-bubblegum-700', iconBg: 'bg-bubblegum/20', border: 'border-bubblegum/30' },
];

export default function MaternalSection() {
  const { t } = useLanguage();
  const m = t.maternal;

  return (
    <section
      id="maternal"
      className="section-padding bg-gradient-to-b from-sand via-sunshine/5 to-coral/5 animate-section overflow-hidden relative"
    >
      {/* Soft background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-sunshine/15 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-lime/10 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="h-2 w-2 rounded-full bg-sunshine animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="h-2 w-2 rounded-full bg-coral animate-bounce" style={{ animationDelay: '0.15s' }} />
            <div className="h-2 w-2 rounded-full bg-lime animate-bounce" style={{ animationDelay: '0.3s' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-sunshine/20 text-sunshine-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              {m.ageBadge}
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-sunshine via-coral to-tangerine bg-clip-text text-transparent">
                {m.tagline}
              </span>
            </h2>
            <p className="text-xl text-charcoal/80 max-w-2xl mx-auto font-medium">
              {m.subtitle}
            </p>
          </motion.div>
        </div>

        {/* ── Hero: image + description ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-charcoal/70 leading-relaxed mb-8">
              {m.description}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-sunshine/20">
                <span className="block text-2xl font-bold text-sunshine-700">100%</span>
                <span className="text-xs text-charcoal/60">{m.statBilingual}</span>
              </div>
              <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-coral/20">
                <span className="block text-2xl font-bold text-coral-700">5</span>
                <span className="text-xs text-charcoal/60">{m.statCampuses}</span>
              </div>
              <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-lime/20">
                <span className="block text-2xl font-bold text-lime-700">{m.schedule}</span>
                <span className="text-xs text-charcoal/60">{m.statSchedule}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#admissions" className="btn-primary">
                {m.cta}
              </a>
              <a href="#" className="btn-secondary">
                {m.ctaSecondary}
              </a>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative">
              <Image
                src="/images/levels/maternal.jpg"
                alt="NWL Maternal program — children learning and playing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6, type: 'spring' }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -left-4 bg-sunshine text-white px-5 py-2.5 rounded-xl font-bold shadow-lg transform -rotate-3 text-sm"
            >
              {m.uniqueBadge}
            </motion.div>
          </motion.div>
        </div>

        {/* ── Feature Cards ── */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-charcoal text-center mb-10"
        >
          {m.featuresTitle}
        </motion.h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {m.features.map((feature, index) => {
            const Icon = featureIcons[index];
            const colors = featureColors[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border ${colors.border}`}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4`}>
                  <Icon size={24} className={colors.text} />
                </div>
                <h4 className="font-bold text-charcoal text-lg mb-2">{feature.title}</h4>
                <p className="text-charcoal/60 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ── Testimonial Callout ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-sunshine/10 via-coral/10 to-lime/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-4 left-8 text-sunshine/20 text-8xl font-display leading-none select-none">
            &ldquo;
          </div>
          <blockquote className="relative z-10 text-xl md:text-2xl text-charcoal/80 font-medium italic max-w-3xl mx-auto mb-4">
            &ldquo;{m.testimonial}&rdquo;
          </blockquote>
          <p className="relative z-10 text-charcoal/50 font-medium">&mdash; {m.testimonialAuthor}</p>
        </motion.div>
      </div>
    </section>
  );
}
