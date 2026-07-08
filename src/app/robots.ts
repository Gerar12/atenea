import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://residencialatenea.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/panel/', '/api/', '/qr'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/panel/', '/api/', '/qr'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/panel/', '/api/', '/qr'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
