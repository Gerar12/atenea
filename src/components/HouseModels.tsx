'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import { NextButton, PrevButton, useCarouselButtons } from './ui/carousel-button'
import { CarouselIndicator, useCarouselIndicator } from './ui/carousel-indicator'

const TWEEN_FACTOR_BASE = 2.5
const MAX_SCALE = 0.85

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

const houseModels = [
  {
    id: 1,
    name: 'Casa Boreal',
    description: 'Casa moderna de 2 niveles con amplios espacios y diseño contemporáneo',
    images: [
      '/casas-renders/casa boreal/Copia de C2Escena 6 (1).webp',
      '/casas-renders/casa boreal/Copia de C2Escena 6 (2).webp',
      '/casas-renders/casa boreal/Copia de C2Escena 6 (3).webp',
      '/casas-renders/casa boreal/Copia de C2Escena 6 (4).webp',
      '/casas-renders/casa boreal/Copia de C2Escena 6 (5).webp',
      '/casas-renders/casa boreal/Copia de C2Escena 6 (6).webp',
      '/casas-renders/casa boreal/Copia de C2Escena 6 (9).webp',
      '/casas-renders/casa boreal/Copia de C2Escena 6 (20).webp',
      '/casas-renders/casa boreal/Copia de C2Escena 6 (26).webp',
      '/casas-renders/casa boreal/Copia de C2Escena 6 (28).webp',
    ],
    area: '180 m2',
    bedrooms: 3,
    bathrooms: 2.5,
    price: 'Desde $125,000',
    features: [
      'Sala y comedor integrados',
      'Cocina moderna con isla',
      'Terraza con vista al manglar',
      'Closets amplios en todas las habitaciones',
      'Parqueo para 2 vehiculos',
      'Jardin privado',
    ],
    amenities: [
      'Acabados de primera calidad',
      'Pisos de porcelanato',
      'Ventanas de aluminio y vidrio',
      'Pre-instalacion para aire acondicionado',
    ],
  },
  {
    id: 2,
    name: 'Casa Icaro',
    description: 'Diseño integrado con la naturaleza, amplia terraza y vistas panorámicas',
    images: [
      '/casas-renders/casa icaro/Copia de 10.webp',
      '/casas-renders/casa icaro/Copia de 11.webp',
      '/casas-renders/casa icaro/Copia de 12.webp',
      '/casas-renders/casa icaro/Copia de 2.webp',
      '/casas-renders/casa icaro/Copia de 5.webp',
      '/casas-renders/casa icaro/Copia de 8.webp',
      '/casas-renders/casa icaro/Copia de 9.webp',
    ],
    area: '200 m2',
    bedrooms: 4,
    bathrooms: 3,
    price: 'Desde $155,000',
    features: [
      'Habitacion principal con walking closet',
      'Estudio o cuarto de servicio',
      'Terraza amplia en segundo nivel',
      'Sala de estar familiar',
      'Parqueo para 3 vehiculos',
      'Jardin frontal y trasero',
    ],
    amenities: [
      'Acabados premium',
      'Cocina con gabinetes de madera',
      'Iluminacion LED integrada',
      'Sistema de seguridad pre-instalado',
    ],
  },
  {
    id: 3,
    name: 'Casa Olivo',
    description: 'Inspirada en la naturaleza con espacios abiertos y conexión al exterior',
    images: [
      '/casas-renders/casa olivo/Copia de Escena 1.webp',
      '/casas-renders/casa olivo/Copia de Escena 2.webp',
      '/casas-renders/casa olivo/Copia de Escena 12.webp',
      '/casas-renders/casa olivo/Copia de Escena 13.webp',
      '/casas-renders/casa olivo/Copia de Escena 17.webp',
      '/casas-renders/casa olivo/Copia de Escena 19.webp',
      '/casas-renders/casa olivo/Copia de Escena 33.webp',
      '/casas-renders/casa olivo/Copia de Escena 37.webp',
    ],
    area: '165 m2',
    bedrooms: 3,
    bathrooms: 2,
    price: 'Desde $115,000',
    features: [
      'Diseño de un nivel',
      'Acceso directo al jardin',
      'Sala y comedor abiertos',
      'Cocina integrada',
      'Parqueo techado para 2 vehiculos',
      'Patio trasero amplio',
    ],
    amenities: [
      'Pisos de ceramica',
      'Puertas de madera solida',
      'Instalacion electrica completa',
      'Griferias de alta calidad',
    ],
  },
  {
    id: 4,
    name: 'Casa Selene',
    description: 'Elegancia y lujo en cada detalle, con acabados premium',
    images: [
      '/casas-renders/casa selene/Copia de 1.webp',
      '/casas-renders/casa selene/Copia de 3.webp',
      '/casas-renders/casa selene/Copia de 5.webp',
      '/casas-renders/casa selene/Copia de 8.webp',
      '/casas-renders/casa selene/Copia de 11.webp',
      '/casas-renders/casa selene/Copia de 12.webp',
    ],
    area: '220 m2',
    bedrooms: 4,
    bathrooms: 3.5,
    price: 'Desde $185,000',
    features: [
      'Suite principal de lujo con balcon',
      'Oficina privada',
      'Sala de TV o game room',
      'Cocina gourmet con electrodomesticos',
      'Parqueo para 3 vehiculos',
      'Jardin con area de BBQ',
    ],
    amenities: [
      'Acabados de lujo importados',
      'Marmol en baños principales',
      'Smart home pre-instalado',
      'Sistema de paneles solares opcional',
    ],
  },
]

export default function HouseModels() {
  const [selectedModel, setSelectedModel] = useState<number | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [cardImageIndexes, setCardImageIndexes] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  })
  const [modalImageIndex, setModalImageIndex] = useState(0)
  const [imageTransitioning, setImageTransitioning] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
  })
  const [modalImageTransitioning, setModalImageTransitioning] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      slidesToScroll: 1,
      containScroll: 'trimSnaps',
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    useCarouselButtons(emblaApi)

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useCarouselIndicator(emblaApi)

  const openModal = (modelId: number) => {
    setSelectedModel(modelId)
    setIsClosing(false)
    setModalImageIndex(0)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelectedModel(null)
      setIsClosing(false)
      document.body.style.overflow = ''
    }, 300)
  }

  const nextCardImage = (modelId: number, imagesLength: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setImageTransitioning(prev => ({ ...prev, [modelId]: true }))
    setTimeout(() => {
      setCardImageIndexes(prev => ({
        ...prev,
        [modelId]: (prev[modelId] + 1) % imagesLength
      }))
      setTimeout(() => {
        setImageTransitioning(prev => ({ ...prev, [modelId]: false }))
      }, 50)
    }, 150)
  }

  const prevCardImage = (modelId: number, imagesLength: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setImageTransitioning(prev => ({ ...prev, [modelId]: true }))
    setTimeout(() => {
      setCardImageIndexes(prev => ({
        ...prev,
        [modelId]: prev[modelId] === 0 ? imagesLength - 1 : prev[modelId] - 1
      }))
      setTimeout(() => {
        setImageTransitioning(prev => ({ ...prev, [modelId]: false }))
      }, 50)
    }, 150)
  }

  const nextModalImage = (imagesLength: number) => {
    setModalImageTransitioning(true)
    setTimeout(() => {
      setModalImageIndex((prev) => (prev + 1) % imagesLength)
      setTimeout(() => {
        setModalImageTransitioning(false)
      }, 50)
    }, 150)
  }

  const prevModalImage = (imagesLength: number) => {
    setModalImageTransitioning(true)
    setTimeout(() => {
      setModalImageIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1))
      setTimeout(() => {
        setModalImageTransitioning(false)
      }, 50)
    }, 150)
  }

  const selectGalleryImage = (index: number) => {
    setModalImageTransitioning(true)
    setTimeout(() => {
      setModalImageIndex(index)
      setTimeout(() => {
        setModalImageTransitioning(false)
      }, 50)
    }, 150)
    // Scroll suave hacia arriba para ver la imagen principal
    const modalContent = document.querySelector('.modal-content')
    if (modalContent) {
      modalContent.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextLightboxImage = (imagesLength: number) => {
    setLightboxImageIndex((prev) => (prev + 1) % imagesLength)
  }

  const prevLightboxImage = (imagesLength: number) => {
    setLightboxImageIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1))
  }

  const currentModel = houseModels.find(m => m.id === selectedModel)

  // Navegación con teclado en el modal
  useEffect(() => {
    if (!selectedModel || !currentModel) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          prevLightboxImage(currentModel.images.length)
        } else if (e.key === 'ArrowRight') {
          nextLightboxImage(currentModel.images.length)
        } else if (e.key === 'Escape') {
          closeLightbox()
        }
      } else {
        if (e.key === 'ArrowLeft') {
          prevModalImage(currentModel.images.length)
        } else if (e.key === 'ArrowRight') {
          nextModalImage(currentModel.images.length)
        } else if (e.key === 'Escape') {
          closeModal()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedModel, currentModel, modalImageIndex, lightboxOpen, lightboxImageIndex])

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode: HTMLElement) => {
      return slideNode.querySelector('.model-card') as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()
      const slidesInView = emblaApi.slidesInView()
      const isScrollEvent = eventName === 'scroll'

      emblaApi
        .scrollSnapList()
        .forEach((scrollSnap: number, snapIndex: number) => {
          let diffToTarget = scrollSnap - scrollProgress
          const slidesInSnap = engine.slideRegistry[snapIndex]

          slidesInSnap.forEach((slideIndex: number) => {
            if (isScrollEvent && !slidesInView.includes(slideIndex)) return

            if (engine.options.loop) {
              engine.slideLooper.loopPoints.forEach((loopItem: any) => {
                const target = loopItem.target()
                if (slideIndex === loopItem.index && target !== 0) {
                  const sign = Math.sign(target)
                  if (sign === -1) {
                    diffToTarget = scrollSnap - (1 + scrollProgress)
                  }
                  if (sign === 1) {
                    diffToTarget = scrollSnap + (1 - scrollProgress)
                  }
                }
              })
            }

            const tweenValue = Math.abs(diffToTarget * tweenFactor.current)
            const scale = numberWithinRange(1 - tweenValue * 0.3, MAX_SCALE, 1)
            const tweenNode = tweenNodes.current[slideIndex]
            if (tweenNode) {
              tweenNode.style.transform = `scale(${scale})`
              tweenNode.style.transition = 'transform 0.3s ease-out'
            }
          })
        })
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return
    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)
    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
    return () => {
      emblaApi
        .off('reInit', setTweenNodes)
        .off('reInit', setTweenFactor)
        .off('reInit', tweenScale)
        .off('scroll', tweenScale)
    }
  }, [emblaApi, setTweenFactor, setTweenNodes, tweenScale])

  return (
    <section className="w-full bg-gradient-to-b from-arena to-marfil py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-20 h-1 bg-dorado mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-bosque mb-4">
            Nuestros Modelos
          </h2>
          <p className="text-lg text-bosque/70 max-w-2xl mx-auto">
            Descubre las opciones de vivienda diseñadas especialmente para ti y tu familia
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="overflow-visible py-10" ref={emblaRef}>
            <div className="flex">
              {houseModels.map((model) => (
                <div
                  key={model.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
                >
                  <div className="model-card bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                    <div className="relative h-64 md:h-72 overflow-hidden group">
                      <Image
                        src={model.images[cardImageIndexes[model.id]]}
                        alt={`${model.name} - Imagen ${cardImageIndexes[model.id] + 1}`}
                        fill
                        className={`object-cover transition-all ${
                          imageTransitioning[model.id]
                            ? 'opacity-0 scale-95 duration-150'
                            : 'opacity-100 scale-100 duration-300 group-hover:scale-110'
                        }`}
                      />

                      {/* Logo marca de agua */}
                      <div className="absolute top-4 right-4 z-10">
                        <Image
                          src="/a.svg"
                          alt="Atenea"
                          width={60}
                          height={60}
                          className="opacity-70"
                        />
                      </div>

                      {/* Flechas del carrusel de imagenes */}
                      <button
                        onClick={(e) => prevCardImage(model.id, model.images.length, e)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 shadow-lg"
                      >
                        <svg className="w-5 h-5 text-bosque" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => nextCardImage(model.id, model.images.length, e)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 shadow-lg"
                      >
                        <svg className="w-5 h-5 text-bosque" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Indicador de imagen actual */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-20">
                        {cardImageIndexes[model.id] + 1} / {model.images.length}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-bosque/80 via-bosque/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-bosque mb-2">
                        {model.name}
                      </h3>
                      <p className="text-bosque/60 mb-4 text-sm">
                        {model.description}
                      </p>

                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-dorado">
                            {model.area}
                          </div>
                          <div className="text-xs text-bosque/60 uppercase">
                            Area
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-dorado">
                            {model.bedrooms}
                          </div>
                          <div className="text-xs text-bosque/60 uppercase">
                            Habitaciones
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-dorado">
                            {model.bathrooms}
                          </div>
                          <div className="text-xs text-bosque/60 uppercase">
                            Baños
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => openModal(model.id)}
                        className="block w-full text-center px-6 py-3 bg-dorado text-white font-semibold rounded-lg hover:bg-dorado/90 transition-colors duration-300"
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Efecto blur en los bordes */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-40 md:block" style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)'
          }}></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-40 md:block" style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.8), transparent)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.8), transparent)'
          }}></div>

          <div className="hidden md:block">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white shadow-xl text-dorado hover:bg-dorado hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center border-2 border-dorado/20"
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white shadow-xl text-dorado hover:bg-dorado hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center border-2 border-dorado/20"
            />
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <CarouselIndicator
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-dorado w-8'
                    : 'bg-dorado/30 hover:bg-dorado/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      {selectedModel && currentModel && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4"
          style={{
            animation: isClosing ? 'fadeOut 0.3s ease-out forwards' : 'fadeIn 0.3s ease-out forwards'
          }}
        >
          {/* Overlay - solo visible en desktop */}
          <div
            className="hidden sm:block absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div
            className="modal-content relative bg-white sm:rounded-2xl max-w-4xl w-full h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto shadow-2xl scroll-smooth"
            style={{
              animation: isClosing ? 'slideDown 0.3s ease-out forwards' : 'slideUp 0.3s ease-out forwards',
              paddingTop: 'env(safe-area-inset-top, 0px)'
            }}
          >
            {/* Header con imagen */}
            <div className="relative h-56 sm:h-64 md:h-80 overflow-hidden sm:rounded-t-2xl group" style={{ marginTop: '-env(safe-area-inset-top, 0px)' }}>
              <button
                onClick={() => openLightbox(modalImageIndex)}
                className="absolute inset-0 z-10 cursor-zoom-in"
              >
                <Image
                  src={currentModel.images[modalImageIndex]}
                  alt={`${currentModel.name} - Imagen ${modalImageIndex + 1}`}
                  fill
                  className={`object-cover transition-all ${
                    modalImageTransitioning
                      ? 'opacity-0 scale-95 duration-150'
                      : 'opacity-100 scale-100 duration-300 group-hover:scale-105'
                  }`}
                />
                {/* Indicador de zoom */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-bosque px-4 py-2 rounded-lg flex items-center gap-2 shadow-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span className="text-sm font-medium">Click para ampliar</span>
                  </div>
                </div>
              </button>
              {/* Logo marca de agua */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
                <Image
                  src="/a.svg"
                  alt="Atenea"
                  width={50}
                  height={50}
                  className="opacity-80 sm:w-[80px] sm:h-[80px]"
                />
              </div>
              {/* Boton cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-4 left-4 sm:left-4 w-10 h-10 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg z-20"
              >
                <svg className="w-6 h-6 text-bosque" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Flechas del carrusel de imagenes en modal */}
              <button
                onClick={() => prevModalImage(currentModel.images.length)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg z-20"
              >
                <svg className="w-6 h-6 text-bosque" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => nextModalImage(currentModel.images.length)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg z-20"
              >
                <svg className="w-6 h-6 text-bosque" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Indicador de imagen actual en modal */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1.5 rounded-full z-20">
                {modalImageIndex + 1} / {currentModel.images.length}
              </div>
            </div>

            {/* Contenido */}
            <div className="p-5 pb-8 sm:p-6 md:p-10">
              {/* Título y precio */}
              <div className="mb-5 sm:mb-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-bosque mb-2">
                  {currentModel.name}
                </h3>
                <p className="text-sm sm:text-base text-bosque/70 mb-3">
                  {currentModel.description}
                </p>
                <div className="text-2xl sm:text-3xl font-bold text-dorado">
                  {currentModel.price}
                </div>
              </div>

              {/* Características principales */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-5 sm:mb-8 p-4 sm:p-6 bg-marfil rounded-xl">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-dorado mb-1 sm:mb-2">
                    {currentModel.area}
                  </div>
                  <div className="text-xs sm:text-sm text-bosque/70 uppercase tracking-wide">
                    Area
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-dorado mb-1 sm:mb-2">
                    {currentModel.bedrooms}
                  </div>
                  <div className="text-xs sm:text-sm text-bosque/70 uppercase tracking-wide">
                    Habitaciones
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-dorado mb-1 sm:mb-2">
                    {currentModel.bathrooms}
                  </div>
                  <div className="text-xs sm:text-sm text-bosque/70 uppercase tracking-wide">
                    Baños
                  </div>
                </div>
              </div>

              {/* Características detalladas */}
              <div className="grid md:grid-cols-2 gap-5 sm:gap-8 mb-5 sm:mb-8">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-bosque mb-3 sm:mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-dorado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Caracteristicas
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {currentModel.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-dorado flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm sm:text-base text-bosque/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-bosque mb-3 sm:mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-dorado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Acabados
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {currentModel.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-dorado flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm sm:text-base text-bosque/80">{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Galería de imágenes */}
              <div className="mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl font-bold text-bosque mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-dorado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Galería de imágenes
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {currentModel.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openLightbox(index)}
                      className="relative aspect-square rounded-xl overflow-hidden group cursor-zoom-in transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10"
                    >
                      <Image
                        src={image}
                        alt={`${currentModel.name} - Vista ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Número de imagen */}
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-full z-10 backdrop-blur-sm">
                        {index + 1}
                      </div>
                      {/* Icono de zoom al hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-bosque p-3 rounded-full shadow-xl transform group-hover:scale-110">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                      {/* Overlay hover con gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bosque/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="https://salex.sv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-6 sm:px-8 py-3 sm:py-4 bg-dorado text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-dorado/90 transition-colors duration-300 shadow-lg"
                >
                  Contactar Asesor
                </a>
                <button
                  onClick={closeModal}
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-bosque/20 text-bosque font-semibold text-sm sm:text-base rounded-lg hover:bg-bosque/5 transition-colors duration-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox para ver imágenes en pantalla completa */}
      {lightboxOpen && currentModel && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 animate-fadeIn">
          {/* Imagen principal */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={currentModel.images[lightboxImageIndex]}
              alt={`${currentModel.name} - Imagen ${lightboxImageIndex + 1}`}
              fill
              className="object-contain"
            />

            {/* Logo marca de agua */}
            <div className="absolute top-8 right-8 z-10 opacity-50">
              <Image
                src="/a.svg"
                alt="Atenea"
                width={80}
                height={80}
              />
            </div>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-20 group"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Flechas de navegación */}
          <button
            onClick={() => prevLightboxImage(currentModel.images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-20"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => nextLightboxImage(currentModel.images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-20"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicador de imagen actual */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full z-20">
            {lightboxImageIndex + 1} / {currentModel.images.length}
          </div>

          {/* Thumbnails en la parte inferior */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 max-w-full overflow-x-auto z-20 px-4" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            <div className="flex gap-2">
              {currentModel.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxImageIndex(index)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                    lightboxImageIndex === index
                      ? 'ring-3 ring-dorado scale-110'
                      : 'opacity-50 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info del modelo */}
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg z-20">
            <div className="text-sm font-medium">{currentModel.name}</div>
          </div>
        </div>
      )}

      {/* Animaciones CSS */}
      <style jsx global>{`
        /* Ocultar scrollbar para thumbnails del lightbox */
        div[style*="scrollbarWidth"]::-webkit-scrollbar {
          display: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }

        /* Desktop animations */
        @media (min-width: 640px) {
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes slideDown {
            from {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            to {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
          }
        }
      `}</style>
    </section>
  )
}
