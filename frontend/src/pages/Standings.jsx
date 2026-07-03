import PageHeader from '../components/ui/PageHeader'
import Placeholder from '../components/ui/Placeholder'

export default function Standings() {
  return (
    <div>
      <PageHeader
        title="Standings"
        subtitle="Driver and constructor championship tables for the season."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Placeholder
          phase={2}
          title="Drivers' Championship"
          points={['Points, wins and gap to leader', 'Team color-coded rows']}
        />
        <Placeholder
          phase={2}
          title="Constructors' Championship"
          points={['Team totals and trend across the season', 'Points-per-race breakdown']}
        />
      </div>
    </div>
  )
}
