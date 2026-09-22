import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
]

const nextConfig: NextConfig = {
  // La invitación (RSVP) y su QR se retiraron el 2026-09-22 junto con la base de datos.
  // Los QR impresos siguen apuntando aquí: se mandan a la portada en vez de dar 404.
  redirects: async () => [
    { source: '/invitacion', destination: '/', permanent: false },
    { source: '/qr', destination: '/', permanent: false },
  ],
  headers: async () => [
    {
      source: '/(.*)',
      headers: securityHeaders,
    },
  ],
};

export default nextConfig;
