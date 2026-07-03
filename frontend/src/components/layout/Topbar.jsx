import { Link } from 'react-router-dom'
import { Menu, Search, Flag } from 'lucide-react'
import { useNextRace } from '../../lib/hooks/useSchedule'
import Countdown from '../ui/Countdown'
import { countryFlag } from '../../lib/flags'

/**
 * Topbar — sits above the page content.
 * The hamburger only shows on mobile (< lg) to open the sidebar drawer.
 * The "next race" chip now pulls the real upcoming GP + a live countdown.
 */
export default function Topbar({ onMenu }) {
  const { next } = useNextRace()
  const race = next?.race

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-bg/80 px-4 backdrop-blur-md sm:px-6">
      {/* Mobile menu button */}
      <button
        onClick={onMenu}
        className="rounded-lg p-2 text-muted hover:bg-surface-2 hover:text-text lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search (visual only for now) */}
      <div className="hidden flex-1 items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-muted sm:flex sm:max-w-md">
        <Search className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search drivers, teams, circuits…"
          className="w-full bg-transparent text-text placeholder:text-muted focus:outline-none"
        />
      </div>

      <div className="flex-1 sm:hidden" />

      {/* Next race chip — links to the Schedule page */}
      <Link
        to="/schedule"
        className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 transition-colors hover:border-f1/40"
      >
        {race ? (
          <>
            <span className="text-base leading-none">
              {countryFlag(race.country)}
            </span>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-wider text-muted">
                Next · R{race.round}
              </div>
              <div className="text-xs font-semibold">
                {race.raceName.replace(' Grand Prix', ' GP')}
              </div>
            </div>
            <div className="ml-1 hidden border-l border-line pl-2 text-xs font-semibold text-f1 sm:block">
              <Countdown target={race.raceDate} compact />
            </div>
          </>
        ) : (
          <>
            <Flag className="h-4 w-4 text-f1" />
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-wider text-muted">
                Next Race
              </div>
              <div className="text-xs font-semibold">—</div>
            </div>
          </>
        )}
      </Link>
    </header>
  )
}
