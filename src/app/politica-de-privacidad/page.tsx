import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad - Residencial Atenea',
  description: 'Política de privacidad y protección de datos personales de Residencial Atenea',
}

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-arena py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-bosque mb-8">Política de Privacidad</h1>

        <div className="space-y-8 text-gray-700">
          {/* Introducción */}
          <section>
            <p className="mb-4">
              En cumplimiento con las disposiciones legales vigentes en la República de El Salvador
              en materia de protección de datos personales, Inmobiliaria El Salvador, S.A. de C.V. informa
              a los usuarios de este sitio web sobre su política de tratamiento de datos personales.
            </p>
            <p>
              La presente Política de Privacidad tiene por objeto informarle sobre el tratamiento
              que hacemos de sus datos personales cuando utiliza nuestros servicios o visita nuestro
              sitio web.
            </p>
          </section>

          {/* Responsable del Tratamiento */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">1. Responsable del Tratamiento de Datos</h2>
            <div className="space-y-2">
              <p><strong>Identidad:</strong> Inmobiliaria El Salvador, Sociedad Anónima de Capital Variable</p>
              <p><strong>Nombre Comercial:</strong> Corp Salex</p>
              <p><strong>NIT:</strong> 06140209211058</p>
              <p><strong>NRC:</strong> 3137378</p>
              <p><strong>Domicilio:</strong> Condominios Los Héroes, Local 8G</p>
              <p><strong>Teléfono:</strong> +503 7018-1141</p>
              <p><strong>Correo de contacto general:</strong> info@salex.sv</p>
              <p><strong>Correo para ejercicio de derechos:</strong> privacidad@salex.sv</p>
            </div>
          </section>

          {/* Datos que Recopilamos */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">2. Datos Personales que Recopilamos</h2>
            <p className="mb-4">
              Recopilamos y tratamos los datos personales que usted nos proporciona voluntariamente
              a través de los siguientes medios:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-bosque mb-2">2.1. Formularios de Contacto y Suscripción</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Nombre completo</li>
                  <li>Correo electrónico</li>
                  <li>Número de teléfono (cuando aplique)</li>
                  <li>Mensaje o consulta</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-2">2.2. Formularios de Reserva o Consulta de Lotes</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Datos de identificación personal</li>
                  <li>Información de contacto</li>
                  <li>Información sobre el lote de interés</li>
                  <li>Preferencias de contacto</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-2">2.3. Datos de Navegación</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador y dispositivo</li>
                  <li>Páginas visitadas y tiempo de navegación</li>
                  <li>Cookies y tecnologías similares (ver Política de Cookies)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Finalidad del Tratamiento */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">3. Finalidad del Tratamiento</h2>
            <p className="mb-4">Sus datos personales serán tratados para las siguientes finalidades:</p>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-bosque mb-1">3.1. Gestión de Consultas y Contacto</h3>
                <p>Atender y responder sus solicitudes de información sobre nuestros proyectos inmobiliarios.</p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-1">3.2. Gestión Comercial</h3>
                <p>
                  Procesar reservas de lotes, envío de información comercial, cotizaciones y seguimiento
                  del proceso de compra.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-1">3.3. Comunicaciones de Marketing</h3>
                <p>
                  Envío de newsletters, boletines informativos y comunicaciones comerciales sobre nuevos
                  proyectos, promociones y eventos (siempre que haya otorgado su consentimiento expreso).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-1">3.4. Mejora de Servicios</h3>
                <p>
                  Análisis estadístico del uso del sitio web para mejorar la experiencia del usuario
                  y optimizar nuestros servicios.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-1">3.5. Cumplimiento Legal</h3>
                <p>
                  Cumplir con obligaciones legales y regulatorias aplicables en El Salvador.
                </p>
              </div>
            </div>
          </section>

          {/* Base Legal */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">4. Base Legal del Tratamiento</h2>
            <p className="mb-4">El tratamiento de sus datos personales se fundamenta en:</p>

            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Consentimiento del usuario:</strong> Al proporcionarnos sus datos a través de
                formularios o al aceptar expresamente las casillas de verificación correspondientes.
              </li>
              <li>
                <strong>Ejecución de relación precontractual:</strong> Cuando solicita información
                sobre nuestros servicios o productos con intención de contratar.
              </li>
              <li>
                <strong>Interés legítimo:</strong> Para mejorar nuestros servicios y realizar análisis
                estadísticos agregados.
              </li>
              <li>
                <strong>Cumplimiento de obligaciones legales:</strong> Cuando sea requerido por normativa
                vigente en El Salvador.
              </li>
            </ul>
          </section>

          {/* Conservación de Datos */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">5. Plazo de Conservación de los Datos</h2>
            <p className="mb-4">
              Sus datos personales serán conservados durante los siguientes períodos:
            </p>

            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Consultas y contacto:</strong> Durante el tiempo necesario para atender su solicitud
                y hasta 2 años después para fines de seguimiento comercial.
              </li>
              <li>
                <strong>Suscripciones a newsletter:</strong> Hasta que solicite la baja o retire su consentimiento.
              </li>
              <li>
                <strong>Clientes:</strong> Durante la relación comercial y posteriormente por el plazo
                exigido por las obligaciones legales (fiscales, contables, etc.).
              </li>
              <li>
                <strong>Datos de navegación:</strong> Por el período indicado en nuestra Política de Cookies.
              </li>
            </ul>

            <p className="mt-4">
              Transcurridos estos plazos, los datos serán eliminados de forma segura o anonimizados
              para fines estadísticos.
            </p>
          </section>

          {/* Destinatarios */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">6. Destinatarios de los Datos</h2>
            <p className="mb-4">
              Sus datos personales podrán ser compartidos con las siguientes categorías de destinatarios:
            </p>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-bosque mb-1">6.1. Proveedores de Servicios</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Servicios de hosting y almacenamiento en la nube</li>
                  <li>Servicios de email marketing (para envío de newsletters)</li>
                  <li>Servicios de análisis web (Google Analytics u otras herramientas)</li>
                  <li>Servicios de atención al cliente y CRM</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-1">6.2. Autoridades</h3>
                <p>
                  Cuando sea legalmente requerido, sus datos podrán ser comunicados a autoridades
                  administrativas o judiciales competentes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-1">6.3. Terceros con Consentimiento</h3>
                <p>
                  No compartimos sus datos con terceros para fines comerciales sin su consentimiento previo.
                </p>
              </div>
            </div>
          </section>

          {/* Derechos del Usuario */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">7. Derechos del Usuario (ARCO)</h2>
            <p className="mb-4">
              Usted tiene derecho a ejercer los siguientes derechos respecto a sus datos personales:
            </p>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-bosque mb-1">7.1. Derecho de Acceso</h3>
                <p>Conocer qué datos personales tenemos sobre usted y cómo los tratamos.</p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-1">7.2. Derecho de Rectificación</h3>
                <p>Solicitar la corrección de datos inexactos o incompletos.</p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-1">7.3. Derecho de Cancelación</h3>
                <p>Solicitar la eliminación de sus datos personales cuando ya no sean necesarios.</p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-1">7.4. Derecho de Oposición</h3>
                <p>
                  Oponerse al tratamiento de sus datos para determinadas finalidades, especialmente
                  para marketing directo.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-1">7.5. Derecho de Portabilidad</h3>
                <p>Recibir sus datos en formato estructurado y de uso común.</p>
              </div>

              <div>
                <h3 className="font-semibold text-bosque mb-1">7.6. Derecho a Retirar el Consentimiento</h3>
                <p>
                  Retirar en cualquier momento el consentimiento otorgado para el tratamiento de sus datos.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-marfil p-6 rounded-lg">
              <h3 className="font-semibold text-bosque mb-2">¿Cómo ejercer sus derechos?</h3>
              <p className="mb-2">
                Para ejercer cualquiera de estos derechos, puede enviar un correo electrónico a:
              </p>
              <p className="mb-4">
                <strong>privacidad@salex.sv</strong>
              </p>
              <p className="text-sm">
                Incluya en su solicitud: nombre completo, copia de documento de identidad, descripción
                clara del derecho que desea ejercer y dirección de correo electrónico de contacto.
                Responderemos a su solicitud en un plazo máximo de 15 días hábiles.
              </p>
            </div>
          </section>

          {/* Medidas de Seguridad */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">8. Medidas de Seguridad</h2>
            <p className="mb-4">
              Hemos implementado medidas técnicas y organizativas apropiadas para proteger sus datos
              personales contra acceso no autorizado, pérdida, destrucción o alteración, incluyendo:
            </p>

            <ul className="list-disc ml-6 space-y-1">
              <li>Cifrado de comunicaciones mediante protocolo HTTPS/SSL</li>
              <li>Almacenamiento seguro en bases de datos protegidas con contraseña</li>
              <li>Acceso restringido a datos personales únicamente a personal autorizado</li>
              <li>Copias de seguridad periódicas</li>
              <li>Auditorías de seguridad regulares</li>
              <li>Políticas de privacidad para proveedores de servicios</li>
            </ul>
          </section>

          {/* Transferencias Internacionales */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">9. Transferencias Internacionales</h2>
            <p>
              Algunos de nuestros proveedores de servicios (como servicios de hosting o email marketing)
              pueden estar ubicados fuera de El Salvador. En estos casos, nos aseguramos de que dichos
              proveedores cumplan con estándares adecuados de protección de datos mediante cláusulas
              contractuales apropiadas.
            </p>
          </section>

          {/* Menores de Edad */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">10. Menores de Edad</h2>
            <p>
              Este sitio web no está dirigido a menores de 18 años. No recopilamos intencionalmente
              datos personales de menores. Si tiene conocimiento de que un menor ha proporcionado
              datos personales, por favor contacte con nosotros a privacidad@salex.sv para que
              podamos eliminarlos.
            </p>
          </section>

          {/* Modificaciones */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">11. Modificaciones de la Política</h2>
            <p>
              Nos reservamos el derecho de actualizar esta Política de Privacidad periódicamente para
              reflejar cambios en nuestras prácticas o en la legislación aplicable. Publicaremos
              cualquier cambio en esta página y, si son significativos, le notificaremos por correo
              electrónico o mediante un aviso destacado en nuestro sitio web.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-semibold text-bosque mb-4">12. Contacto</h2>
            <p className="mb-4">
              Para cualquier duda o consulta sobre esta Política de Privacidad o sobre el tratamiento
              de sus datos personales, puede contactarnos en:
            </p>

            <div className="space-y-1">
              <p><strong>Correo de Privacidad:</strong> privacidad@salex.sv</p>
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
