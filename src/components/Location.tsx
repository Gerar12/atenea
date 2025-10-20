export default function Location() {
  return (
    <section className="relative bg-gradient-to-b from-bosque/95 to-bosque py-20 lg:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Contenedor principal */}
        <div className="max-w-5xl mx-auto text-center">
          {/* Decoración superior */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-dorado"></div>
            <svg className="w-8 h-8 text-dorado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-dorado"></div>
          </div>

          {/* Título */}
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-marfil mb-8">
            Residencial <span className="font-bold text-dorado">Atenea</span>
          </h2>

          {/* Descripción */}
          <div className="relative border border-dorado/30 rounded-2xl p-8 lg:p-12 bg-bosque/50 hover:border-dorado transition-all duration-500">
            <p className="text-xl lg:text-2xl text-marfil/80 leading-relaxed mb-6">
              Ubicada en <span className="text-dorado font-medium">Blvd. Costa del Sol km 65, San Luis la Herradura</span>
            </p>
            <p className="text-lg lg:text-xl text-marfil/70 leading-relaxed">
              Se parte del futuro costero en El Salvador, en una de las zonas más exclusivas y privadas del país.
            </p>

            {/* Decoraciones */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dorado/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dorado/30 to-transparent"></div>
          </div>

          {/* Badge decorativo */}
          <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-marfil/60">
              <svg className="w-6 h-6 text-dorado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span className="text-sm lg:text-base">Zona exclusiva</span>
            </div>
            <div className="flex items-center gap-2 text-marfil/60">
              <svg className="w-6 h-6 text-dorado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span className="text-sm lg:text-base">Acceso privado</span>
            </div>
            <div className="flex items-center gap-2 text-marfil/60">
              <svg className="w-6 h-6 text-dorado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span className="text-sm lg:text-base">Frente al mar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Efecto de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dorado/5 to-transparent pointer-events-none"></div>
    </section>
  )
}
