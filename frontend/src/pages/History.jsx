import PageHeader from '../components/ui/PageHeader'
import Placeholder from '../components/ui/Placeholder'

export default function History() {
  return (
    <div>
      <PageHeader
        title="History & Records"
        subtitle="All-time greats, records and past champions since 1950."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Placeholder
          phase={2}
          title="All-Time Records"
          points={['Most wins, poles, podiums and titles', 'Fastest laps and record holders']}
        />
        <Placeholder
          phase={2}
          title="Past Champions"
          points={['World champions by season', 'Career stats for any driver or team']}
        />
      </div>
    </div>
  )
}
