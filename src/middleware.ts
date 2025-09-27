import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Por ahora solo retornamos next para evitar errores
  // La protección real se hace en la página del panel
  return NextResponse.next()
}

export const config = {
  matcher: ['/panel/:path*']
}