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

// Official 2024/25-era constructor colors — used later for charts, cards, grids.
export const TEAM_COLORS = {
  red_bull: '#3671C6',
  ferrari: '#E8002D',
  mercedes: '#27F4D2',
  mclaren: '#FF8000',
  aston_martin: '#229971',
  alpine: '#0093CC',
  williams: '#64C4FF',
  rb: '#6692FF',
  sauber: '#52E252',
  haas: '#B6BABD',
}
