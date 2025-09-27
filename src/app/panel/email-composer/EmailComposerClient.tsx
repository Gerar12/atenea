'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Link } from '@tiptap/extension-link'
import { Image as TiptapImage } from '@tiptap/extension-image'

type Subscriber = {
  id: string
  email: string
  createdAt: string
}

interface EmailComposerClientProps {
  subscribers: Subscriber[]
}

export default function EmailComposerClient({ subscribers }: EmailComposerClientProps) {
  const router = useRouter()
  const [subject, setSubject] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [isModalAnimating, setIsModalAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
      }),
      TiptapImage
    ],
    content: '<p>Escriba el contenido de su email aquí...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4'
      }
    },
    immediatelyRender: false
  })

  useEffect(() => {
    setMounted(true)
    // Check if mobile device
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 1024)
    }
    checkMobile()

    // Listen for resize
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (showPreviewModal) {
      const timer = setTimeout(() => {
        setIsModalAnimating(true)
      }, 10)
      return () => clearTimeout(timer)
    } else {
      setIsModalAnimating(false)
    }
  }, [showPreviewModal])

  const openPreviewModal = () => {
    setShowPreviewModal(true)
  }

  const closePreviewModal = () => {
    setIsModalAnimating(false)
    setTimeout(() => {
      setShowPreviewModal(false)
    }, 200)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setAttachments([...attachments, ...files])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleSend = async () => {
    const content = editor?.getHTML() || ''

    if (!subject.trim() || !content.trim()) {
      alert('Por favor complete todos los campos')
      return
    }

    if (!confirm(`¿Enviar email a ${subscribers.length} suscriptores?`)) {
      return
    }

    setIsLoading(true)
    try {
      // Convertir archivos a base64
      const attachmentsData = await Promise.all(
        attachments.map(async (file) => {
          const base64 = await fileToBase64(file)
          return {
            filename: file.name,
            content: base64,
            type: file.type
          }
        })
      )

      const response = await fetch('/api/panel/send-custom-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients: subscribers.map(s => s.email),
          subject,
          content,
          attachments: attachmentsData
        })
      })

      if (response.ok) {
        alert('Emails enviados exitosamente')
        router.push('/panel')
      } else {
        alert('Error al enviar emails')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })
  }

  // Mobile blocker screen
  if (isMobileDevice) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-dorado/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-light text-dorado mb-3">Función de Escritorio</h2>
          <p className="text-marfil/70 mb-6 max-w-md mx-auto">
            El compositor de emails requiere una pantalla más grande para una mejor experiencia de edición.
          </p>
          <p className="text-marfil/50 text-sm mb-8">
            Por favor, accede desde una computadora de escritorio o laptop.
          </p>
          <button
            onClick={() => router.push('/panel')}
            className="px-6 py-2.5 bg-dorado/20 border border-dorado text-dorado rounded-lg hover:bg-dorado/30 transition-all duration-200"
          >
            Volver al Panel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
          <div className="bg-bosque/40 backdrop-blur-sm border border-dorado/20 rounded-lg p-6">
            <h2 className="text-xl font-light text-dorado mb-6">Componer Email</h2>

            {/* Asunto */}
            <div className="mb-4">
              <label className="block text-marfil/80 text-sm mb-2">Asunto</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ingrese el asunto del email"
                className="w-full px-4 py-2 bg-bosque/60 border border-dorado/20 rounded-lg text-marfil placeholder-marfil/40 focus:outline-none focus:border-dorado"
                disabled={isLoading}
              />
            </div>

            {/* Editor de contenido */}
            <div className="mb-4">
              <label className="block text-marfil/80 text-sm mb-2">Contenido</label>

              {/* Toolbar del editor */}
              {editor && (
                <div className="bg-bosque/60 border border-dorado/20 rounded-t-lg p-2 flex flex-wrap gap-1">
                  <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-1 rounded text-marfil hover:bg-dorado/20 ${editor.isActive('bold') ? 'bg-dorado/30' : ''}`}
                    type="button"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1 rounded text-marfil hover:bg-dorado/20 ${editor.isActive('italic') ? 'bg-dorado/30' : ''}`}
                    type="button"
                  >
                    <em>I</em>
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`px-3 py-1 rounded text-marfil hover:bg-dorado/20 ${editor.isActive('strike') ? 'bg-dorado/30' : ''}`}
                    type="button"
                  >
                    <s>S</s>
                  </button>
                  <div className="w-px bg-dorado/20 mx-1"></div>
                  <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-3 py-1 rounded text-marfil hover:bg-dorado/20 ${editor.isActive('heading', { level: 1 }) ? 'bg-dorado/30' : ''}`}
                    type="button"
                  >
                    H1
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-1 rounded text-marfil hover:bg-dorado/20 ${editor.isActive('heading', { level: 2 }) ? 'bg-dorado/30' : ''}`}
                    type="button"
                  >
                    H2
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-3 py-1 rounded text-marfil hover:bg-dorado/20 ${editor.isActive('heading', { level: 3 }) ? 'bg-dorado/30' : ''}`}
                    type="button"
                  >
                    H3
                  </button>
                  <div className="w-px bg-dorado/20 mx-1"></div>
                  <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-1 rounded text-marfil hover:bg-dorado/20 ${editor.isActive('bulletList') ? 'bg-dorado/30' : ''}`}
                    type="button"
                  >
                    • Lista
                  </button>
                  <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-1 rounded text-marfil hover:bg-dorado/20 ${editor.isActive('orderedList') ? 'bg-dorado/30' : ''}`}
                    type="button"
                  >
                    1. Lista
                  </button>
                  <div className="w-px bg-dorado/20 mx-1"></div>
                  <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`px-3 py-1 rounded text-marfil hover:bg-dorado/20 ${editor.isActive('blockquote') ? 'bg-dorado/30' : ''}`}
                    type="button"
                  >
                    "
                  </button>
                  <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className="px-3 py-1 rounded text-marfil hover:bg-dorado/20"
                    type="button"
                  >
                    —
                  </button>
                  <div className="w-px bg-dorado/20 mx-1"></div>
                  <button
                    onClick={() => editor.chain().focus().undo().run()}
                    className="px-3 py-1 rounded text-marfil hover:bg-dorado/20"
                    type="button"
                  >
                    ↶
                  </button>
                  <button
                    onClick={() => editor.chain().focus().redo().run()}
                    className="px-3 py-1 rounded text-marfil hover:bg-dorado/20"
                    type="button"
                  >
                    ↷
                  </button>
                </div>
              )}

              <div className="bg-bosque/20 rounded-b-lg border border-t-0 border-dorado/20">
                <EditorContent editor={editor} />
              </div>
            </div>

            {/* Archivos adjuntos */}
            <div className="mb-4 mt-6">
              <label className="block text-marfil/80 text-sm mb-2">Archivos Adjuntos</label>

              {/* Grid de archivos con vista previa */}
              {attachments.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                  {attachments.map((file, index) => {
                    const isImage = file.type.startsWith('image/')
                    const imageUrl = isImage ? URL.createObjectURL(file) : null

                    return (
                      <div key={index} className="relative group">
                        <div className="bg-bosque/40 border border-dorado/30 rounded-lg p-2 hover:border-dorado/50 transition-colors">
                          {/* Image thumbnail or file icon */}
                          <div className="aspect-square mb-2 rounded overflow-hidden bg-bosque/20">
                            {isImage && imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={file.name}
                                className="w-full h-full object-cover"
                                onLoad={() => URL.revokeObjectURL(imageUrl)}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-4xl opacity-50">
                                {file.type.includes('pdf') ? '📄' : '📎'}
                              </div>
                            )}
                          </div>

                          {/* File info */}
                          <p className="text-xs text-marfil/70 truncate" title={file.name}>
                            {file.name}
                          </p>
                          <p className="text-xs text-marfil/50">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => removeAttachment(index)}
                          className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          disabled={isLoading}
                          type="button"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-dorado/10 border border-dorado/30 text-dorado rounded-lg hover:bg-dorado/20 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span>Adjuntar Archivo</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isLoading}
                  accept="image/*,.pdf,.doc,.docx"
                />
              </label>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={openPreviewModal}
                className="px-4 py-2 bg-bosque/50 border border-marfil/20 text-marfil rounded-lg hover:bg-bosque/70 transition-colors"
                disabled={isLoading}
                type="button"
              >
                Vista Previa
              </button>
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="px-6 py-2 bg-dorado/20 border border-dorado text-dorado rounded-lg hover:bg-dorado/30 hover:shadow-lg hover:shadow-dorado/20 transition-all duration-200 font-medium disabled:opacity-50"
                type="button"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  `Enviar a ${subscribers.length} suscriptores`
                )}
              </button>
            </div>
          </div>
      </div>

      {/* Modal de Vista Previa */}
      {mounted && showPreviewModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Overlay con animación */}
          <div
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ease-out ${
              isModalAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closePreviewModal}
          />

          {/* Modal Container con scroll */}
          <div
            className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-bosque/95 border border-dorado/30 rounded-xl shadow-2xl transition-all duration-200 ease-out ${
              isModalAnimating
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-4 scale-95'
            }`}
          >
            {/* Header del Modal */}
            <div className="sticky top-0 z-10 bg-bosque/95 border-b border-dorado/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-light text-dorado">Vista Previa del Email</h3>
                  <p className="text-marfil/60 text-sm mt-1">Así se verá el email para los {subscribers.length} suscriptores</p>
                </div>
                <button
                  onClick={closePreviewModal}
                  className="p-2 hover:bg-dorado/10 rounded-lg transition-colors"
                  type="button"
                >
                  <svg className="w-5 h-5 text-marfil/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-6">
              <div className="rounded-lg shadow-xl overflow-hidden" style={{ backgroundColor: '#2b3628' }}>
                {/* Email Header */}
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  background: 'linear-gradient(135deg, #2b3628 0%, #3a4637 100%)',
                  borderBottom: '2px solid #cbb57c'
                }}>
                  <img
                    src="https://res.cloudinary.com/dewy8qqaf/image/upload/v1758754241/logo_d7bdvf.png"
                    alt="Residencial Atenea"
                    style={{
                      maxWidth: '200px',
                      height: 'auto'
                    }}
                  />
                </div>

                {/* Email Content */}
                <div style={{
                  padding: '40px 30px',
                  backgroundColor: '#2b3628'
                }}>
                  {/* Golden divider */}
                  <div style={{
                    width: '60px',
                    height: '2px',
                    backgroundColor: '#cbb57c',
                    margin: '0 auto 30px'
                  }}></div>

                  {/* Email HTML content - styled to match template */}
                  <div
                    className="email-content-preview"
                    dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '<p style="color: #ebe8e3;">Sin contenido</p>' }}
                  />

                  {/* Golden divider bottom */}
                  <div style={{
                    width: '60px',
                    height: '2px',
                    backgroundColor: '#cbb57c',
                    margin: '30px auto 0'
                  }}></div>

                  {/* Attachments Preview if any */}
                  {attachments.length > 0 && (
                    <div style={{
                      marginTop: '30px',
                      padding: '20px',
                      backgroundColor: 'rgba(203, 181, 124, 0.1)',
                      border: '1px solid rgba(203, 181, 124, 0.3)',
                      borderRadius: '8px'
                    }}>
                      <p style={{
                        fontSize: '14px',
                        color: '#cbb57c',
                        marginBottom: '15px',
                        fontWeight: 'bold'
                      }}>
                        Archivos adjuntos ({attachments.length}):
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {attachments.map((file, index) => {
                          const isImage = file.type.startsWith('image/')
                          const imageUrl = isImage ? URL.createObjectURL(file) : null

                          return (
                            <div
                              key={index}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                            >
                              {/* Image Preview or File Icon */}
                              {isImage && imageUrl ? (
                                <div style={{
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '8px',
                                  overflow: 'hidden',
                                  border: '2px solid rgba(203, 181, 124, 0.3)',
                                  backgroundColor: 'rgba(0,0,0,0.2)'
                                }}>
                                  <img
                                    src={imageUrl}
                                    alt={file.name}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover'
                                    }}
                                    onLoad={() => URL.revokeObjectURL(imageUrl)}
                                  />
                                </div>
                              ) : (
                                <div style={{
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '8px',
                                  border: '2px solid rgba(203, 181, 124, 0.3)',
                                  backgroundColor: 'rgba(203, 181, 124, 0.05)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '36px'
                                }}>
                                  {file.type.includes('pdf') ? '📄' : '📎'}
                                </div>
                              )}

                              {/* File Name and Size */}
                              <div style={{
                                textAlign: 'center',
                                maxWidth: '100px'
                              }}>
                                <p style={{
                                  fontSize: '11px',
                                  color: '#ebe8e3',
                                  margin: 0,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {file.name}
                                </p>
                                <p style={{
                                  fontSize: '10px',
                                  color: 'rgba(235, 232, 227, 0.5)',
                                  margin: 0
                                }}>
                                  {(file.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Email Footer */}
                <div style={{
                  padding: '30px',
                  textAlign: 'center',
                  backgroundColor: '#1f2620',
                  borderTop: '1px solid rgba(203, 181, 124, 0.2)'
                }}>
                  <p style={{
                    margin: '0 0 10px 0',
                    fontSize: '12px',
                    color: 'rgba(235, 232, 227, 0.5)'
                  }}>
                    © 2025 Residencial Atenea. Todos los derechos reservados.
                  </p>
                  <p style={{
                    margin: '0 0 10px 0',
                    fontSize: '12px',
                    color: 'rgba(235, 232, 227, 0.5)'
                  }}>
                    Powered by <a href="https://salex.dev" style={{ color: '#cbb57c', textDecoration: 'none' }}>Salex</a>
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '10px',
                    color: 'rgba(235, 232, 227, 0.3)'
                  }}>
                    Has recibido este correo porque estás suscrito a nuestras comunicaciones.<br/>
                    <a href="#" style={{ color: 'rgba(235, 232, 227, 0.3)', textDecoration: 'underline' }}>
                      Cancelar suscripción
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Estilos personalizados para el editor */}
      <style jsx global>{`
        /* Estilos para el contenido del email en la vista previa */
        .email-content-preview h1 {
          color: #ebe8e3 !important;
          font-size: 28px !important;
          font-weight: 300 !important;
          letter-spacing: 2px !important;
          text-align: center !important;
          margin-bottom: 20px !important;
        }
        .email-content-preview h2 {
          color: #cbb57c !important;
          font-size: 22px !important;
          font-weight: bold !important;
          text-align: center !important;
          margin: 20px 0 !important;
        }
        .email-content-preview h3 {
          color: #ebe8e3 !important;
          font-size: 18px !important;
          font-weight: 500 !important;
          margin: 15px 0 !important;
        }
        .email-content-preview p {
          color: #ebe8e3 !important;
          font-size: 16px !important;
          line-height: 1.8 !important;
          margin-bottom: 20px !important;
          opacity: 0.9 !important;
        }
        .email-content-preview ul,
        .email-content-preview ol {
          color: #ebe8e3 !important;
          font-size: 16px !important;
          line-height: 1.8 !important;
          opacity: 0.9 !important;
          padding-left: 25px !important;
        }
        .email-content-preview li {
          color: #ebe8e3 !important;
          margin-bottom: 10px !important;
        }
        .email-content-preview blockquote {
          border-left: 3px solid #cbb57c !important;
          padding-left: 20px !important;
          margin: 20px 0 !important;
          color: #ebe8e3 !important;
          opacity: 0.8 !important;
          font-style: italic !important;
        }
        .email-content-preview hr {
          border: 0 !important;
          height: 2px !important;
          background: linear-gradient(to right, transparent, #cbb57c, transparent) !important;
          margin: 30px 0 !important;
        }
        .email-content-preview strong {
          color: #cbb57c !important;
          font-weight: bold !important;
        }
        .email-content-preview em {
          color: #ebe8e3 !important;
          font-style: italic !important;
        }
        .email-content-preview s {
          color: #ebe8e3 !important;
          text-decoration: line-through !important;
        }
        .email-content-preview a {
          color: #cbb57c !important;
          text-decoration: none !important;
          border-bottom: 1px solid rgba(203, 181, 124, 0.3) !important;
        }
        .email-content-preview a:hover {
          border-bottom-color: #cbb57c !important;
        }

        /* Estilos para el editor */
        .ProseMirror {
          min-height: 300px;
          color: #f5f5f0 !important; /* Color marfil para el texto */
          background: rgba(26, 58, 46, 0.3); /* Fondo bosque transparente */
        }
        .ProseMirror:focus {
          outline: none;
        }
        .ProseMirror p {
          margin: 0.5rem 0;
          color: #f5f5f0;
        }
        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
          color: #f5f5f0;
        }
        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.875rem 0;
          color: #f5f5f0;
        }
        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.75rem 0;
          color: #f5f5f0;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
          color: #f5f5f0;
        }
        .ProseMirror li {
          color: #f5f5f0;
        }
        .ProseMirror blockquote {
          border-left: 3px solid #d4af37;
          padding-left: 1rem;
          margin: 0.5rem 0;
          color: #f5f5f0;
          opacity: 0.8;
        }
        .ProseMirror hr {
          margin: 1rem 0;
          border-color: #d4af37;
          opacity: 0.3;
        }
        .ProseMirror strong {
          color: #f5f5f0;
          font-weight: bold;
        }
        .ProseMirror em {
          color: #f5f5f0;
          font-style: italic;
        }
        .ProseMirror s {
          color: #f5f5f0;
          text-decoration: line-through;
        }
      `}</style>
    </div>
  )
}