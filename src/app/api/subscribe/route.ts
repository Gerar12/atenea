import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWelcomeEmail } from '@/lib/mailer'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email }
    })

    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'Ya estás suscrito' },
        { status: 200 }
      )
    }

    // Crear nuevo suscriptor
    const subscriber = await prisma.subscriber.create({
      data: { email }
    })

    // Enviar correo de bienvenida
    const emailResult = await sendWelcomeEmail(email)

    if (!emailResult.success) {
      console.error('Error al enviar correo de bienvenida:', emailResult.error)
      // No fallamos la suscripción si el correo falla
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Suscripción exitosa',
        emailSent: emailResult.success,
        subscriber: {
          id: subscriber.id,
          email: subscriber.email
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error al guardar suscriptor:', error)
    return NextResponse.json(
      { error: 'Error al procesar la suscripción' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      total: subscribers.length,
      subscribers
    })
  } catch (error) {
    console.error('Error al obtener suscriptores:', error)
    return NextResponse.json(
      { error: 'Error al obtener suscriptores' },
      { status: 500 }
    )
  }
}