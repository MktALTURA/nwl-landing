'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function AdminLoginPage() {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin/jobs');
      } else if (res.status === 429) {
        setError(t.admin.loginRateLimit);
      } else {
        setError(t.admin.loginError);
      }
    } catch {
      setError('Connection error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="/images/brand/nwl-logo-wine.png"
            alt="Newland School"
            className="h-16 w-auto mx-auto mb-6"
          />
          <h1 className="text-2xl font-display font-bold text-charcoal">
            {t.admin.loginTitle}
          </h1>
          <p className="text-charcoal/60 mt-2">{t.admin.loginSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-charcoal/70 mb-1">
              {t.admin.loginPasswordLabel}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.admin.loginPasswordPlaceholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors"
              required
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-wine text-white rounded-xl font-medium hover:bg-wine/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '...' : t.admin.loginButton}
          </button>
        </form>
      </div>
    </div>
  );
}
