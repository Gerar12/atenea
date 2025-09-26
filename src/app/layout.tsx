import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Residencial Atenea",
  description: "Un enclave único donde la naturaleza se convierte en tu mayor lujo",
  icons: {
    icon: '/a.svg',
    shortcut: '/a.svg',
    apple: '/a.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
