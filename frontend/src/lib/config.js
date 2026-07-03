/**
 * Central config for data sources and season.
 * Keeping the base URLs here means every API call reads from one place.
 */

// Jolpica — the Ergast successor. Free, no key. Historical + current data.
export const JOLPICA_BASE = 'https://api.jolpi.ca/ergast/f1'

// OpenF1 — live timing (used in Phase 4).
export const OPENF1_BASE = 'https://api.openf1.org/v1'

// The season the app defaults to. Bump this each year (or wire to "current").
export const CURRENT_SEASON = 2026

// The very first F1 championship season — used for season pickers later.
export const FIRST_SEASON = 1950
