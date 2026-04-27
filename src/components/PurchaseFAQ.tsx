'use client'

import { useState } from 'react'

type FAQ = {
  question: string
  answer: React.ReactNode
}

const faqs: FAQ[] = [
  {
    question: '¿Cuáles son los beneficios de comprar en preventa?',
    answer: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Reservar un lote en el único desarrollo privado en El Salvador con su propia gran laguna turquesa con playa y acceso al estero.</li>
        <li>Las obras civiles del proyecto están en avance, para ser completadas en un año.</li>
        <li>Sistema práctico de reserva con solo $5,000 y promesa de compraventa.</li>
        <li>Financiamiento privado de los dueños del desarrollo con facilidad para calificar — prima de 20%, con 12% de interés y hasta 15 años de plazo.</li>
        <li>Atenea ya obtuvo todos los permisos requeridos por la Alcaldía, actualmente en trámite registral y recepción final.</li>
        <li>Una vez tengamos las matrículas individuales y las obras más avanzadas, los precios subirán.</li>
      </ul>
    ),
  },
  {
    question: '¿Cómo reservo mi lote?',
    answer: (
      <ol className="list-decimal pl-5 space-y-2">
        <li>Visite <a className="text-dorado hover:underline" href="https://www.atenea.sv">www.atenea.sv</a>, vaya a “Conoce el lugar de tu nueva inversión” y haga clic en <strong>Ver Plano</strong>.</li>
        <li>Escoja su lote según ubicación y precio en el plano, o navegue a <a className="text-dorado hover:underline break-all" href="https://salex.sv/lotificacion/cmohe1yj5000fph11itoetvuo" target="_blank" rel="noopener noreferrer">salex.sv/lotificacion</a>.</li>
        <li>Contacte a Salex al <a className="text-dorado hover:underline" href="tel:+50361587708">503.6158.7708</a> o <a className="text-dorado hover:underline" href="mailto:info@salex.sv">info@salex.sv</a>. Indique si viene referido por un agente de ventas.</li>
        <li>Salex le entrega las planillas y documentos necesarios. Llénelos y entréguelos junto con un cheque de $5,000 a nombre de <strong>Las Tres Tortugas SA de CV</strong>, o haga transferencia a la cuenta corriente <strong>#5490415375 del Banco Agrícola</strong>. Envíe comprobante a <a className="text-dorado hover:underline" href="mailto:info@salex.sv">info@salex.sv</a> y <a className="text-dorado hover:underline" href="mailto:ateneasv503@gmail.com">ateneasv503@gmail.com</a>.</li>
      </ol>
    ),
  },
  {
    question: '¿Qué pasa después de pagar la reserva?',
    answer: (
      <>
        <p className="mb-3">Su lote queda bloqueado y nadie más puede reservarlo o comprarlo. Salex le entrega los siguientes documentos para revisión:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Reglamento de la Asociación de Vecinos</li>
          <li>Reglamento de Uso de las Instalaciones</li>
          <li>Reglamento de Construcción de Viviendas</li>
          <li>Tiempos de Entrega de las Instalaciones</li>
          <li>Contrato de Promesa de Compraventa</li>
        </ul>
      </>
    ),
  },
  {
    question: '¿Puedo retirarme después de reservar?',
    answer: (
      <p>
        Sí. Si se retira <strong>dentro de los primeros 7 días</strong> se le reembolsa la totalidad de los $5,000.
        Si se retira <strong>después de 7 días</strong> se le reembolsan únicamente $3,000; los otros $2,000 quedan como
        penalidad por haber restringido innecesariamente el lote reservado.
      </p>
    ),
  },
  {
    question: '¿Por qué se firma una promesa de compraventa y no una compraventa?',
    answer: (
      <p>
        La matrícula individual de cada lote está en trámite con el CNR. Por eso firmamos una <em>promesa de
        compraventa</em>, no una compraventa. Es perfectamente legal y es utilizado por muchos desarrolladores en
        El Salvador. Estimamos que las matrículas salgan en septiembre del 2026, dado que los permisos de la
        Alcaldía para la parcelación ya fueron obtenidos.
      </p>
    ),
  },
  {
    question: '¿Cuáles son las formas de pago?',
    answer: (
      <>
        <p className="mb-3">Tras la reserva, dentro de máximo 30 días se completa la promesa de compraventa. Hay dos alternativas:</p>
        <p className="font-bold text-dorado mb-2">a) De contado</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          <li>25% de arras → 1.00% de descuento</li>
          <li>26–50% de arras → 1.25% de descuento</li>
          <li>51–75% de arras → 1.75% de descuento</li>
          <li>76–100% de arras → 2.00% de descuento</li>
          <li>El balance se paga al firmar la compraventa final una vez obtenida la matrícula individual.</li>
        </ul>
        <p className="font-bold text-dorado mb-2">b) Con financiamiento</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Prima del 20%, interés anual del 12%, cuotas mensuales hasta 15 años, aportado por los dueños.</li>
          <li>Opción de pagar la prima en 4 cuotas mensuales iguales del 5% cada una.</li>
          <li>Financiamiento sencillo, con muchos menos requisitos que un crédito bancario.</li>
          <li>Las cuotas mensuales del préstamo se comienzan a pagar a partir del mes cinco.</li>
          <li>La firma de la compraventa final se realiza una vez completados todos los pagos.</li>
        </ul>
      </>
    ),
  },
]

export default function PurchaseFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="preguntas-frecuentes" className="relative bg-marfil py-20 lg:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-1 bg-dorado mx-auto mb-8"></div>
          <h2 className="text-3xl lg:text-5xl font-light text-bosque mb-4 leading-tight">
            Preguntas frecuentes del <span className="font-bold text-dorado">proceso de compra</span>
          </h2>
          <p className="text-bosque/70 text-lg max-w-2xl mx-auto">
            Todo lo que necesita saber para reservar y comprar su lote en Residencial Atenea.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className="bg-white border border-bosque/10 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 lg:px-6 py-4 lg:py-5 text-left hover:bg-bosque/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base lg:text-lg font-medium text-bosque">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-dorado flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-5 lg:px-6 pb-5 lg:pb-6 text-bosque/80 text-sm lg:text-base leading-relaxed border-t border-bosque/10 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href="/Proceso-Compra-Lotes-Atenea.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-bosque text-marfil hover:bg-bosque/90 transition-all duration-500 font-medium tracking-wider rounded-lg shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            DESCARGAR PROCESO DE COMPRA (PDF)
          </a>
        </div>
      </div>
    </section>
  )
}
