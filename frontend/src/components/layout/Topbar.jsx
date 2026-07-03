import { Menu, Search, Flag } from 'lucide-react'

/**
 * Topbar — sits above the page content.
 * The hamburger only shows on mobile (< lg) to open the sidebar drawer.
 * The "next race" chip is a placeholder for now; we'll wire real data in Phase 2.
 */
export default function Topbar({ onMenu }) {
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

      {/* Next race chip (placeholder) */}
      <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2">
        <Flag className="h-4 w-4 text-f1" />
        <div className="leading-tight">
          <div className="text-[10px] uppercase tracking-wider text-muted">
            Next Race
          </div>
          <div className="text-xs font-semibold">TBD · —</div>
        </div>
      </div>
    </header>
  )
}
