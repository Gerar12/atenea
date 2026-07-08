'use client'

import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PhoneCountrySelect from './PhoneCountrySelect'
import { Country, DEFAULT_COUNTRY } from '@/lib/countries'

type Props = {
  open: boolean
  onClose: () => void
}

export default function LeadModal({ open, onClose }: Props) {
  const [name, setName] = useState('')
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY)
  const [phone, setPhone] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose, isLoading])

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setName('')
        setCountry(DEFAULT_COUNTRY)
        setPhone('')
        setPrivacyAccepted(false)
        setSubmitted(false)
        setErrorMessage('')
        setIsLoading(false)
      }, 200)
    }
  }, [open])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isLoading || !privacyAccepted) return
    if (name.trim().length < 2) {
      setErrorMessage('Ingresa tu nombre completo')
      return
    }
    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 6) {
      setErrorMessage('Número de teléfono inválido')
      return
    }

    setErrorMessage('')
    setIsLoading(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          countryCode: country.code,
          dialCode: country.dial,
          phone: cleanPhone,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setErrorMessage(data.error || 'Error al enviar. Intenta nuevamente.')
        return
      }
      setSubmitted(true)
      setTimeout(() => onClose(), 2500)
    } catch (err) {
      console.error('Error al enviar lead:', err)
      setErrorMessage('Error al procesar. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!open) return null

  return (
    <>
      <style jsx>{`
        @keyframes modal-in {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-backdrop { animation: backdrop-in 0.25s ease-out; }
        .modal-panel { animation: modal-in 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
      <div
        className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bosque/80 backdrop-blur-sm"
        onClick={() => !isLoading && onClose()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
      >
        <div
          className="modal-panel relative w-full max-w-md bg-bosque border border-dorado/40 rounded-lg shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-dorado to-transparent" />

          <button
            type="button"
            onClick={() => !isLoading && onClose()}
            disabled={isLoading}
            aria-label="Cerrar"
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-marfil/70 hover:text-dorado hover:bg-dorado/10 rounded-full transition-all disabled:opacity-40"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="px-8 pt-10 pb-8">
            <div className="flex flex-col items-center text-center mb-6">
              <Image src="/a.svg" alt="Atenea" width={48} height={48} className="opacity-90 mb-3" />
              <div className="w-12 h-px bg-dorado/60 mb-4" />
              <h2 id="lead-modal-title" className="text-2xl font-light text-marfil mb-2">
                Quiero más <span className="font-bold">información</span>
              </h2>
              <p className="text-sm text-marfil/70 leading-relaxed">
                Déjanos tus datos y nos pondremos en contacto contigo.
              </p>
            </div>

            {submitted ? (
              <div className="bg-dorado/15 border border-dorado/40 rounded-md px-6 py-6 text-center">
                <svg className="w-12 h-12 text-dorado mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-dorado font-medium">¡Gracias, {name.split(' ')[0]}!</p>
                <p className="text-marfil/70 text-sm mt-1">Nos pondremos en contacto contigo pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-marfil/60 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    required
                    disabled={isLoading}
                    autoComplete="name"
                    className="w-full h-12 px-4 bg-bosque/60 backdrop-blur-md border border-dorado/40 rounded-md text-marfil placeholder-marfil/40 focus:outline-none focus:border-dorado focus:ring-1 focus:ring-dorado/30 transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-marfil/60 mb-2">
                    Teléfono
                  </label>
                  <div className="flex gap-2">
                    <PhoneCountrySelect value={country} onChange={setCountry} disabled={isLoading} />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Número"
                      required
                      disabled={isLoading}
                      inputMode="tel"
                      autoComplete="tel-national"
                      className="flex-1 h-12 px-4 bg-bosque/60 backdrop-blur-md border border-dorado/40 rounded-md text-marfil placeholder-marfil/40 focus:outline-none focus:border-dorado focus:ring-1 focus:ring-dorado/30 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="bg-red-900/30 border border-red-500/40 text-red-300 text-sm rounded-md px-4 py-2">
                    {errorMessage}
                  </div>
                )}

                <label className="flex items-start gap-3 cursor-pointer group pt-1">
                  <div className="relative flex-shrink-0 mt-0.5">
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

                <button
                  type="submit"
                  disabled={isLoading || !privacyAccepted}
                  className="w-full h-12 px-8 bg-dorado/10 border-2 border-dorado text-dorado hover:bg-dorado hover:text-bosque transition-all duration-500 font-medium tracking-wider rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-dorado/10 disabled:hover:text-dorado flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      ENVIANDO...
                    </>
                  ) : (
                    'ENVIAR'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
