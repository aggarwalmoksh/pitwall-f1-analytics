import { Link } from 'react-router-dom'
import { Trophy, Flag, Gauge, Timer, ChevronRight, MapPin } from 'lucide-react'
import Card from '../components/ui/Card'
import Countdown from '../components/ui/Countdown'
import { Loading } from '../components/ui/States'
import { useDriverStandings } from '../lib/hooks/useStandings'
import { useSchedule } from '../lib/hooks/useSchedule'
import { useLastRace } from '../lib/hooks/useLastRace'
import { findNextRace, findNextSession, fmtDate } from '../lib/datetime'
import { teamColor } from '../lib/constants'
import { countryFlag } from '../lib/flags'
import { CURRENT_SEASON } from '../lib/config'

// Small stat tile used in the top row.
function Stat({ icon: Icon, label, value, hint }) {
  return (
    <Card className="flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-f1/10 text-f1">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-muted">
          {label}
        </div>
        <div className="truncate font-display text-xl font-bold">{value}</div>
        {hint && <div className="truncate text-[11px] text-muted">{hint}</div>}
      </div>
    </Card>
  )
}

// Section header with a "see all" link.
function SectionHead({ title, to, linkLabel }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
        {title}
      </h3>
      {to && (
        <Link
          to={to}
          className="flex items-center gap-0.5 text-xs font-semibold text-f1 hover:underline"
        >
          {linkLabel} <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  )
}

const MEDALS = ['#FFD700', '#C0C0C0', '#CD7F32']

export default function Dashboard() {
  const driversQ = useDriverStandings()
  const scheduleQ = useSchedule()
  const lastRaceQ = useLastRace()

  const drivers = driversQ.data?.standings || []
  const schedule = scheduleQ.data || []
  const lastRace = lastRaceQ.data

  const leader = drivers[0]
  const nextRace = schedule.length ? findNextRace(schedule) : null
  const nextSession = schedule.length ? findNextSession(schedule) : null
  const racesDone = schedule.filter((r) => r.raceDate && r.raceDate < new Date()).length

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-surface-2 via-surface to-bg p-6 sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-f1/20 blur-3xl" />
        <div className="relative">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-f1">
            Season {CURRENT_SEASON}
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

      {/* Stat tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={Trophy}
          label="Championship Leader"
          value={leader ? `${leader.givenName[0]}. ${leader.familyName}` : '—'}
          hint={leader ? `${leader.points} pts · ${leader.wins} wins` : 'Loading…'}
        />
        <Stat
          icon={Flag}
          label="Races Completed"
          value={schedule.length ? `${racesDone}` : '—'}
          hint={schedule.length ? `of ${schedule.length}` : 'Loading…'}
        />
        <Stat
          icon={Timer}
          label="Next Session"
          value={nextSession ? nextSession.session.label : '—'}
          hint={
            nextSession
              ? `${nextSession.race.raceName.replace(' Grand Prix', ' GP')} · ${fmtDate(nextSession.session.date)}`
              : 'Season complete'
          }
        />
        <Stat
          icon={Gauge}
          label="Fastest Lap (last GP)"
          value={lastRace?.fastestLap ? lastRace.fastestLap.fastestLapTime : '—'}
          hint={
            lastRace?.fastestLap
              ? `${lastRace.fastestLap.familyName} · ${lastRace.raceName.replace(' Grand Prix', ' GP')}`
              : 'Loading…'
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Standings preview */}
        <div className="lg:col-span-2">
          <SectionHead title="Championship — Top 5" to="/standings" linkLabel="Full table" />
          <Card className="p-0">
            {driversQ.isLoading ? (
              <Loading label="Loading standings…" />
            ) : (
              <div className="divide-y divide-line">
                {drivers.slice(0, 5).map((d) => (
                  <div
                    key={d.driverId}
                    className="relative flex items-center gap-3 px-4 py-3"
                  >
                    <span
                      className="absolute inset-y-0 left-0 w-1"
                      style={{ backgroundColor: teamColor(d.constructorId) }}
                    />
                    <span className="w-6 text-center font-mono text-sm font-bold text-muted">
                      {d.position}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">
                        {d.givenName} {d.familyName}
                      </div>
                      <div className="truncate text-xs text-muted">
                        {d.constructorName}
                      </div>
                    </div>
                    <span className="font-mono text-base font-bold">
                      {d.points}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right column: next race + last podium */}
        <div className="space-y-6">
          {/* Next race mini-card */}
          <div>
            <SectionHead title="Next Race" to="/schedule" linkLabel="Schedule" />
            <Card>
              {nextRace ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {countryFlag(nextRace.race.country)}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate font-display font-bold">
                        {nextRace.race.raceName.replace(' Grand Prix', ' GP')}
                      </div>
                      <div className="flex items-center gap-1 truncate text-xs text-muted">
                        <MapPin className="h-3 w-3" />
                        {nextRace.race.locality}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Countdown target={nextRace.race.raceDate} />
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted">Season complete. 🏁</p>
              )}
            </Card>
          </div>

          {/* Last race podium */}
          <div>
            <SectionHead title="Last Race" to="/standings" linkLabel="" />
            <Card>
              {lastRace ? (
                <>
                  <div className="mb-3 text-xs text-muted">
                    {lastRace.raceName} · {fmtDate(new Date(lastRace.date))}
                  </div>
                  <div className="space-y-2">
                    {lastRace.podium.map((p, i) => (
                      <div key={p.driverId} className="flex items-center gap-3">
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-black text-bg"
                          style={{ backgroundColor: MEDALS[i] }}
                        >
                          {p.position}
                        </span>
                        <span className="flex-1 truncate text-sm font-semibold">
                          {p.familyName}
                        </span>
                        <span
                          className="text-xs font-semibold"
                          style={{ color: teamColor(p.constructorId) }}
                        >
                          {p.constructorName.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted">No race results yet.</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
