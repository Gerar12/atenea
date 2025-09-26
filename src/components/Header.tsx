import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full bg-bosque/95 fixed top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={400}
              height={90}
              className="h-8 sm:h-10 md:h-12 w-auto"
              priority
              quality={100}
            />
          </Link>

          {/* Botón Reservar */}
          <Link
            href="/reservar"
            className="flex items-center gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 hover:bg-bosque/70 bg-black/45 border border-dorado/30 text-dorado font-semibold text-sm sm:text-base rounded-md transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <Image
              src="/a.svg"
              alt=""
              width={20}
              height={20}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <span>Reservar</span>
          </Link>
        </div>
      </div>
    </header>
  )
}