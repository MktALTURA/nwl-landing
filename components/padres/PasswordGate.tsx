'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { campusPasswords } from '@/lib/padres-data';
import Logo from '@/components/ui/Logo';

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

  /**
   * Deliberately NOT wired to a <form> submit — see the container below.
   * Nothing is posted anywhere: this compares a string in the browser and
   * flips local state.
   */
  const handleSubmit = () => {
    if (!password) return;
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
          className="min-h-[60vh] flex items-center justify-center px-4 py-20 bg-paper"
        >
          <div className="w-full max-w-sm">
            <div className="bg-white rounded-3xl border border-n-200 shadow-navy-md p-8">
              <div className="text-center mb-8">
                <Logo variant="navy" height={52} className="mx-auto mb-6" />
                <h2 className="text-2xl font-display font-bold text-navy">
                  {t.padres.passwordTitle}
                </h2>
                <p className="text-navy/50 mt-1 text-sm">
                  Campus {campusName}
                </p>
                <p className="text-navy/60 mt-3 text-sm">
                  {t.padres.passwordSubtitle}
                </p>
              </div>

              {/*
                NOT a <form>, on purpose. GoHighLevel's external-tracking.js
                (loaded sitewide from the root layout) hooks EVERY <form> on the
                page — querySelectorAll('form') plus a MutationObserver for ones
                added later — and posts each submit to GHL as an "external form"
                submission. That turned every parent portal login into a blank
                contact: source `external_form`, form "Unidentified Form", no
                name, no email, no phone. Roughly a third of recent contacts.

                Gating the script by pathname does not fix it: once loaded on any
                earlier page, its observer catches this form on client-side
                navigation anyway. Removing the form element is what actually
                works.

                Nothing is lost — this gate never submitted to a server. Enter is
                handled on the input, the button calls the handler directly.
                Do not "restore" the <form> without re-checking GHL contacts.
              */}
              <div className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSubmit();
                    }}
                    placeholder={t.padres.passwordPlaceholder}
                    aria-label={t.padres.passwordPlaceholder}
                    autoComplete="current-password"
                    className="w-full px-4 py-3 border border-n-200 bg-white text-navy rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors text-center text-lg tracking-wider"
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
                  type="button"
                  onClick={handleSubmit}
                  className="btn-primary w-full justify-center"
                >
                  {t.padres.passwordButton}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { STORAGE_PREFIX };
