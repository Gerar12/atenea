'use client'

import { useState, useEffect } from 'react'

const CLOUDINARY_BASE =
  'https://res.cloudinary.com/dewy8qqaf/video/upload'

type Tour = {
  id: string
  title: string
  publicId: string
}

const tours: Tour[] = [
  { id: 'parte-1', title: 'Recorrido — Parte 1', publicId: 'atenea/recorridos/parte-1' },
  { id: 'parte-2', title: 'Recorrido — Parte 2', publicId: 'atenea/recorridos/parte-2' },
  { id: 'parte-3', title: 'Recorrido — Parte 3', publicId: 'atenea/recorridos/parte-3' },
]

const videoUrl = (publicId: string) =>
  `${CLOUDINARY_BASE}/q_auto,f_auto/${publicId}.mp4`

const posterUrl = (publicId: string) =>
  `${CLOUDINARY_BASE}/so_2,w_1280,q_auto,f_auto/${publicId}.jpg`

export default function VirtualTours() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeIndex])

  return (
    <>
      <section id="recorridos" className="py-20 lg:py-28 bg-bosque relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-dorado/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-dorado/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-dorado/60" />
              <div className="w-12 h-12 border border-dorado/40 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-dorado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-dorado/60" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-marfil mb-4">
              Recorridos <span className="font-bold text-dorado">Virtuales</span>
            </h2>
            <p className="text-marfil/70 text-lg max-w-2xl mx-auto">
              Sumérgete en el proyecto a través de tres recorridos en alta calidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tours.map((tour, index) => (
              <button
                key={tour.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-dorado/30 hover:ring-dorado/70 transition-all duration-500 cursor-pointer bg-bosque/60 p-0 border-0"
                aria-label={`Ver ${tour.title}`}
                style={{ minHeight: '180px' }}
              >
                <img
                  src={posterUrl(tour.publicId)}
                  alt={tour.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bosque/95 via-bosque/30 to-bosque/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-dorado/90 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-dorado">
                    <svg className="w-7 h-7 sm:w-9 sm:h-9 text-bosque ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                  <h3 className="text-marfil text-lg font-medium tracking-wide drop-shadow-lg">{tour.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-dorado transition-colors z-[110]"
            onClick={() => setActiveIndex(null)}
            aria-label="Cerrar video"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-6xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={tours[activeIndex].id}
              className="w-full h-full rounded-lg"
              src={videoUrl(tours[activeIndex].publicId)}
              poster={posterUrl(tours[activeIndex].publicId)}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </>
  )
}
