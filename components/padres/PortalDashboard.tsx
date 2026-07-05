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
      <div className="relative pt-28 pb-10 overflow-hidden nwl-bg-dawn-deep">
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
            <div className="absolute inset-0 bg-navy/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/40" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
          </div>
        )}
        {!heroImage && (
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy" />
        )}
        <div className="container-custom relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <Link
                href="/padres"
                className="inline-flex items-center gap-1.5 text-paper/50 hover:text-paper/80 text-sm transition-colors mb-2"
              >
                <FiArrowLeft className="w-3.5 h-3.5" />
                {t.padres.changeCampus}
              </Link>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-paper">
                {t.padres.welcomeMessage}
              </h1>
              <p className="text-paper/60 mt-1">
                Campus <span className="text-gold font-medium">{portalData.campusName}</span>
              </p>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-paper/60 hover:text-paper border border-paper/20 hover:border-gold/60 rounded-full transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              {t.padres.logoutButton}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-n-200 sticky top-0 z-20">
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
                    ${isActive ? 'text-navy' : 'text-n-500 hover:text-navy/80'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : ''}`} />
                  {t.padres[labelKey]}
                  {isActive && (
                    <motion.div
                      layoutId="portal-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
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
      <div className="section-padding bg-paper" role="tabpanel">
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
