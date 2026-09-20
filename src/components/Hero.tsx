'use client'

import Image from 'next/image'

const HERO_VIDEO_URL = '/videos/hero.mp4'
const HERO_VIDEO_POSTER = '/videos/hero-poster.jpg'

export default function Hero() {
  return (
    <>
      <section className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-bosque">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={HERO_VIDEO_URL}
          poster={HERO_VIDEO_POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Recorrido virtual de Residencial Atenea"
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-bosque/95 via-bosque/70 to-bosque/30" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-bosque/60 via-transparent to-bosque/40" />

        <div className="absolute top-24 right-6 sm:top-28 sm:right-10 z-20 pointer-events-none">
          <Image src="/a.svg" alt="Atenea" width={70} height={70} className="opacity-60" />
        </div>

        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-20 py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="w-20 h-1 bg-dorado mb-8" />

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-marfil mb-8 leading-tight drop-shadow-lg">
              Residencial
              <span className="block font-bold">Atenea</span>
            </h1>

            <p className="text-base lg:text-lg xl:text-xl text-marfil/90 mb-6 font-light leading-relaxed drop-shadow-md">
              Un concepto único en El Salvador. Experimenta un espacio diferente con una laguna turquesa, con playas privadas, espacios deportivos caminos peatonales y una futura marina al estero. Sé parte de un paraíso exclusivo en un proyecto innovador y con gran oportunidad de inversión en el país.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
