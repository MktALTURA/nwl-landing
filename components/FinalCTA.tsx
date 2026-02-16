'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiDownload, FiMessageCircle } from 'react-icons/fi';

export default function FinalCTA() {
  // Load GoHighLevel form embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="admissions" className="section-padding bg-gradient-to-br from-wine to-wine/90 text-white relative overflow-hidden animate-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mustard rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-eucalyptus rounded-full blur-3xl" />
      </div>

      {/* Kangaroo Watermark */}
      <div className="absolute right-[-5%] bottom-[-10%] w-[50vh] h-[50vh] opacity-[0.06] pointer-events-none">
        <img
          src="/images/brand/kangaroo-white-transparent.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Begin Your <span className="text-mustard">NWL Journey</span>
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join a community where your child can grow academically, emotionally, and socially.
          </p>
        </motion.div>

        {/* Two-column: Form + Info */}
        <div className="grid lg:grid-cols-5 gap-10 items-start max-w-6xl mx-auto">

          {/* Form — takes 3 of 5 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-lg shadow-2xl overflow-hidden"
          >
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/Y8BSzINaStvWVeBWBMyb"
              style={{ width: '100%', height: '1400px', border: 'none' }}
              id="inline-Y8BSzINaStvWVeBWBMyb"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Formulario para pag web  - EN"
              data-height="1400"
              data-layout-iframe-id="inline-Y8BSzINaStvWVeBWBMyb"
              data-form-id="Y8BSzINaStvWVeBWBMyb"
              title="Schedule a Visit - NWL"
            />
          </motion.div>

          {/* Right column — info + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Cards */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-mustard mb-3">
                <FiCalendar size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Campus Visit</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Experience our facilities and meet our educators in person. We&apos;ll tailor the visit to your child&apos;s age group.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-mustard mb-3">
                <FiDownload size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Admissions Guide</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Download our complete admissions process guide with tuition details and enrollment steps.
              </p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/5214421227791"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-300 group"
            >
              <div className="text-mustard mb-3">
                <FiMessageCircle size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-mustard transition-colors">Chat With Us</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                Prefer a quick chat? Our admissions team is ready on WhatsApp.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-mustard">
                <FiMessageCircle size={16} />
                Open WhatsApp
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
