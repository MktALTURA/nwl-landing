'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiChevronDown, FiChevronUp, FiBriefcase } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { JobListing } from '@/types/jobs';
import ApplicationModal from './ApplicationModal';
import Eyebrow from '@/components/ui/Eyebrow';

const CAMPUS_FILTERS = ['all', 'juriquilla', 'milenio', 'san-miguel', 'corregidora', 'zibata'] as const;

const CAMPUS_LABELS: Record<string, Record<string, string>> = {
  en: {
    all: 'All Campuses',
    juriquilla: 'Juriquilla',
    milenio: 'Milenio',
    'san-miguel': 'San Miguel de Allende',
    corregidora: 'Corregidora',
    zibata: 'Zibatá',
  },
  es: {
    all: 'Todos los Campus',
    juriquilla: 'Juriquilla',
    milenio: 'Milenio',
    'san-miguel': 'San Miguel de Allende',
    corregidora: 'Corregidora',
    zibata: 'Zibatá',
  },
};

export default function JobListings() {
  const { locale, t } = useLanguage();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [applyJob, setApplyJob] = useState<JobListing | null>(null);

  useEffect(() => {
    fetch('/api/jobs')
      .then((r) => r.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all'
    ? jobs
    : jobs.filter((j) => j.campus === filter || j.campus === 'all');

  return (
    <section id="positions" className="section-padding bg-paper relative">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-wattle/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="mb-5">
            <Eyebrow>{locale === 'es' ? 'Vacantes' : 'Open positions'}</Eyebrow>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
            {t.careers.jobsTitle} <span className="italic text-gold">{t.careers.jobsTitleAccent}</span>
          </h2>
          <p className="text-lg text-navy/70 max-w-2xl mx-auto leading-relaxed">
            {t.careers.jobsSubtitle}
          </p>
        </motion.div>

        {/* Campus Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CAMPUS_FILTERS.map((campus) => (
            <button
              key={campus}
              onClick={() => setFilter(campus)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === campus
                  ? 'bg-gold text-[#1C0F00] shadow-gold'
                  : 'bg-white text-navy/60 hover:text-navy hover:border-gold border border-navy/20'
              }`}
            >
              {CAMPUS_LABELS[locale]?.[campus] || campus}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FiBriefcase size={48} className="mx-auto text-navy/20 mb-4" />
            <p className="text-navy/50 text-lg max-w-md mx-auto">
              {t.careers.jobsNoPositions}
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filtered.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-n-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-navy mb-2">
                          {job.title[locale]}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="inline-flex items-center gap-1.5 text-gold-600">
                            <FiMapPin size={14} />
                            {CAMPUS_LABELS[locale]?.[job.campus] || job.campus}
                          </span>
                          {job.department?.[locale] && (
                            <span className="text-navy/50">
                              {job.department[locale]}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-3 mt-1">
                        {expandedId === job.id ? (
                          <FiChevronUp size={20} className="text-navy/40" />
                        ) : (
                          <FiChevronDown size={20} className="text-navy/40" />
                        )}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedId === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-n-200 pt-4 bg-paper/60">
                          <p className="text-navy/70 text-sm leading-relaxed mb-4 whitespace-pre-line">
                            {job.description[locale]}
                          </p>
                          {job.requirements[locale] && (
                            <>
                              <h4 className="text-sm font-bold text-navy mb-2">
                                {t.careers.jobsRequirements}
                              </h4>
                              <p className="text-navy/60 text-sm leading-relaxed whitespace-pre-line mb-4">
                                {job.requirements[locale]}
                              </p>
                            </>
                          )}
                          <button
                            onClick={() => setApplyJob(job)}
                            className="inline-flex items-center px-6 py-2.5 bg-gold text-[#1C0F00] rounded-full text-sm font-semibold hover:bg-gold-400 transition-colors"
                          >
                            {t.careers.jobsApplyBtn}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={!!applyJob}
        onClose={() => setApplyJob(null)}
        jobTitle={applyJob ? applyJob.title[locale] : ''}
      />
    </section>
  );
}
