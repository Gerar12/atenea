'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { COUNTRIES, Country } from '@/lib/countries'

type Props = {
  value: Country
  onChange: (country: Country) => void
  disabled?: boolean
}

export default function PhoneCountrySelect({ value, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    setTimeout(() => searchRef.current?.focus(), 50)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COUNTRIES
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dial.includes(q),
    )
  }, [query])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 h-12 px-3 bg-bosque/60 backdrop-blur-md border border-dorado/40 rounded-md text-marfil hover:border-dorado focus:outline-none focus:border-dorado focus:ring-1 focus:ring-dorado/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
      >
        <span className="text-xl leading-none">{value.flag}</span>
        <span className="text-sm font-medium tracking-wide">{value.dial}</span>
        <svg
          className={`w-4 h-4 text-dorado/70 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-[300px] max-w-[90vw] bg-bosque/95 backdrop-blur-xl border border-dorado/40 rounded-md shadow-2xl overflow-hidden">
          <div className="p-2 border-b border-dorado/20">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar país..."
              className="w-full px-3 py-2 bg-bosque/60 border border-dorado/30 rounded text-marfil placeholder-marfil/40 text-sm focus:outline-none focus:border-dorado"
            />
          </div>
          <ul
            role="listbox"
            className="max-h-64 overflow-y-auto py-1"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,175,55,0.4) transparent' }}
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-marfil/50 italic">Sin resultados</li>
            ) : (
              filtered.map((c) => {
                const selected = c.code === value.code
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        onChange(c)
                        setOpen(false)
                        setQuery('')
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                        selected
                          ? 'bg-dorado/15 text-dorado'
                          : 'text-marfil hover:bg-dorado/10 hover:text-dorado'
                      }`}
                    >
                      <span className="text-xl leading-none flex-shrink-0">{c.flag}</span>
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-xs text-marfil/60 tabular-nums">{c.dial}</span>
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
