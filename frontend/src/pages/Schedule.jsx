import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Countdown from '../components/ui/Countdown'
import { Loading, ErrorState, Empty } from '../components/ui/States'
import { useSchedule } from '../lib/hooks/useSchedule'
import { findNextRace, isPastRace, fmtDate, fmtTime, fmtDateRange } from '../lib/datetime'
import { countryFlag } from '../lib/flags'
import { CURRENT_SEASON } from '../lib/config'
import { MapPin, CheckCircle2 } from 'lucide-react'

// The big highlighted card for the upcoming race.
function NextRaceBanner({ race }) {
  const first = race.sessions[0]?.date
  const last = race.raceDate
  return (
    <Card className="relative overflow-hidden border-f1/30">
      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-f1/15 blur-3xl" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-f1">
            Next Race · Round {race.round}
            {race.isSprint && ' · Sprint'}
          </span>
          <h2 className="mt-1 flex items-center gap-3 font-display text-2xl font-black sm:text-3xl">
            <span className="text-3xl">{countryFlag(race.country)}</span>
            {race.raceName}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4" />
            {race.circuitName} · {race.locality}, {race.country}
          </p>
          <p className="mt-1 text-sm text-muted">{fmtDateRange(first, last)}</p>
        </div>

        <div className="flex flex-col items-start gap-2 lg:items-end">
          <span className="text-[11px] uppercase tracking-wider text-muted">
            Lights out in
          </span>
          <Countdown target={race.raceDate} />
        </div>
      </div>

      {/* Session timetable */}
      <div className="mt-6 grid grid-cols-2 gap-2 border-t border-line pt-4 sm:grid-cols-3 lg:grid-cols-7">
        {race.sessions.map((s) => (
          <div key={s.key} className="rounded-lg bg-surface-2 px-3 py-2">
            <div className="text-[10px] uppercase tracking-wider text-muted">
              {s.label}
            </div>
            <div className="text-sm font-semibold">{fmtDate(s.date)}</div>
            <div className="font-mono text-xs text-muted">{fmtTime(s.date)}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// Compact card for every other round.
function RaceCard({ race, isNext }) {
  const past = isPastRace(race)
  return (
    <Card
      className={`relative overflow-hidden transition-colors ${
        past ? 'opacity-60' : ''
      } ${isNext ? 'border-f1/40' : 'hover:border-line'}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
          <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono">
            R{race.round}
          </span>
          {race.isSprint && (
            <span className="rounded bg-f1/15 px-1.5 py-0.5 text-f1">Sprint</span>
          )}
        </div>
        {past && <CheckCircle2 className="h-4 w-4 text-green" />}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-2xl">{countryFlag(race.country)}</span>
        <div className="min-w-0">
          <h3 className="truncate font-display font-bold leading-tight">
            {race.raceName.replace(' Grand Prix', ' GP')}
          </h3>
          <p className="truncate text-xs text-muted">{race.locality}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm">
        <span className="text-muted">{fmtDate(race.raceDate)}</span>
        <span className="font-mono text-xs text-muted">
          {fmtTime(race.raceDate)}
        </span>
      </div>
    </Card>
  )
}

export default function Schedule() {
  const { data: schedule, isLoading, isError, error, refetch } = useSchedule()
  const nextInfo = schedule ? findNextRace(schedule) : null

  return (
    <div>
      <PageHeader
        title="Schedule"
        subtitle={`${CURRENT_SEASON} Formula 1 World Championship · session times shown in your local timezone`}
      />

      {isLoading ? (
        <Loading label="Loading the season calendar…" />
      ) : isError ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : !schedule?.length ? (
        <Empty label="No schedule available for this season yet." />
      ) : (
        <div className="space-y-6">
          {nextInfo ? (
            <NextRaceBanner race={nextInfo.race} />
          ) : (
            <Card className="text-center text-sm text-muted">
              The {CURRENT_SEASON} season has finished. 🏁
            </Card>
          )}

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              Full Calendar
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {schedule.map((race) => (
                <RaceCard
                  key={race.round}
                  race={race}
                  isNext={nextInfo?.race.round === race.round}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
