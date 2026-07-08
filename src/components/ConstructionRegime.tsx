export default function ConstructionRegime() {
  const features = [
    "El diseño se inspira en la arquitectura boho–mediterránea con matices balineses, donde predominan las texturas orgánicas, la iluminación cálida y los tonos terrosos. Los interiores transmiten una sensación de refugio relajante y sofisticado, donde la naturaleza se convierte en el eje central del confort.",
    "La decoración interior se basa en el diseño artesanal contemporáneo: lámparas tejidas, espejos de fibra natural, cerámica de acabado mate y mobiliario en maderas sólidas con textura viva. Cada elemento decorativo ha sido seleccionado para evocar autenticidad y serenidad, evitando el exceso y priorizando la funcionalidad estética.",
    "Esta vivienda está pensada para quienes buscan un estilo de vida relajado, exclusivo y conectado con la naturaleza, donde cada amanecer se vive con el sonido del mar y cada rincón invita al descanso. Un refugio contemporáneo que celebra el lujo del espacio, la calma y la autenticidad."
  ]

  return (
    <section className="relative bg-gradient-to-b from-bosque to-bosque/95 py-20 lg:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <div className="w-20 h-1 bg-dorado mx-auto mb-8"></div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-marfil mb-6">
            Régimen de construcción para <span className="font-bold text-dorado">viviendas</span>
          </h2>
        </div>

        {/* Descripción principal */}
        <div className="max-w-5xl mx-auto mb-12">
          <p className="text-lg lg:text-xl text-marfil/80 leading-relaxed text-center mb-8">
            Las viviendas representan una fusión armónica entre el diseño tropical contemporáneo y el lujo natural, evocando la serenidad de un retiro costero con la calidez de una casa boutique. Cada espacio está diseñado para conectar al residente con el entorno, integrando elementos naturales, materiales nobles y una atmósfera de bienestar sensorial.
          </p>
          <p className="text-xl lg:text-2xl text-dorado font-medium text-center">
            El proyecto residencial Atenea cuenta con 4 diseños únicos y exclusivos para la construcción de tu vivienda.
          </p>
        </div>

        {/* Características en tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-bosque/50 border border-dorado/30 rounded-2xl p-8 hover:border-dorado transition-all duration-500 hover:shadow-xl hover:shadow-dorado/10"
            >
              {/* Número decorativo */}
              <div className="absolute -top-4 left-8">
                <div className="bg-dorado text-bosque w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>

              {/* Contenido */}
              <p className="text-marfil/70 leading-relaxed text-sm lg:text-base pt-4">
                {feature}
              </p>

              {/* Decoración inferior */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dorado/20 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Decoración de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-dorado/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </section>
  )
}
