import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { type } = await request.json()

    if (type !== 'subscribers') {
      return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 })
    }

    // Obtener todos los suscriptores
    const subscribers = await prisma.subscriber.findMany()

    if (subscribers.length === 0) {
      return NextResponse.json({ error: 'No hay suscriptores' }, { status: 400 })
    }

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Preparar el HTML del correo
    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #2b3628;
              border-radius: 10px;
              overflow: hidden;
              margin-top: 20px;
            }
            .header {
              background-color: #1a1f18;
              padding: 30px;
              text-align: center;
            }
            .content {
              padding: 40px 30px;
              color: #ebe8e3;
            }
            .title {
              color: #cbb57c;
              font-size: 28px;
              font-weight: 300;
              margin-bottom: 20px;
            }
            .subtitle {
              color: #cbb57c;
              font-size: 20px;
              font-weight: 300;
              margin: 30px 0 15px 0;
            }
            .text {
              line-height: 1.6;
              color: #ebe8e3;
              margin-bottom: 15px;
            }
            .button {
              display: inline-block;
              padding: 15px 40px;
              background-color: rgba(203, 181, 124, 0.2);
              border: 2px solid #cbb57c;
              color: #cbb57c;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              background-color: #1a1f18;
              padding: 20px;
              text-align: center;
              color: #ebe8e3;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #cbb57c; margin: 0; font-weight: 300;">RESIDENCIAL ATENEA</h1>
              <p style="color: #ebe8e3; opacity: 0.7; margin: 10px 0 0 0;">Noticias Importantes</p>
            </div>
            <div class="content">
              <h2 class="title">¡El momento esperado está aquí!</h2>

              <p class="text">
                Estimado suscriptor,
              </p>

              <p class="text">
                Nos complace informarte que Residencial Atenea continúa avanzando hacia su inauguración.
                Un proyecto único donde la naturaleza y el lujo se encuentran para crear tu hogar ideal.
              </p>

              <h3 class="subtitle">Lo que te espera:</h3>
              <ul style="color: #ebe8e3; line-height: 1.8;">
                <li>Lotes exclusivos desde 500 m²</li>
                <li>Ubicación privilegiada rodeada de naturaleza</li>
                <li>Amenidades de primer nivel</li>
                <li>Seguridad 24/7</li>
                <li>Club house y áreas verdes</li>
              </ul>

              <p class="text">
                Mantente atento a nuestras próximas comunicaciones con detalles sobre el evento de lanzamiento
                y oportunidades exclusivas de preventa.
              </p>

              <center>
                <a href="https://atenea.sv" class="button">Visitar Sitio Web</a>
              </center>
            </div>
            <div class="footer">
              <p>© 2025 Residencial Atenea - Todos los derechos reservados</p>
              <p>Un proyecto de Salex Corp</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Enviar correos a todos los suscriptores
    let successCount = 0
    const errors: string[] = []

    for (const subscriber of subscribers) {
      try {
        await transporter.sendMail({
          from: `"Residencial Atenea" <${process.env.EMAIL_USER}>`,
          to: subscriber.email,
          subject: '🏡 Novedades Importantes - Residencial Atenea',
          html: emailHTML
        })
        successCount++
      } catch (error) {
        errors.push(subscriber.email)
        console.error(`Error enviando a ${subscriber.email}:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      count: successCount,
      total: subscribers.length,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error) {
    console.error('Error en send-emails:', error)
    return NextResponse.json(
      { error: 'Error al procesar solicitud' },
      { status: 500 }
    )
  }
}