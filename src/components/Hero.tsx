'use client'

import { useState, useEffect, useCallback, useRef, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import { NextButton, PrevButton, useCarouselButtons } from './ui/carousel-button'
import { CarouselIndicator, useCarouselIndicator } from './ui/carousel-indicator'

const TWEEN_FACTOR_BASE = 2.5
const MAX_SCALE = 0.85

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

const images = [
  "/renders/1.webp",
  "/renders/2.webp",
  "/renders/3.webp",
  "/renders/4.webp",
  "/renders/5.webp",
  "/renders/6.webp",
  "/renders/7.webp",
  "/renders/8.webp",
  "/renders/9.webp",
  "/renders/10.webp",
  "/renders/11.webp",
  "/renders/12.webp",
  "/renders/13.webp",
  "/renders/14.webp",
  "/renders/15.webp",
  "/renders/16.webp",
  "/renders/17.webp",
  "/renders/18.webp",
  "/renders/19.webp",
  "/renders/20.webp",
  "/renders/21.webp",
  "/renders/22.webp",
  "/renders/23.webp",
  "/renders/24.webp",
  "/renders/25.webp",
  "/renders/26.webp",
  "/renders/27.webp",
  "/renders/28.webp",
  "/renders/29.webp",
]

export default function Hero() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

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

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode: HTMLElement) => {
      return slideNode.querySelector('.hero-slide-card') as HTMLElement
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

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()
    if (email && privacyAccepted && !isLoading) {
      setIsLoading(true)
      setErrorMessage('') // Limpiar mensajes de error previos
      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        })

        const data = await response.json()

        if (response.ok || data.message === 'Ya estás suscrito') {
          if (data.message === 'Ya estás suscrito') {
            setErrorMessage('¡Este correo ya está registrado! 🎉')
            setTimeout(() => {
              setErrorMessage('')
            }, 4000)
          } else {
            setSubscribed(true)
            setTimeout(() => {
              setSubscribed(false)
              setEmail('')
              setPrivacyAccepted(false)
            }, 3000)
          }
        }
      } catch (error) {
        console.error('Error al suscribir:', error)
        setErrorMessage('Error al procesar la suscripción. Intenta nuevamente.')
        setTimeout(() => {
          setErrorMessage('')
        }, 4000)
      } finally {
        setIsLoading(false)
      }
    }
  }


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
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
      <section className="relative h-auto md:h-[600px] lg:h-[800px] xl:h-[900px] flex items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-32 xl:pt-40 px-4">
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
              <p className="text-base lg:text-lg xl:text-xl text-marfil/80 mb-8 font-light leading-relaxed">
                Un concepto único en El Salvador. Experimenta un espacio diferente con una laguna turquesa, con playas privadas, espacios deportivos caminos peatonales y una futura marina al estero*. Sé parte de un paraíso exclusivo en un proyecto innovador y con gran oportunidad de inversión en el país.
              </p>
              <p className="text-xs text-marfil/50 mb-4 italic">
                *Pendiente aprobación de Medio Ambiente
              </p>

              {/* Badge Próximamente */}
              <div className="mb-8">
                <span className="inline-block bg-dorado/20 border border-dorado/40 text-dorado px-6 py-2 rounded-full text-sm font-medium tracking-wider">
                  PRÓXIMAMENTE
                </span>
              </div>

              {/* Formulario de suscripción */}
              <div className="space-y-4">
                <p className="text-marfil/60 text-sm lg:text-base">
                  Ingresa tu correo para recibir noticias lo más pronto posible
                </p>
                {subscribed ? (
                  <div className="bg-dorado/20 border border-dorado/40 rounded-md px-6 py-3 text-dorado text-center animate-fade-in">
                    ¡Gracias! Te notificaremos pronto.
                  </div>
                ) : errorMessage ? (
                  <div className={`rounded-md px-6 py-3 text-center animate-fade-in ${
                    errorMessage.includes('registrado')
                      ? 'bg-dorado/10 border border-dorado/30 text-dorado'
                      : 'bg-red-900/20 border border-red-500/30 text-red-400'
                  }`}>
                    {errorMessage}
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-3 max-w-md">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="Tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-6 py-3 bg-bosque/50 border border-dorado/30 rounded-md text-marfil placeholder-marfil/40 focus:outline-none focus:border-dorado focus:ring-1 focus:ring-dorado/30 transition-all disabled:opacity-50"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="submit"
                        className="px-8 py-3 bg-transparent border-2 border-dorado text-dorado hover:bg-dorado hover:text-bosque transition-all duration-500 font-medium tracking-wider rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-dorado flex items-center justify-center gap-2 min-w-[160px]"
                        disabled={isLoading || !privacyAccepted}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-dorado" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            ENVIANDO...
                          </>
                        ) : (
                          'NOTIFICARME'
                        )}
                      </button>
                    </div>

                    {/* Checkbox de consentimiento de privacidad */}
                    <label className="flex items-center gap-3 cursor-pointer group mt-1">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={privacyAccepted}
                          onChange={(e) => setPrivacyAccepted(e.target.checked)}
                          className="peer sr-only"
                          required
                        />
                        <div className="w-5 h-5 border-2 border-dorado/40 rounded bg-bosque/30 peer-checked:bg-dorado peer-checked:border-dorado transition-all duration-300 flex items-center justify-center group-hover:border-dorado/60">
                          {privacyAccepted && (
                            <svg className="w-3.5 h-3.5 text-bosque" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-marfil/80 leading-relaxed group-hover:text-marfil transition-colors">
                        He leído y acepto la{' '}
                        <Link
                          href="/politica-de-privacidad"
                          className="text-dorado hover:text-dorado/80 underline decoration-dorado/30 hover:decoration-dorado/60 transition-all"
                          target="_blank"
                        >
                          Política de Privacidad
                        </Link>
                        .
                      </span>
                    </label>
                  </form>
                )}
              </div>

              {/* Info mínima */}
              <div className="mt-8 flex gap-12">
                <div>
                  <p className="text-3xl lg:text-4xl font-light text-dorado">5min</p>
                  <p className="text-sm text-marfil/60 uppercase tracking-widest mt-2">Del mar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado derecho - Carrusel estilo Embla (50%) - En móvil aparece primero */}
          <div className="lg:w-1/2 relative h-[450px] sm:h-[500px] lg:h-full bg-bosque order-1 lg:order-2 flex items-center">
            <div className="relative w-full overflow-hidden py-8 px-4 sm:px-8 lg:px-12">
              {/* Carrusel Embla - Una sola imagen visible */}
              <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                <div className="flex">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="flex-[0_0_100%] min-w-0"
                    >
                      <div
                        className="hero-slide-card relative h-[350px] sm:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl overflow-hidden shadow-2xl cursor-zoom-in group"
                        onClick={() => openLightbox(index)}
                      >
                        <Image
                          src={img}
                          alt={`Vista del proyecto ${index + 1}`}
                          fill
                          className="object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-500"
                          priority={index === 0}
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de navegación */}
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className="absolute left-6 sm:left-10 lg:left-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 shadow-xl text-dorado hover:bg-dorado hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center border-2 border-dorado/20"
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className="absolute right-6 sm:right-10 lg:right-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 shadow-xl text-dorado hover:bg-dorado hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center border-2 border-dorado/20"
              />

              {/* Indicadores */}
              <div className="flex justify-center gap-2 mt-6">
                {scrollSnaps.map((_, index) => (
                  <CarouselIndicator
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === selectedIndex
                        ? 'bg-dorado w-6 sm:w-8'
                        : 'bg-marfil/50 hover:bg-marfil/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Lightbox - Optimizado para móvil vertical */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black flex flex-col"
          onClick={closeLightbox}
        >
          {/* Header con botón cerrar y contador */}
          <div className="flex items-center justify-between p-4 sm:p-6">
            <div className="text-white/70 text-sm sm:text-base font-medium">
              {lightboxIndex + 1} / {images.length}
            </div>
            <button
              className="text-white/70 hover:text-white transition-colors p-2"
              onClick={closeLightbox}
              aria-label="Cerrar imagen"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Contenedor de imagen - Ocupa todo el espacio disponible */}
          <div
            className="flex-1 relative flex items-center justify-center px-2 sm:px-8 pb-20 sm:pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen adaptativa - Vertical en móvil */}
            <div className="relative w-full h-full max-w-5xl mx-auto">
              <Image
                src={images[lightboxIndex]}
                alt="Vista ampliada del proyecto"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Logo marca de agua */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-12 z-10 opacity-50">
              <Image
                src="/a.svg"
                alt="Atenea"
                width={50}
                height={50}
                className="w-10 h-10 sm:w-14 sm:h-14"
              />
            </div>

            {/* Controles del lightbox - Posicionados a los lados */}
            <button
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 sm:p-4 rounded-full transition-all"
              onClick={(e) => {
                e.stopPropagation()
                showLightboxImage(lightboxIndex - 1)
              }}
              aria-label="Imagen anterior"
            >
              <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <button
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 sm:p-4 rounded-full transition-all"
              onClick={(e) => {
                e.stopPropagation()
                showLightboxImage(lightboxIndex + 1)
              }}
              aria-label="Siguiente imagen"
            >
              <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Indicadores de navegación - Abajo en móvil */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 sm:gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex(index)
                }}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  index === lightboxIndex
                    ? 'bg-dorado w-6 sm:w-8'
                    : 'bg-white/40 hover:bg-white/60 w-1.5 sm:w-2'
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}