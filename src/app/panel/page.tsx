import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import PanelClient from './PanelClient'
import LogoutButton from './LogoutButton'

export default async function PanelPage() {
  const session = await auth()

  if (!session) {
    redirect('/panel/login')
  }

  // Obtener todos los invitados y suscriptores
  const guests = await prisma.guest.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-bosque via-bosque/95 to-bosque">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bosque/90 backdrop-blur-sm border-b border-dorado/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Image
                src="/logo.png"
                alt="Atenea"
                width={150}
                height={40}
                className="h-8 sm:h-10 w-auto"
              />
              <span className="text-dorado/70 text-xs sm:text-sm hidden sm:inline">Panel de Administración</span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Contenido del panel con padding para el header fijo */}
      <div className="pt-16 sm:pt-20">
        <PanelClient
          initialGuests={JSON.parse(JSON.stringify(guests))}
          initialSubscribers={JSON.parse(JSON.stringify(subscribers))}
        />
      </div>
    </main>
  )
}