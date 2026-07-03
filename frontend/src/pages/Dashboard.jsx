import { Trophy, Flag, Gauge, Timer } from 'lucide-react'
import Card from '../components/ui/Card'
import Placeholder from '../components/ui/Placeholder'

// Small stat tile used in the top row.
function Stat({ icon: Icon, label, value, hint }) {
  return (
    <Card className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-f1/10 text-f1">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted">
          {label}
        </div>
        <div className="font-display text-xl font-bold">{value}</div>
        {hint && <div className="text-[11px] text-muted">{hint}</div>}
      </div>
    </Card>
  )
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-surface-2 via-surface to-bg p-6 sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-f1/20 blur-3xl" />
        <div className="relative">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-f1">
            Season 2025
          </span>
          <h1 className="mt-2 max-w-xl font-display text-3xl font-black leading-tight sm:text-4xl">
            Your paddock for live timing, deep analysis & predictions.
          </h1>
          <p className="mt-3 max-w-lg text-sm text-muted">
            Track every session, dig into qualifying pace and race strategy, and
            see model-driven predictions — all in one place.
          </p>
        </div>
      </div>

      {/* Stat tiles (placeholder values for now) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Trophy} label="Championship Leader" value="—" hint="Wire in Phase 2" />
        <Stat icon={Flag} label="Races Completed" value="—" hint="of 24" />
        <Stat icon={Timer} label="Next Session" value="—" hint="Practice / Quali / Race" />
        <Stat icon={Gauge} label="Fastest Lap (last GP)" value="—" hint="—" />
      </div>

      {/* Feature previews */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Placeholder
          phase={2}
          title="Standings & Next Race"
          points={[
            'Live driver & constructor championship tables',
            'Countdown and details for the upcoming Grand Prix',
          ]}
        />
        <Placeholder
          phase={3}
          title="Session Analysis"
          points={[
            'Qualifying grid with gaps and sector times',
            'Lap-time evolution and tyre strategy charts',
          ]}
        />
      </div>
    </div>
  )
}
