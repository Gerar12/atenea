'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import LeadModal from './LeadModal'

const HERO_VIDEO_URL = '/videos/hero.mp4'
const HERO_VIDEO_POSTER = '/videos/hero-poster.jpg'

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false)

  // Abrir el modal automáticamente en cada carga de la página y avisar al
  // banner de cookies para que espere a que se cierre antes de mostrarse.
  useEffect(() => {
    window.__leadModalPending = true
    setModalOpen(true)
  }, [])

  const closeModal = () => {
    setModalOpen(false)
    window.__leadModalPending = false
    window.dispatchEvent(new Event('lead-modal-done'))
  }

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

            <div className="space-y-4">
              <p className="text-marfil/80 text-sm lg:text-base drop-shadow">
                Déjanos tus datos y te contactamos lo más pronto posible
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-dorado/10 backdrop-blur-md border-2 border-dorado text-dorado hover:bg-dorado hover:text-bosque transition-all duration-500 font-medium tracking-wider rounded-md"
              >
                QUIERO INFORMACIÓN
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={closeModal} />
    </>
  )
}
