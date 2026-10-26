import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/lib/seo';

/**
 * Index of the campus privacy notices, linked from the site-wide footer.
 *
 * Each campus is its own data controller with its own notice, so the footer
 * can't point at a single PDF. Entity, address and ARCO email are copied from
 * the V2 notices (07 Oct 2026); update them here whenever a notice changes.
 */
const CAMPUS_NOTICES = [
  {
    campus: 'Juriquilla',
    entity: '“Colegio NWL Juriquilla”, S.C.',
    address: 'Anillo Vial II Fray Junípero Serra 20001, Ejido San Pablo, C.P. 76127, Querétaro, Qro.',
    email: 'direccion.juriquilla@colegionwl.edu.mx',
    pdf: '/padres/juriquilla/AVISO-PRIVACIDAD-JURIQUILLA.pdf',
  },
  {
    campus: 'Milenio',
    entity: '“Colegio NWL”, S.C.',
    address: 'Cerrada Panorámica 6, Col. Miranda, Distrito Piamonte, C.P. 76240, El Marqués, Qro.',
    email: 'direccion.milenio@colegionwl.edu.mx',
    pdf: '/padres/milenio/AVISO-PRIVACIDAD-MILENIO.pdf',
  },
  {
    campus: 'Zibatá',
    entity: '“Colegio NWL Zibatá”, S.C.',
    address: 'Av. Paseo de las Pitahayas 39-B, Fracc. Zibatá, C.P. 76278, El Marqués, Qro.',
    email: 'direccion.zibata@colegionwl.edu.mx',
    pdf: '/padres/zibata/AVISO-PRIVACIDAD-NWL.pdf',
  },
  {
    campus: 'Corregidora',
    entity: '“Colegio NWL Corregidora”, S.C.',
    address: 'Libramiento Sur Poniente km 7+500, Los Olvera, Ejido la Negreta, Corregidora, Qro.',
    email: 'direccion.corregidora@colegionwl.edu.mx',
    pdf: '/padres/corregidora/AVISO-PRIVACIDAD-CORREGIDORA.pdf',
  },
  {
    campus: 'San Miguel de Allende',
    entity: '“Colegio NWL San Miguel”, S.C.',
    address: 'Carretera San Miguel de Allende – Querétaro km 1.2, San José de la Posta, C.P. 37780, San Miguel de Allende, Gto.',
    email: 'direccion.sanmiguel@colegionwl.edu.mx',
    pdf: '/padres/san-miguel/AVISO-PRIVACIDAD-SAN-MIGUEL.pdf',
  },
];

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description:
    'Avisos de privacidad de NWL Australian School por campus: Juriquilla, Milenio, Zibatá, Corregidora y San Miguel de Allende. Responsable, domicilio y correo para ejercer tus derechos ARCO.',
  alternates: { canonical: `${SITE_URL}/aviso-de-privacidad` },
  robots: { index: true, follow: true },
};

export default function AvisoDePrivacidadPage() {
  return (
    <>
      <main className="min-h-screen bg-paper pb-24">
        <div className="nwl-bg-dawn-deep pt-32 pb-14 md:pt-36 md:pb-16">
          <div className="container-custom max-w-3xl">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
              <span className="w-9 h-px bg-gold" />
              NWL Australian School
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-paper mt-4 leading-[1.05]">Aviso de privacidad</h1>
            <p className="mt-4 text-paper/75 leading-relaxed max-w-2xl">
              En cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, cada campus de NWL
              Australian School es responsable de los datos personales que recaba y cuenta con su propio Aviso de Privacidad. Consulta el
              de tu campus.
            </p>
          </div>
        </div>

        <div className="container-custom max-w-3xl text-navy leading-relaxed">
          <ul className="mt-12 grid gap-4">
            {CAMPUS_NOTICES.map((c) => (
              <li key={c.campus} className="rounded-2xl border border-n-200 bg-white p-6">
                <h2 className="font-display font-bold text-2xl text-navy">Campus {c.campus}</h2>
                <p className="mt-2 font-semibold">{c.entity}</p>
                <p className="text-sm text-navy/75">{c.address}</p>
                <p className="mt-3 text-sm">
                  Derechos ARCO:{' '}
                  <a href={`mailto:${c.email}`} className="text-gold-600 underline break-all">{c.email}</a>
                </p>
                <a
                  href={c.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-600 underline"
                >
                  Ver aviso de privacidad (PDF)
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-navy/75">
            Si consideras que tu derecho a la protección de datos ha sido vulnerado, puedes acudir a la autoridad competente en materia de
            protección de datos personales.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
