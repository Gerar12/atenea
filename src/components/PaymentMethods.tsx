type Method = {
  name: string
  icon: React.ReactNode
  description: string
  badge?: string
}

export default function PaymentMethods() {
  const methods: Method[] = [
    {
      name: "Tarjetas",
      icon: (
        <svg className="w-10 h-10 xl:w-8 xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
        </svg>
      ),
      description: "Visa, Mastercard, Amex",
      badge: "PRÓXIMAMENTE"
    },
    {
      name: "Transferencia",
      icon: (
        <svg className="w-10 h-10 xl:w-8 xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
        </svg>
      ),
      description: "Bancaria directa"
    },
    {
      name: "Cheque",
      icon: (
        <svg className="w-10 h-10 xl:w-8 xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      ),
      description: "Certificados"
    },
    {
      name: "Efectivo",
      icon: (
        <svg className="w-10 h-10 xl:w-8 xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      ),
      description: "Pago directo"
    }
  ]

  return (
    <section className="relative bg-bosque py-20 lg:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <div className="w-20 h-1 bg-dorado mx-auto mb-8"></div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-marfil mb-4">
            Métodos de <span className="font-bold text-dorado">Pago</span>
          </h2>
          <p className="text-marfil/60 text-lg max-w-2xl mx-auto">
            Múltiples opciones para tu comodidad
          </p>
        </div>

        {/* Grid de métodos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 max-w-5xl mx-auto">
          {methods.map((method, index) => (
            <div
              key={index}
              className="group relative bg-bosque border-2 border-dorado/30 rounded-2xl p-6 xl:p-5 hover:border-dorado transition-all duration-500 hover:shadow-2xl hover:shadow-dorado/20"
            >
              {/* Decoración superior */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-bosque border-2 border-dorado/30 group-hover:border-dorado rounded-full p-3 xl:p-2.5 transition-all duration-500">
                  <div className="text-dorado group-hover:scale-110 transition-transform duration-500">
                    {method.icon}
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="pt-10 text-center">
                <h3 className="text-xl lg:text-2xl xl:text-lg font-bold text-marfil mb-3 group-hover:text-dorado transition-colors duration-300">
                  {method.name}
                </h3>
                <p className="text-marfil/60 text-xs lg:text-sm xl:text-xs">
                  {method.description}
                </p>
                {method.badge && (
                  <span className="inline-block mt-3 px-3 py-1 text-[10px] lg:text-xs font-bold tracking-wider text-dorado border border-dorado/60 rounded-full">
                    {method.badge}
                  </span>
                )}
              </div>

              {/* Decoración inferior */}
              <div className="absolute bottom-3 left-3 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-dorado to-transparent"></div>
                <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-b from-dorado to-transparent"></div>
              </div>
              <div className="absolute top-3 right-3 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-dorado to-transparent"></div>
                <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-t from-dorado to-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Texto adicional */}
        <div className="text-center mt-16">
          <p className="text-marfil/40 text-sm italic">
            Procesamiento seguro y confiable
          </p>
        </div>
      </div>
    </section>
  )
}
