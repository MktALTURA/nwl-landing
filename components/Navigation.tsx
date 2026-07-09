'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';
import Logo from './ui/Logo';
import Crest from './ui/Crest';

// Decoration type for dropdown hover effects
interface DropdownDecoration {
  hoverBg: string;
  hoverTextColor: string;
  accentBorder: string;
  bgSize?: { initial: string; hover: string };
  crest?: 'kinder' | 'elementary' | 'middle' | 'high';
}

// Per-level hover decorations for the Academic Offer dropdown (indexed 0–4),
// mapped to the NWL Australian School escudo level colors.
//   Maternal + Kinder → Galah (232,155,181) · Elementary → Bondi (58,167,155)
//   Middle → Coral Sea (0,71,86) · High → Jacaranda (74,58,130)
const academicLevelDecorations: DropdownDecoration[] = [
  // 0: Maternal — Galah
  {
    hoverBg:
      'radial-gradient(circle at 18% 50%, rgba(232,155,181,0.24) 0%, transparent 52%), linear-gradient(135deg, rgba(232,155,181,0.09) 0%, rgba(11,34,78,0.03) 100%)',
    hoverTextColor: 'rgb(11,34,78)',
    accentBorder: 'rgba(232,155,181,0.9)',
    bgSize: { initial: '100% 100%', hover: '120% 120%' },
  },
  // 1: Kinder — Galah
  {
    hoverBg:
      'radial-gradient(circle at 22% 45%, rgba(232,155,181,0.22) 0%, transparent 50%), linear-gradient(135deg, rgba(232,155,181,0.08) 0%, rgba(11,34,78,0.03) 100%)',
    hoverTextColor: 'rgb(11,34,78)',
    accentBorder: 'rgba(232,155,181,0.9)',
    bgSize: { initial: '100% 100%', hover: '115% 115%' },
  },
  // 2: Elementary — Bondi
  {
    hoverBg:
      'radial-gradient(circle at 25% 50%, rgba(58,167,155,0.20) 0%, transparent 52%), linear-gradient(135deg, rgba(58,167,155,0.07) 0%, rgba(11,34,78,0.03) 100%)',
    hoverTextColor: 'rgb(11,34,78)',
    accentBorder: 'rgba(58,167,155,0.85)',
  },
  // 3: Middle School — Coral Sea
  {
    hoverBg:
      'radial-gradient(circle at 28% 50%, rgba(0,71,86,0.18) 0%, transparent 52%), linear-gradient(135deg, rgba(0,71,86,0.06) 0%, rgba(11,34,78,0.03) 100%)',
    hoverTextColor: 'rgb(0,71,86)',
    accentBorder: 'rgba(0,71,86,0.8)',
  },
  // 4: High School — Jacaranda
  {
    hoverBg:
      'radial-gradient(circle at 28% 50%, rgba(74,58,130,0.18) 0%, transparent 52%), linear-gradient(135deg, rgba(74,58,130,0.07) 0%, rgba(11,34,78,0.03) 100%)',
    hoverTextColor: 'rgb(74,58,130)',
    accentBorder: 'rgba(74,58,130,0.8)',
    crest: 'high',
  },
];

// Per-campus hover decorations — unified navy + Outback Gold register.
const goldNavyDecoration: DropdownDecoration = {
  hoverBg:
    'radial-gradient(circle at 20% 50%, rgba(203,134,6,0.16) 0%, transparent 50%), radial-gradient(circle at 82% 45%, rgba(11,34,78,0.08) 0%, transparent 48%), linear-gradient(135deg, rgba(203,134,6,0.06) 0%, rgba(11,34,78,0.03) 100%)',
  hoverTextColor: 'rgb(11,34,78)',
  accentBorder: 'rgba(203,134,6,0.7)',
};
const campusDecorations: DropdownDecoration[] = [
  goldNavyDecoration,
  goldNavyDecoration,
  goldNavyDecoration,
  goldNavyDecoration,
  goldNavyDecoration,
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useLanguage();
  const pathname = usePathname();

  // On subpages, prefix hash-only links with "/" so they navigate to homepage sections
  const resolveHref = (href: string) => {
    if (href.startsWith('#') && pathname !== '/') {
      return `/${href}`;
    }
    return href;
  };

  // Force full navigation for hash links when on subpages (Next.js client nav doesn't scroll to hash)
  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && pathname !== '/') {
      e.preventDefault();
      window.location.href = `/${href}`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const isSubpage = pathname !== '/';
  // After the Australian School rebrand every page opens on a dark hero
  // (outback-dawn or a navy-graded photo), so the nav is always white
  // before scroll and switches to navy once the paper bar appears.
  const useWhiteNav = !isScrolled;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-paper/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo — animate entrance only on homepage */}
          {isSubpage ? (
            <a href="/" className="flex items-center" aria-label="NWL Australian School — Inicio">
              <Logo variant={useWhiteNav ? 'white' : 'navy'} height={46} />
            </a>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative flex items-center"
            >
              {/* GSAP kangaroo-flight target — positioned exactly over the gold
                  kangaroo inside the 46px lockup art, so the mascot lands on it */}
              <span
                id="nav-kangaroo-target"
                aria-hidden="true"
                style={{ position: 'absolute', left: 7, top: 12, width: 43, height: 24 }}
              />
              <a href="/" className="flex items-center" aria-label="NWL Australian School — Inicio">
                <Logo variant={useWhiteNav ? 'white' : 'navy'} height={46} />
              </a>
            </motion.div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8">
            {t.nav.links.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={resolveHref(link.href)}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                      useWhiteNav
                        ? 'text-white/90 hover:text-white'
                        : link.highlight
                          ? 'text-gold underline decoration-2 underline-offset-4'
                          : 'text-navy hover:text-gold'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHashClick(e, link.href);
                    }}
                  >
                    {link.name}
                    <FiChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        openDropdown === link.name ? 'rotate-180' : ''
                      }`}
                    />
                  </a>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {openDropdown === link.name && (() => {
                      const decorations =
                        link.href === '#levels'
                          ? academicLevelDecorations
                          : link.href === '#campus'
                            ? campusDecorations
                            : null;
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-navy-lg border border-n-200 overflow-hidden"
                        >
                          <div className="py-2">
                            {link.children.map((child, childIndex) => {
                              const decoration = decorations?.[childIndex];

                              if (decoration) {
                                return (
                                  <motion.a
                                    key={child.href}
                                    href={resolveHref(child.href)}
                                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleHashClick(e, child.href)}
                                    className="group/item block px-4 py-2.5 text-sm text-navy relative overflow-hidden"
                                    style={{ borderLeft: '3px solid transparent' }}
                                    initial={{
                                      background: 'transparent',
                                      borderLeftColor: 'transparent',
                                      ...(decoration.bgSize && { backgroundSize: decoration.bgSize.initial }),
                                    }}
                                    whileHover={{
                                      borderLeftColor: decoration.accentBorder,
                                      color: decoration.hoverTextColor,
                                      background: decoration.hoverBg,
                                      ...(decoration.bgSize && { backgroundSize: decoration.bgSize.hover }),
                                      transition: { duration: 0.3, ease: 'easeOut' },
                                    }}
                                  >
                                    <span className="relative z-10 block">
                                      <span className="block">{child.name}</span>
                                      {child.sub && (
                                        <span className="block font-mono text-[8.5px] uppercase tracking-[0.16em] text-n-500/80 mt-0.5">
                                          {child.sub}
                                        </span>
                                      )}
                                    </span>
                                    {decoration.crest && (
                                      <span className="absolute right-3 top-1/2 opacity-0 translate-y-[-50%] translate-x-2 scale-75 group-hover/item:opacity-90 group-hover/item:translate-x-0 group-hover/item:scale-100 transition-all duration-500 ease-out pointer-events-none">
                                        <Crest level={decoration.crest} size={20} showBanner={false} />
                                      </span>
                                    )}
                                  </motion.a>
                                );
                              }

                              return (
                                <a
                                  key={child.href}
                                  href={resolveHref(child.href)}
                                  onClick={(e) => handleHashClick(e, child.href)}
                                  className="block px-4 py-2.5 text-sm text-navy hover:bg-n-100 hover:text-gold transition-colors duration-150"
                                >
                                  {child.name}
                                </a>
                              );
                            })}
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={link.href}
                  href={resolveHref(link.href)}
                  onClick={(e) => handleHashClick(e, link.href)}
                  className={`text-sm font-medium transition-colors ${
                    useWhiteNav
                      ? 'text-white/90 hover:text-white'
                      : link.highlight
                        ? 'text-gold underline decoration-2 underline-offset-4'
                        : 'text-navy hover:text-gold'
                  }`}
                >
                  {link.name}
                </a>
              )
            )}
            <a
              href={resolveHref('#admissions')}
              onClick={(e) => handleHashClick(e, '#admissions')}
              className="btn-primary text-sm"
            >
              {t.nav.scheduleVisit}
            </a>
            <a
              href="https://wa.me/5214421227791"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                useWhiteNav
                  ? 'bg-white/10 border border-white/30 text-white hover:bg-green-500 hover:border-green-500'
                  : 'bg-gold/10 border border-gold/30 text-gold hover:bg-green-500 hover:border-green-500 hover:text-white'
              }`}
              aria-label={t.nav.whatsappAriaLabel}
            >
              <FaWhatsapp size={20} />
            </a>
            <LanguageToggle light={useWhiteNav} />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 xl:hidden">
            <LanguageToggle light={useWhiteNav} />
            <button
              className={useWhiteNav ? 'text-white' : 'text-navy'}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="xl:hidden bg-paper border-t border-n-200"
          >
            <div className="py-4 space-y-1">
              {t.nav.links.map((link) =>
                link.children ? (
                  <div key={link.href}>
                    <button
                      className="flex items-center justify-between w-full px-4 py-2 text-navy hover:bg-n-100 text-left"
                      onClick={() =>
                        setOpenMobileDropdown(
                          openMobileDropdown === link.name ? null : link.name
                        )
                      }
                    >
                      <span>{link.name}</span>
                      <FiChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          openMobileDropdown === link.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openMobileDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-n-100/50"
                        >
                          {/* Parent section link */}
                          <a
                            href={resolveHref(link.href)}
                            className="block px-8 py-2 text-sm text-gold font-medium hover:bg-n-100"
                            onClick={(e) => { setIsMobileMenuOpen(false); handleHashClick(e, link.href); }}
                          >
                            {link.name}
                          </a>
                          {link.children.map((child) => (
                            <a
                              key={child.href}
                              href={resolveHref(child.href)}
                              className="block px-8 py-2 text-sm text-navy/80 hover:bg-n-100 hover:text-gold"
                              onClick={(e) => { setIsMobileMenuOpen(false); handleHashClick(e, child.href); }}
                            >
                              {child.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={link.href}
                    href={resolveHref(link.href)}
                    className="block px-4 py-2 text-navy hover:bg-n-100"
                    onClick={(e) => { setIsMobileMenuOpen(false); handleHashClick(e, link.href); }}
                  >
                    {link.name}
                  </a>
                )
              )}
              <a
                href={resolveHref('#admissions')}
                className="block mx-4 btn-primary text-center"
                onClick={(e) => { setIsMobileMenuOpen(false); handleHashClick(e, '#admissions'); }}
              >
                {t.nav.scheduleVisit}
              </a>
              <a
                href="https://wa.me/5214421227791"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mx-4 py-3 text-gold font-medium text-sm hover:text-gold-600 transition-colors"
              >
                <FaWhatsapp size={16} />
                {t.nav.whatsappUs}
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
