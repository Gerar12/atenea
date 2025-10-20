export default function PaymentMethods() {
  const methods = [
    {
      name: "Tarjetas",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
        </svg>
      ),
      description: "Visa, Mastercard, American Express"
    },
    {
      name: "Transferencia",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
        </svg>
      ),
      description: "Transferencia bancaria directa"
    },
    {
      name: "Bitcoin",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      description: "Criptomonedas aceptadas"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {methods.map((method, index) => (
            <div
              key={index}
              className="group relative bg-bosque border-2 border-dorado/30 rounded-2xl p-8 lg:p-10 hover:border-dorado transition-all duration-500 hover:shadow-2xl hover:shadow-dorado/20"
            >
              {/* Decoración superior */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-bosque border-2 border-dorado/30 group-hover:border-dorado rounded-full p-4 transition-all duration-500">
                  <div className="text-dorado group-hover:scale-110 transition-transform duration-500">
                    {method.icon}
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="pt-12 text-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-marfil mb-4 group-hover:text-dorado transition-colors duration-300">
                  {method.name}
                </h3>
                <p className="text-marfil/60 text-sm lg:text-base">
                  {method.description}
                </p>
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
