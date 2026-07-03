import { Routes, Route, Link } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Live from './pages/Live'
import Schedule from './pages/Schedule'
import Standings from './pages/Standings'
import Analysis from './pages/Analysis'
import History from './pages/History'
import Predictions from './pages/Predictions'

// Simple 404 for any unknown URL.
function NotFound() {
  return (
    <div className="py-20 text-center">
      <div className="font-display text-6xl font-black text-f1">404</div>
      <p className="mt-3 text-muted">This corner doesn&apos;t exist on the track.</p>
      <Link
        to="/"
        className="mt-5 inline-block rounded-xl bg-f1 px-4 py-2 text-sm font-semibold text-white hover:bg-f1-dark"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* All pages share the Layout (sidebar + topbar) via nested routes */}
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="live" element={<Live />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="standings" element={<Standings />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="history" element={<History />} />
        <Route path="predictions" element={<Predictions />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
