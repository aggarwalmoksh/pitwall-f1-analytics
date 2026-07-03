/**
 * App-wide constants. Keeping nav + team colors here means the sidebar,
 * router, and (later) charts all read from one source of truth.
 */
import {
  LayoutDashboard,
  Radio,
  CalendarDays,
  Trophy,
  LineChart,
  History,
  Sparkles,
} from 'lucide-react'

// Navigation = router routes. `to` is the URL, used by both Sidebar and App.
export const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/live', label: 'Live', icon: Radio, badge: 'LIVE' },
  { to: '/schedule', label: 'Schedule', icon: CalendarDays },
  { to: '/standings', label: 'Standings', icon: Trophy },
  { to: '/analysis', label: 'Analysis', icon: LineChart },
  { to: '/history', label: 'History & Records', icon: History },
  { to: '/predictions', label: 'Predictions', icon: Sparkles },
]

// Constructor colors keyed by Jolpica constructorId — used for cards, grids, charts.
// Covers the 2026 grid (Audi + Cadillac in, Sauber out) plus recent teams so
// historical seasons still render with sensible colors.
export const TEAM_COLORS = {
  mercedes: '#27F4D2',
  ferrari: '#E8002D',
  red_bull: '#3671C6',
  mclaren: '#FF8000',
  aston_martin: '#229971',
  alpine: '#0093CC',
  williams: '#64C4FF',
  rb: '#6692FF',
  haas: '#B6BABD',
  audi: '#00594F',
  cadillac: '#B8860B',
  // legacy ids for past seasons
  sauber: '#52E252',
  alphatauri: '#5E8FAA',
  alfa: '#900000',
  racing_point: '#F596C8',
  renault: '#FFF500',
  toro_rosso: '#469BFF',
  force_india: '#F596C8',
}

// Neutral fallback for any constructor we don't have a color for.
export const FALLBACK_TEAM_COLOR = '#8b8b9a'

/** Safe lookup: returns the team's color or the neutral fallback. */
export function teamColor(constructorId) {
  return TEAM_COLORS[constructorId] || FALLBACK_TEAM_COLOR
}
