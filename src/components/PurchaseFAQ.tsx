export default function PurchaseFAQ() {
  return (
    <section id="preguntas-frecuentes" className="relative bg-bosque py-20 lg:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-1 bg-dorado mx-auto mb-8"></div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-marfil mb-4">
            Preguntas frecuentes del <span className="font-bold text-dorado">proceso de compra</span>
          </h2>
          <p className="text-marfil/60 text-lg max-w-2xl mx-auto">
            Conoce el proceso completo para reservar y comprar tu lote
          </p>
        </div>

        <div className="flex justify-center">
          <a
            href="/Proceso-Compra-Lotes-Atenea.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-dorado text-bosque hover:bg-dorado/90 transition-all duration-500 font-medium tracking-wider rounded-lg shadow-lg shadow-dorado/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            VER PROCESO DE COMPRA (PDF)
          </a>
        </div>
      </div>
    </section>
  )
}
