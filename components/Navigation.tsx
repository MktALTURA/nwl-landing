'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';

// Decoration type for dropdown hover effects
interface DropdownDecoration {
  hoverBg: string;
  hoverTextColor: string;
  accentBorder: string;
  bgSize?: { initial: string; hover: string };
  logo?: string;
}

// Per-level hover decorations for the Academic Offer dropdown (indexed 0–4)
const academicLevelDecorations: DropdownDecoration[] = [
  // 0: Maternal — playful pastel bubbles
  {
    hoverBg:
      'radial-gradient(circle at 15% 50%, rgba(255,153,200,0.25) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(168,230,207,0.25) 0%, transparent 45%), radial-gradient(circle at 50% 80%, rgba(255,217,61,0.2) 0%, transparent 40%), linear-gradient(135deg, rgba(255,153,200,0.08) 0%, rgba(168,230,207,0.08) 100%)',
    hoverTextColor: 'rgb(139,35,50)',
    accentBorder: 'rgba(255,153,200,0.6)',
    bgSize: { initial: '100% 100%', hover: '120% 120%' },
  },
  // 1: Kinder — blueberry/ocean (matches kinder page)
  {
    hoverBg:
      'radial-gradient(circle at 20% 40%, rgba(108,92,231,0.18) 0%, transparent 45%), radial-gradient(circle at 75% 60%, rgba(78,205,196,0.22) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(108,92,231,0.1) 0%, transparent 40%), linear-gradient(135deg, rgba(108,92,231,0.06) 0%, rgba(78,205,196,0.06) 100%)',
    hoverTextColor: 'rgb(108,92,231)',
    accentBorder: 'rgba(108,92,231,0.6)',
    bgSize: { initial: '100% 100%', hover: '115% 115%' },
  },
  // 2: Elementary — calm ocean/eucalyptus
  {
    hoverBg:
      'radial-gradient(circle at 25% 50%, rgba(78,205,196,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 40%, rgba(168,197,165,0.2) 0%, transparent 45%), linear-gradient(135deg, rgba(78,205,196,0.05) 0%, rgba(168,197,165,0.05) 100%)',
    hoverTextColor: 'rgb(139,35,50)',
    accentBorder: 'rgba(78,205,196,0.6)',
  },
  // 3: Middle School — secundaria pale blue (#91BAEF)
  {
    hoverBg:
      'radial-gradient(circle at 30% 50%, rgba(145,186,239,0.22) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(145,186,239,0.15) 0%, transparent 45%), linear-gradient(135deg, rgba(145,186,239,0.06) 0%, rgba(145,186,239,0.04) 100%)',
    hoverTextColor: 'rgb(91,136,199)',
    accentBorder: 'rgba(145,186,239,0.7)',
  },
  // 4: High School — deep ember / charcoal premium
  {
    hoverBg:
      'linear-gradient(135deg, rgba(120,23,18,0.10) 0%, rgba(61,61,61,0.04) 50%, rgba(120,23,18,0.06) 100%)',
    hoverTextColor: 'rgb(120,23,18)',
    accentBorder: 'rgba(120,23,18,0.6)',
    logo: '/images/levels/prepa/nwl-prepa-logo-small.png',
  },
];

// Per-campus hover decorations (indexed 0–4: Juriquilla, Milenio, SMA, Corregidora, Zibatá)
const campusDecorations: DropdownDecoration[] = [
  // 0: Juriquilla — flagship, premium wine + gold
  {
    hoverBg:
      'radial-gradient(circle at 20% 50%, rgba(139,35,50,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 40%, rgba(230,169,68,0.15) 0%, transparent 45%), linear-gradient(135deg, rgba(139,35,50,0.05) 0%, rgba(230,169,68,0.04) 100%)',
    hoverTextColor: 'rgb(139,35,50)',
    accentBorder: 'rgba(139,35,50,0.6)',
  },
  // 1: Milenio — safe, nurturing eucalyptus + skyblue
  {
    hoverBg:
      'radial-gradient(circle at 25% 45%, rgba(168,197,165,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 55%, rgba(184,212,232,0.2) 0%, transparent 45%), linear-gradient(135deg, rgba(168,197,165,0.06) 0%, rgba(184,212,232,0.06) 100%)',
    hoverTextColor: 'rgb(139,35,50)',
    accentBorder: 'rgba(168,197,165,0.6)',
  },
  // 2: San Miguel de Allende — cultural, artisan terracotta + mustard
  {
    hoverBg:
      'radial-gradient(circle at 20% 50%, rgba(212,135,111,0.22) 0%, transparent 50%), radial-gradient(circle at 80% 40%, rgba(230,169,68,0.18) 0%, transparent 45%), linear-gradient(135deg, rgba(212,135,111,0.06) 0%, rgba(230,169,68,0.05) 100%)',
    hoverTextColor: 'rgb(139,35,50)',
    accentBorder: 'rgba(212,135,111,0.6)',
  },
  // 3: Corregidora — warm, community coral + sunshine
  {
    hoverBg:
      'radial-gradient(circle at 25% 50%, rgba(255,107,107,0.18) 0%, transparent 50%), radial-gradient(circle at 75% 45%, rgba(255,217,61,0.16) 0%, transparent 45%), linear-gradient(135deg, rgba(255,107,107,0.05) 0%, rgba(255,217,61,0.04) 100%)',
    hoverTextColor: 'rgb(139,35,50)',
    accentBorder: 'rgba(255,107,107,0.55)',
  },
  // 4: Zibatá — modern, fresh ocean + lime
  {
    hoverBg:
      'radial-gradient(circle at 30% 50%, rgba(78,205,196,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 45%, rgba(168,230,207,0.18) 0%, transparent 45%), linear-gradient(135deg, rgba(78,205,196,0.05) 0%, rgba(168,230,207,0.05) 100%)',
    hoverTextColor: 'rgb(139,35,50)',
    accentBorder: 'rgba(78,205,196,0.6)',
  },
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
  const isCampusJuriquilla = pathname === '/campus/juriquilla';
  const isHighSchool = pathname === '/high-school';
  // On Juriquilla campus page, use white logos/text before scroll (dark hero)
  const useWhiteNav = isCampusJuriquilla && !isScrolled;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-ivory/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo — animate entrance only on homepage */}
          {isSubpage ? (
            <a href="/" className="flex items-center gap-2">
              {isCampusJuriquilla ? (
                <>
                  <img
                    src="/images/brand/kangaroo-white-transparent.png"
                    alt="NWL mascot"
                    className={`h-12 w-auto rotate-[15deg] absolute transition-opacity duration-300 ${useWhiteNav ? 'opacity-100' : 'opacity-0'}`}
                  />
                  <img
                    src="/images/brand/kangaroo-wine.png"
                    alt="NWL mascot"
                    className={`h-12 w-auto rotate-[15deg] transition-opacity duration-300 ${useWhiteNav ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <img
                    src="/images/brand/nwl-logo-wine.png"
                    alt="Colegio NWL"
                    className={`h-10 w-auto transition-opacity duration-300 ${useWhiteNav ? 'opacity-0' : 'opacity-100'}`}
                  />
                </>
              ) : isHighSchool ? (
                <>
                  {/* Shield only — visible before scroll */}
                  <img
                    src="/images/levels/prepa/nwl-prepa-logo-small.png"
                    alt="Prepa NWL"
                    className={`h-14 w-auto absolute transition-all duration-500 ease-out ${isScrolled ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}`}
                  />
                  {/* Full logo with text — fades in on scroll */}
                  <img
                    src="/images/levels/prepa/nwl-prepa-logo.png"
                    alt="Prepa NWL"
                    className={`h-12 w-auto transition-all duration-500 ease-out ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}
                  />
                </>
              ) : (
                <>
                  <img
                    src="/images/brand/kangaroo-wine.png"
                    alt="NWL mascot"
                    className="h-12 w-auto rotate-[15deg]"
                  />
                  <img
                    src="/images/brand/nwl-logo-wine.png"
                    alt="Colegio NWL"
                    className="h-10 w-auto"
                  />
                </>
              )}
            </a>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <img
                id="nav-kangaroo-target"
                src="/images/brand/kangaroo-wine.png"
                alt="NWL mascot"
                className="h-12 w-auto rotate-[15deg]"
                style={{ opacity: 0 }}
              />
              <img
                src="/images/brand/nwl-logo-wine.png"
                alt="Colegio NWL"
                className="h-10 w-auto"
              />
            </motion.div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
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
                          ? 'text-wine underline decoration-2 underline-offset-4'
                          : 'text-charcoal hover:text-wine'
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
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-xl border border-wine/10 overflow-hidden"
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
                                    className="group/item block px-4 py-2.5 text-sm text-charcoal relative overflow-hidden"
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
                                    <span className="relative z-10">{child.name}</span>
                                    {decoration.logo && (
                                      <img
                                        src={decoration.logo}
                                        alt=""
                                        className="absolute right-3 top-1/2 h-7 w-auto opacity-0 translate-y-[-50%] translate-x-2 scale-75 group-hover/item:opacity-80 group-hover/item:translate-x-0 group-hover/item:scale-100 transition-all duration-500 ease-out pointer-events-none"
                                      />
                                    )}
                                  </motion.a>
                                );
                              }

                              return (
                                <a
                                  key={child.href}
                                  href={resolveHref(child.href)}
                                  onClick={(e) => handleHashClick(e, child.href)}
                                  className="block px-4 py-2.5 text-sm text-charcoal hover:bg-sand hover:text-wine transition-colors duration-150"
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
                        ? 'text-wine underline decoration-2 underline-offset-4'
                        : 'text-charcoal hover:text-wine'
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
                  : 'bg-wine/10 border border-wine/30 text-wine hover:bg-green-500 hover:border-green-500 hover:text-white'
              }`}
              aria-label={t.nav.whatsappAriaLabel}
            >
              <FaWhatsapp size={20} />
            </a>
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageToggle />
            <button
              className={useWhiteNav ? 'text-white' : 'text-charcoal'}
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
            className="lg:hidden bg-ivory border-t border-wine/10"
          >
            <div className="py-4 space-y-1">
              {t.nav.links.map((link) =>
                link.children ? (
                  <div key={link.href}>
                    <button
                      className="flex items-center justify-between w-full px-4 py-2 text-charcoal hover:bg-sand text-left"
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
                          className="overflow-hidden bg-sand/50"
                        >
                          {/* Parent section link */}
                          <a
                            href={resolveHref(link.href)}
                            className="block px-8 py-2 text-sm text-wine font-medium hover:bg-sand"
                            onClick={(e) => { setIsMobileMenuOpen(false); handleHashClick(e, link.href); }}
                          >
                            {link.name}
                          </a>
                          {link.children.map((child) => (
                            <a
                              key={child.href}
                              href={resolveHref(child.href)}
                              className="block px-8 py-2 text-sm text-charcoal/80 hover:bg-sand hover:text-wine"
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
                    className="block px-4 py-2 text-charcoal hover:bg-sand"
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
                className="flex items-center justify-center gap-2 mx-4 py-3 text-wine font-medium text-sm hover:text-wine/70 transition-colors"
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
