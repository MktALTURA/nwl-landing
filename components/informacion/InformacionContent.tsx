'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { InformacionPage } from '@/lib/informacion-data';

interface InformacionContentProps {
  page: InformacionPage;
}

export default function InformacionContent({ page }: InformacionContentProps) {
  const { sections, images } = page;

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom max-w-4xl">
        {sections.map((section, index) => (
          <div key={index}>
            {/* Section content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-6">
                {section.heading}
              </h2>
              <div className="prose prose-lg max-w-none text-navy/70 leading-relaxed">
                {section.body.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Inline image after section 0 and section 1 */}
            {index < 2 && images.content[index] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12"
              >
                <Image
                  src={images.content[index]}
                  alt={`${page.h1}: ${section.heading}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                  quality={80}
                />
              </motion.div>
            )}
          </div>
        ))}

        {page.sources && page.sources.length > 0 && (
          <div className="border-t border-navy/10 pt-8">
            <h2 className="font-display text-xl font-bold text-navy mb-4">
              {page.lang === 'es' ? 'Fuentes' : 'Sources'}
            </h2>
            <ul className="space-y-2 text-sm text-navy/60">
              {page.sources.map((src) => (
                <li key={src.url}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-navy"
                  >
                    {src.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
