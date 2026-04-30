'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HERO_VIDEO_URL =
  'https://res.cloudinary.com/dewy8qqaf/video/upload/q_auto,f_auto/atenea/recorridos/parte-1.mp4'
const HERO_VIDEO_POSTER =
  'https://res.cloudinary.com/dewy8qqaf/video/upload/so_2,w_1920,q_auto,f_auto/atenea/recorridos/parte-1.jpg'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()
    if (email && privacyAccepted && !isLoading) {
      setIsLoading(true)
      setErrorMessage('')
      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
        const data = await response.json()
        if (response.ok || data.message === 'Ya estás suscrito') {
          if (data.message === 'Ya estás suscrito') {
            setErrorMessage('¡Este correo ya está registrado! 🎉')
            setTimeout(() => setErrorMessage(''), 4000)
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
        setTimeout(() => setErrorMessage(''), 4000)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
      <section className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-bosque">
        {/* Video de fondo full-bleed */}
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

        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-bosque/95 via-bosque/70 to-bosque/30" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-bosque/60 via-transparent to-bosque/40" />

        {/* Logo marca de agua */}
        <div className="absolute top-24 right-6 sm:top-28 sm:right-10 z-20 pointer-events-none">
          <Image src="/a.svg" alt="Atenea" width={70} height={70} className="opacity-60" />
        </div>

        {/* Contenido */}
        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-20 py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="w-20 h-1 bg-dorado mb-8" />

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-marfil mb-8 leading-tight drop-shadow-lg">
              Residencial
              <span className="block font-bold">Atenea</span>
            </h1>

            <p className="text-base lg:text-lg xl:text-xl text-marfil/90 mb-6 font-light leading-relaxed drop-shadow-md">
              Un concepto único en El Salvador. Experimenta un espacio diferente con una laguna turquesa, con playas privadas, espacios deportivos caminos peatonales y una futura marina al estero*. Sé parte de un paraíso exclusivo en un proyecto innovador y con gran oportunidad de inversión en el país.
            </p>
            <p className="text-xs text-marfil/60 mb-6 italic">
              *Pendiente aprobación de Medio Ambiente
            </p>

            <div className="mb-8">
              <span className="inline-block bg-dorado/20 backdrop-blur-sm border border-dorado/50 text-dorado px-6 py-2 rounded-full text-sm font-medium tracking-wider">
                PRÓXIMAMENTE
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-marfil/80 text-sm lg:text-base drop-shadow">
                Ingresa tu correo para recibir noticias lo más pronto posible
              </p>
              {subscribed ? (
                <div className="bg-dorado/20 backdrop-blur-md border border-dorado/40 rounded-md px-6 py-3 text-dorado text-center animate-fade-in max-w-md">
                  ¡Gracias! Te notificaremos pronto.
                </div>
              ) : errorMessage ? (
                <div className={`rounded-md px-6 py-3 text-center animate-fade-in backdrop-blur-md max-w-md ${
                  errorMessage.includes('registrado')
                    ? 'bg-dorado/10 border border-dorado/30 text-dorado'
                    : 'bg-red-900/30 border border-red-500/40 text-red-300'
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
                      className="flex-1 px-6 py-3 bg-bosque/60 backdrop-blur-md border border-dorado/40 rounded-md text-marfil placeholder-marfil/50 focus:outline-none focus:border-dorado focus:ring-1 focus:ring-dorado/30 transition-all disabled:opacity-50"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      className="px-8 py-3 bg-dorado/10 backdrop-blur-md border-2 border-dorado text-dorado hover:bg-dorado hover:text-bosque transition-all duration-500 font-medium tracking-wider rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-dorado/10 disabled:hover:text-dorado flex items-center justify-center gap-2 min-w-[160px]"
                      disabled={isLoading || !privacyAccepted}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-dorado" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          ENVIANDO...
                        </>
                      ) : (
                        'NOTIFICARME'
                      )}
                    </button>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer group mt-1">
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        className="peer sr-only"
                        required
                      />
                      <div className="w-5 h-5 border-2 border-dorado/50 rounded bg-bosque/40 backdrop-blur-md peer-checked:bg-dorado peer-checked:border-dorado transition-all duration-300 flex items-center justify-center group-hover:border-dorado/70">
                        {privacyAccepted && (
                          <svg className="w-3.5 h-3.5 text-bosque" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-marfil/90 leading-relaxed group-hover:text-marfil transition-colors drop-shadow">
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
          </div>
        </div>
      </section>
    </>
  )
}
