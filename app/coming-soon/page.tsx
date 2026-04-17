import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newland School — Coming Soon',
  description: 'Our new website is launching soon. Stay tuned!',
};

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ivory to-white relative overflow-hidden">
      {/* Subtle background kangaroo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] opacity-[0.03] pointer-events-none">
        <Image
          src="/images/brand/kangaroo-wine.png"
          alt=""
          width={600}
          height={600}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      <div className="text-center relative z-10 px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/brand/kangaroo-wine.png"
            alt="Newland School"
            width={80}
            height={80}
            className="h-20 w-auto"
            priority
          />
        </div>

        {/* Wine divider */}
        <div className="w-12 h-[2px] bg-wine mx-auto mb-8" />

        {/* Heading */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-4">
          Coming <span className="text-wine">Soon</span>
        </h1>
        <p className="text-charcoal/60 text-lg sm:text-xl max-w-md mx-auto mb-2">
          Our new website is launching soon.
        </p>
        <p className="text-charcoal/60 text-lg sm:text-xl max-w-md mx-auto mb-10">
          Nuestro nuevo sitio web se lanza pronto.
        </p>

        {/* WhatsApp contact */}
        <a
          href="https://wa.me/5214421227791"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-wine text-white font-semibold px-6 py-3 rounded-lg hover:bg-wine/90 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
