'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCalendar, FiCoffee, FiMessageSquare, FiList, FiArrowLeft, FiLogOut } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getCampusPortal, type PortalSectionKey } from '@/lib/padres-data';
import { campuses } from '@/lib/campus-data';
import PortalSection from './PortalSection';

interface PortalDashboardProps {
  campus: string;
  onLogout: () => void;
}

type TabLabelKey = 'tabCalendario' | 'tabCafeteria' | 'tabComunicados' | 'tabUtiles';

const tabConfig: { key: PortalSectionKey; icon: typeof FiCalendar; labelKey: TabLabelKey }[] = [
  { key: 'calendario', icon: FiCalendar, labelKey: 'tabCalendario' },
  { key: 'cafeteria', icon: FiCoffee, labelKey: 'tabCafeteria' },
  { key: 'comunicados', icon: FiMessageSquare, labelKey: 'tabComunicados' },
  { key: 'utiles', icon: FiList, labelKey: 'tabUtiles' },
];

export default function PortalDashboard({ campus, onLogout }: PortalDashboardProps) {
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<PortalSectionKey>('calendario');
  const portalData = getCampusPortal(campus);

  if (!portalData) return null;

  const activeDocuments = portalData.sections[activeTab];
  const campusData = campuses[campus];
  const heroImage = campusData?.heroImage;

  return (
    <div className="min-h-[60vh]">
      {/* Header with campus hero image */}
      <div className="relative pt-28 pb-10 overflow-hidden">
        {/* Background image */}
        {heroImage && (
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt={`Campus ${portalData.campusName}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-charcoal/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/40" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
          </div>
        )}
        {!heroImage && (
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal to-charcoal/95" />
        )}
        <div className="container-custom relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <Link
                href="/padres"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm transition-colors mb-2"
              >
                <FiArrowLeft className="w-3.5 h-3.5" />
                {t.padres.changeCampus}
              </Link>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
                {t.padres.welcomeMessage}
              </h1>
              <p className="text-white/60 mt-1">
                Campus <span className="text-nwl-yellow font-medium">{portalData.campusName}</span>
              </p>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              {t.padres.logoutButton}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-charcoal/10 sticky top-0 z-20">
        <div className="container-custom">
          <div className="flex overflow-x-auto scrollbar-hide -mb-px" role="tablist">
            {tabConfig.map(({ key, icon: Icon, labelKey }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(key)}
                  className={`
                    relative flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors
                    ${isActive ? 'text-wine' : 'text-charcoal/50 hover:text-charcoal/80'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {t.padres[labelKey]}
                  {isActive && (
                    <motion.div
                      layoutId="portal-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-wine"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-padding bg-ivory" role="tabpanel">
        <div className="container-custom">
          <PortalSection
            key={activeTab}
            documents={activeDocuments}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}
