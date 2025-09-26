import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import sharp from 'sharp';

export async function GET() {
  try {
    // URL de la página de invitación usando variable de entorno o fallback
    const invitationUrl = process.env.NEXT_PUBLIC_URL
      ? `${process.env.NEXT_PUBLIC_URL}/invitacion`
      : process.env.NODE_ENV === 'production'
      ? 'https://atenea.gcoder.dev/invitacion'
      : 'http://localhost:3000/invitacion';

    console.log('Generating QR for URL:', invitationUrl);

    // Generar QR code como buffer
    const qrBuffer = await QRCode.toBuffer(invitationUrl, {
      errorCorrectionLevel: 'M',
      type: 'png',
      width: 280,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Crear SVG con texto sin caracteres especiales
    const svgText = `<svg width="360" height="450" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="70" width="300" height="300" fill="white" stroke="#cbb57c" stroke-width="2" rx="10"/>
      <text x="180" y="35" font-family="Arial" font-size="20" font-weight="300" fill="#ebe8e3" text-anchor="middle">RESIDENCIAL ATENEA</text>
      <text x="180" y="55" font-family="Arial" font-size="12" fill="#cbb57c" text-anchor="middle">EVENTO EXCLUSIVO</text>
      <text x="180" y="410" font-family="Arial" font-size="12" fill="#ebe8e3" opacity="0.7" text-anchor="middle">Escanea para registrarte</text>
    </svg>`;

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
        input: Buffer.from(svgText),
        top: 0,
        left: 0
      },
      {
        input: qrBuffer,
        top: 80,
        left: 40
      }
    ])
    .png()
    .toBuffer();

    // Devolver la imagen como respuesta
    return new Response(finalImage as any, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="qr-invitacion-atenea.png"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error generando QR con decoración:', error);
    // Si hay error, devolver un QR simple sin decoración
    try {
      const invitationUrl = process.env.NODE_ENV === 'production'
        ? 'https://atenea.gcoder.dev/invitacion'
        : 'http://localhost:3000/invitacion';

      const simpleQr = await QRCode.toBuffer(invitationUrl, {
        errorCorrectionLevel: 'M',
        type: 'png',
        width: 360,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      return new Response(simpleQr as any, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
    } catch (fallbackError) {
      return NextResponse.json(
        { error: 'Error al generar el código QR' },
        { status: 500 }
      );
    }
  }
}