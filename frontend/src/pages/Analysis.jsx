import PageHeader from '../components/ui/PageHeader'
import Placeholder from '../components/ui/Placeholder'

export default function Analysis() {
  return (
    <div>
      <PageHeader
        title="Analysis"
        subtitle="Deep dive into qualifying pace, race strategy and head-to-head."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Placeholder
          phase={3}
          title="Qualifying Grid"
          points={['Grid order with gaps to pole', 'Sector-by-sector comparison']}
        />
        <Placeholder
          phase={3}
          title="Race Pace & Strategy"
          points={[
            'Lap-time evolution per driver',
            'Tyre stints and pit-window timing',
          ]}
        />
        <Placeholder
          phase={3}
          title="Position Changes"
          points={['Lap-by-lap running order', 'Overtakes and places gained/lost']}
        />
        <Placeholder
          phase={3}
          title="Head-to-Head"
          points={['Teammate and rival comparisons', 'Season-long pace deltas']}
        />
      </div>
    </div>
  )
}
