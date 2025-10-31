'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-bosque/5 border-t border-bosque/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enlaces legales */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 text-sm">
          <Link
            href="/aviso-legal"
            className="text-bosque/70 hover:text-dorado transition-colors"
          >
            Aviso Legal
          </Link>
          <span className="text-bosque/30">•</span>
          <Link
            href="/politica-de-privacidad"
            className="text-bosque/70 hover:text-dorado transition-colors"
          >
            Política de Privacidad
          </Link>
          <span className="text-bosque/30">•</span>
          <Link
            href="/politica-de-cookies"
            className="text-bosque/70 hover:text-dorado transition-colors"
          >
            Política de Cookies
          </Link>
          <span className="text-bosque/30">•</span>
          <button
            onClick={() => {
              localStorage.removeItem('cookie_consent')
              window.location.reload()
            }}
            className="text-bosque/70 hover:text-dorado transition-colors"
          >
            Configurar Cookies
          </button>
        </div>

        {/* Información de contacto */}
        <div className="text-center mb-6 text-sm text-bosque/60">
          <p className="mb-1">Inmobiliaria El Salvador, S.A. de C.V.</p>
          <p className="mb-1 text-xs">Corp Salex</p>
          <p>
            <a href="mailto:info@salex.sv" className="hover:text-dorado transition-colors">
              info@salex.sv
            </a>
            {' | '}
            <a href="tel:+50370181141" className="hover:text-dorado transition-colors">
              +503 7018-1141
            </a>
          </p>
        </div>

        {/* Powered by Salex */}
        <div className="flex justify-center">
          <a
            href="https://salex.sv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-sm text-marfil/40">Powered by</span>
            <Image
              src="/s.png"
              alt="Salex"
              width={50}
              height={20}
              className="h-5 w-auto opacity-70"
            />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-xs text-bosque/40">
          © {new Date().getFullYear()} Residencial Atenea. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}