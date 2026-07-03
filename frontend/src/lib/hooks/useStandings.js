/**
 * Query hooks for championship standings.
 * TanStack Query gives us caching, loading + error states, and dedup for free.
 * The `queryKey` uniquely identifies the cached data (by type + season).
 */
import { useQuery } from '@tanstack/react-query'
import { getDriverStandings, getConstructorStandings } from '../api/jolpica'
import { CURRENT_SEASON } from '../config'

export function useDriverStandings(season = CURRENT_SEASON) {
  return useQuery({
    queryKey: ['driverStandings', season],
    queryFn: () => getDriverStandings(season),
  })
}

export function useConstructorStandings(season = CURRENT_SEASON) {
  return useQuery({
    queryKey: ['constructorStandings', season],
    queryFn: () => getConstructorStandings(season),
  })
}
