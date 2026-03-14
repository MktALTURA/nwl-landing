'use client';

import { LanguageProvider } from '@/lib/i18n/LanguageContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 font-sans text-charcoal">
        {children}
      </div>
    </LanguageProvider>
  );
}
