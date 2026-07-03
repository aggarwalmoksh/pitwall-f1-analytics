# 🏎️ Pitwall — F1 Analytics

A full Formula 1 analytics web app — not just a race-winner predictor, but a complete
"paddock command center": **live timing**, **deep session analysis**, **all-time records**,
and **model-driven predictions**, in one modern, visually rich interface.

> Status: **Phase 1 complete** — the app shell (design system, navigation, routed pages)
> is built and running. Real data starts flowing in Phase 2.

---

## ✨ What it does (the vision)

- **Live** — real-time positions, gaps, tyres and weather during a session
- **Analysis** — qualifying grids, lap-time evolution, tyre strategy, position changes, head-to-head
- **History & Records** — all-time greats, records and champions since 1950
- **Predictions** — race-outcome forecasts from practice + qualifying + historical form

## 🛠️ Tech stack

| Layer          | Tool                                   |
| -------------- | -------------------------------------- |
| Frontend       | React 19 + Vite                        |
| Styling        | Tailwind CSS v4 (custom F1 dark theme) |
| Routing        | React Router                           |
| Data fetching  | TanStack Query                         |
| Charts         | Recharts (D3 later for custom visuals) |
| Icons          | lucide-react                           |
| Backend (soon) | Python + FastAPI                       |
| ML (soon)      | scikit-learn                           |

## 📡 Data sources

- **[Jolpica-F1](https://github.com/jolpica/jolpica-f1)** (Ergast successor) — historical results, standings, schedules, records
- **[OpenF1](https://openf1.org)** — live timing, positions, tyres, weather, race control
- **[FastF1](https://docs.fastf1.dev)** — deep telemetry & session analysis (via the Python backend)

## 📁 Project structure

```
.
├── frontend/            # React + Vite app (this is what runs today)
│   └── src/
│       ├── index.css        # F1 design system: colors, fonts, tokens
│       ├── App.jsx          # routes
│       ├── lib/             # constants (nav, team colors)
│       ├── components/      # layout (Sidebar/Topbar) + reusable UI
│       └── pages/           # Dashboard, Live, Schedule, Standings, …
└── backend/             # Python + FastAPI + ML (added in Phase 5)
```

## 🚀 Getting started

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**.

## 🗺️ Roadmap

- [x] **Phase 1 — Frontend foundation:** design system, app shell, navigation, page skeletons
- [ ] **Phase 2 — Historical data:** standings, schedule, records (Jolpica)
- [ ] **Phase 3 — Analytics & charts:** quali grids, lap times, tyre strategy
- [ ] **Phase 4 — Live:** real-time timing (OpenF1)
- [ ] **Phase 5 — Backend + ML:** FastAPI + FastF1 + scikit-learn predictions
- [ ] **Phase 6 — Polish & deploy**
