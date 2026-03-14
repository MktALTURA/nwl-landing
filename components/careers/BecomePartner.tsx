'use client';

import { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiBookOpen, FiUsers, FiTarget } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const icons = [FiEye, FiBookOpen, FiUsers, FiTarget];

export default function BecomePartner() {
  const { t } = useLanguage();
  const formContainerRef = useRef<HTMLDivElement>(null);

  const buildIframe = useCallback(() => {
    const container = formContainerRef.current;
    if (!container) return;

    const formId = t.careers.partnerFormId;
    if (!formId || formId.startsWith('PLACEHOLDER')) {
      container.innerHTML = `
        <div class="text-center py-12 text-white/40">
          <p class="text-lg font-medium">Form coming soon</p>
          <p class="text-sm mt-2">The partnership form will be available shortly.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = `https://api.leadconnectorhq.com/widget/form/${formId}`;
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.id = `inline-${formId}`;
    iframe.dataset.layout = "{'id':'INLINE'}";
    iframe.dataset.triggerType = 'alwaysShow';
    iframe.dataset.triggerValue = '';
    iframe.dataset.activationtype = 'alwaysActivated';
    iframe.dataset.activationValue = '';
    iframe.dataset.deactivationtype = 'neverDeactivate';
    iframe.dataset.deactivationValue = '';
    iframe.dataset.overlayColor = 'rgba(0,0,0,0)';
    iframe.title = t.careers.partnerFormName;
    iframe.scrolling = 'no';
    container.appendChild(iframe);

    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    container.appendChild(script);
  }, [t.careers.partnerFormId, t.careers.partnerFormName]);

  useEffect(() => {
    buildIframe();
  }, [buildIframe]);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Wine gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-wine/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(230,169,68,0.15),transparent_50%)]" />

      {/* Kangaroo watermark */}
      <div className="absolute top-10 right-10 opacity-[0.04]">
        <img
          src="/images/brand/kangaroo-white-transparent.png"
          alt=""
          className="w-48 h-48 object-contain rotate-[15deg]"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-[3px] bg-mustard mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              {t.careers.partnerTitle}{' '}
              <span className="text-mustard">{t.careers.partnerTitleAccent}</span>
            </h2>
            <p className="text-lg text-white/70 mb-4">
              {t.careers.partnerSubtitle}
            </p>
            <p className="text-white/60 leading-relaxed mb-10">
              {t.careers.partnerDescription}
            </p>

            {/* Partner Benefits */}
            <div className="grid sm:grid-cols-2 gap-4">
              {t.careers.partnerBenefits.map((benefit, index) => {
                const Icon = icons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <Icon size={22} className="text-mustard mb-2" />
                    <h3 className="text-sm font-bold text-white mb-1">{benefit.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Partner Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10">
              <h3 className="text-xl font-display font-bold text-white mb-4 text-center">
                {t.careers.partnerFormTitle}
              </h3>
              <div ref={formContainerRef} className="min-h-[200px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
