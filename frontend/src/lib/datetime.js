/**
 * Date/time helpers. All API times are UTC; we format them in the user's
 * local timezone so session times are actually useful.
 */

/** "Sat, 8 Mar" style short date. */
export function fmtDate(date) {
  if (!date) return 'TBC'
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

/** Local time like "16:00" (24h). Returns '' if the session has no set time. */
export function fmtTime(date) {
  if (!date) return ''
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** "8–10 Mar" span for a weekend given its earliest and latest sessions. */
export function fmtDateRange(start, end) {
  if (!start) return 'TBC'
  if (!end || start.toDateString() === end.toDateString()) return fmtDate(start)
  const sameMonth = start.getMonth() === end.getMonth()
  const startStr = start.toLocaleDateString(undefined, {
    day: 'numeric',
    ...(sameMonth ? {} : { month: 'short' }),
  })
  const endStr = end.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
  })
  return `${startStr}–${endStr}`
}

/**
 * Find the next race relative to `now`: the first weekend whose RACE hasn't
 * happened yet. Returns { race, index } or null if the season is over.
 */
export function findNextRace(schedule, now = new Date()) {
  for (let i = 0; i < schedule.length; i++) {
    const race = schedule[i]
    if (race.raceDate && race.raceDate.getTime() >= now.getTime()) {
      return { race, index: i }
    }
  }
  return null
}

/** True if a whole race weekend is in the past (its race has run). */
export function isPastRace(race, now = new Date()) {
  return race.raceDate ? race.raceDate.getTime() < now.getTime() : false
}

/**
 * Break a millisecond gap into { days, hours, minutes, seconds }.
 * Used by the countdown. Clamps at zero.
 */
export function breakdown(ms) {
  const clamped = Math.max(0, ms)
  const totalSeconds = Math.floor(clamped / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: clamped === 0,
  }
}
