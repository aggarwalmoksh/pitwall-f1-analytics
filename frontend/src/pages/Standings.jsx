import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import SegmentedTabs from '../components/ui/SegmentedTabs'
import { Loading, ErrorState, Empty } from '../components/ui/States'
import {
  useDriverStandings,
  useConstructorStandings,
} from '../lib/hooks/useStandings'
import { teamColor } from '../lib/constants'
import { CURRENT_SEASON } from '../lib/config'

const TABS = [
  { id: 'drivers', label: 'Drivers' },
  { id: 'constructors', label: 'Constructors' },
]

// A left color bar keyed to the driver/team's constructor color.
function TeamBar({ constructorId }) {
  return (
    <span
      className="absolute inset-y-0 left-0 w-1"
      style={{ backgroundColor: teamColor(constructorId) }}
    />
  )
}

// Position badge — gold/silver/bronze for the podium, subtle otherwise.
function PosBadge({ position }) {
  const medal =
    position === 1
      ? 'bg-yellow/20 text-yellow'
      : position === 2
        ? 'bg-white/15 text-text'
        : position === 3
          ? 'bg-orange-500/20 text-orange-400'
          : 'bg-surface-2 text-muted'
  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-lg font-mono text-sm font-bold ${medal}`}
    >
      {position}
    </span>
  )
}

function DriverTable({ standings }) {
  const leader = standings[0]?.points ?? 0
  return (
    <div className="divide-y divide-line">
      {/* header row */}
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider text-muted">
        <span className="w-7 text-center">Pos</span>
        <span>Driver</span>
        <span className="hidden w-16 text-right sm:block">Wins</span>
        <span className="hidden w-20 text-right sm:block">Gap</span>
        <span className="w-16 text-right">Pts</span>
      </div>

      {standings.map((d) => (
        <div
          key={d.driverId}
          className="relative grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-2"
        >
          <TeamBar constructorId={d.constructorId} />
          <PosBadge position={d.position} />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate font-semibold">
                {d.givenName} {d.familyName}
              </span>
              {d.number && (
                <span className="font-mono text-xs text-muted">#{d.number}</span>
              )}
            </div>
            <div className="truncate text-xs text-muted">{d.constructorName}</div>
          </div>

          <span className="hidden w-16 text-right font-mono text-sm text-muted sm:block">
            {d.wins}
          </span>
          <span className="hidden w-20 text-right font-mono text-sm text-muted sm:block">
            {d.position === 1 ? '—' : `-${leader - d.points}`}
          </span>
          <span className="w-16 text-right font-mono text-base font-bold">
            {d.points}
          </span>
        </div>
      ))}
    </div>
  )
}

function ConstructorTable({ standings }) {
  const leader = standings[0]?.points ?? 0
  const max = leader || 1
  return (
    <div className="divide-y divide-line">
      <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-4 py-2 text-[11px] uppercase tracking-wider text-muted">
        <span className="w-7 text-center">Pos</span>
        <span>Constructor</span>
        <span className="hidden w-16 text-right sm:block">Wins</span>
        <span className="w-16 text-right">Pts</span>
      </div>

      {standings.map((c) => {
        const color = teamColor(c.constructorId)
        return (
          <div
            key={c.constructorId}
            className="relative grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-2"
          >
            <TeamBar constructorId={c.constructorId} />
            <PosBadge position={c.position} />

            <div className="min-w-0">
              <span className="font-semibold" style={{ color }}>
                {c.constructorName}
              </span>
              {/* points bar relative to the leader */}
              <div className="mt-1.5 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(c.points / max) * 100}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>

            <span className="hidden w-16 text-right font-mono text-sm text-muted sm:block">
              {c.wins}
            </span>
            <span className="w-16 text-right font-mono text-base font-bold">
              {c.points}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function Standings() {
  const [tab, setTab] = useState('drivers')
  const drivers = useDriverStandings()
  const constructors = useConstructorStandings()

  const active = tab === 'drivers' ? drivers : constructors
  const round = active.data?.round

  return (
    <div>
      <PageHeader
        title="Standings"
        subtitle={
          round
            ? `${CURRENT_SEASON} season · after round ${round}`
            : `${CURRENT_SEASON} season`
        }
      >
        <SegmentedTabs tabs={TABS} value={tab} onChange={setTab} />
      </PageHeader>

      {active.isLoading ? (
        <Loading label="Fetching standings…" />
      ) : active.isError ? (
        <ErrorState error={active.error} onRetry={active.refetch} />
      ) : active.data?.standings?.length ? (
        <Card className="overflow-hidden p-0">
          {tab === 'drivers' ? (
            <DriverTable standings={drivers.data.standings} />
          ) : (
            <ConstructorTable standings={constructors.data.standings} />
          )}
        </Card>
      ) : (
        <Empty label="No standings available for this season yet." />
      )}
    </div>
  )
}
