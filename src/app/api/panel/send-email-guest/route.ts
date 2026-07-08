import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { guest } = await request.json()

    if (!guest || !guest.email) {
      return NextResponse.json({ error: 'Datos del invitado requeridos' }, { status: 400 })
    }

    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Contenido del email
    const mailOptions = {
      from: process.env.SMTP_FROM || 'info@atenea.sv',
      to: guest.email,
      subject: 'Confirmación de Registro - Residencial Atenea',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a3a2e; color: #d4af37; padding: 20px; text-align: center; }
            .content { background: #f4f4f4; padding: 20px; margin: 20px 0; }
            .footer { text-align: center; padding: 10px; color: #666; font-size: 12px; }
            h1 { margin: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Residencial Atenea</h1>
            </div>
            <div class="content">
              <h2>¡Hola ${guest.name}!</h2>
              <p>Confirmamos tu registro para el evento de Residencial Atenea.</p>
              <p><strong>Detalles de tu registro:</strong></p>
              <ul>
                <li>Nombre: ${guest.name}</li>
                <li>Email: ${guest.email}</li>
                <li>Teléfono: ${guest.phone}</li>
                <li>DUI: ${guest.dui}</li>
              </ul>
              <p>Te esperamos pronto. Si tienes alguna pregunta, no dudes en contactarnos.</p>
            </div>
            <div class="footer">
              <p>© 2025 Residencial Atenea | Powered by Salex</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al enviar email:', error)
    return NextResponse.json({ error: 'Error al enviar email' }, { status: 500 })
  }
}