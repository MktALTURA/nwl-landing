'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useBrochure } from '@/lib/BrochureContext';
import { brochureLevels, brochures, type BrochureLevel } from '@/lib/brochures';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function BrochureLevelDropdown({
  children,
  className = '',
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openBrochure } = useBrochure();
  const { t } = useLanguage();

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const handleLevelClick = (level: BrochureLevel) => {
    setIsOpen(false);
    openBrochure(level);
  };

  // Get localized label from brochure.levels using the labelKey
  const getLevelName = (level: BrochureLevel) => {
    const key = brochures[level].labelKey as keyof typeof t.brochure.levels;
    return t.brochure.levels[key];
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={className}
      >
        {children}
        <FiChevronDown
          size={14}
          className={`ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-full bottom-0 ml-3 w-52 bg-white rounded-lg shadow-xl border border-wine/10 overflow-hidden z-[60] max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:ml-0 max-sm:top-full max-sm:bottom-auto max-sm:mt-2"
          >
            <div className="py-1">
              <p className="px-4 py-2 text-xs font-bold text-charcoal/50 uppercase tracking-wider">
                {t.brochure.selectLevel}
              </p>
              {brochureLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleLevelClick(level)}
                  className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-sand hover:text-wine transition-colors duration-150"
                >
                  {getLevelName(level)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
