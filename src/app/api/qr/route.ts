import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Leer la imagen QR estática desde la carpeta public
    const imagePath = path.join(process.cwd(), 'public', 'qr-invitacion-atenea.png');
    const imageBuffer = fs.readFileSync(imagePath);

    // Devolver la imagen como respuesta
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="qr-invitacion-atenea.png"',
        'Cache-Control': 'public, max-age=3600',
      }
    });
  } catch (error) {
    console.error('Error al leer la imagen QR:', error);
    return NextResponse.json(
      { error: 'Error al cargar el código QR' },
      { status: 500 }
    );
  }
}