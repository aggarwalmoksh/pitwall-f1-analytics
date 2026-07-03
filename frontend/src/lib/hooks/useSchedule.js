/**
 * Schedule hooks. useSchedule fetches the season calendar; useNextRace
 * derives the upcoming race from it (shared by the Schedule page + Topbar).
 */
import { useQuery } from '@tanstack/react-query'
import { getSchedule } from '../api/jolpica'
import { CURRENT_SEASON } from '../config'
import { findNextRace } from '../datetime'

export function useSchedule(season = CURRENT_SEASON) {
  return useQuery({
    queryKey: ['schedule', season],
    queryFn: () => getSchedule(season),
    // The calendar rarely changes — cache it for an hour.
    staleTime: 60 * 60 * 1000,
  })
}

export function useNextRace(season = CURRENT_SEASON) {
  const { data, ...rest } = useSchedule(season)
  const next = data ? findNextRace(data) : null
  return { next, schedule: data, ...rest }
}
