'use client';

import { usePathname } from 'next/navigation';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const campuses = [
  'Juriquilla',
  'Zibatá',
  'San Miguel de Allende',
  'Corregidora',
  'Milenio',
];

export default function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const resolveHref = (href: string) => {
    if (href.startsWith('#') && pathname !== '/') {
      return `/${href}`;
    }
    return href;
  };

  return (
    <footer id="contact" className="bg-charcoal text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/brand/kangaroo-white-transparent.png"
                alt="NWL mascot"
                className="h-14 w-auto rotate-[15deg]"
              />
              <img
                src="/images/brand/nwl-logo-white.png"
                alt="Colegio NWL"
                className="h-12 w-auto"
              />
            </div>

            <p className="text-white/70 mb-6 leading-relaxed">
              {t.footer.brandDescription}
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/ColegioNewland"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-wine transition-colors"
              >
                <FiFacebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/colegionwl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-wine transition-colors"
              >
                <FiInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Our School */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">{t.footer.schoolHeading}</h3>
            <ul className="space-y-2">
              {t.footer.schoolLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={resolveHref(link.href)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">{t.footer.programsHeading}</h3>
            <ul className="space-y-2">
              {t.footer.programLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={resolveHref(link.href)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">{t.footer.contactHeading}</h3>
            <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 mb-4">
              <p className="text-[11px] uppercase tracking-wider text-white/40 mb-2">{t.footer.contactLabel}</p>
              <a
                href="tel:+524424541010"
                className="flex items-center text-white/70 hover:text-white transition-colors mb-2"
              >
                <FiPhone className="mr-3 flex-shrink-0" size={14} />
                +52 (442) 454 10 10
              </a>
              <a
                href="https://wa.me/5214428533883"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white/70 hover:text-green-400 transition-colors"
              >
                <FaWhatsapp className="mr-3 flex-shrink-0" size={14} />
                +52 (442) 853 3883
              </a>
            </div>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contacto@colegionwl.edu.mx"
                  className="flex items-start text-white/70 hover:text-white transition-colors"
                >
                  <FiMail className="mr-3 mt-1 flex-shrink-0" />
                  contacto@colegionwl.edu.mx
                </a>
              </li>
              <li className="flex items-start text-white/70">
                <FiMapPin className="mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p>{t.footer.campusesLine1}</p>
                  <p>{t.footer.campusesLine2}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <p>{t.footer.copyright}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://www.nwl.com.mx/pdf/AVISO-PRIVACIDAD-NWL.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {t.footer.privacyPolicy}
              </a>
              <a href="/terms" className="hover:text-white">
                {t.footer.termsOfService}
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
