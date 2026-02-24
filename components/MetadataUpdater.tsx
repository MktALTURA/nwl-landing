'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function MetadataUpdater() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.metadata.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.metadata.description);
  }, [t]);

  return null;
}
