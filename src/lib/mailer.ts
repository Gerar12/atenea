import nodemailer from 'nodemailer';

// Configurar el transporter de nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || '465'),
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Template HTML para el correo de bienvenida
const getWelcomeEmailTemplate = (email: string) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a Residencial Atenea</title>
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
            text-align: center;
        }
        .title {
            color: #ebe8e3;
            font-size: 32px;
            font-weight: 300;
            margin-bottom: 10px;
            letter-spacing: 2px;
        }
        .subtitle {
            color: #cbb57c;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
        }
        .divider {
            width: 60px;
            height: 2px;
            background-color: #cbb57c;
            margin: 30px auto;
        }
        .message {
            color: #ebe8e3;
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 20px;
            opacity: 0.9;
        }
        .highlight-box {
            background-color: rgba(203, 181, 124, 0.1);
            border: 1px solid rgba(203, 181, 124, 0.3);
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }
        .highlight-text {
            color: #cbb57c;
            font-size: 18px;
            font-weight: 500;
        }
        .features {
            display: table;
            width: 100%;
            margin: 30px 0;
        }
        .feature {
            display: table-cell;
            text-align: center;
            padding: 10px;
        }
        .feature-number {
            color: #cbb57c;
            font-size: 28px;
            font-weight: 300;
            margin-bottom: 5px;
        }
        .feature-text {
            color: rgba(235, 232, 227, 0.7);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
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
        .badge {
            display: inline-block;
            background-color: rgba(203, 181, 124, 0.2);
            border: 1px solid rgba(203, 181, 124, 0.4);
            color: #cbb57c;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://res.cloudinary.com/dewy8qqaf/image/upload/v1758754241/logo_d7bdvf.png" alt="Residencial Atenea" class="logo">
        </div>

        <div class="content">
            <h1 class="title">Bienvenido a</h1>
            <h2 class="subtitle">RESIDENCIAL ATENEA</h2>

            <div class="divider"></div>

            <p class="message">
                Gracias por tu interés en nuestro exclusivo proyecto residencial.
            </p>

            <p class="message">
                Un enclave único donde la naturaleza se convierte en tu mayor lujo.
                Pronto recibirás información detallada sobre este proyecto excepcional
                que estamos preparando especialmente para ti.
            </p>

            <div class="highlight-box">
                <p class="highlight-text">
                    Tu correo <strong>${email}</strong> ha sido registrado exitosamente
                </p>
            </div>

            <span class="badge">PRÓXIMAMENTE</span>

            <div class="features">
                <div class="feature">
                    <div class="feature-number">5min</div>
                    <div class="feature-text">Del Mar</div>
                </div>
                <div class="feature">
                    <div class="feature-number">100%</div>
                    <div class="feature-text">Naturaleza</div>
                </div>
                <div class="feature">
                    <div class="feature-number">24/7</div>
                    <div class="feature-text">Seguridad</div>
                </div>
            </div>

            <p class="message" style="margin-top: 40px;">
                Serás de los primeros en conocer todos los detalles de este proyecto único.
            </p>
        </div>

        <div class="footer">
            <p class="footer-text">
                © 2025 Residencial Atenea. Todos los derechos reservados.
            </p>
            <p class="footer-text" style="margin-top: 15px;">
                Powered by <a href="https://salex.dev" class="footer-link">Salex</a>
            </p>
            <p class="footer-text" style="margin-top: 20px; font-size: 10px; opacity: 0.6;">
                Has recibido este correo porque te suscribiste en nuestra página web.
            </p>
        </div>
    </div>
</body>
</html>
  `;
};

// Template HTML para el correo de confirmación de invitado
const getGuestConfirmationTemplate = (email: string, name: string) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Registro - Residencial Atenea</title>
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
            text-align: center;
        }
        .title {
            color: #ebe8e3;
            font-size: 32px;
            font-weight: 300;
            margin-bottom: 10px;
            letter-spacing: 2px;
        }
        .subtitle {
            color: #cbb57c;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
        }
        .divider {
            width: 60px;
            height: 2px;
            background-color: #cbb57c;
            margin: 30px auto;
        }
        .message {
            color: #ebe8e3;
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 20px;
            opacity: 0.9;
        }
        .highlight-box {
            background-color: rgba(203, 181, 124, 0.1);
            border: 1px solid rgba(203, 181, 124, 0.3);
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }
        .highlight-text {
            color: #cbb57c;
            font-size: 18px;
            font-weight: 500;
        }
        .event-info {
            background-color: rgba(43, 54, 40, 0.5);
            border: 1px solid rgba(203, 181, 124, 0.2);
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }
        .event-title {
            color: #cbb57c;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .event-details {
            display: table;
            width: 100%;
            margin-top: 20px;
        }
        .event-item {
            display: table-cell;
            text-align: center;
            padding: 10px;
        }
        .event-icon {
            color: #cbb57c;
            font-size: 24px;
            margin-bottom: 5px;
        }
        .event-value {
            color: #ebe8e3;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .event-label {
            color: rgba(235, 232, 227, 0.6);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .qr-section {
            margin: 40px 0;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }
        .qr-text {
            color: rgba(235, 232, 227, 0.7);
            font-size: 14px;
            margin-top: 15px;
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
        .badge {
            display: inline-block;
            background-color: rgba(203, 181, 124, 0.2);
            border: 1px solid rgba(203, 181, 124, 0.4);
            color: #cbb57c;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://res.cloudinary.com/dewy8qqaf/image/upload/v1758754241/logo_d7bdvf.png" alt="Residencial Atenea" class="logo">
        </div>

        <div class="content">
            <h1 class="title">¡Registro Confirmado!</h1>
            <h2 class="subtitle">${name}</h2>

            <div class="divider"></div>

            <p class="message">
                Tu registro para el evento exclusivo de Residencial Atenea ha sido confirmado exitosamente.
            </p>

            <div class="event-info">
                <div class="event-title">DETALLES DEL EVENTO</div>
                <div class="event-details">
                    <div class="event-item">
                        <div class="event-icon">📅</div>
                        <div class="event-value">9 de Octubre</div>
                        <div class="event-label">Fecha</div>
                    </div>
                    <div class="event-item">
                        <div class="event-icon">🕕</div>
                        <div class="event-value">6:00 PM</div>
                        <div class="event-label">Hora</div>
                    </div>
                    <div class="event-item">
                        <div class="event-icon">📍</div>
                        <div class="event-value">Hotel Hilton</div>
                        <div class="event-label">Lugar</div>
                    </div>
                </div>
            </div>

            <div class="highlight-box">
                <p class="highlight-text">
                    ✅ Tu información ha sido registrada
                </p>
                <p style="color: #ebe8e3; font-size: 14px; margin-top: 10px; opacity: 0.8;">
                    Email: ${email}<br>
                    Nombre: ${name}
                </p>
            </div>

            <span class="badge">EVENTO EXCLUSIVO</span>

            <p class="message" style="margin-top: 40px;">
                Te esperamos para presentarte este proyecto único donde la naturaleza y el lujo se encuentran.
            </p>

            <div class="qr-section">
                <p class="qr-text">
                    Este correo es tu confirmación de registro.<br>
                    Por favor, preséntalo el día del evento.
                </p>
            </div>
        </div>

        <div class="footer">
            <p class="footer-text">
                © 2025 Residencial Atenea. Todos los derechos reservados.
            </p>
            <p class="footer-text" style="margin-top: 15px;">
                Powered by <a href="https://salex.dev" class="footer-link">Salex</a>
            </p>
            <p class="footer-text" style="margin-top: 20px; font-size: 10px; opacity: 0.6;">
                Has recibido este correo porque te registraste para nuestro evento exclusivo.
            </p>
        </div>
    </div>
</body>
</html>
  `;
};

// Función para enviar el correo de bienvenida
export async function sendWelcomeEmail(email: string) {
  try {
    const mailOptions = {
      from: process.env.MAIL_FROM || 'Residencial Atenea <noreply@atenea.com>',
      to: email,
      subject: '¡Bienvenido a Residencial Atenea! 🏡',
      html: getWelcomeEmailTemplate(email),
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return { success: false, error };
  }
}

// Función para enviar el correo de confirmación a invitados
export async function sendGuestConfirmationEmail(email: string, name: string) {
  try {
    const mailOptions = {
      from: process.env.MAIL_FROM || 'Residencial Atenea <noreply@atenea.com>',
      to: email,
      subject: '✅ Confirmación de Registro - Evento Residencial Atenea',
      html: getGuestConfirmationTemplate(email, name),
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error al enviar correo de confirmación:', error);
    return { success: false, error };
  }
}