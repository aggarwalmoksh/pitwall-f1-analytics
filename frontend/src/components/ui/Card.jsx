/**
 * Card — the base surface for everything (stat tiles, tables, charts).
 * `className` is merged so callers can tweak padding/height per use.
 */
export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface p-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
