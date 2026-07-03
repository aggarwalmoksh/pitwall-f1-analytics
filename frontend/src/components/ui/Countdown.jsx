import { useState, useEffect } from 'react'
import { breakdown } from '../../lib/datetime'

/**
 * Countdown — live ticking timer to a target Date.
 * `compact` renders a single inline string (for the Topbar chip);
 * otherwise it renders labeled day/hr/min/sec boxes.
 */
export default function Countdown({ target, compact = false }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!target) return null
  const t = breakdown(target.getTime() - now)

  if (compact) {
    const str =
      t.days > 0
        ? `${t.days}d ${t.hours}h`
        : `${String(t.hours).padStart(2, '0')}:${String(t.minutes).padStart(2, '0')}:${String(t.seconds).padStart(2, '0')}`
    return <span className="font-mono">{str}</span>
  }

  const units = [
    { label: 'Days', value: t.days },
    { label: 'Hrs', value: t.hours },
    { label: 'Min', value: t.minutes },
    { label: 'Sec', value: t.seconds },
  ]

  return (
    <div className="flex gap-2">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex min-w-[3.25rem] flex-col items-center rounded-xl border border-line bg-surface-2 px-2 py-2"
        >
          <span className="font-mono text-xl font-bold tabular-nums">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
