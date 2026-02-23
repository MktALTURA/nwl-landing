'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center bg-charcoal/5 rounded-full p-0.5 text-xs font-medium">
      <button
        onClick={() => setLocale('en')}
        className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${
          locale === 'en'
            ? 'bg-wine text-white'
            : 'text-charcoal/60 hover:text-charcoal'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLocale('es')}
        className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${
          locale === 'es'
            ? 'bg-wine text-white'
            : 'text-charcoal/60 hover:text-charcoal'
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  );
}
