'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { campusPasswords } from '@/lib/padres-data';

interface PasswordGateProps {
  campus: string;
  campusName: string;
  renderContent: (onLogout: () => void) => React.ReactNode;
}

const STORAGE_PREFIX = 'nwl-padres-';

export default function PasswordGate({ campus, campusName, renderContent }: PasswordGateProps) {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(`${STORAGE_PREFIX}${campus}`);
    if (stored === campusPasswords[campus]) {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, [campus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === campusPasswords[campus]) {
      sessionStorage.setItem(`${STORAGE_PREFIX}${campus}`, password);
      setIsAuthenticated(true);
    } else {
      setError(t.padres.passwordError);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(`${STORAGE_PREFIX}${campus}`);
    setIsAuthenticated(false);
    setPassword('');
  };

  if (isChecking) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isAuthenticated ? (
        <motion.div
          key="portal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent(handleLogout)}
        </motion.div>
      ) : (
        <motion.div
          key="gate"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="min-h-[60vh] flex items-center justify-center px-4 py-20"
        >
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <img
                src="/images/brand/nwl-logo-wine.png"
                alt="Newland School"
                className="h-14 w-auto mx-auto mb-6"
              />
              <h2 className="text-2xl font-display font-bold text-charcoal">
                {t.padres.passwordTitle}
              </h2>
              <p className="text-charcoal/50 mt-1 text-sm">
                Campus {campusName}
              </p>
              <p className="text-charcoal/60 mt-3 text-sm">
                {t.padres.passwordSubtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder={t.padres.passwordPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors text-center text-lg tracking-wider"
                  required
                  autoFocus
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg text-center"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="w-full py-3 bg-wine text-white rounded-xl font-medium hover:bg-wine/90 transition-colors"
              >
                {t.padres.passwordButton}
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { STORAGE_PREFIX };
