'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Invitacion() {
  const [modalOpen, setModalOpen] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dui: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setShowConfirmation(true)
      } else {
        if (data.field === 'email') {
          setErrorMessage('Este correo ya está registrado')
        } else if (data.field === 'dui') {
          setErrorMessage('Este DUI ya está registrado')
        } else {
          setErrorMessage(data.error || 'Error al procesar el registro')
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage('Error de conexión. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDUI = (value: string) => {
    let formatted = value.replace(/\D/g, '')
    if (formatted.length > 8) {
      formatted = formatted.slice(0, 8) + '-' + formatted.slice(8, 9)
    }
    return formatted
  }

  const formatPhone = (value: string) => {
    let formatted = value.replace(/\D/g, '')
    if (formatted.length > 4) {
      formatted = formatted.slice(0, 4) + '-' + formatted.slice(4, 8)
    }
    return formatted
  }

  return (
    <>
      <style jsx global>{`
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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.1s both;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.6s ease-out 0.2s both;
        }

        .animate-modal-in {
          animation: modal-in 0.3s ease-out;
        }
      `}</style>

      <main className="min-h-screen flex items-center justify-center px-4 pb-16 pt-4 overflow-hidden bg-bosque">
        <div className="max-w-md w-full flex flex-col gap-4">
          {/* Logo y Encabezado compacto */}
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Image
                src="/a.svg"
                alt="Atenea Logo"
                width={48}
                height={48}
                className="opacity-90 drop-shadow-2xl"
              />
              <div>
                <h1 className="text-2xl font-light text-marfil">
                  Residencial <span className="font-bold">Atenea</span>
                </h1>
              </div>
            </div>
            <div className="w-16 h-[1px] bg-dorado mx-auto"></div>
          </div>

          {/* Información del Evento compacta */}
          <div className="bg-bosque/50 backdrop-blur-sm border border-dorado/40 rounded-2xl p-4 animate-slide-up">
            <h2 className="text-lg font-light text-marfil mb-3 text-center">Presentación Exclusiva</h2>
            <div className="flex justify-around text-marfil/70 text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-dorado" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"/>
                </svg>
                <span>Oct 9</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-dorado" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                </svg>
                <span>6:00 PM</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-dorado" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
                <span>Hilton</span>
              </div>
            </div>
          </div>

          {/* Botón para abrir modal */}
          <button
            onClick={() => setModalOpen(true)}
            className="w-full bg-transparent border-2 border-dorado text-dorado px-6 py-3 hover:bg-dorado hover:text-bosque transition-all duration-500 font-medium tracking-wider animate-slide-up-delay"
          >
            CONFIRMAR ASISTENCIA
          </button>

          {/* Info adicional compacta */}
          <div className="text-center text-marfil/30 text-xs tracking-widest animate-fade-in">
            <p>INVITACIÓN PERSONAL E INTRANSFERIBLE</p>
          </div>
        </div>

        {/* Modal de Formulario */}
        {modalOpen && !showConfirmation && (
          <div
            className="fixed inset-0 bg-bosque/60 backdrop-blur-md flex items-center justify-center z-50 px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setModalOpen(false)
            }}
          >
            <div className="bg-bosque/90 backdrop-blur-sm border-2 border-dorado/40 rounded-3xl p-6 max-w-sm w-full animate-modal-in relative shadow-2xl">
              {/* Botón cerrar */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-marfil/50 hover:text-dorado transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <h3 className="text-lg font-light text-marfil mb-6 text-center tracking-wider">Registro de Invitado</h3>

              {errorMessage && (
                <div className="bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm text-center mb-4">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="relative pt-4">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder=" "
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="peer w-full px-3 py-2 bg-bosque/30 border border-dorado/30 rounded-lg text-marfil placeholder-marfil/30 focus:outline-none focus:border-dorado focus:ring-1 focus:ring-dorado/30 transition-all text-sm disabled:opacity-50"
                    required
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="nombre"
                    className="absolute left-3 top-6 text-marfil/60 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-dorado peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-dorado bg-bosque px-1"
                  >
                    Nombre Completo
                  </label>
                </div>

                <div className="relative pt-4">
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="peer w-full px-3 py-2 bg-bosque/30 border border-dorado/30 rounded-lg text-marfil placeholder-marfil/30 focus:outline-none focus:border-dorado focus:ring-1 focus:ring-dorado/30 transition-all text-sm disabled:opacity-50"
                    required
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="correo"
                    className="absolute left-3 top-6 text-marfil/60 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-dorado peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-dorado bg-bosque px-1"
                  >
                    Correo Electrónico
                  </label>
                </div>

                <div className="relative pt-4">
                  <input
                    type="text"
                    id="dui"
                    name="dui"
                    placeholder=" "
                    pattern="[0-9]{8}-[0-9]{1}"
                    value={formData.dui}
                    onChange={(e) => {
                      const formatted = formatDUI(e.target.value)
                      setFormData({...formData, dui: formatted})
                    }}
                    className="peer w-full px-3 py-2 bg-bosque/30 border border-dorado/30 rounded-lg text-marfil placeholder-marfil/30 focus:outline-none focus:border-dorado focus:ring-1 focus:ring-dorado/30 transition-all text-sm disabled:opacity-50"
                    required
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="dui"
                    className="absolute left-3 top-6 text-marfil/60 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-dorado peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-dorado bg-bosque px-1"
                  >
                    DUI (12345678-9)
                  </label>
                </div>

                <div className="relative pt-4">
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    placeholder=" "
                    pattern="[0-9]{4}-[0-9]{4}"
                    value={formData.phone}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value)
                      setFormData({...formData, phone: formatted})
                    }}
                    className="peer w-full px-3 py-2 bg-bosque/30 border border-dorado/30 rounded-lg text-marfil placeholder-marfil/30 focus:outline-none focus:border-dorado focus:ring-1 focus:ring-dorado/30 transition-all text-sm disabled:opacity-50"
                    required
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="telefono"
                    className="absolute left-3 top-6 text-marfil/60 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-dorado peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-dorado bg-bosque px-1"
                  >
                    Teléfono (7777-7777)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-transparent border-2 border-dorado text-dorado px-6 py-2.5 hover:bg-dorado hover:text-bosque transition-all duration-500 font-medium tracking-wider text-sm mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      REGISTRANDO...
                    </>
                  ) : (
                    'REGISTRAR'
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal de Confirmación */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-bosque/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
            <div className="bg-bosque/95 backdrop-blur-sm border-2 border-dorado rounded-3xl p-12 max-w-lg w-full animate-modal-in relative shadow-2xl">
              <div className="text-center">
                <div className="w-32 h-32 bg-dorado/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-dorado">
                  <svg className="w-20 h-20 text-dorado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-4xl font-bold text-marfil mb-4">¡Confirmado!</h2>
                <p className="text-xl text-marfil/80 mb-3">Tu asistencia ha sido registrada</p>
                <p className="text-lg text-dorado font-semibold mb-8">✉️ Revisa tu correo electrónico</p>
                <button
                  onClick={() => {
                    setShowConfirmation(false)
                    setModalOpen(false)
                  }}
                  className="bg-dorado text-bosque px-8 py-3 rounded-full font-semibold text-lg hover:bg-dorado/90 transition"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Decoraciones sutiles */}
        <div className="fixed top-4 left-4 w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-dorado/20 to-transparent"></div>
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-dorado/20 to-transparent"></div>
        </div>
        <div className="fixed bottom-4 right-4 w-12 h-12">
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-dorado/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-dorado/20 to-transparent"></div>
        </div>
      </main>
    </>
  )
}