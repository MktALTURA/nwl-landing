'use client';

import { motion } from 'framer-motion';
import { FiInbox, FiEye, FiDownload } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { PortalDocument } from '@/lib/padres-data';
import type { Locale } from '@/lib/i18n/types';
import DocumentCard from './DocumentCard';

interface PortalSectionProps {
  documents: PortalDocument[];
  locale: Locale;
}

function groupDocuments(documents: PortalDocument[], locale: Locale) {
  const hasGroups = documents.some((d) => d.group);
  if (!hasGroups) return null;

  const groups: { label: string; docs: PortalDocument[] }[] = [];
  const seen = new Set<string>();

  for (const doc of documents) {
    const label = doc.group?.[locale] || '';
    if (!seen.has(label)) {
      seen.add(label);
      groups.push({ label, docs: [] });
    }
    groups.find((g) => g.label === label)!.docs.push(doc);
  }

  return groups;
}

export default function PortalSection({ documents, locale }: PortalSectionProps) {
  const { t } = useLanguage();

  if (documents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center py-16"
      >
        <FiInbox className="w-12 h-12 text-charcoal/20 mx-auto mb-4" />
        <h3 className="text-lg font-display font-semibold text-charcoal/40">
          {t.padres.noDocuments}
        </h3>
        <p className="text-charcoal/30 mt-1 text-sm">
          {t.padres.noDocumentsDescription}
        </p>
      </motion.div>
    );
  }

  const groups = groupDocuments(documents, locale);

  // Grouped layout (utiles)
  if (groups) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        {groups.map((group, gi) => (
          <div key={group.label}>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-display font-bold text-charcoal">
                {group.label}
              </h3>
              <div className="flex-1 h-px bg-charcoal/10" />
              <span className="text-xs text-charcoal/40 font-medium">
                {group.docs.length}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {group.docs.map((doc, di) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: gi * 0.1 + di * 0.03 }}
                  className="bg-white rounded-lg border border-charcoal/8 px-4 py-3 hover:border-wine/20 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-wine/6 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-charcoal truncate flex-1">
                      {doc.title[locale]}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2.5 pl-11">
                    <a
                      href={doc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-wine border border-wine/20 rounded-md hover:bg-wine/5 transition-colors"
                    >
                      <FiEye className="w-3 h-3" />
                      {t.padres.viewDocument}
                    </a>
                    <a
                      href={doc.pdfUrl}
                      download
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-wine rounded-md hover:bg-wine/90 transition-colors"
                    >
                      <FiDownload className="w-3 h-3" />
                      {t.padres.downloadDocument}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  // Default flat grid (calendario, comunicados, cafeteria)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {documents.map((doc, index) => (
        <DocumentCard key={doc.id} document={doc} locale={locale} index={index} />
      ))}
    </motion.div>
  );
}
