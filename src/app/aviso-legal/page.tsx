import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal - Residencial Atenea',
  description: 'Aviso legal y condiciones de uso del sitio web de Residencial Atenea',
}

export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-arena py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-bosque mb-8">Aviso Legal</h1>

        <div className="space-y-8 text-gray-700">
          {/* Identificación del Titular */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">1. Identificación del Titular</h2>
            <div className="space-y-2">
              <p><strong>Razón Social:</strong> Inmobiliaria El Salvador, Sociedad Anónima de Capital Variable</p>
              <p><strong>Nombre Comercial:</strong> Corp Salex</p>
              <p><strong>NIT:</strong> 06140209211058</p>
              <p><strong>NRC:</strong> 3137378</p>
              <p><strong>Domicilio Fiscal:</strong> Condominios Los Héroes, Local 8G</p>
              <p><strong>Teléfono:</strong> +503 7018-1141</p>
              <p><strong>Correo Electrónico:</strong> info@salex.sv</p>
              <p><strong>Actividad Económica:</strong> Actividades inmobiliarias a cambio de una retribución o por contrata</p>
            </div>
          </section>

          {/* Finalidad del Sitio */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">2. Finalidad del Sitio</h2>
            <p>
              Este sitio web constituye un portal informativo y comercial de proyectos inmobiliarios
              desarrollados por Inmobiliaria El Salvador, S.A. de C.V. (Corp Salex) en la República de El Salvador.
              Su propósito es proporcionar información detallada sobre el proyecto Residencial Atenea,
              así como facilitar el contacto con potenciales clientes interesados en adquirir lotes
              residenciales y recibir información comercial.
            </p>
          </section>

          {/* Legislación Aplicable */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">3. Legislación Aplicable</h2>
            <p>
              El presente sitio web y sus contenidos se rigen por las leyes de la República de El Salvador.
              El uso del sitio implica la aceptación expresa de estas condiciones legales y el sometimiento
              a la legislación salvadoreña vigente en materia de comercio electrónico, protección de datos
              personales y propiedad intelectual.
            </p>
          </section>

          {/* Propiedad Intelectual */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">4. Propiedad Intelectual</h2>
            <p className="mb-4">
              Todos los contenidos del sitio web, incluyendo pero no limitándose a textos, imágenes,
              fotografías, gráficos, logotipos, iconos, código fuente, estructura, diseño y presentación,
              son propiedad exclusiva de Inmobiliaria El Salvador, S.A. de C.V. o de sus licenciantes, y están
              protegidos por las leyes de propiedad intelectual de El Salvador y tratados internacionales.
            </p>
            <p>
              Queda prohibida la reproducción, distribución, comunicación pública, transformación o
              cualquier otra forma de explotación de los contenidos sin autorización previa y expresa
              por escrito de Inmobiliaria El Salvador, S.A. de C.V.
            </p>
          </section>

          {/* Condiciones de Uso */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">5. Condiciones de Uso</h2>
            <p className="mb-4">El acceso y uso de este sitio web está sujeto a las siguientes condiciones:</p>

            <div className="ml-6 space-y-4">
              <div>
                <h3 className="font-semibold text-bosque mb-2">5.1. Uso Permitido</h3>
                <p>
                  El usuario se compromete a utilizar el sitio web de forma lícita, respetando la normativa
                  vigente y los derechos de terceros. El uso del sitio es exclusivamente para fines
                  informativos y comerciales legítimos relacionados con los proyectos inmobiliarios de Salex Corp.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-2">5.2. Uso Prohibido</h3>
                <p>Queda expresamente prohibido:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Copiar, reproducir o distribuir los contenidos sin autorización previa</li>
                  <li>Realizar ingeniería inversa, descompilar o intentar obtener el código fuente</li>
                  <li>Realizar actividades de hacking, phishing o introducción de malware</li>
                  <li>Utilizar sistemas automatizados para extraer datos (scraping) sin autorización</li>
                  <li>Usar los datos personales de otros usuarios para fines no autorizados</li>
                  <li>Realizar acciones que puedan dañar, sobrecargar o deteriorar el funcionamiento del sitio</li>
                  <li>Suplantar la identidad de terceros o proporcionar información falsa</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Limitación de Responsabilidad */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">6. Limitación de Responsabilidad</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-bosque mb-2">6.1. Disponibilidad del Sitio</h3>
                <p>
                  Inmobiliaria El Salvador, S.A. de C.V. no garantiza la disponibilidad y continuidad ininterrumpida
                  del sitio web. No se responsabiliza por interrupciones temporales del servicio causadas
                  por mantenimiento, actualizaciones técnicas o causas ajenas a su control.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-2">6.2. Exactitud de la Información</h3>
                <p>
                  Si bien procuramos mantener la información actualizada y precisa, no garantizamos la
                  exactitud, completitud o vigencia de todos los contenidos. Las especificaciones técnicas,
                  precios, plazos y características de los proyectos están sujetos a cambios sin previo aviso.
                  Se recomienda confirmar toda información de interés directamente con nuestros asesores comerciales.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-2">6.3. Enlaces a Terceros</h3>
                <p>
                  El sitio puede contener enlaces a sitios web de terceros. Inmobiliaria El Salvador, S.A. de C.V.
                  no controla ni se responsabiliza del contenido, políticas de privacidad o prácticas de
                  sitios web externos.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-2">6.4. Contenido del Usuario</h3>
                <p>
                  No nos responsabilizamos por el contenido, veracidad o legalidad de la información
                  proporcionada por los usuarios a través de formularios o medios de contacto.
                </p>
              </div>
            </div>
          </section>

          {/* Modificaciones */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">7. Modificaciones</h2>
            <p>
              Inmobiliaria El Salvador, S.A. de C.V. se reserva el derecho de modificar, sin previo aviso,
              el presente Aviso Legal, así como la presentación, configuración y contenidos del sitio web.
              Se recomienda revisar periódicamente estas condiciones.
            </p>
          </section>

          {/* Jurisdicción */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">8. Jurisdicción y Ley Aplicable</h2>
            <p>
              Para cualquier controversia derivada del acceso, uso o interpretación de este sitio web,
              las partes se someten expresamente a la jurisdicción de los tribunales competentes de
              San Salvador, República de El Salvador, con renuncia a cualquier otro fuero que pudiera
              corresponderles.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">9. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con este Aviso Legal, puede contactarnos en:
            </p>
            <div className="mt-4 space-y-1">
              <p><strong>Correo Electrónico:</strong> info@salex.sv</p>
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
