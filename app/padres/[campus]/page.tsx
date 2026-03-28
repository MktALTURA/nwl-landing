'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { getCampusPortal } from '@/lib/padres-data';
import PasswordGate from '@/components/padres/PasswordGate';
import PortalDashboard from '@/components/padres/PortalDashboard';
import Footer from '@/components/Footer';

export default function CampusPortalPage({ params }: { params: Promise<{ campus: string }> }) {
  const { campus } = use(params);
  const portalData = getCampusPortal(campus);

  if (!portalData) {
    notFound();
  }

  return (
    <main>
      <PasswordGate
        campus={campus}
        campusName={portalData.campusName}
        renderContent={(onLogout) => (
          <PortalDashboard campus={campus} onLogout={onLogout} />
        )}
      />
      <Footer />
    </main>
  );
}
