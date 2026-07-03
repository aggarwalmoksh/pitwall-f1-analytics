import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../../lib/constants'

/**
 * Sidebar — primary navigation.
 * On mobile it slides in as a drawer (controlled by `open`/`onClose`);
 * on lg+ screens it's always visible as a fixed left rail.
 */
export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Dim backdrop on mobile when the drawer is open */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-surface transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-3 border-b border-line px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-f1 font-display text-lg font-black text-white">
            F1
          </div>
          <div className="leading-tight">
            <div className="font-display text-sm font-bold">PITWALL</div>
            <div className="text-[11px] tracking-wider text-muted">
              ANALYTICS
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-f1/10 text-text glow-f1'
                    : 'text-muted hover:bg-surface-2 hover:text-text'
                }`
              }
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="flex items-center gap-1 rounded-full bg-f1/15 px-2 py-0.5 text-[10px] font-bold text-f1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-f1" />
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-line p-4 text-[11px] text-muted">
          <p className="font-semibold text-text">Season 2025</p>
          <p>Data: Jolpica · OpenF1</p>
        </div>
      </aside>
    </>
  )
}
