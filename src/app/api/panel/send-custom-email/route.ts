import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { recipients, subject, content, attachments } = await request.json()

    if (!recipients || recipients.length === 0 || !subject || !content) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
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

    // Procesar archivos adjuntos si existen
    const mailAttachments = attachments?.map((att: any) => ({
      filename: att.filename,
      content: att.content.split(',')[1], // Remover el prefijo data:type;base64,
      encoding: 'base64'
    })) || []

    // Enviar email a cada destinatario
    const results = await Promise.allSettled(
      recipients.map(async (email: string) => {
        const mailOptions = {
          from: process.env.SMTP_FROM || 'info@atenea.sv',
          to: email,
          subject: subject,
          html: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #2b3628;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #2b3628;
        }
        .header {
            text-align: center;
            padding: 40px 20px;
            background: linear-gradient(135deg, #2b3628 0%, #3a4637 100%);
            border-bottom: 2px solid #cbb57c;
        }
        .logo {
            max-width: 200px;
            height: auto;
            margin-bottom: 20px;
        }
        .content {
            padding: 40px 30px;
            background-color: #2b3628;
        }
        .content h1 {
            color: #ebe8e3;
            font-size: 28px;
            font-weight: 300;
            letter-spacing: 2px;
            text-align: center;
            margin-bottom: 20px;
        }
        .content h2 {
            color: #cbb57c;
            font-size: 22px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
        }
        .content h3 {
            color: #ebe8e3;
            font-size: 18px;
            font-weight: 500;
            margin: 15px 0;
        }
        .content p {
            color: #ebe8e3;
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 20px;
            opacity: 0.9;
        }
        .content ul, .content ol {
            color: #ebe8e3;
            font-size: 16px;
            line-height: 1.8;
            opacity: 0.9;
            padding-left: 25px;
        }
        .content li {
            margin-bottom: 10px;
        }
        .content blockquote {
            border-left: 3px solid #cbb57c;
            padding-left: 20px;
            margin: 20px 0;
            color: #ebe8e3;
            opacity: 0.8;
            font-style: italic;
        }
        .content hr {
            border: 0;
            height: 2px;
            background: linear-gradient(to right, transparent, #cbb57c, transparent);
            margin: 30px 0;
        }
        .content strong {
            color: #cbb57c;
            font-weight: bold;
        }
        .content em {
            color: #ebe8e3;
            font-style: italic;
        }
        .content a {
            color: #cbb57c;
            text-decoration: none;
            border-bottom: 1px solid rgba(203, 181, 124, 0.3);
        }
        .content a:hover {
            border-bottom-color: #cbb57c;
        }
        .divider {
            width: 60px;
            height: 2px;
            background-color: #cbb57c;
            margin: 30px auto;
        }
        .footer {
            padding: 30px;
            text-align: center;
            background-color: #1f2620;
            border-top: 1px solid rgba(203, 181, 124, 0.2);
        }
        .footer-text {
            color: rgba(235, 232, 227, 0.5);
            font-size: 12px;
            margin-bottom: 10px;
        }
        .footer-link {
            color: #cbb57c;
            text-decoration: none;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://res.cloudinary.com/dewy8qqaf/image/upload/v1758754241/logo_d7bdvf.png" alt="Residencial Atenea" class="logo">
        </div>

        <div class="content">
            <div class="divider"></div>
            ${content}
            <div class="divider"></div>
        </div>

        <div class="footer">
            <p class="footer-text">
                © 2025 Residencial Atenea. Todos los derechos reservados.
            </p>
            <p class="footer-text" style="margin-top: 15px;">
                Powered by <a href="https://salex.dev" class="footer-link">Salex</a>
            </p>
            <p class="footer-text" style="margin-top: 20px; font-size: 10px; opacity: 0.6;">
                Has recibido este correo porque estás suscrito a nuestras comunicaciones.<br>
                <a href="https://atenea.sv/unsubscribe?email=${encodeURIComponent(email)}"
                   style="color: rgba(235, 232, 227, 0.5); text-decoration: underline;">
                  Cancelar suscripción
                </a>
            </p>
        </div>
    </div>
</body>
</html>
          `,
          attachments: mailAttachments
        }

        return await transporter.sendMail(mailOptions)
      })
    )

    const successCount = results.filter(r => r.status === 'fulfilled').length
    const failCount = results.filter(r => r.status === 'rejected').length

    return NextResponse.json({
      success: true,
      sent: successCount,
      failed: failCount,
      total: recipients.length
    })
  } catch (error) {
    console.error('Error al enviar emails:', error)
    return NextResponse.json({ error: 'Error al enviar emails' }, { status: 500 })
  }
}