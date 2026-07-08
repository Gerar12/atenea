'use client'

import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { createPortal } from 'react-dom'

export default function LogoutButton() {
  const [showModal, setShowModal] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (showModal) {
      // Pequeño delay para asegurar que el DOM esté listo
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 10)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
    }
  }, [showModal])

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    if (isLoading) return
    setIsAnimating(false)
    setTimeout(() => {
      setShowModal(false)
    }, 200)
  }

  const handleLogout = async () => {
    setIsLoading(true)
    await signOut({ callbackUrl: '/' })
  }

  const modalContent = showModal && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Overlay con animación de fade */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeModal}
      />

      {/* Modal con animación elegante */}
      <div
        className={`relative bg-bosque/95 border border-dorado/30 rounded-xl p-6 sm:p-8 max-w-sm w-full shadow-2xl transition-all duration-200 ease-out ${
          isAnimating
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95'
        }`}
      >
        <div className="text-center">
          {/* Icono de advertencia */}
          <div className={`mx-auto w-12 h-12 sm:w-14 sm:h-14 mb-4 flex items-center justify-center transition-all duration-300 delay-100 ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <svg
              className="w-full h-full text-dorado/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          {/* Título con animación de fade */}
          <h3 className={`text-xl sm:text-2xl font-light text-marfil mb-3 transition-all duration-300 delay-150 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            ¿Cerrar sesión?
          </h3>

          {/* Mensaje con animación de fade */}
          <p className={`text-marfil/60 text-sm sm:text-base mb-6 transition-all duration-300 delay-200 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            ¿Estás seguro de que deseas cerrar tu sesión actual?
          </p>

          {/* Botones con animación de fade */}
          <div className={`flex gap-3 justify-center transition-all duration-300 delay-250 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <button
              onClick={closeModal}
              disabled={isLoading}
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-bosque/50 border border-marfil/20 text-marfil/70 rounded-lg hover:bg-bosque/70 hover:text-marfil hover:border-marfil/30 transition-all duration-200 text-sm sm:text-base disabled:opacity-50 transform hover:scale-105 active:scale-95"
            >
              Cancelar
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-dorado/20 border border-dorado text-dorado rounded-lg hover:bg-dorado/30 hover:border-dorado hover:shadow-lg hover:shadow-dorado/20 transition-all duration-200 text-sm sm:text-base font-medium disabled:opacity-50 min-w-[100px] transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm">Saliendo...</span>
                </span>
              ) : (
                'Sí, cerrar'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={openModal}
        className="px-3 sm:px-4 py-1.5 sm:py-2 text-marfil/70 hover:text-dorado text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95"
      >
        Cerrar Sesión
      </button>

      {/* Renderizar modal con Portal para que esté fuera del header */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  )
}