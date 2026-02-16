'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiMessageCircle } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Our School', href: '#about' },
  { name: 'Academic Offer', href: '#levels' },
  { name: 'School Life', href: '#campus' },
  { name: 'Admissions', href: '#admissions', highlight: true },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-ivory/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            {/* Kangaroo landing target — hidden until jump animation places it */}
            <img 
              id="nav-kangaroo-target"
              src="/images/brand/kangaroo-wine.png" 
              alt="NWL mascot" 
              className="h-12 w-auto"
              style={{ opacity: 0 }}
            />
            <img 
              src="/images/brand/nwl-logo-wine.png" 
              alt="Colegio NWL" 
              className="h-10 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.highlight
                    ? 'text-wine underline decoration-2 underline-offset-4'
                    : 'text-charcoal hover:text-wine'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#admissions"
              className="btn-primary text-sm"
            >
              Schedule a Visit
            </a>
            <a
              href="https://wa.me/5214421227791"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-wine/20 flex items-center justify-center text-wine hover:bg-wine hover:text-white transition-colors duration-300"
              aria-label="Chat on WhatsApp"
            >
              <FiMessageCircle size={18} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden bg-ivory border-t border-wine/10"
          >
            <div className="py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2 text-charcoal hover:bg-sand"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#admissions"
                className="block mx-4 btn-primary text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Schedule a Visit
              </a>
              <a
                href="https://wa.me/5214421227791"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mx-4 py-3 text-wine font-medium text-sm hover:text-wine/70 transition-colors"
              >
                <FiMessageCircle size={16} />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
