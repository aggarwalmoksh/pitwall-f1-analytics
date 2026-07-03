/**
 * PageHeader — consistent title block at the top of every page.
 * The little red bar on the left is our recurring brand accent.
 */
export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="flex items-stretch gap-3">
        <span className="w-1 rounded-full bg-f1" />
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
      </div>
      {/* Optional right-side controls (filters, season picker, etc.) */}
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}
