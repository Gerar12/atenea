'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import * as XLSX from 'xlsx'

type Guest = {
  id: string
  name: string
  email: string
  phone: string
  dui: string
  createdAt: string
}

type Subscriber = {
  id: string
  email: string
  createdAt: string
}

interface PanelClientProps {
  initialGuests: Guest[]
  initialSubscribers: Subscriber[]
}

export default function PanelClient({ initialGuests, initialSubscribers }: PanelClientProps) {
  const [activeTab, setActiveTab] = useState<'guests' | 'subscribers'>('guests')
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table') // Por defecto tabla
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [subscriberToDelete, setSubscriberToDelete] = useState<{ id: string, email: string } | null>(null)
  const [isModalAnimating, setIsModalAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar el tamaño de pantalla y establecer el modo por defecto
  useEffect(() => {
    setMounted(true)
    const checkScreenSize = () => {
      // Si la pantalla es menor a 768px (móvil), usar cards por defecto
      if (window.innerWidth < 768) {
        setViewMode('cards')
      } else {
        setViewMode('table')
      }
      // Check if mobile for email composer
      setIsMobile(window.innerWidth < 1024)
    }

    // Verificar al cargar
    checkScreenSize()

    // Add resize listener to update mobile state
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Efecto para animar el modal
  useEffect(() => {
    if (showDeleteModal) {
      const timer = setTimeout(() => {
        setIsModalAnimating(true)
      }, 10)
      return () => clearTimeout(timer)
    } else {
      setIsModalAnimating(false)
    }
  }, [showDeleteModal])

  // Filtrar invitados basado en búsqueda
  const filteredGuests = initialGuests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.phone.includes(searchTerm) ||
    guest.dui.includes(searchTerm)
  )

  // Filtrar suscriptores basado en búsqueda
  const filteredSubscribers = initialSubscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendEmailsToSubscribers = () => {
    // Check if screen is large enough (min 1024px for desktop)
    if (window.innerWidth < 1024) {
      setMessage('📱 Esta función requiere pantalla de escritorio. Por favor, accede desde una computadora.')
      setTimeout(() => setMessage(''), 5000)
      return
    }
    window.location.href = '/panel/email-composer'
  }

  const openDeleteModal = (id: string, email: string) => {
    setSubscriberToDelete({ id, email })
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    if (isLoading) return
    setIsModalAnimating(false)
    setTimeout(() => {
      setShowDeleteModal(false)
      setSubscriberToDelete(null)
    }, 200)
  }

  const handleDeleteSubscriber = async () => {
    if (!subscriberToDelete) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/panel/subscribers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: subscriberToDelete.id })
      })

      if (response.ok) {
        setMessage(`Suscriptor ${subscriberToDelete.email} eliminado exitosamente`)
        closeDeleteModal()
        // Recargar la página para actualizar la lista
        setTimeout(() => window.location.reload(), 1000)
      } else {
        setMessage('Error al eliminar suscriptor')
      }
    } catch (error) {
      setMessage('Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendEmailToSubscriber = async (subscriber: Subscriber) => {
    if (!confirm(`¿Enviar email a ${subscriber.email}?`)) {
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/panel/send-email-subscriber', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subscriber.email })
      })

      if (response.ok) {
        setMessage(`Email enviado exitosamente a ${subscriber.email}`)
      } else {
        setMessage('Error al enviar email')
      }
    } catch (error) {
      setMessage('Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }

  const exportToExcel = () => {
    const ws_guests = XLSX.utils.json_to_sheet(
      initialGuests.map(guest => ({
        'Nombre': guest.name,
        'Email': guest.email,
        'Teléfono': guest.phone,
        'DUI': guest.dui,
        'Fecha de Registro': new Date(guest.createdAt).toLocaleDateString('es-SV')
      }))
    )

    const ws_subscribers = XLSX.utils.json_to_sheet(
      initialSubscribers.map(subscriber => ({
        'Email': subscriber.email,
        'Fecha de Suscripción': new Date(subscriber.createdAt).toLocaleDateString('es-SV')
      }))
    )

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws_guests, 'Invitados')
    XLSX.utils.book_append_sheet(wb, ws_subscribers, 'Suscriptores')

    // Generar archivo con fecha actual
    const fecha = new Date().toISOString().split('T')[0]
    XLSX.writeFile(wb, `Atenea_Registros_${fecha}.xlsx`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-SV', {
      dateStyle: 'short',
      timeStyle: 'short'
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-bosque/40 backdrop-blur-sm border border-dorado/20 rounded-lg p-6">
          <h3 className="text-marfil/60 text-sm mb-2">Total Invitados</h3>
          <p className="text-3xl font-light text-dorado">{initialGuests.length}</p>
        </div>
        <div className="bg-bosque/40 backdrop-blur-sm border border-dorado/20 rounded-lg p-6">
          <h3 className="text-marfil/60 text-sm mb-2">Total Suscriptores</h3>
          <p className="text-3xl font-light text-dorado">{initialSubscribers.length}</p>
        </div>
        <div className="bg-bosque/40 backdrop-blur-sm border border-dorado/20 rounded-lg p-6">
          <h3 className="text-marfil/60 text-sm mb-2">Última Actividad</h3>
          <p className="text-sm text-marfil/80">
            {initialGuests.length > 0
              ? `Hace ${Math.floor((Date.now() - new Date(initialGuests[0].createdAt).getTime()) / (1000 * 60))} min`
              : 'Sin actividad'}
          </p>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-4 bg-dorado/10 border border-dorado/30 rounded-lg animate-fade-in">
          <p className="text-marfil text-sm">{message}</p>
        </div>
      )}

      {/* Barra de búsqueda y controles */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar por nombre, email, teléfono o DUI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-bosque/40 border border-dorado/20 rounded-lg text-marfil placeholder-marfil/40 focus:outline-none focus:border-dorado"
          />
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-marfil/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Controles de vista y acciones */}
        <div className="flex items-center gap-2">
          {/* Botón de Excel minimalista */}
          <button
            onClick={exportToExcel}
            className="p-2 text-marfil/60 hover:text-dorado transition-colors"
            title="Exportar a Excel"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>

          {/* Controles de vista solo para invitados */}
          {activeTab === 'guests' && (
            <>
              {/* Separador vertical */}
              <div className="h-6 w-px bg-dorado/20"></div>

              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded ${viewMode === 'cards' ? 'bg-dorado/20 text-dorado' : 'text-marfil/60 hover:text-marfil'}`}
                title="Vista de Cards"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded ${viewMode === 'table' ? 'bg-dorado/20 text-dorado' : 'text-marfil/60 hover:text-marfil'}`}
                title="Vista de Tabla"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex gap-2 sm:gap-4 border-b border-dorado/20 sm:border-0">
            <button
              onClick={() => setActiveTab('guests')}
              className={`pb-3 px-2 sm:px-4 text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'guests'
                  ? 'text-dorado border-b-2 border-dorado'
                  : 'text-marfil/60 hover:text-marfil'
              }`}
            >
              Invitados ({filteredGuests.length})
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`pb-3 px-2 sm:px-4 text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'subscribers'
                  ? 'text-dorado border-b-2 border-dorado'
                  : 'text-marfil/60 hover:text-marfil'
              }`}
            >
              Suscriptores ({filteredSubscribers.length})
            </button>
          </div>

          {/* Botón de email solo visible en tab de suscriptores - Mejorado para móvil */}
          {activeTab === 'subscribers' && initialSubscribers.length > 0 && (
            <button
              onClick={handleSendEmailsToSubscribers}
              disabled={isLoading}
              className={`w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 border rounded-lg transition-all duration-200 font-medium disabled:opacity-50 text-sm sm:text-base ${
                isMobile
                  ? 'bg-gray-800/50 border-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-dorado/20 border-dorado text-dorado hover:bg-dorado/30 hover:shadow-lg hover:shadow-dorado/20 sm:transform sm:hover:scale-105'
              }`}
              title={isMobile ? "Solo disponible en escritorio" : "Enviar email a todos los suscriptores"}
            >
              <div className="flex items-center justify-center gap-2">
                {isMobile ? (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="whitespace-nowrap">Solo en Escritorio</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="whitespace-nowrap">{isLoading ? 'Enviando...' : 'Enviar Email Masivo'}</span>
                  </>
                )}
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Contenido de tabs */}
      {activeTab === 'guests' ? (
        viewMode === 'cards' ? (
          // Vista de Cards para Invitados
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGuests.length === 0 ? (
              <div className="col-span-full text-center py-12 text-marfil/50">
                {searchTerm ? 'No se encontraron resultados' : 'No hay invitados registrados'}
              </div>
            ) : (
              filteredGuests.map((guest, index) => (
                <div
                  key={guest.id}
                  className="bg-bosque/40 backdrop-blur-sm border border-dorado/20 rounded-lg p-6 hover:shadow-xl hover:border-dorado/40 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Avatar con inicial */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-dorado/20 border border-dorado flex items-center justify-center">
                      <span className="text-dorado font-semibold text-lg">
                        {guest.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-marfil font-medium text-lg">{guest.name}</h3>
                      <p className="text-marfil/50 text-xs">{formatDate(guest.createdAt)}</p>
                    </div>
                  </div>

                  {/* Información del invitado */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-dorado/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-marfil/80 text-sm truncate">{guest.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-dorado/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-marfil/80 text-sm">{guest.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-dorado/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                      <span className="text-marfil/80 text-sm">{guest.dui}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          // Vista de Tabla para Invitados
          <div className="bg-bosque/40 backdrop-blur-sm border border-dorado/20 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-bosque/60 border-b border-dorado/20">
                  <tr>
                    <th className="text-left p-4 text-marfil/80 font-medium text-sm">Nombre</th>
                    <th className="text-left p-4 text-marfil/80 font-medium text-sm">Email</th>
                    <th className="text-left p-4 text-marfil/80 font-medium text-sm">Teléfono</th>
                    <th className="text-left p-4 text-marfil/80 font-medium text-sm">DUI</th>
                    <th className="text-left p-4 text-marfil/80 font-medium text-sm">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-marfil/50">
                        {searchTerm ? 'No se encontraron resultados' : 'No hay invitados registrados'}
                      </td>
                    </tr>
                  ) : (
                    filteredGuests.map((guest) => (
                      <tr key={guest.id} className="border-b border-dorado/10 hover:bg-bosque/30">
                        <td className="p-4 text-marfil text-sm">{guest.name}</td>
                        <td className="p-4 text-marfil text-sm">{guest.email}</td>
                        <td className="p-4 text-marfil text-sm">{guest.phone}</td>
                        <td className="p-4 text-marfil text-sm">{guest.dui}</td>
                        <td className="p-4 text-marfil/70 text-sm">{formatDate(guest.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        // Vista de Suscriptores (solo tabla por simplicidad)
        <div className="bg-bosque/40 backdrop-blur-sm border border-dorado/20 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bosque/60 border-b border-dorado/20">
                <tr>
                  <th className="text-left p-4 text-marfil/80 font-medium text-sm">Email</th>
                  <th className="text-left p-4 text-marfil/80 font-medium text-sm">Fecha de Suscripción</th>
                  <th className="text-center p-4 text-marfil/80 font-medium text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="p-8 text-center text-marfil/50">
                      {searchTerm ? 'No se encontraron resultados' : 'No hay suscriptores'}
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="border-b border-dorado/10 hover:bg-bosque/30">
                      <td className="p-4 text-marfil text-sm">{subscriber.email}</td>
                      <td className="p-4 text-marfil/70 text-sm">{formatDate(subscriber.createdAt)}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => openDeleteModal(subscriber.id, subscriber.email)}
                          disabled={isLoading}
                          className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>

      {/* Modal de confirmación de eliminación */}
      {mounted && showDeleteModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          {/* Overlay con animación de fade */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ease-out ${
              isModalAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeDeleteModal}
          />

          {/* Modal con animación elegante */}
          <div
            className={`relative bg-bosque/95 border border-dorado/30 rounded-xl p-6 sm:p-8 max-w-sm w-full shadow-2xl transition-all duration-200 ease-out ${
              isModalAnimating
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-4 scale-95'
            }`}
          >
            <div className="text-center">
              {/* Icono de advertencia */}
              <div className={`mx-auto w-12 h-12 sm:w-14 sm:h-14 mb-4 flex items-center justify-center transition-all duration-300 delay-100 ${
                isModalAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}>
                <svg
                  className="w-full h-full text-red-400/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>

              {/* Título con animación de fade */}
              <h3 className={`text-xl sm:text-2xl font-light text-marfil mb-3 transition-all duration-300 delay-150 ${
                isModalAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                ¿Eliminar suscriptor?
              </h3>

              {/* Mensaje con animación de fade */}
              <p className={`text-marfil/60 text-sm sm:text-base mb-2 transition-all duration-300 delay-200 ${
                isModalAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                ¿Estás seguro que quieres eliminar este usuario?
              </p>
              {subscriberToDelete && (
                <p className={`text-dorado/80 text-sm sm:text-base font-medium mb-6 transition-all duration-300 delay-200 ${
                  isModalAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  {subscriberToDelete.email}
                </p>
              )}

              {/* Botones con animación de fade */}
              <div className={`flex gap-3 justify-center transition-all duration-300 delay-250 ${
                isModalAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                <button
                  onClick={closeDeleteModal}
                  disabled={isLoading}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-bosque/50 border border-marfil/20 text-marfil/70 rounded-lg hover:bg-bosque/70 hover:text-marfil hover:border-marfil/30 transition-all duration-200 text-sm sm:text-base disabled:opacity-50 transform hover:scale-105 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteSubscriber}
                  disabled={isLoading}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-red-500/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/30 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200 text-sm sm:text-base font-medium disabled:opacity-50 min-w-[100px] transform hover:scale-105 active:scale-95"
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
                      <span className="text-xs sm:text-sm">Eliminando...</span>
                    </span>
                  ) : (
                    'Sí, eliminar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}