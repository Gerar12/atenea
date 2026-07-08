import { NextResponse } from 'next/server'
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { name, countryCode, dialCode, phone } = await request.json()

    if (!name || !countryCode || !dialCode || !phone) {
      return NextResponse.json(
        { error: 'Nombre, país y teléfono son requeridos' },
        { status: 400 }
      )
    }

    const cleanName = String(name).trim()
    if (cleanName.length < 2) {
      return NextResponse.json({ error: 'Nombre inválido' }, { status: 400 })
    }

    const iso = String(countryCode).toUpperCase().slice(0, 2) as CountryCode
    const parsed = parsePhoneNumberFromString(String(phone), iso)

    if (!parsed || !parsed.isValid()) {
      return NextResponse.json(
        { error: 'Número de teléfono inválido' },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.create({
      data: {
        name: cleanName,
        countryCode: iso,
        dialCode: String(dialCode),
        phone: parsed.number,
      },
    })

    return NextResponse.json(
      { success: true, lead: { id: lead.id } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error al guardar lead:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ total: leads.length, leads })
  } catch (error) {
    console.error('Error al obtener leads:', error)
    return NextResponse.json(
      { error: 'Error al obtener leads' },
      { status: 500 }
    )
  }
}
