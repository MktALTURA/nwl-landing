'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/**
 * Parent testimonial video — click-to-play YouTube facade so the homepage
 * never pays the iframe cost unless a visitor presses play (embed loads
 * from youtube-nocookie.com only after the click).
 *
 * To swap the video: change VIDEO_ID. POSTER is a local image so the
 * facade doesn't depend on YouTube thumbnails; replace it with a real
 * frame of the final video when available.
 */
const VIDEO_ID = 'qHYcjGP_imQ';
const POSTER = '/images/modelo/nwl-graduacion-mascota-canguro-alumnas.jpg';

export default function Testimonials() {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    window.gtag?.('event', 'video_testimonial_play', { video_id: VIDEO_ID });
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-paper animate-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="wine-divider mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
            {t.testimonials.sectionTitle} <span className="italic text-gold">{t.testimonials.sectionTitleAccent}</span>
          </h2>
          <p className="text-lg text-navy/70 max-w-2xl mx-auto">
            {t.testimonials.sectionSubtitle}
          </p>
        </div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-navy/10 shadow-navy-lg bg-navy">
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                title={t.testimonials.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                onClick={play}
                aria-label={t.testimonials.videoCta}
                className="group absolute inset-0 w-full h-full text-left"
              >
                {/* .nwl-grade would override `absolute` (unlayered position:relative),
                    so the golden-hour grade filter is applied to the img directly */}
                <Image
                  src={POSTER}
                  alt={t.testimonials.videoTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ filter: 'var(--grade-filter)' }}
                />
                {/* Legibility + brand wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-navy/30" />

                {/* Play control */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold text-[#1C0F00] shadow-gold transition-transform duration-300 group-hover:scale-110">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.5v13l11-6.5-11-6.5z" />
                    </svg>
                  </span>
                </span>

                {/* Caption */}
                <span className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="block font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-gold mb-1.5">
                    {t.testimonials.videoCta}
                  </span>
                  <span className="block font-display text-xl md:text-2xl font-medium text-paper">
                    {t.testimonials.videoTitle}
                  </span>
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
