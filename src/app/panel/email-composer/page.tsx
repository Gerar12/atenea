import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import EmailComposerClient from './EmailComposerClient'
import Link from 'next/link'
import Image from 'next/image'

export default async function EmailComposerPage() {
  const session = await auth()

  if (!session) {
    redirect('/panel/login')
  }

  // Obtener todos los suscriptores
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-bosque via-bosque/95 to-bosque">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bosque/90 backdrop-blur-sm border-b border-dorado/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/panel" className="flex items-center gap-2">
              <svg className="w-5 h-5 text-marfil/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-marfil/70 hover:text-marfil transition-colors">Volver</span>
            </Link>
            <div className="text-marfil/60 text-sm">
              {subscribers.length} suscriptores
            </div>
          </div>
        </div>
      </header>

      {/* Contenido con padding para el header fijo */}
      <div className="pt-20">
        <EmailComposerClient subscribers={JSON.parse(JSON.stringify(subscribers))} />
      </div>
    </main>
  )
}