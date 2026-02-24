'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { en } from './en';
import { es } from './es';
import type { Dictionary, Locale } from './types';

const dictionaries: Record<Locale, Dictionary> = { en, es };

interface LanguageContextType {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  t: en,
  setLocale: () => {},
  isReady: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with 'en' to match server-rendered HTML
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isReady, setIsReady] = useState(false);

  // Hydrate saved preference after mount (avoids hydration mismatch)
  useEffect(() => {
    const saved = localStorage.getItem('nwl-lang');
    if (saved === 'en' || saved === 'es') {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
    setIsReady(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('nwl-lang', newLocale);
    document.documentElement.lang = newLocale;
  };

  return (
    <LanguageContext.Provider value={{ locale, t: dictionaries[locale], setLocale, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
