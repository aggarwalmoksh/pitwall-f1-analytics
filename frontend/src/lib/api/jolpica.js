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
