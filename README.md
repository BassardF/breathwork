# Apnea Trainer PWA

Progressive Web App for static apnea (breath hold) training and guided breathing practice. Designed for dry-land training only — no water, no hyperventilation. Works offline, installable on desktop and mobile.

## Features

- **Max Breath Hold** — timed hold with countdown, leaderboard, and personal best tracking
- **CO₂ Tolerance Table** — 8 rounds of fixed holds with descending rest intervals
- **O₂ Tolerance Table** — 8 rounds of progressively longer holds with fixed rest
- **Breathing Patterns** — guided sessions for Box Breathing, 4-7-8, Cardiac Coherence, plus custom patterns
- **Learn** — knowledge base covering 8 physiology concepts (dive reflex, CO₂ tolerance, HRV, etc.) browsable by goal
- **Statistics** — PB timeline, completion trends (Recharts), and session history with filtering
- **Bluetooth HR Monitor** — live BPM display and per-session average heart rate recording
- **PWA** — installable, works offline, dark-themed UI, screen wake lock during sessions

## Quick start

```bash
npm install
npm run dev
```

### Supabase (optional)

Add `.env.local` for cloud sync:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Then in Supabase: set `Site URL` to `http://localhost:5173`, add the same to redirect URLs, enable Email provider, and apply `supabase/schema.sql`.

Without Supabase, the app runs fully in **local-only mode** using localStorage.

## Scripts

| Command             | Action                        |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start dev server              |
| `npm run build`     | Type check + production build |
| `npm run preview`   | Preview production build      |
| `npm run typecheck` | `tsc --noEmit`                |
| `npm run lint`      | ESLint                        |
| `npm run test`      | Vitest unit tests             |
| `npm run test:e2e`  | Playwright E2E tests          |

## Stack

- **Framework** — React 18, TypeScript (strict), Vite 5
- **Styling** — Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- **Routing** — React Router v6 (BrowserRouter)
- **State** — TanStack Query v5 (server), Zustand v5 + immer + devtools (client)
- **Backend** — Supabase (auth via email magic links, PostgreSQL)
- **Charts** — Recharts
- **Icons** — Lucide React
- **Audio** — Web Audio API
- **Testing** — Vitest + Testing Library, Playwright
- **CI/CD** — GitHub Actions (typecheck → lint → test → build), auto-deploy to GitHub Pages

## Architecture

```
src/
├── lib/           Repository layer (Supabase + localStorage fallback)
├── stores/        Zustand stores (auth, session, heart rate)
├── hooks/         Shared hooks (useTimer, useWakeLock, useBluetoothHR, etc.)
├── utils/         Pure functions with colocated tests
├── components/    Reusable UI (Button, Card, Timer, CircleAnimation, layout)
├── features/      Feature modules (breath-hold, co2-table, o2-table, patterns, stats, learn, settings, auth)
└── types/         TypeScript types (database schema, domain models)
```

**Key conventions:**

- Components own zero business logic — hooks and utils own it
- Zustand stores never fetch data; TanStack Query hooks never touch Zustand
- Repository auto-falls back to localStorage when Supabase is unconfigured
- All DB tables have RLS with `auth.uid() = user_id` policies

## Database

Five tables — `breath_holds`, `co2_sessions`, `o2_sessions`, `breathing_sessions`, `custom_patterns` — defined in `supabase/schema.sql`. All use `gen_random_uuid()` via `pgcrypto`.
