import { Loader2, AlertTriangle } from 'lucide-react'
import Card from './Card'

/** Spinner shown while a query is loading. */
export function Loading({ label = 'Loading…' }) {
  return (
    <Card className="flex items-center justify-center gap-3 py-16 text-muted">
      <Loader2 className="h-5 w-5 animate-spin text-f1" />
      <span className="text-sm">{label}</span>
    </Card>
  )
}

/** Error panel with an optional retry button (wired to a query's refetch). */
export function ErrorState({ error, onRetry }) {
  return (
    <Card className="flex flex-col items-center gap-3 py-16 text-center">
      <AlertTriangle className="h-7 w-7 text-f1" />
      <div>
        <p className="font-semibold">Couldn&apos;t load the data</p>
        <p className="mt-1 max-w-md text-sm text-muted">
          {error?.message || 'Something went wrong talking to the F1 API.'}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-xl bg-f1 px-4 py-2 text-sm font-semibold text-white hover:bg-f1-dark"
        >
          Try again
        </button>
      )}
    </Card>
  )
}

/** Shown when a query succeeds but there's nothing to display. */
export function Empty({ label = 'No data available yet.' }) {
  return (
    <Card className="py-16 text-center text-sm text-muted">{label}</Card>
  )
}
