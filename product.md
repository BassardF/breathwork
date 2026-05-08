# Apnea Trainer

A personal breathwork and static apnea training app. It is a Progressive Web App (PWA) — no app store, no installation gate, no sign-up required. Visit the URL, add it to your home screen, and it behaves like a native app. Works offline after the first visit. Stays running even when your screen locks.

Built for dry-land training only — no water, no hyperventilation, no buddy required (though never train alone in the water).

## Quick start

Open the app, click **Get Started**, then choose **Login in local mode** to dive right in. Your data stays on your device. For cloud sync, add Supabase credentials to enable email magic link sign-in.

## How it works

The app has four training modes, a knowledge base, statistics, and Bluetooth heart rate support.

### Max Breath Hold

A raw max-effort hold. A 10-second ready phase, then a timer counts up. Tap Stop when you surface. Your result is saved with a timestamp and ranked on a personal leaderboard showing all past holds best-to-worst. New personal bests are highlighted.

### CO2 Table

Build tolerance to CO2 buildup. Hold duration is fixed at 50% of your personal best. Rest periods start at 2x the hold and drop by 15 seconds each round across 8 rounds. Adjust hold percentage (±5%, range 40–65%) and initial rest (±15s) before starting. A preview table shows every round before you commit.

### O2 Table

Build tolerance to low oxygen. Rest is fixed at 2:00 throughout. Hold durations start at 30% of your PB and ramp up to 80% across 8 rounds. Adjust rest duration (±15s, range 1:00–3:00) and max hold target (±5%, range 70–90%). Preview the full table before starting.

### Breathing Pattern Trainer

Guided rhythm work with preset patterns:

- Box Breathing (4-4-4-4) — Navy SEALs protocol for focus and calm
- 4-7-8 — relaxation breath
- Cardiac Coherence (5-5) — ~6 breaths/min for HRV maximization
- Custom pattern — define your own phase names and durations

Pick a total session duration (5, 10, 15, 20 min). The app calculates how many cycles fit, shows a preview, and guides you through with a pulsing circle animation and phase labels.

### Learn

A browsable knowledge base covering 10 physiology concepts including CO2 tolerance, the mammalian dive reflex, the Bohr effect, HRV, vagal tone, and diaphragmatic breathing. Four training sections explain each method. Filter by 9 goals (hold longer, reduce anxiety, sleep better, manage stress, etc.) to see relevant content.

### Statistics

Track your progress across four panels:

- **Personal records** — breath hold PB, best table and breathing sessions
- **Charts** — PB over time (line chart), table completion trends
- **Session log** — reverse-chronological list of all sessions with type and key stats, filterable by mode
- **Heart rate** — average BPM per session when paired

### Bluetooth HR Monitor

Pair a standard BLE heart rate monitor (chest strap, arm band, watch) in Settings. See live BPM during training sessions and record average heart rate alongside each session. View it later in your statistics.

## Safety

Breath hold training carries risk of hypoxic blackout. Never practice alone or in or near water without a trained buddy. This app is for dry land training only. A safety disclaimer is shown before first use.

## Data & privacy

Only you can see your training data. When using local mode, everything stays in your browser's local storage — no servers involved. When signed in via Supabase, data syncs across devices with row-level security ensuring your data is yours alone.

## Offline & install

Works offline after the first visit. Install it as a standalone app from your browser's menu — works on desktop (macOS, Windows, Linux) and mobile (Android). The screen wake lock keeps your display on during active sessions.
