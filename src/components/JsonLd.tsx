export function JsonLdSchema() {
  const baseUrl = "https://residencialatenea.com"

  // Schema de la Organización/Empresa
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${baseUrl}/#organization`,
    name: "Residencial Atenea",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: 200,
      height: 200,
    },
    image: `${baseUrl}/og-image.jpg`,
    description: "Lotificación premium en Costa del Sol, El Salvador. Terrenos exclusivos frente al manglar con laguna tipo cenote y amenidades de lujo.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Boulevard Costa del Sol km 65",
      addressLocality: "San Luis La Herradura",
      addressRegion: "La Paz",
      addressCountry: "SV",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.3167,
      longitude: -89.0333,
    },
    areaServed: {
      "@type": "Country",
      name: "El Salvador",
    },
    priceRange: "$$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "18:00",
    },
    sameAs: [
      // Agregar redes sociales cuando las tengan
      // "https://www.facebook.com/residencialatenea",
      // "https://www.instagram.com/residencialatenea",
    ],
  }

  // Schema del Proyecto Inmobiliario
  const realEstateSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${baseUrl}/#listing`,
    name: "Residencial Atenea - Lotificación Premium Costa del Sol",
    description: "Lotificación exclusiva en Costa del Sol, El Salvador. 420 lotes residenciales frente al manglar con laguna tipo cenote, casa club, zonas de playa internas, kayak, áreas de BBQ y seguridad 24/7.",
    url: baseUrl,
    image: [
      `${baseUrl}/og-image.jpg`,
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "45000",
      priceValidUntil: "2025-12-31",
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Boulevard Costa del Sol km 65",
      addressLocality: "San Luis La Herradura",
      addressRegion: "La Paz",
      addressCountry: "SV",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.3167,
      longitude: -89.0333,
    },
  }

  // Schema de Lugar (Place)
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${baseUrl}/#place`,
    name: "Residencial Atenea",
    description: "Residencial exclusivo en Costa del Sol con laguna tipo cenote, la primera de El Salvador",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Boulevard Costa del Sol km 65",
      addressLocality: "San Luis La Herradura",
      addressRegion: "La Paz",
      addressCountry: "SV",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.3167,
      longitude: -89.0333,
    },
    hasMap: "https://maps.google.com/?q=13.3167,-89.0333",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Laguna tipo cenote", value: true },
      { "@type": "LocationFeatureSpecification", name: "Casa club", value: true },
      { "@type": "LocationFeatureSpecification", name: "Zonas de playa internas", value: true },
      { "@type": "LocationFeatureSpecification", name: "Área de kayak y paddle", value: true },
      { "@type": "LocationFeatureSpecification", name: "Áreas de BBQ", value: true },
      { "@type": "LocationFeatureSpecification", name: "Seguridad 24/7", value: true },
      { "@type": "LocationFeatureSpecification", name: "A 5 minutos del mar", value: true },
    ],
  }

  // Schema de WebSite para búsqueda
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Residencial Atenea",
    description: "Lotificación premium en Costa del Sol, El Salvador",
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    inLanguage: "es-SV",
  }

  // Schema de BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: baseUrl,
      },
    ],
  }

  // Schema de FAQPage para preguntas frecuentes (mejora mucho el SEO)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Dónde está ubicada Residencial Atenea?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Residencial Atenea está ubicada en Boulevard Costa del Sol km 65, San Luis La Herradura, La Paz, El Salvador. A solo 5 minutos del mar.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué amenidades tiene Residencial Atenea?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Residencial Atenea cuenta con laguna tipo cenote (la primera en El Salvador), casa club, zonas de playa internas, área de kayak y stand-up paddle, áreas de BBQ, zonas verdes y seguridad 24/7.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuántos lotes hay disponibles en Residencial Atenea?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Residencial Atenea cuenta con 420 lotes residenciales disponibles, todos con acceso a las amenidades del complejo.",
        },
      },
      {
        "@type": "Question",
        name: "¿Residencial Atenea ofrece financiamiento?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, Residencial Atenea ofrece opciones de financiamiento directo y también trabaja con instituciones bancarias para facilitar la compra de tu lote.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué hace única a Residencial Atenea?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Residencial Atenea es única por su laguna tipo cenote, la primera de El Salvador, además de su ubicación privilegiada frente al manglar en la Costa del Sol, una de las zonas más exclusivas del país.",
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
