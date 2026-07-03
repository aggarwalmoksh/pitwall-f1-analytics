/**
 * Country name (as returned by Ergast's Circuit.Location.country) → flag emoji.
 * Covers every country on the current + recent F1 calendars.
 */
const COUNTRY_FLAGS = {
  Australia: '🇦🇺',
  China: '🇨🇳',
  Japan: '🇯🇵',
  Bahrain: '🇧🇭',
  'Saudi Arabia': '🇸🇦',
  USA: '🇺🇸',
  'United States': '🇺🇸',
  Italy: '🇮🇹',
  Monaco: '🇲🇨',
  Spain: '🇪🇸',
  Canada: '🇨🇦',
  Austria: '🇦🇹',
  UK: '🇬🇧',
  'United Kingdom': '🇬🇧',
  Hungary: '🇭🇺',
  Belgium: '🇧🇪',
  Netherlands: '🇳🇱',
  Azerbaijan: '🇦🇿',
  Singapore: '🇸🇬',
  Mexico: '🇲🇽',
  Brazil: '🇧🇷',
  Qatar: '🇶🇦',
  UAE: '🇦🇪',
  'United Arab Emirates': '🇦🇪',
  France: '🇫🇷',
  Portugal: '🇵🇹',
  Germany: '🇩🇪',
  Turkey: '🇹🇷',
  Russia: '🇷🇺',
}

/** Returns the flag emoji for a country, or a checkered flag fallback. */
export function countryFlag(country) {
  return COUNTRY_FLAGS[country] || '🏁'
}
