import { getCountries, getCountryCallingCode, CountryCode } from 'libphonenumber-js'

export type Country = {
  code: string
  name: string
  dial: string
  flag: string
}

const PRIORITY_CODES = ['SV', 'GT', 'HN', 'NI', 'CR', 'PA', 'MX', 'US', 'ES']

function isoToFlag(iso: string): string {
  const codePoints = iso
    .toUpperCase()
    .split('')
    .map((c) => 127397 + c.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

function countryName(iso: string): string {
  try {
    const dn = new Intl.DisplayNames(['es'], { type: 'region' })
    return dn.of(iso) ?? iso
  } catch {
    return iso
  }
}

function buildCountries(): Country[] {
  const all: Country[] = getCountries().map((iso: CountryCode) => ({
    code: iso,
    name: countryName(iso),
    dial: `+${getCountryCallingCode(iso)}`,
    flag: isoToFlag(iso),
  }))

  const priority = PRIORITY_CODES.map((c) => all.find((x) => x.code === c)).filter(
    (c): c is Country => Boolean(c),
  )
  const rest = all
    .filter((c) => !PRIORITY_CODES.includes(c.code))
    .sort((a, b) => a.name.localeCompare(b.name, 'es'))

  return [...priority, ...rest]
}

export const COUNTRIES: Country[] = buildCountries()

export const DEFAULT_COUNTRY: Country =
  COUNTRIES.find((c) => c.code === 'SV') ?? COUNTRIES[0]

export function findCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code.toUpperCase())
}
