'use client';

import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';

const footerLinks = {
  school: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Model', href: '#philosophy' },
    { name: 'Our Campus', href: '#campus' },
    { name: 'Team', href: '#team' },
  ],
  programs: [
    { name: 'Maternal', href: '#levels' },
    { name: 'Kinder', href: '#levels' },
    { name: 'Primaria', href: '#levels' },
    { name: 'Secundaria', href: '#levels' },
    { name: 'Preparatoria', href: '#levels' },
  ],
  quickLinks: [
    { name: 'Admissions', href: '#admissions' },
    { name: 'Schedule Visit', href: '#admissions' },
    { name: 'Tuition & Fees', href: '#tuition' },
    { name: 'Contact', href: '#contact' },
  ],
};

const campuses = [
  'Juriquilla',
  'Zibatá',
  'San Miguel de Allende',
  'Corregidora',
  'Milenio',
];

export default function Footer() {
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
                className="h-14 w-auto"
              />
              <img 
                src="/images/brand/nwl-logo-white.png" 
                alt="Colegio NWL" 
                className="h-12 w-auto"
              />
            </div>

            <p className="text-white/70 mb-6 leading-relaxed">
              At NWL, we unlock greatness in every student through academic excellence,
              emotional development, and community connection.
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
              <a
                href="https://www.linkedin.com/company/newland-school"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-wine transition-colors"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Our School */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-wine">Our School</h3>
            <ul className="space-y-2">
              {footerLinks.school.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
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
            <h3 className="font-bold text-lg mb-4 text-wine">Programs</h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
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
            <h3 className="font-bold text-lg mb-4 text-wine">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+524421227791"
                  className="flex items-start text-white/70 hover:text-white transition-colors"
                >
                  <FiPhone className="mr-3 mt-1 flex-shrink-0" />
                  +52 442 122 7791
                </a>
              </li>
              <li>
                <a
                  href="mailto:admissions@newland.edu.mx"
                  className="flex items-start text-white/70 hover:text-white transition-colors"
                >
                  <FiMail className="mr-3 mt-1 flex-shrink-0" />
                  admissions@newland.edu.mx
                </a>
              </li>
              <li className="flex items-start text-white/70">
                <FiMapPin className="mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p>5 Campuses in</p>
                  <p>Querétaro & Guanajuato</p>
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
            <p>© 2026 Colegio NWL. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/privacy" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed CTA Button */}
      <a
        href="#admissions"
        className="fixed bottom-8 right-8 bg-wine text-white px-6 py-3 rounded-full shadow-2xl hover:bg-wine/90 transition-colors font-bold z-40 hidden md:block"
      >
        📅 Schedule Visit
      </a>
    </footer>
  );
}
