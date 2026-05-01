# Apnea Trainer PWA — Agent Guide

## Commands (run in order when applicable)

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | `eslint .` |
| `npm run test` | `vitest run` |
| `npm run build` | `tsc -b && vite build` |

CI order (GitHub Actions): `typecheck` → `lint` → `test` → `build`  
Pre-commit (husky): `lint-staged` runs `eslint --fix` + `prettier --write` on staged `*.{ts,tsx,js,jsx}`, `prettier --write` on `*.{json,css,md,yml,yaml}`

## Project structure

- `src/main.tsx` — root entry (TanStack Query + HashRouter + PWA SW registration)
- `src/App.tsx` — routes and page composition
- `src/lib/repository.ts` — all DB operations (Supabase + localStorage fallback)
- `src/stores/` — Zustand stores with `immer` + `devtools` middleware
- `src/features/*/` — self-contained feature folders
- `src/utils/` — pure functions with colocated `*.test.ts` files
- `src/hooks/` — shared hooks (useTimer, useWakeLock, useSupabaseSession)
- `supabase/schema.sql` — DB schema + RLS policies

## Architecture rules

- **Never mix layers**: Zustand stores never fetch data; TanStack Query hooks never touch Zustand
- Components own zero business logic — hooks/utils own it
- Repository falls back to localStorage when Supabase is not configured (no `.env.local`)
- `HashRouter` (not BrowserRouter) — required for GitHub Pages
- `base: './'` in vite.config — required for GitHub Pages relative paths
- React Query DevTools: enable with `VITE_ENABLE_QUERY_DEVTOOLS=true`

## Testing

- Vitest + jsdom + `@testing-library/react` + `@testing-library/jest-dom`
- Tests colocated with source: `co2Table.test.ts` next to `co2Table.ts`
- Run single test: `npx vitest run src/utils/co2Table.test.ts`
- No Supabase mocking — unit tests only for pure utils and hooks
- Setup: `src/test/setup.ts` (just imports `@testing-library/jest-dom`)

## Supabase

- Auth via email magic link (not Google OAuth despite PRD mention)
- Environment: `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` in `.env.local`
- All tables have RLS, all policies: `auth.uid() = user_id`

## Config

- Tailwind v4 via `@tailwindcss/vite` plugin (not PostCSS config file)
- TypeScript strict mode, `moduleResolution: "Bundler"`
- ESLint flat config with `typescript-eslint`, `react-hooks`, `react-refresh`
- Prettier: singleQuote, trailingComma all, semi
- Service worker: auto-update, network-first for supabase.co, cache-first for shell
- `dist/`, `coverage/`, `.vite/`, `.env`, `.env.local` in .gitignore
