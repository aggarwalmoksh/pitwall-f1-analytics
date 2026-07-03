import PageHeader from '../components/ui/PageHeader'
import Placeholder from '../components/ui/Placeholder'

export default function Live() {
  return (
    <div>
      <PageHeader
        title="Live Timing"
        subtitle="Real-time positions, gaps, tyres and weather during a session."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Placeholder
          phase={4}
          title="Live Leaderboard"
          points={[
            'Position, interval and last-lap for every driver',
            'Tyre compound + stint age, pit status',
          ]}
        />
        <Placeholder
          phase={4}
          title="Track & Conditions"
          points={[
            'Weather, track temp and DRS status',
            'Race-control messages (flags, safety car)',
          ]}
        />
      </div>
    </div>
  )
}
