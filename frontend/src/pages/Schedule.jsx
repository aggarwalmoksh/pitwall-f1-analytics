import PageHeader from '../components/ui/PageHeader'
import Placeholder from '../components/ui/Placeholder'

export default function Schedule() {
  return (
    <div>
      <PageHeader
        title="Schedule"
        subtitle="Full season calendar with session times for every Grand Prix."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Placeholder
          phase={2}
          title="Season Calendar"
          points={[
            'All rounds with circuit, country and dates',
            'Practice, qualifying, sprint and race times',
          ]}
        />
        <Placeholder
          phase={2}
          title="Circuit Details"
          points={['Track map and layout', 'Lap record and past winners']}
        />
      </div>
    </div>
  )
}
