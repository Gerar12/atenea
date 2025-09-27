import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(request: Request) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    }

    await prisma.subscriber.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar suscriptor:', error)
    return NextResponse.json({ error: 'Error al eliminar suscriptor' }, { status: 500 })
  }
}