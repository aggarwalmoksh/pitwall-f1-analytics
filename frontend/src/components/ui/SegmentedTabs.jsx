/**
 * SegmentedTabs — a small pill-style toggle (e.g. Drivers | Constructors).
 * `tabs` is [{ id, label }]; `value`/`onChange` control the active one.
 */
export default function SegmentedTabs({ tabs, value, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-line bg-surface p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${
            value === tab.id
              ? 'bg-f1 text-white'
              : 'text-muted hover:text-text'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
