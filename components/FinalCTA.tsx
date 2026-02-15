'use client';

import { motion } from 'framer-motion';
import { FiCalendar, FiDownload, FiPhone } from 'react-icons/fi';

export default function FinalCTA() {
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
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Begin Your <span className="text-mustard">Newland Journey</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Join a community where your child can grow academically, emotionally, and socially.
              Schedule a visit to experience Newland firsthand.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a
              href="https://forms.gle/newland-visit"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-wine px-8 py-4 rounded-sm font-bold text-lg hover:bg-ivory transition-colors inline-flex items-center justify-center group"
            >
              <FiCalendar className="mr-2 group-hover:scale-110 transition-transform" />
              Schedule a Visit
            </a>
            
            <a
              href="tel:+524421227791"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-sm font-bold text-lg hover:bg-white hover:text-wine transition-colors inline-flex items-center justify-center"
            >
              <FiPhone className="mr-2" />
              Call Us Now
            </a>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-sm p-6 text-left">
              <div className="text-mustard mb-3">
                <FiCalendar size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Campus Visit</h3>
              <p className="text-white/80 text-sm">
                Experience our facilities and meet our educators
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-sm p-6 text-left">
              <div className="text-mustard mb-3">
                <FiDownload size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Admissions Guide</h3>
              <p className="text-white/80 text-sm">
                Download our complete admissions process guide
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-sm p-6 text-left">
              <div className="text-mustard mb-3">
                <FiPhone size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Personal Support</h3>
              <p className="text-white/80 text-sm">
                Our team is ready to answer all your questions
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
