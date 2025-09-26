import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import sharp from 'sharp';

export async function GET() {
  try {
    // URL de la página de invitación
    const invitationUrl = process.env.NODE_ENV === 'production'
      ? 'https://tudominio.com/invitacion'  // Cambia esto a tu dominio real
      : 'http://localhost:3000/invitacion';

    // Generar QR code como buffer
    const qrBuffer = await QRCode.toBuffer(invitationUrl, {
      errorCorrectionLevel: 'M', // Corrección media de errores
      type: 'png',
      width: 280,
      margin: 1,
      color: {
        dark: '#000000', // Negro para mejor contraste
        light: '#FFFFFF'
      }
    });

    // Usar el QR directamente sin logo
    const finalQR = qrBuffer;

    // Crear una imagen final con marco dorado y texto
    const finalImage = await sharp({
      create: {
        width: 360,
        height: 450,
        channels: 4,
        background: { r: 43, g: 54, b: 40, alpha: 1 } // Color bosque
      }
    })
    .composite([
      {
        input: Buffer.from(`
          <svg width="360" height="450">
            <!-- Marco dorado -->
            <rect x="30" y="70" width="300" height="300"
              fill="white"
              stroke="#cbb57c"
              stroke-width="2"
              rx="10"/>

            <!-- Título -->
            <text x="180" y="35"
              font-family="Arial, sans-serif"
              font-size="20"
              font-weight="300"
              fill="#ebe8e3"
              text-anchor="middle">
              RESIDENCIAL ATENEA
            </text>

            <!-- Subtítulo -->
            <text x="180" y="55"
              font-family="Arial, sans-serif"
              font-size="12"
              fill="#cbb57c"
              text-anchor="middle"
              letter-spacing="2">
              EVENTO EXCLUSIVO
            </text>

            <!-- Texto inferior -->
            <text x="180" y="410"
              font-family="Arial, sans-serif"
              font-size="12"
              fill="#ebe8e3"
              opacity="0.7"
              text-anchor="middle">
              Escanea para registrarte
            </text>
          </svg>
        `),
        top: 0,
        left: 0
      },
      {
        input: finalQR,
        top: 80,
        left: 40
      }
    ])
    .png()
    .toBuffer();

    // Devolver la imagen como respuesta
    return new NextResponse(finalImage, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="qr-invitacion-atenea.png"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error generando QR:', error);
    return NextResponse.json(
      { error: 'Error al generar el código QR' },
      { status: 500 }
    );
  }
}