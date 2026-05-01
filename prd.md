PRD — Apnea Trainer PWA
Overview
A personal Progressive Web App for breath hold training and breathing practice. Single-user, authenticated via Google. Installable on macOS, Linux, and Android with no app store. Stack: React + Vite, Supabase (auth + DB), deployed on GitHub Pages.

Tech Stack
LayerChoiceFrontendReact + ViteAuthSupabase Google OAuthDatabaseSupabase PostgresHostingGitHub PagesPWAvite-plugin-pwa (Workbox)

Design Principles

Minimalist, dark-first UI — this is used in quiet, focused states
Large typography, generous whitespace, muted color palette
Animations are calm and purposeful, never jarring
Single primary action per screen at all times
No clutter — labels only when necessary

Authentication

Google OAuth via Supabase
Single user in practice, but auth gates all data so it's tied to the account
Session persists across devices (Supabase handles token refresh)
No registration flow — "Sign in with Google" is the only entry point

Feature 1 — Max Breath Hold
Purpose: Measure and record your static apnea personal best.
Flow:

Screen shows a 10-second countdown ("get ready") before the hold begins
Once countdown ends, a large timer starts counting up (MM:SS:ms)
Single large Stop button ends the hold
Result is immediately saved to Supabase with timestamp
A personal leaderboard appears showing all past holds, ranked best to worst, with the current session's result highlighted

Data saved: user_id, duration_seconds, recorded_at
Notes:

No hold length is suggested or enforced — this is a raw max test
Leaderboard is solo only (own history)
Show personal best badge if current result is a new record

Feature 2 — CO2 Table
Purpose: Build tolerance to CO2 accumulation. Hold time is fixed; rest periods decrease each round.
Calculation from max breath hold (PB):

Hold duration = 50% of PB, fixed across all 8 rounds
Rest periods start at 2× the hold duration and decrease by 15 seconds each round
8 rounds total
Example for PB = 3:00 → hold = 1:30, rests: 3:00 → 2:45 → 2:30 → 2:15 → 2:00 → 1:45 → 1:30 → 1:15

UI:

Displays current phase (rest / hold), round number (e.g. "Round 3 of 8"), and a countdown timer
Visual animation: a slow pulsing circle — expands during rest, contracts and holds during apnea
User can tweak hold % (± 5% steps, range 40–65%) before starting
User can also tweak starting rest duration (± 15s steps)
Tweaked values are shown as a preview table before the session starts

Data saved: user_id, pb_used_seconds, hold_pct, completed_rounds, completed_at
No leaderboard. A simple "session complete" summary screen.

Feature 3 — O2 Table
Purpose: Build tolerance to low oxygen. Rest time is fixed; hold duration increases each round.
Calculation from PB:

Rest duration = fixed at 2:00 throughout all 8 rounds
Hold durations start at ~30% of PB and increase each round, ending at ~80% of PB
Increment = (0.80 - 0.30) × PB / 7 per step (linear ramp across 8 rounds)
Example for PB = 3:00 → holds: 0:54 → 1:09 → 1:23 → 1:37 → 1:51 → 2:06 → 2:20 → 2:34

UI: Same visual language as CO2 table. Animation expands during hold (increasing effort), contracts during rest.
User can tweak:

Rest duration (± 15s, range 1:00–3:00)
Max hold target % (± 5%, range 70–90%)

Data saved: user_id, pb_used_seconds, rest_duration_seconds, max_hold_pct, completed_rounds, completed_at

Feature 4 — Breathing Pattern Trainer
Purpose: Guided breathing sessions using preset or custom patterns for a chosen total duration.
Preset patterns:

Box breathing: 4-4-4-4 (inhale / hold / exhale / hold)
4-7-8: inhale 4s / hold 7s / exhale 8s
2-1-4: inhale 2s / hold 1s / exhale 4s (relaxation)
Physiological sigh: double inhale 2s / exhale 6s

Custom pattern:

User defines phase names and durations (inhale / hold / exhale / hold2)
Minimum phase duration: 1s

Session setup:

User picks a pattern (preset or custom)
User picks total session duration (5 / 10 / 15 / 20 min, or custom)
App calculates how many full cycles fit and shows a preview

Animation:

A single circle that smoothly scales up (inhale), holds (hold), scales down (exhale)
Phase label and countdown visible at all times
Cycle counter and time remaining shown

End of session:

If pattern was customized, prompt: "Save this pattern?" with a name field
Session is always saved regardless

Data saved (session): user_id, pattern_name, phases (json), total_duration_seconds, cycles_completed, completed_at
Data saved (custom pattern): user_id, name, phases (json), created_at

Feature 5 — Statistics
Three sections:
Personal Records

Breath hold all-time best, with date
Best CO2/O2 session (most rounds completed)
Most breathing session cycles in one go

Progress Over Time

Line chart of breath hold PB over time (one point per recorded hold)
Line chart of CO2/O2 table completion rate over past 30 sessions

Session History / Log

Reverse-chronological list of all sessions across all modes
Each entry shows: date, type, key stat (hold time / rounds / duration)
Tappable to expand detail

Data Model (Supabase)
breath_holds → id, user_id, duration_seconds, recorded_at
co2_sessions → id, user_id, pb_used, hold_pct, completed_rounds, completed_at
o2_sessions → id, user_id, pb_used, rest_duration, max_hold_pct, completed_rounds, completed_at
breathing_sessions → id, user_id, pattern_name, phases (jsonb), total_duration, cycles_completed, completed_at
custom_patterns → id, user_id, name, phases (jsonb), created_at
Row-level security on all tables: users can only read/write their own rows.

PWA Requirements

manifest.json with name, icons, display: standalone, theme_color
Service worker via Workbox caching shell + static assets
Installable on Chrome (desktop + Android) via browser prompt
Works offline for UI shell; data features degrade gracefully with a "you're offline" notice

Updated: Technical Architecture

Platform Targets
Installable PWA via Chrome on macOS, Windows, and Android. No app store. No native code.

Tech Stack
LayerChoiceRationaleFrontendReact 18 + ViteFast dev, excellent PWA plugin ecosystemLanguageTypeScript (strict)Type safety across the whole codebaseStylingTailwind CSS v4Utility-first, consistent design tokensStateZustandMinimal boilerplate, great for timer/session stateServer stateTanStack QueryCaching, loading states, and refetching for Supabase callsAuth + DBSupabaseGoogle OAuth, Postgres, row-level securityPWAvite-plugin-pwa (Workbox)Service worker, offline shell, installabilityRoutingReact Router v6File-based structure, nested layoutsChartsRechartsLightweight, composable, React-nativeTestingVitest + React Testing LibraryUnit and logic testsLintingESLint + PrettierEnforced at commit via lint-staged + HuskyCIGitHub ActionsLint, type-check, test, deploy on push to mainHostingGitHub PagesFree, zero-config with Vite

Project Structure
src/
├── assets/ # Static assets (icons, fonts)
├── components/ # Shared, reusable UI components
│ ├── ui/ # Primitives: Button, Timer, CircleAnimation, Badge…
│ └── layout/ # AppShell, BottomNav, PageHeader
├── features/ # One folder per feature, self-contained
│ ├── auth/
│ ├── breath-hold/
│ ├── co2-table/
│ ├── o2-table/
│ ├── breathing-patterns/
│ └── statistics/
├── hooks/ # Shared custom hooks (useTimer, useWakeLock…)
├── lib/ # Third-party clients (supabase.ts, queryClient.ts)
├── stores/ # Zustand stores (authStore, sessionStore)
├── types/ # Global TypeScript types and DB schema types
├── utils/ # Pure functions: table calculations, formatters
│ ├── co2Table.ts
│ ├── o2Table.ts
│ └── formatTime.ts
└── test/ # Test utilities and shared fixtures
Each feature folder follows the same internal shape:
features/co2-table/
├── components/ # Feature-specific components
├── hooks/ # Feature-specific hooks (useCo2Session…)
├── queries/ # TanStack Query hooks wrapping Supabase calls
├── utils/ # Feature-local pure functions if needed
└── index.ts # Public API — only export what other features need

Architecture Principles
Separation of concerns

UI components own zero business logic — they receive props and emit events
Business logic lives in hooks or utils, never inside JSX
Data fetching lives exclusively in TanStack Query hooks inside queries/
Supabase is only ever touched inside lib/supabase.ts and queries/ — never directly from a component

Component design

Primitives in components/ui/ are fully generic and unaware of domain concepts
Feature components are aware of domain but unaware of routing or global state
Pages are thin — they compose features and handle routing concerns only

State layers (clear separation)
LayerToolWhat lives hereServer stateTanStack QueryAll Supabase data: sessions, records, patternsGlobal client stateZustandAuth user, active session, timer stateLocal UI stateuseStateModals, form inputs, toggle states
Never mix layers — a Zustand store never fetches data; a Query hook never touches Zustand.
TypeScript

strict: true in tsconfig, no any allowed
DB schema types auto-generated from Supabase CLI (supabase gen types typescript)
All util functions have explicit input/output types
Props interfaces defined alongside their component, not in a global types file (except shared domain types)

Key Shared Hooks
useTimer() — counts up or down, exposes start / pause / stop / reset, built on useRef + requestAnimationFrame for accuracy. No Zustand dependency — pure hook.
useWakeLock() — requests the Screen Wake Lock API when a session is active so the screen doesn't sleep mid-session. Degrades gracefully on unsupported browsers.
useSupabaseSession() — thin wrapper around Supabase auth listener, syncs to Zustand authStore on mount.

Zustand Stores
authStore
ts{ user: User | null, isLoading: boolean }
sessionStore — tracks the currently active training session across any feature
ts{
type: 'breath-hold' | 'co2' | 'o2' | 'pattern' | null
phase: string
round: number
elapsed: number
isRunning: boolean
}
Stores are defined with immer middleware for clean state mutations, and devtools middleware in development.

Table Calculation Logic (pure utils, fully tested)
CO2 table (utils/co2Table.ts)

Input: pbSeconds: number, holdPct: number (default 0.50), startRestSeconds: number (default pb \* 2), restDecrementSeconds: number (default 15)
Output: array of 8 { holdSeconds, restSeconds } objects
Constraints enforced: hold capped at 65% of PB, rest floor at 30s

O2 table (utils/o2Table.ts)

Input: pbSeconds: number, restSeconds: number (default 120), startHoldPct: number (default 0.30), maxHoldPct: number (default 0.80)
Output: array of 8 { holdSeconds, restSeconds } objects
Linear interpolation across 8 steps from start to max pct

Both are pure functions with no side effects — straightforward to unit test.

Testing Strategy
Vitest + React Testing Library, unit tests only.
Priority test targets:

utils/co2Table.ts — all edge cases (very short PB, custom pcts, floor enforcement)
utils/o2Table.ts — same
utils/formatTime.ts — formatting correctness
useTimer() — tick accuracy, start/stop/reset behavior (using fake timers)
Custom pattern validation logic

Not tested: UI rendering, Supabase calls, routing. These are covered by manual QA or future integration tests.
Test files live colocated next to the file they test: co2Table.test.ts alongside co2Table.ts.

Data Model (Supabase)
sqlbreath_holds
id uuid PK, user_id uuid FK, duration_seconds int, recorded_at timestamptz

co2_sessions
id uuid PK, user_id uuid FK, pb_used_seconds int,
hold_pct numeric, completed_rounds int, completed_at timestamptz

o2_sessions
id uuid PK, user_id uuid FK, pb_used_seconds int,
rest_duration_seconds int, max_hold_pct numeric,
completed_rounds int, completed_at timestamptz

breathing_sessions
id uuid PK, user_id uuid FK, pattern_name text,
phases jsonb, total_duration_seconds int,
cycles_completed int, completed_at timestamptz

custom_patterns
id uuid PK, user_id uuid FK, name text,
phases jsonb, created_at timestamptz
Row-level security enabled on all tables. Policy: user_id = auth.uid() for all read/write operations.

CI/CD (GitHub Actions)
On every push to main:

tsc --noEmit — type check
eslint — lint
vitest run — unit tests
vite build — production build
Deploy to GitHub Pages via actions/deploy-pages

PRs require steps 1–4 to pass before merge.

PWA Configuration

manifest.json: display: standalone, theme_color matching dark UI, icons at 192×192 and 512×512
Workbox strategy: cache-first for shell and static assets, network-first for Supabase API calls
Offline behavior: app shell loads, cached data shown, active sessions can complete, sync on reconnect
Install prompt handled manually — custom "Install app" button surfaced in settings, not a browser banner

Safety Disclaimer
Shown once on first login, requires explicit acknowledgement before accessing any feature:

Breath hold training carries risk of hypoxic blackout. Never practice alone or in/near water without a trained buddy. This app is designed for dry land training only.

Stored as a Supabase user metadata flag so it doesn't re-appear across devices.
