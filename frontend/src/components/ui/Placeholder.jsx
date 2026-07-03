import Card from './Card'

/**
 * Placeholder — a "coming in Phase X" panel with faux skeleton rows.
 * Lets every page look deliberate before its real data is wired up.
 */
export default function Placeholder({ phase, title, points = [] }) {
  return (
    <Card className="relative overflow-hidden">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-full border border-f1/40 bg-f1/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-f1">
          Phase {phase}
        </span>
        <h3 className="font-display text-lg font-bold">{title}</h3>
      </div>

      {points.length > 0 && (
        <ul className="mb-5 space-y-1.5 text-sm text-muted">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-f1" />
              {p}
            </li>
          ))}
        </ul>
      )}

      {/* Faux skeleton rows to hint at future content */}
      <div className="space-y-2">
        {[100, 85, 70].map((w) => (
          <div
            key={w}
            className="h-3 animate-pulse rounded bg-surface-2"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </Card>
  )
}
