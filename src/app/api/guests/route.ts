import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendGuestConfirmationEmail } from '@/lib/mailer'

export async function POST(request: Request) {
  try {
    const { name, email, phone, dui } = await request.json()

    // Validar campos requeridos
    if (!name || !email || !phone || !dui) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Verificar si el email ya está registrado
    const existingGuest = await prisma.guest.findFirst({
      where: {
        OR: [
          { email },
          { dui }
        ]
      }
    })

    if (existingGuest) {
      return NextResponse.json(
        {
          error: 'Ya existe un registro con este correo o DUI',
          field: existingGuest.email === email ? 'email' : 'dui'
        },
        { status: 400 }
      )
    }

    // Crear nuevo invitado
    const guest = await prisma.guest.create({
      data: {
        name,
        email,
        phone,
        dui
      }
    })

    // Enviar correo de confirmación
    const emailResult = await sendGuestConfirmationEmail(email, name)

    if (!emailResult.success) {
      console.error('Error al enviar correo de confirmación:', emailResult.error)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registro exitoso',
        emailSent: emailResult.success,
        guest: {
          id: guest.id,
          name: guest.name,
          email: guest.email
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error al registrar invitado:', error)
    return NextResponse.json(
      { error: 'Error al procesar el registro' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const guests = await prisma.guest.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      total: guests.length,
      guests
    })
  } catch (error) {
    console.error('Error al obtener invitados:', error)
    return NextResponse.json(
      { error: 'Error al obtener invitados' },
      { status: 500 }
    )
  }
}