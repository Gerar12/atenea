'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const images = [
  "https://res.cloudinary.com/dewy8qqaf/image/upload/f_auto,q_auto/v1758579860/2_wfwkmq.png",
  "https://res.cloudinary.com/dewy8qqaf/image/upload/f_auto,q_auto/v1758591182/Enscape_2025-09-22-12-05-49_optimizada_astsfg.jpg"
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const totalSlides = images.length

  const showSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const showLightboxImage = (index: number) => {
    setLightboxIndex((index + images.length) % images.length)
  }

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  // Handle ESC key for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <section className="relative h-auto md:h-[600px] lg:h-[700px] xl:h-[750px] flex items-center justify-center overflow-hidden mt-20 md:mt-24 lg:mt-28 xl:mt-32 px-4">
        {/* Split layout */}
        <div className="flex flex-col lg:flex-row w-full h-full max-w-[1600px] mx-auto overflow-hidden">

          {/* Lado izquierdo - Contenido (50%) - En móvil aparece segundo */}
          <div className="lg:w-1/2 flex items-center justify-center px-8 py-10 lg:py-20 lg:px-20 bg-bosque order-2 lg:order-1">
            <div className="max-w-xl w-full">
              {/* Línea decorativa */}
              <div className="w-20 h-1 bg-dorado mb-8"></div>

              {/* Título */}
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light text-marfil mb-8 leading-tight">
                Residencial
                <span className="block font-bold">Atenea</span>
              </h1>

              {/* Descripción minimalista */}
              <p className="text-xl lg:text-2xl xl:text-3xl text-marfil/80 mb-12 font-light leading-relaxed">
                Un enclave único donde la naturaleza se convierte en tu mayor lujo.
              </p>

              {/* CTA único y elegante */}
              <Link
                href="/reservar"
                className="inline-block bg-transparent border-2 border-dorado text-dorado px-12 py-4 hover:bg-dorado hover:text-bosque transition-all duration-500 font-medium tracking-wider text-lg"
              >
                DESCUBRIR
              </Link>

              {/* Info mínima */}
              <div className="mt-16 flex gap-12">
                <div>
                  <p className="text-3xl lg:text-4xl font-light text-dorado">5min</p>
                  <p className="text-sm text-marfil/60 uppercase tracking-widest mt-2">Del mar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado derecho - Imagen (50%) - En móvil aparece primero */}
          <div className="lg:w-1/2 relative h-[450px] sm:h-[500px] lg:h-full bg-bosque order-1 lg:order-2">
            {/* Contenedor con borde decorativo */}
            <div className="absolute inset-4 sm:inset-6 lg:inset-16">
              {/* Marco dorado con bordes redondeados */}
              <div className="absolute inset-0 border-2 border-dorado/40 rounded-3xl"></div>

              {/* Carousel de imágenes */}
              <div className="relative w-full h-full p-3 overflow-hidden rounded-3xl">
                {/* Contenedor de slides */}
                <div className="carousel-container relative w-full h-full">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`carousel-slide absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div
                        className="relative w-full h-full cursor-zoom-in"
                        onClick={() => openLightbox(index)}
                      >
                        <Image
                          src={img}
                          alt={`Vista del proyecto ${index + 1}`}
                          fill
                          className="object-cover object-center rounded-2xl brightness-50"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Logo a.svg en esquina superior derecha */}
                <div className="absolute top-6 right-6 z-10">
                  <Image
                    src="/a.svg"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-90 drop-shadow-2xl"
                  />
                </div>

                {/* Indicadores del carousel */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-dot w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? 'bg-dorado w-8' : 'bg-marfil/50'
                      }`}
                      onClick={() => showSlide(index)}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Controles de navegación */}
                <button
                  className="carousel-prev absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-marfil p-3 rounded-full transition-all z-10"
                  onClick={prevSlide}
                  aria-label="Imagen anterior"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  className="carousel-next absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-marfil p-3 rounded-full transition-all z-10"
                  onClick={nextSlide}
                  aria-label="Siguiente imagen"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>

                {/* Decoración elegante en esquinas */}
                <div className="absolute top-3 left-3 w-20 h-20">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-dorado to-transparent"></div>
                  <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-dorado to-transparent"></div>
                </div>
                <div className="absolute bottom-3 right-3 w-20 h-20">
                  <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-dorado to-transparent"></div>
                  <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-dorado to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-bosque/10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Modal Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Botón cerrar */}
          <button
            className="absolute top-4 right-4 text-white hover:text-dorado transition-colors z-[110]"
            onClick={closeLightbox}
            aria-label="Cerrar imagen"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          {/* Contenedor de imagen */}
          <div
            className="relative max-w-7xl mx-auto w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[90vh]">
              <Image
                src={images[lightboxIndex]}
                alt="Vista ampliada del proyecto"
                fill
                className="object-contain rounded-lg"
              />
            </div>

            {/* Controles del lightbox */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
              onClick={() => showLightboxImage(lightboxIndex - 1)}
              aria-label="Imagen anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
              onClick={() => showLightboxImage(lightboxIndex + 1)}
              aria-label="Siguiente imagen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}