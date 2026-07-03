/**
 * Jolpica (Ergast) API calls, each returning CLEAN, FLAT data.
 *
 * Ergast nests everything under MRData.<Table>.<List>[0]... which is painful
 * in components. So every function here does the digging once and returns
 * simple objects/arrays the UI can render directly.
 */
import { JOLPICA_BASE } from '../config'
import { getJSON } from './client'

/** Driver championship standings for a season → array of flat rows. */
export async function getDriverStandings(season) {
  const data = await getJSON(`${JOLPICA_BASE}/${season}/driverStandings.json?limit=100`)
  const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]
  if (!list) return { round: null, standings: [] }

  const standings = list.DriverStandings.map((row) => {
    const c = row.Constructors[row.Constructors.length - 1] // most recent team
    return {
      position: Number(row.position),
      points: Number(row.points),
      wins: Number(row.wins),
      driverId: row.Driver.driverId,
      code: row.Driver.code || row.Driver.familyName.slice(0, 3).toUpperCase(),
      number: row.Driver.permanentNumber || null,
      givenName: row.Driver.givenName,
      familyName: row.Driver.familyName,
      nationality: row.Driver.nationality,
      constructorId: c?.constructorId || null,
      constructorName: c?.name || '—',
    }
  })

  return { round: Number(list.round), season: Number(list.season), standings }
}

/** Constructor championship standings for a season → array of flat rows. */
export async function getConstructorStandings(season) {
  const data = await getJSON(
    `${JOLPICA_BASE}/${season}/constructorStandings.json?limit=100`,
  )
  const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]
  if (!list) return { round: null, standings: [] }

  const standings = list.ConstructorStandings.map((row) => ({
    position: Number(row.position),
    points: Number(row.points),
    wins: Number(row.wins),
    constructorId: row.Constructor.constructorId,
    constructorName: row.Constructor.name,
    nationality: row.Constructor.nationality,
  }))

  return { round: Number(list.round), season: Number(list.season), standings }
}

// Ergast gives each session as { date, time } (time may be missing). Combine
// into a real Date (UTC) or null. The API's times are Zulu (e.g. "07:00:00Z").
function toDate(session) {
  if (!session?.date) return null
  const iso = session.time
    ? `${session.date}T${session.time}`
    : `${session.date}T00:00:00Z`
  const d = new Date(iso)
  return isNaN(d.getTime()) ? null : d
}

// Session labels in the order they run across a weekend.
const SESSION_DEFS = [
  ['FirstPractice', 'FP1'],
  ['SecondPractice', 'FP2'],
  ['ThirdPractice', 'FP3'],
  ['SprintQualifying', 'Sprint Quali'],
  ['Sprint', 'Sprint'],
  ['Qualifying', 'Qualifying'],
]

/** Full season schedule → array of normalized race weekends with sessions. */
export async function getSchedule(season) {
  const data = await getJSON(`${JOLPICA_BASE}/${season}.json?limit=100`)
  const races = data?.MRData?.RaceTable?.Races || []

  return races.map((r) => {
    // Build the ordered session list (only those present for this weekend).
    const sessions = SESSION_DEFS.map(([key, label]) => {
      const date = toDate(r[key])
      return date ? { key, label, date } : null
    }).filter(Boolean)

    // The race itself is the final session.
    const raceDate = toDate({ date: r.date, time: r.time })
    if (raceDate) sessions.push({ key: 'Race', label: 'Race', date: raceDate })

    return {
      season: Number(r.season),
      round: Number(r.round),
      raceName: r.raceName,
      raceDate,
      isSprint: Boolean(r.Sprint),
      circuitId: r.Circuit.circuitId,
      circuitName: r.Circuit.circuitName,
      locality: r.Circuit.Location.locality,
      country: r.Circuit.Location.country,
      lat: Number(r.Circuit.Location.lat),
      long: Number(r.Circuit.Location.long),
      wikiUrl: r.url,
      sessions,
    }
  })
}
