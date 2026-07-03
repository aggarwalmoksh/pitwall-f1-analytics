/**
 * Hook for the most recent completed race result (podium + fastest lap).
 */
import { useQuery } from '@tanstack/react-query'
import { getLastRaceResult } from '../api/jolpica'
import { CURRENT_SEASON } from '../config'

export function useLastRace(season = CURRENT_SEASON) {
  return useQuery({
    queryKey: ['lastRace', season],
    queryFn: () => getLastRaceResult(season),
  })
}
