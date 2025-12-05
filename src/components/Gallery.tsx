'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Componente reutilizable para cada imagen de la galería
function GalleryImage({
  img,
  index,
  onClick,
  className = '',
  featured = false
}: {
  img: string
  index: number
  onClick: (index: number) => void
  className?: string
  featured?: boolean
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${className}`}
      onClick={() => onClick(index)}
    >
      <Image
        src={img}
        alt={`Render ${index + 1} del proyecto`}
        fill
        className="object-cover transition-all duration-700 group-hover:scale-110"
        sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 25vw'}
      />

      {/* Overlay con gradiente elegante */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Efecto de brillo dorado al hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-dorado/0 via-dorado/10 to-dorado/0 opacity-0 group-hover:opacity-100 transition-all duration-700" />

      {/* Icono de zoom elegante */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full transform scale-50 group-hover:scale-100 transition-all duration-500 shadow-2xl">
          <svg className="w-6 h-6 text-bosque" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>

      {/* Número de imagen premium */}
      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
        <span className="text-white text-lg font-light tracking-wider">{String(index + 1).padStart(2, '0')}</span>
      </div>

      {/* Etiqueta destacada */}
      {featured && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <span className="bg-dorado/90 text-bosque text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Destacada
          </span>
        </div>
      )}

      {/* Borde dorado */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-dorado/60 rounded-2xl transition-all duration-500" />

      {/* Esquinas decorativas */}
      <div className="absolute top-2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-dorado"></div>
        <div className="absolute top-0 left-0 h-full w-[2px] bg-dorado"></div>
      </div>
      <div className="absolute bottom-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-dorado"></div>
        <div className="absolute bottom-0 right-0 h-full w-[2px] bg-dorado"></div>
      </div>
    </div>
  )
}

const galleryImages = [
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895546/renders/10.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895553/renders/11.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895566/renders/12.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895575/renders/13.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895582/renders/14.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895588/renders/15.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895596/renders/16.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895603/renders/17.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895610/renders/18.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895616/renders/19.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895622/renders/20.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895629/renders/21.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895636/renders/22.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895646/renders/24.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895653/renders/27.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895659/renders/28.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895667/renders/29.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895676/renders/3_1.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895681/renders/4_1.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895689/renders/5_1.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895696/renders/8.jpg",
  "https://res.cloudinary.com/dftway9sm/image/upload/v1764895704/renders/9.jpg"
]

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

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
    setLightboxIndex((index + galleryImages.length) % galleryImages.length)
  }

  // Handle ESC key and arrow keys for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') showLightboxImage(lightboxIndex - 1)
        if (e.key === 'ArrowRight') showLightboxImage(lightboxIndex + 1)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, lightboxIndex])

  return (
    <>
      <section id="galeria" className="py-20 lg:py-32 bg-marfil relative overflow-hidden">
        {/* Decoraciones de fondo */}
        {/* Círculo dorado grande difuminado */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-dorado/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-dorado/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Patrón de líneas diagonales sutiles */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            #1a2e1a 50px,
            #1a2e1a 51px
          )`
        }}></div>

        {/* Marcos decorativos en esquinas */}
        <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-dorado/20 pointer-events-none"></div>
        <div className="absolute top-8 right-8 w-32 h-32 border-r-2 border-t-2 border-dorado/20 pointer-events-none"></div>
        <div className="absolute bottom-8 left-8 w-32 h-32 border-l-2 border-b-2 border-dorado/20 pointer-events-none"></div>
        <div className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-dorado/20 pointer-events-none"></div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            {/* Icono decorativo */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-dorado/60"></div>
              <div className="w-12 h-12 border border-dorado/40 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-dorado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-dorado/60"></div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-bosque mb-6">
              Galería del <span className="font-bold text-dorado">Proyecto</span>
            </h2>
            <p className="text-bosque/70 text-lg max-w-2xl mx-auto">
              Explora los renders de Residencial Atenea y descubre cada detalle de tu futuro hogar
            </p>
          </div>

          {/* Galería con filas diseñadas - sin espacios vacíos */}
          <div className="flex flex-col gap-3">
            {/* Fila 1: 1 grande + 2 pequeñas apiladas */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-[300px] md:h-[400px]">
              <GalleryImage img={galleryImages[0]} index={0} onClick={openLightbox} className="col-span-2 md:col-span-2" featured />
              <div className="hidden md:grid grid-rows-2 gap-3">
                <GalleryImage img={galleryImages[1]} index={1} onClick={openLightbox} />
                <GalleryImage img={galleryImages[2]} index={2} onClick={openLightbox} />
              </div>
            </div>

            {/* Fila 1.5 móvil: las 2 que se ocultaron */}
            <div className="grid grid-cols-2 gap-3 h-[150px] md:hidden">
              <GalleryImage img={galleryImages[1]} index={1} onClick={openLightbox} />
              <GalleryImage img={galleryImages[2]} index={2} onClick={openLightbox} />
            </div>

            {/* Fila 2: 4 iguales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-[150px] md:h-[200px]">
              <GalleryImage img={galleryImages[3]} index={3} onClick={openLightbox} />
              <GalleryImage img={galleryImages[4]} index={4} onClick={openLightbox} />
              <GalleryImage img={galleryImages[5]} index={5} onClick={openLightbox} />
              <GalleryImage img={galleryImages[6]} index={6} onClick={openLightbox} />
            </div>

            {/* Fila 3: 2 pequeñas apiladas + 1 grande */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-[300px] md:h-[400px]">
              <div className="hidden md:grid grid-rows-2 gap-3">
                <GalleryImage img={galleryImages[7]} index={7} onClick={openLightbox} />
                <GalleryImage img={galleryImages[8]} index={8} onClick={openLightbox} />
              </div>
              <GalleryImage img={galleryImages[9]} index={9} onClick={openLightbox} className="col-span-2 md:col-span-2" featured />
            </div>

            {/* Fila 3.5 móvil */}
            <div className="grid grid-cols-2 gap-3 h-[150px] md:hidden">
              <GalleryImage img={galleryImages[7]} index={7} onClick={openLightbox} />
              <GalleryImage img={galleryImages[8]} index={8} onClick={openLightbox} />
            </div>

            {/* Fila 4: 3 iguales */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-[200px] md:h-[250px]">
              <GalleryImage img={galleryImages[10]} index={10} onClick={openLightbox} />
              <GalleryImage img={galleryImages[11]} index={11} onClick={openLightbox} />
              <GalleryImage img={galleryImages[12]} index={12} onClick={openLightbox} className="col-span-2 md:col-span-1" />
            </div>

            {/* Fila 5: 1 grande + 2 pequeñas apiladas */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-[300px] md:h-[400px]">
              <GalleryImage img={galleryImages[13]} index={13} onClick={openLightbox} className="col-span-2 md:col-span-2" featured />
              <div className="hidden md:grid grid-rows-2 gap-3">
                <GalleryImage img={galleryImages[14]} index={14} onClick={openLightbox} />
                <GalleryImage img={galleryImages[15]} index={15} onClick={openLightbox} />
              </div>
            </div>

            {/* Fila 5.5 móvil */}
            <div className="grid grid-cols-2 gap-3 h-[150px] md:hidden">
              <GalleryImage img={galleryImages[14]} index={14} onClick={openLightbox} />
              <GalleryImage img={galleryImages[15]} index={15} onClick={openLightbox} />
            </div>

            {/* Fila 6: 4 iguales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-[150px] md:h-[200px]">
              <GalleryImage img={galleryImages[16]} index={16} onClick={openLightbox} />
              <GalleryImage img={galleryImages[17]} index={17} onClick={openLightbox} />
              <GalleryImage img={galleryImages[18]} index={18} onClick={openLightbox} />
              <GalleryImage img={galleryImages[19]} index={19} onClick={openLightbox} />
            </div>

            {/* Fila 7: 2 últimas centradas */}
            <div className="grid grid-cols-2 gap-3 h-[200px] md:h-[300px] max-w-4xl mx-auto w-full">
              <GalleryImage img={galleryImages[20]} index={20} onClick={openLightbox} />
              <GalleryImage img={galleryImages[21]} index={21} onClick={openLightbox} />
            </div>
          </div>

          {/* Contador de imágenes */}
          <div className="text-center mt-12">
            <p className="text-bosque/50 text-sm tracking-widest uppercase">
              {galleryImages.length} imágenes del proyecto
            </p>
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

          {/* Contador de imagen actual */}
          <div className="absolute top-4 left-4 text-white/70 text-sm z-[110]">
            <span className="text-dorado font-medium">{lightboxIndex + 1}</span>
            <span className="mx-2">/</span>
            <span>{galleryImages.length}</span>
          </div>

          {/* Contenedor de imagen */}
          <div
            className="relative max-w-7xl mx-auto w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[90vh]">
              <Image
                src={galleryImages[lightboxIndex]}
                alt={`Vista ampliada del render ${lightboxIndex + 1}`}
                fill
                className="object-contain rounded-lg"
              />
            </div>

            {/* Controles del lightbox */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-dorado/80 text-white hover:text-bosque p-3 rounded-full transition-all duration-300"
              onClick={() => showLightboxImage(lightboxIndex - 1)}
              aria-label="Imagen anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-dorado/80 text-white hover:text-bosque p-3 rounded-full transition-all duration-300"
              onClick={() => showLightboxImage(lightboxIndex + 1)}
              aria-label="Siguiente imagen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Miniaturas en la parte inferior */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-2 px-4 z-[110]">
            {galleryImages.map((img, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex(index)
                }}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === lightboxIndex
                    ? 'ring-2 ring-dorado scale-110'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
