export const dynamic = 'force-static'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies - Residencial Atenea',
  description: 'Información sobre el uso de cookies en el sitio web de Residencial Atenea',
}

export default function PoliticaCookies() {
  return (
    <div className="min-h-screen bg-arena py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-bosque mb-8">Política de Cookies</h1>

        <div className="space-y-8 text-gray-700">
          {/* Introducción */}
          <section>
            <p className="mb-4">
              En cumplimiento con la normativa aplicable, Inmobiliaria El Salvador, S.A. de C.V. informa a
              los usuarios del sitio web <strong>atenea.sv</strong> sobre el uso de cookies y
              tecnologías similares utilizadas en este portal.
            </p>
            <p className="mb-4">
              <strong>Residencial Atenea es un sitio web informativo estático</strong> que solo recopila
              datos básicos de contacto (correo electrónico, nombre y teléfono) para propósitos comerciales
              legítimos relacionados con el proyecto inmobiliario.
            </p>
            <p>
              Esta política explica qué son las cookies, cuáles utilizamos realmente, para qué las empleamos
              y cómo puede gestionarlas.
            </p>
          </section>

          {/* Qué son las Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">1. ¿Qué son las Cookies?</h2>
            <p className="mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador,
              tablet o teléfono móvil) cuando visita un sitio web. Permiten al sitio web recordar sus
              acciones y preferencias durante un período de tiempo, para que no tenga que volver a
              configurarlas cada vez que regrese o navegue de una página a otra.
            </p>
          </section>

          {/* Tipos de Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">2. Cookies que Utilizamos</h2>

            <div className="space-y-6">
              {/* Cookies Técnicas */}
              <div>
                <h3 className="text-xl font-semibold text-bosque mb-3">2.1. Cookie de Consentimiento</h3>
                <p className="mb-3">
                  Esta es la única cookie que utilizamos en nuestro sitio web. Es esencial para
                  recordar su preferencia sobre el uso de cookies.
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-marfil">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Propósito</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Duración</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">cookie_consent</td>
                        <td className="border border-gray-300 px-4 py-2">Almacena su preferencia de consentimiento de cookies</td>
                        <td className="border border-gray-300 px-4 py-2">1 año</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 bg-marfil p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Importante:</strong> Este sitio web NO utiliza cookies de análisis
                    (Google Analytics), cookies de marketing (Facebook Pixel) ni cookies de terceros
                    para rastreo. Solo recopilamos los datos que usted nos proporciona voluntariamente
                    a través de nuestros formularios de contacto.
                  </p>
                </div>
              </div>

              {/* Nota sobre Panel de Administración */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-bosque mb-2">Nota sobre Panel de Administración</h3>
                <p className="text-sm text-gray-700">
                  El panel de administración interno (no accesible públicamente) utiliza cookies de
                  sesión (<code className="bg-gray-200 px-1 py-0.5 rounded text-xs">next-auth.session-token</code>)
                  para gestionar el acceso de administradores. Estas cookies no afectan a los
                  visitantes normales del sitio web.
                </p>
              </div>
            </div>
          </section>

          {/* Base Legal */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">3. Base Legal para el Uso de Cookies</h2>
            <p>
              La cookie de consentimiento se basa en su aceptación expresa al utilizar nuestro sitio web.
              Esta cookie es estrictamente necesaria para recordar su preferencia y cumplir con las
              normativas de privacidad aplicables.
            </p>
          </section>

          {/* Gestión de Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">4. Cómo Gestionar las Cookies</h2>

            <p className="mb-4">
              Al acceder a nuestro sitio web por primera vez, se mostrará un banner de cookies
              donde podrá aceptar o rechazar el uso de cookies. Puede modificar sus preferencias
              en cualquier momento a través del enlace "Configurar Cookies" en el pie de página.
            </p>

            <div className="bg-marfil p-4 rounded-lg">
              <p className="text-sm">
                <strong>Nota:</strong> Dado que solo utilizamos una cookie de consentimiento y no
                rastreamos su actividad ni utilizamos cookies de terceros, la gestión de cookies
                en este sitio es muy simple. Si rechaza las cookies, simplemente no se guardará
                su preferencia y el banner puede aparecer nuevamente en futuras visitas.
              </p>
            </div>
          </section>

          {/* Actualizaciones */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">5. Actualizaciones de la Política</h2>
            <p>
              Esta Política de Cookies puede ser modificada periódicamente para reflejar cambios en
              las cookies que utilizamos o por otras razones operativas, legales o regulatorias.
              Le recomendamos revisar esta página regularmente para mantenerse informado.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">6. Contacto</h2>
            <p className="mb-4">
              Si tiene alguna pregunta sobre nuestra Política de Cookies, puede contactarnos en:
            </p>

            <div className="space-y-1">
              <p><strong>Correo Electrónico:</strong> privacidad@salex.sv</p>
              <p><strong>Correo General:</strong> info@salex.sv</p>
              <p><strong>Sitio Web:</strong> <a href="https://salex.sv" className="text-dorado hover:underline">https://salex.sv</a></p>
            </div>
          </section>

          {/* Fecha */}
          <section className="mt-12 pt-6 border-t border-gray-300">
            <p className="text-sm text-gray-600">
              <strong>Última actualización:</strong> Enero 2025
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
