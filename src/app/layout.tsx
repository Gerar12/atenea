import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

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
        className={`${montserrat.className} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
