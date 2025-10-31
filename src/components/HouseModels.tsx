'use client'

import { useCallback, useEffect, useRef } from 'react'
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
    name: 'Modelo Aurora',
    description: 'Casa moderna de 2 niveles con amplios espacios y diseño contemporáneo',
    image: 'https://res.cloudinary.com/dewy8qqaf/image/upload/f_auto,q_auto/v1758579860/2_wfwkmq.png',
    area: '180 m2',
    bedrooms: 3,
    bathrooms: 2.5,
  },
  {
    id: 2,
    name: 'Modelo Bosque',
    description: 'Diseño integrado con la naturaleza, amplia terraza y vistas panorámicas',
    image: 'https://res.cloudinary.com/dewy8qqaf/image/upload/f_auto,q_auto/v1758591182/Enscape_2025-09-22-12-05-49_optimizada_astsfg.jpg',
    area: '200 m2',
    bedrooms: 4,
    bathrooms: 3,
  },
  {
    id: 3,
    name: 'Modelo Cenote',
    description: 'Inspirada en la naturaleza con espacios abiertos y conexión al exterior',
    image: 'https://res.cloudinary.com/dewy8qqaf/image/upload/f_auto,q_auto/v1758579860/2_wfwkmq.png',
    area: '165 m2',
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: 4,
    name: 'Modelo Dorado',
    description: 'Elegancia y lujo en cada detalle, con acabados premium',
    image: 'https://res.cloudinary.com/dewy8qqaf/image/upload/f_auto,q_auto/v1758591182/Enscape_2025-09-22-12-05-49_optimizada_astsfg.jpg',
    area: '220 m2',
    bedrooms: 4,
    bathrooms: 3.5,
  },
]

export default function HouseModels() {
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
                        src={model.image}
                        alt={model.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
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

                      <a
                        href="https://salex.sv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-6 py-3 bg-dorado text-white font-semibold rounded-lg hover:bg-dorado/90 transition-colors duration-300"
                      >
                        Mas Informacion
                      </a>
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
    </section>
  )
}
