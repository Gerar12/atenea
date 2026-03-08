import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { JsonLdSchema } from "@/components/JsonLd";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: 'swap',
});

const siteUrl = "https://residencialatenea.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Residencial Atenea | Lotificación Premium en Costa del Sol, El Salvador",
    template: "%s | Residencial Atenea"
  },
  description: "Lotificación exclusiva en Costa del Sol, El Salvador. Terrenos frente al manglar con laguna tipo cenote, casa club, amenidades de lujo. La mejor inversión inmobiliaria en la playa. Lotes desde $45,000.",
  keywords: [
    // Keywords principales
    "lotificación El Salvador",
    "lotificación Costa del Sol",
    "terrenos en la playa El Salvador",
    "lotes en Costa del Sol",
    "Residencial Atenea",
    // Keywords secundarias
    "lotificación premium El Salvador",
    "inversión inmobiliaria El Salvador",
    "terrenos frente al mar",
    "lotes de playa El Salvador",
    "desarrollo inmobiliario Costa del Sol",
    // Keywords de ubicación
    "San Luis La Herradura",
    "Boulevard Costa del Sol km 65",
    "terrenos La Paz El Salvador",
    "lotificación cerca del mar",
    // Keywords de características
    "lotificación con laguna",
    "residencial con cenote",
    "lotificación con amenidades",
    "terrenos con casa club",
    "lotes con financiamiento",
    // Keywords de intención
    "comprar terreno playa El Salvador",
    "invertir en bienes raíces El Salvador",
    "mejores lotificaciones El Salvador 2025",
    "proyectos inmobiliarios Costa del Sol",
    "casas de playa El Salvador"
  ],
  authors: [{ name: "Residencial Atenea" }],
  creator: "Residencial Atenea",
  publisher: "Residencial Atenea",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/a.svg',
    shortcut: '/a.svg',
    apple: '/a.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_SV',
    url: siteUrl,
    siteName: 'Residencial Atenea',
    title: 'Residencial Atenea | La Mejor Lotificación en Costa del Sol, El Salvador',
    description: 'Descubre la lotificación más exclusiva de El Salvador. Terrenos premium frente al manglar, laguna tipo cenote, amenidades de clase mundial. Tu inversión ideal en la Costa del Sol.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Residencial Atenea - Lotificación Premium Costa del Sol El Salvador',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Residencial Atenea | Lotificación Premium Costa del Sol',
    description: 'La lotificación más exclusiva de El Salvador. Terrenos frente al manglar con laguna tipo cenote y amenidades de lujo.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Agregar cuando tengas los códigos de verificación
    // google: 'tu-codigo-de-google',
    // yandex: 'tu-codigo-de-yandex',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'es-SV': siteUrl,
      'es': siteUrl,
    },
  },
  category: 'real estate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <JsonLdSchema />
      </head>
      <body
        className={`${montserrat.className} antialiased min-h-screen flex flex-col`}
      >
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <CookieBanner />
      </body>
    </html>
  );
}
