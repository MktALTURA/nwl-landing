'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { BrochureLevel } from './brochures';

interface BrochureContextType {
  isOpen: boolean;
  activeLevel: BrochureLevel | null;
  openBrochure: (level: BrochureLevel) => void;
  closeBrochure: () => void;
}

const BrochureContext = createContext<BrochureContextType>({
  isOpen: false,
  activeLevel: null,
  openBrochure: () => {},
  closeBrochure: () => {},
});

export function BrochureProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLevel, setActiveLevel] = useState<BrochureLevel | null>(null);

  const openBrochure = useCallback((level: BrochureLevel) => {
    setActiveLevel(level);
    setIsOpen(true);
  }, []);

  const closeBrochure = useCallback(() => {
    setIsOpen(false);
    // Delay clearing the level so exit animation doesn't flash empty
    setTimeout(() => setActiveLevel(null), 300);
  }, []);

  return (
    <BrochureContext.Provider value={{ isOpen, activeLevel, openBrochure, closeBrochure }}>
      {children}
    </BrochureContext.Provider>
  );
}

export const useBrochure = () => useContext(BrochureContext);
