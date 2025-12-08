'use client'

import { useState } from 'react'

const amenities = [
  {
    id: 1,
    title: 'Laguna turquesa',
    description: 'Laguna cristalina con agua turquesa',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Laguna con estrellas */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 10l.75 1.75L7.5 12.5l-1.75.75L5 15l-.75-1.75L2.5 12.5l1.75-.75L5 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 10l.75 1.75 1.75.75-1.75.75L19 15l-.75-1.75-1.75-.75 1.75-.75L19 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 18c2 0 3 1 5 1s3-1 5-1 3 1 5 1 3-1 5-1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Playas internas',
    description: 'Playas privadas dentro del complejo',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Sombrilla de playa */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3C8 3 5 6 5 9h14c0-3-3-6-7-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v18" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9c-2-2-4-3-7-3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9c2-2 4-3 7-3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 21h12" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 18c1.5 0 2.5 1 4 1s2.5-1 4-1 2.5 1 4 1 2.5-1 4-1" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Zona exclusiva para nadar',
    description: 'Área segura y vigilada para natación',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Persona nadando */}
        <circle cx="19" cy="6" r="2.5" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 17c1.5 0 2.5 1 4 1s2.5-1 4-1 2.5 1 4 1 2.5-1 4-1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-4 2-6-1-5 3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 10l2 4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Kayak y Stand-up Paddle',
    description: 'Zona exclusiva para deportes acuáticos',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Persona surfeando/paddle */}
        <circle cx="12" cy="4" r="2" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 8l3 3 3-3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 11l4 4 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 17c4-2 8-2 16 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 20c2 0 3 1 5 1s3-1 5-1 3 1 5 1 3-1 5-1" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Áreas de BBQ',
    description: 'Espacios equipados para asados',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Parrilla BBQ */}
        <ellipse cx="12" cy="10" rx="8" ry="3" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 10v4c0 1.5 3.5 3 8 3s8-1.5 8-3v-4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 17v4M16 17v4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 21h12" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 6c0-1 .5-2 1-2.5M12 5c0-1.5.5-2.5 1-3M16 6c0-1 .5-2 1-2.5" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Áreas recreativas para niños',
    description: 'Zonas de juego seguras y divertidas',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Columpio */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4h16" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 4v2M18 4v2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 4v10M16 4v10" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 14h4M14 14h4" />
        <circle cx="8" cy="17" r="1.5" strokeWidth="1.5" />
        <circle cx="16" cy="17" r="1.5" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 18.5v2M16 18.5v2" />
      </svg>
    ),
  },
  {
    id: 7,
    title: 'Áreas de descanso',
    description: 'Espacios para relajarse con vistas',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Silla de playa */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 20l4-12h10l4 12" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8l5 6 5-6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 14h14" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 20h2M18 20h2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8V5" />
        <circle cx="12" cy="3.5" r="1.5" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 8,
    title: 'Casa club',
    description: 'Con baños, cocina y bar para eventos',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 9,
    title: 'Islas con amenidades',
    description: 'Cabañas playeras exclusivas',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Cabaña playera */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3l8 6H4l8-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 9v8h12V9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 17v-4h4v4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 20c2 0 3 1 5 1s3-1 5-1 3 1 5 1 3-1 5-1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 17h2M18 17h2" />
      </svg>
    ),
  },
  {
    id: 10,
    title: 'Zonas verdes y senderos',
    description: 'Senderos naturales para caminar',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Árboles */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21v-5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16c-2.5 0-4-2-4-4s2-4 4-4 4 2 4 4-1.5 4-4 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 21v-7" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 14c-3 0-5-2.5-5-5s2.5-5 5-5 5 2.5 5 5-2 5-5 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21h18" />
      </svg>
    ),
  },
  {
    id: 11,
    title: 'Canchas deportivas',
    description: 'Canchas multiuso para fútbol y más',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Balón de fútbol */}
        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3l2 4-2 2-2-2 2-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21l2-4-2-2-2 2 2 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l4 2 2-2-2-2-4 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12l-4 2-2-2 2-2 4 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 9l2 3 2-3M10 15l2-3 2 3" />
      </svg>
    ),
  },
  {
    id: 12,
    title: 'Muelle',
    description: 'Para embarcaciones pequeñas',
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Muelle */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 10h16" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 10v7M10 10v7M14 10v7M18 10v7" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 17c2 0 3 1 5 1s3-1 5-1 3 1 5 1 3-1 5-1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 21c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 6v4M20 4l2 2-2 2" />
      </svg>
    ),
  },
]

export default function Amenities() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="w-full bg-gradient-to-b from-arena to-marfil py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-20 h-1 bg-dorado mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-bosque mb-4">
            Amenidades del Complejo
          </h2>
          <p className="text-lg text-bosque/70 max-w-2xl mx-auto">
            Disfruta de un estilo de vida unico con instalaciones de primera clase rodeadas de naturaleza
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredId(amenity.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-dorado/10 to-bosque/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-16 h-16 mb-4 text-dorado transition-all duration-500 ${
                    hoveredId === amenity.id ? 'scale-110 rotate-6' : ''
                  }`}
                >
                  {amenity.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-bosque mb-2 group-hover:text-dorado transition-colors duration-300">
                  {amenity.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-bosque/60 group-hover:text-bosque/80 transition-colors duration-300">
                  {amenity.description}
                </p>

                {/* Decorative line */}
                <div className="mt-4 h-1 w-0 bg-dorado group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://salex.sv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-dorado text-white font-semibold rounded-lg hover:bg-dorado/90 transition-colors duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Agenda tu visita
          </a>
        </div>
      </div>
    </section>
  )
}
