import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/lib/seo';
import { CONSENT_VERSION } from '@/lib/becas/consent';

/**
 * Aviso de privacidad simplificado del Programa de Becas.
 *
 * Complements (does not replace) each campus's full notice, which already
 * covers admissions and "apoyos y becas". This page adds what the online
 * program introduces: collection through the website, documents of minors,
 * cloud providers acting on the school's behalf, rules-based evaluation with
 * human review, and hashed contact data sent to ad platforms for measurement.
 * Wording follows the campus notices (Colegio NWL S.C., ARCO by campus email).
 *
 * The consent checkbox in the application links here; `consentVersion` in the
 * worker config must match CONSENT_VERSION below whenever this text changes.
 */
const UPDATED = '3 de octubre de 2026';

export const metadata: Metadata = {
  title: 'Aviso de privacidad · Programa de Becas',
  description:
    'Aviso de privacidad simplificado del Programa de Becas NWL Australian School: qué datos recabamos en la solicitud en línea, para qué, quién los trata y cómo ejercer tus derechos ARCO.',
  alternates: { canonical: `${SITE_URL}/becas/aviso-de-privacidad` },
  robots: { index: true, follow: true },
};

const CAMPUS_ARCO = [
  { campus: 'Juriquilla', email: 'direccion@juriquilla.nwl.mx', pdf: '/images/Aviso de privacidad/AVISO-PRIVACIDAD-JURIQUILLA.pdf' },
  { campus: 'Milenio', email: 'direccion@milenio.nwl.mx', pdf: '/images/Aviso de privacidad/AVISO-PRIVACIDAD-MILENIO.pdf' },
  { campus: 'San Miguel de Allende', email: 'direccion@sanmiguel.nwl.mx', pdf: '/images/Aviso de privacidad/AVISO-PRIVACIDAD-SAN-MIGUEL.pdf' },
  { campus: 'Corregidora', email: 'direccion@corregidora.nwl.mx', pdf: '/images/Aviso de privacidad/AVISO-PRIVACIDAD-CORREGIDORA.pdf' },
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display font-bold text-2xl text-navy mt-12 mb-3">{children}</h2>;
}

export default function AvisoBecasPage() {
  return (
    <>
      <main className="min-h-screen bg-paper pb-24">
        <div className="nwl-bg-dawn-deep pt-32 pb-14 md:pt-36 md:pb-16">
          <div className="container-custom max-w-3xl">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
              <span className="w-9 h-px bg-gold" />
              Programa de Becas · NWL Australian School
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-paper mt-4 leading-[1.05]">Aviso de privacidad simplificado</h1>
            <p className="mt-4 text-paper/75 leading-relaxed max-w-2xl">
              Solicitud en línea del Programa de Becas. Este aviso complementa el Aviso de Privacidad integral de cada campus y
              explica, en lenguaje claro, qué datos recabamos al aplicar a una beca, para qué los usamos y cómo puedes ejercer tus derechos.
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">
              Versión {CONSENT_VERSION} · Última actualización: {UPDATED}
            </p>
          </div>
        </div>

        <article className="container-custom max-w-3xl text-navy leading-relaxed">
          <H2>1. Responsable</H2>
          <p>
            <strong>Colegio NWL S.C.</strong> (antes Colegio Newland S.C.), en adelante &ldquo;El Colegio&rdquo;, a través del campus al que se
            dirige la solicitud, es responsable del tratamiento de los datos personales que proporcionas en el Programa de Becas, en términos de la
            Ley Federal de Protección de Datos Personales en Posesión de los Particulares, su Reglamento y los Lineamientos del Aviso de
            Privacidad. El domicilio y los datos de contacto de cada campus constan en su Aviso de Privacidad integral, enlazado al final de esta
            página.
          </p>

          <H2>2. Datos que recabamos en la solicitud</H2>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              <strong>Del padre, madre o tutor:</strong> nombre y apellidos, correo electrónico, número de WhatsApp y domicilio (calle, colonia,
              ciudad y código postal).
            </li>
            <li>
              <strong>Del alumno o alumna:</strong> nombre y apellidos, fecha de nacimiento, grado al que ingresa, grado y escuela actuales, y el
              campus y ciclo escolar de interés.
            </li>
            <li>
              <strong>Datos académicos, deportivos o culturales declarados</strong> según la categoría de beca: promedio de la última boleta,
              deporte y nivel de competencia, disciplina artística y años de formación, o una carta de motivos escrita por la familia.
            </li>
            <li>
              <strong>Documentos</strong> que decidas adjuntar: boleta oficial, constancias, credenciales o ligas a resultados o videos. Son datos
              académicos de un menor de edad y los tratamos con protección especial.
            </li>
            <li>
              <strong>Datos de referido:</strong> el nombre de la familia o el código que te recomendó NWL, si lo indicas.
            </li>
            <li>
              <strong>Datos técnicos:</strong> dirección IP, navegador, fecha y hora, y el origen de tu visita (campaña o enlace por el que llegaste),
              que usamos para seguridad, para evitar envíos automatizados y para medir nuestras campañas.
            </li>
          </ul>
          <p className="mt-3">
            No solicitamos datos de salud ni datos financieros en la solicitud de beca. Si más adelante el proceso de inscripción los requiere, se
            recabarán conforme al Aviso de Privacidad integral del campus.
          </p>

          <H2>3. Para qué usamos tus datos</H2>
          <p className="font-semibold">Finalidades esenciales</p>
          <ul className="list-disc pl-6 space-y-1.5 mt-1">
            <li>Recibir, evaluar y resolver tu solicitud de beca y comunicarte el resultado.</li>
            <li>Contactarte por correo electrónico, SMS o WhatsApp sobre el estatus de la solicitud, la ventana de inscripción y los siguientes pasos.</li>
            <li>Emitir la carta de beca y, si se inscribe, aplicar la beca en la hoja de inversión y en el expediente de admisión.</li>
            <li>Verificar que la solicitud corresponde a una familia de nuevo ingreso y evitar duplicados.</li>
            <li>Garantizar la seguridad del sitio y prevenir fraudes o envíos automatizados.</li>
          </ul>
          <p className="font-semibold mt-4">Finalidades no esenciales</p>
          <ul className="list-disc pl-6 space-y-1.5 mt-1">
            <li>Informarte sobre el modelo educativo, eventos de admisión y otros programas de El Colegio.</li>
            <li>Medir la efectividad de nuestras campañas de difusión (ver el punto 5).</li>
          </ul>
          <p className="mt-3">
            Si no deseas que tus datos se usen para las finalidades no esenciales, escribe al correo de tu campus (punto 7). Tu solicitud de
            beca no se verá afectada.
          </p>

          <H2>4. Evaluación con reglas y revisión humana</H2>
          <p>
            La solicitud se evalúa primero con reglas definidas por El Colegio (por ejemplo, el promedio mínimo de la Beca Académica, el nivel de
            competencia de la Beca Deportiva, o que la familia sea de nuevo ingreso). Las solicitudes que cumplen las reglas se aprueban y las que
            requieren criterio se turnan al equipo de admisiones y a la dirección del campus, que toman la decisión final. No usamos sistemas de
            inteligencia artificial para leer tus documentos ni para decidir. Siempre puedes pedir que una persona revise tu caso escribiendo al
            correo de tu campus.
          </p>

          <H2>5. Quién trata tus datos por cuenta de El Colegio</H2>
          <p>
            Para operar el programa en línea utilizamos proveedores que actúan como encargados, bajo instrucciones de El Colegio y sin usar tus
            datos para fines propios:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 mt-1">
            <li>
              <strong>Cloudflare</strong>: base de datos del programa y almacenamiento privado de los documentos adjuntos, con acceso restringido al
              personal de admisiones de tu campus.
            </li>
            <li>
              <strong>Vercel</strong>: alojamiento del sitio nwl.com.mx.
            </li>
            <li>
              <strong>GoHighLevel</strong>: sistema de gestión de contactos de El Colegio y envío de correos, SMS y WhatsApp.
            </li>
            <li>
              <strong>Meta y Google</strong>: para medir nuestras campañas de difusión, les enviamos tu correo y teléfono en forma cifrada e
              irreversible (hash), junto con el identificador de la campaña por la que llegaste. No reciben el nombre del alumno, su fecha de
              nacimiento ni ningún documento.
            </li>
          </ul>
          <p className="mt-3">
            Fuera de estos encargados, tus datos se comparten únicamente entre los campus y áreas de El Colegio que intervienen en la admisión,
            conforme al artículo 37, fracción III, de la Ley. No vendemos ni cedemos tus datos a terceros.
          </p>

          <H2>6. Cuánto tiempo conservamos tus datos</H2>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Solicitudes iniciadas y no enviadas: se eliminan a los 30 días.</li>
            <li>
              Solicitudes resueltas sin inscripción (no aprobadas, vencidas o canceladas): los documentos adjuntos se eliminan a los 12 meses del
              cierre; los datos de contacto se conservan para las finalidades no esenciales mientras no te opongas.
            </li>
            <li>Familias inscritas: la información pasa a formar parte del expediente escolar y se rige por el Aviso de Privacidad integral del campus.</li>
          </ul>

          <H2>7. Derechos ARCO y revocación del consentimiento</H2>
          <p>
            Puedes solicitar el acceso, rectificación, cancelación u oposición al tratamiento de tus datos, así como revocar tu consentimiento,
            escribiendo al correo de la dirección de tu campus. Incluye tu nombre, el del alumno, el folio de la solicitud (BECA-…) si lo tienes, los
            datos sobre los que ejerces tu derecho y una identificación. Recibirás acuse y respuesta en los plazos que marca la Ley, descritos en
            el Aviso de Privacidad integral.
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-n-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-navy text-paper">
                <tr>
                  <th scope="col" className="text-left font-mono text-[10px] uppercase tracking-[0.18em] px-4 py-3">Campus</th>
                  <th scope="col" className="text-left font-mono text-[10px] uppercase tracking-[0.18em] px-4 py-3">Correo para solicitudes ARCO</th>
                  <th scope="col" className="text-left font-mono text-[10px] uppercase tracking-[0.18em] px-4 py-3">Aviso integral</th>
                </tr>
              </thead>
              <tbody>
                {CAMPUS_ARCO.map((c, i) => (
                  <tr key={c.campus} className={i % 2 ? 'bg-n-50' : 'bg-white'}>
                    <th scope="row" className="text-left font-semibold px-4 py-3">{c.campus}</th>
                    <td className="px-4 py-3">
                      <a href={`mailto:${c.email}`} className="text-gold-600 underline">{c.email}</a>
                    </td>
                    <td className="px-4 py-3">
                      <a href={c.pdf} target="_blank" rel="noopener noreferrer" className="text-gold-600 underline">PDF</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            Si consideras que tu derecho a la protección de datos ha sido vulnerado, puedes acudir al Instituto Nacional de Transparencia, Acceso a
            la Información y Protección de Datos Personales (INAI), www.inai.org.mx.
          </p>

          <H2>8. Consentimiento</H2>
          <p>
            Al marcar la casilla de aceptación en la solicitud, manifiestas que leíste este aviso y que consientes el tratamiento de los datos
            descritos, incluidos los datos académicos de tu hijo o hija y los documentos que adjuntes, para las finalidades señaladas. Guardamos la
            fecha, la versión de este aviso y la dirección IP desde la que se otorgó el consentimiento.
          </p>

          <H2>9. Cambios a este aviso</H2>
          <p>
            Este aviso puede actualizarse por cambios legales o del programa. Publicaremos la versión vigente en esta página; la versión que
            aceptaste queda registrada en tu solicitud.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
