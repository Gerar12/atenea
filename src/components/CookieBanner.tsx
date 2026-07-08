'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Verificar si el usuario ya dio su consentimiento
    const consent = localStorage.getItem('cookie_consent')
    if (consent) return

    // Si el LeadModal va a abrirse (primera visita), esperar a que se cierre
    // antes de mostrar el banner para no encimar ambos diálogos.
    if (window.__leadModalPending) {
      const onDone = () => setTimeout(() => setShowBanner(true), 400)
      window.addEventListener('lead-modal-done', onDone)
      return () => window.removeEventListener('lead-modal-done', onDone)
    }

    // Mostrar el banner después de un pequeño delay para mejor UX
    const t = setTimeout(() => setShowBanner(true), 1000)
    return () => clearTimeout(t)
  }, [])

  const saveConsent = (accepted: boolean) => {
    localStorage.setItem('cookie_consent', accepted ? 'accepted' : 'rejected')
    localStorage.setItem('cookie_consent_date', new Date().toISOString())
    setShowBanner(false)
  }

  const accept = () => {
    saveConsent(true)
  }

  const reject = () => {
    saveConsent(false)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Overlay oscuro - cubre todo incluyendo el header */}
      <div className="fixed inset-0 bg-black/60 z-[60] animate-fadeIn" />

      {/* Banner de cookies */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] p-4 md:p-6 animate-slideUp">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl border-2 border-dorado">
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 text-4xl">🍪</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-bosque mb-3">
                  Aviso de Cookies
                </h2>
                <p className="text-gray-700 mb-4">
                  Este sitio utiliza una cookie básica para recordar su preferencia sobre el uso de cookies.
                  No utilizamos cookies de análisis, marketing ni rastreo de terceros.
                </p>
                <p className="text-sm text-gray-600">
                  Para más información, consulte nuestra{' '}
                  <Link
                    href="/politica-de-cookies"
                    className="text-dorado hover:underline font-semibold"
                  >
                    Política de Cookies
                  </Link>
                  {' y '}
                  <Link
                    href="/politica-de-privacidad"
                    className="text-dorado hover:underline font-semibold"
                  >
                    Política de Privacidad
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={reject}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Rechazar
              </button>
              <button
                onClick={accept}
                className="px-6 py-3 bg-dorado text-white rounded-lg hover:bg-dorado/90 transition-colors font-semibold shadow-lg"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  )
}
