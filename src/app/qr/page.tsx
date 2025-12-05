'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function QRPage() {
  const [qrUrl, setQrUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const invitationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/invitacion`
    : 'http://localhost:3000/invitacion'

  useEffect(() => {
    // Cargar el QR code con un pequeño delay para evitar el flash
    const loadQR = () => {
      const timestamp = Date.now()
      setQrUrl(`/api/qr?t=${timestamp}`)
      // Esperar a que la imagen cargue antes de quitar el loading
      const img = document.createElement('img')
      img.onload = () => setIsLoading(false)
      img.src = `/api/qr?t=${timestamp}`
    }
    loadQR()
  }, [])

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/qr')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'qr-invitacion-atenea.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error descargando QR:', error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Invitación - Residencial Atenea',
          text: '¡Te invitamos a nuestro evento exclusivo! Regístrate aquí:',
          url: invitationUrl
        })
      } catch {
        // Error al compartir silenciado
      }
    } else {
      // Copiar al portapapeles si no hay API de share
      navigator.clipboard.writeText(invitationUrl)
      alert('¡Link copiado al portapapeles!')
    }
  }

  return (
    <div className="min-h-screen bg-bosque flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <Image
              src="/a.svg"
              alt="Atenea"
              width={60}
              height={60}
              className="opacity-90"
            />
            <div className="text-left">
              <h1 className="text-3xl font-light text-marfil">
                Residencial <span className="font-bold">Atenea</span>
              </h1>
            </div>
          </Link>
          <div className="w-20 h-1 bg-dorado mx-auto mb-8"></div>
          <h2 className="text-2xl text-marfil/80 font-light">
            Código QR para Invitación al Evento
          </h2>
        </div>

        {/* QR Container */}
        <div className="bg-bosque/50 backdrop-blur-sm border-2 border-dorado/40 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* QR Code */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-[360px] h-[450px]">
                {isLoading ? (
                  <div className="absolute inset-0 bg-bosque/30 rounded-xl animate-pulse flex items-center justify-center">
                    <svg className="animate-spin h-10 w-10 text-dorado" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : (
                  <img
                    src={qrUrl}
                    alt="QR Code Invitación"
                    className="w-full h-full object-contain rounded-xl"
                  />
                )}
              </div>
            </div>

            {/* Info y Acciones */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div>
                <h3 className="text-lg text-marfil/80 font-medium mb-3">
                  Pasos para registrarte:
                </h3>
                <ul className="text-marfil/70 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-dorado mt-1">1.</span>
                    <span>Abre la cámara de tu celular</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-dorado mt-1">2.</span>
                    <span>Apunta hacia el código QR en pantalla</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-dorado mt-1">3.</span>
                    <span>Toca la notificación que aparece</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-dorado mt-1">4.</span>
                    <span>Completa el formulario de registro</span>
                  </li>
                </ul>
              </div>

              <div className="bg-bosque/50 border border-dorado/30 rounded-lg p-4">
                <p className="text-xs text-marfil/60 mb-2">URL de la invitación:</p>
                <code className="text-dorado text-sm break-all">{invitationUrl}</code>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-dorado text-dorado hover:bg-dorado hover:text-bosque transition-all duration-500 font-medium tracking-wider rounded-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  DESCARGAR
                </button>

                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-dorado/20 border-2 border-dorado/40 text-dorado hover:bg-dorado/30 transition-all duration-500 font-medium tracking-wider rounded-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326"/>
                  </svg>
                  COMPARTIR
                </button>
              </div>

              {/* Estadísticas (opcional) */}
              <div className="pt-6 border-t border-dorado/20">
                <p className="text-marfil/50 text-xs mb-3">INFORMACIÓN DEL EVENTO</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-2xl text-dorado font-light">Oct 9</p>
                    <p className="text-xs text-marfil/60 uppercase tracking-wider mt-1">Fecha</p>
                  </div>
                  <div>
                    <p className="text-2xl text-dorado font-light">6:00</p>
                    <p className="text-xs text-marfil/60 uppercase tracking-wider mt-1">Hora</p>
                  </div>
                  <div>
                    <p className="text-2xl text-dorado font-light">Hilton</p>
                    <p className="text-xs text-marfil/60 uppercase tracking-wider mt-1">Lugar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-marfil/40 text-sm">
          <p>© 2025 Residencial Atenea. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}