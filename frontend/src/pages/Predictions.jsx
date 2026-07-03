import PageHeader from '../components/ui/PageHeader'
import Placeholder from '../components/ui/Placeholder'

export default function Predictions() {
  return (
    <div>
      <PageHeader
        title="Predictions"
        subtitle="Model-driven race outcome forecasts from form, quali and history."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Placeholder
          phase={5}
          title="Race Winner Prediction"
          points={[
            'Win probability per driver for the next GP',
            'Confidence and key factors behind the call',
          ]}
        />
        <Placeholder
          phase={5}
          title="Predicted Finishing Order"
          points={[
            'Full grid-to-finish projection',
            'Powered by a scikit-learn model on historical data',
          ]}
        />
      </div>
    </div>
  )
}
