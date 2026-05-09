import { useNavigate } from 'react-router-dom';
import {
  Timer,
  Table2,
  TrendingUp,
  Waves,
  BookOpen,
  BarChart3,
  Heart,
  Shield,
  Wifi,
  Smartphone,
  Database,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

const features = [
  {
    icon: Timer,
    title: 'Max Breath Hold',
    description: 'Static apnea timer with instant leaderboard feedback.',
  },
  {
    icon: Table2,
    title: 'CO₂ Table',
    description: 'Fixed holds with descending rest — build CO₂ tolerance.',
  },
  {
    icon: TrendingUp,
    title: 'O₂ Table',
    description: 'Progressive hold durations to safely push your limits.',
  },
  {
    icon: Waves,
    title: 'Breathing Patterns',
    description: 'Guided rhythms — Box, 4-7-8, Cardiac Coherence, or custom.',
  },
] as const;

const extras = [
  {
    icon: BookOpen,
    title: 'Learn',
    description: 'Browse physiology concepts and training guides.',
  },
  {
    icon: BarChart3,
    title: 'Statistics',
    description: 'Track personal records, trends, and full session history.',
  },
  {
    icon: Heart,
    title: 'Bluetooth HR',
    description: 'Live BPM from any standard BLE monitor during training.',
  },
] as const;

const bullets = [
  {
    icon: Database,
    text: 'No account required — all data stays on your device',
  },
  { icon: Wifi, text: 'Works offline after first visit' },
  { icon: Smartphone, text: 'Install as a standalone PWA on any platform' },
] as const;

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09111c] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-12 sm:px-8 sm:py-20">
        <header className="flex flex-col items-center text-center">
          <svg width="72" height="72" viewBox="0 0 192 192" className="mb-6">
            <rect width="192" height="192" rx="40" fill="#09111C" />
            <circle cx="96" cy="96" r="54" fill="#173450" />
            <circle cx="96" cy="96" r="36" fill="#D2E8F5" />
            <path
              d="M96 56C104.837 56 112 63.1634 112 72V120C112 128.837 104.837 136 96 136C87.1634 136 80 128.837 80 120V72C80 63.1634 87.1634 56 96 56Z"
              fill="#09111C"
            />
          </svg>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Apnea Trainer
          </h1>
          <p className="mt-3 text-lg text-slate-400 sm:text-xl">
            Train your breath hold, build CO₂ and O₂ tolerance, and practice
            guided breathing patterns.
          </p>
        </header>

        <section className="mt-16 sm:mt-20">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-3 bg-[#09111c] p-5 sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-950/50">
                  <f.icon className="h-5 w-5 text-sky-300" />
                </div>
                <div>
                  <p className="font-medium text-white">{f.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-3">
          {extras.map((e) => (
            <div
              key={e.title}
              className="flex flex-col gap-3 bg-[#09111c] p-5 sm:p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-950/50">
                <e.icon className="h-5 w-5 text-sky-300" />
              </div>
              <div>
                <p className="font-medium text-white">{e.title}</p>
                <p className="mt-1 text-sm text-slate-400">{e.description}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 flex flex-col items-center text-center sm:mt-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Start training in seconds
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            No sign-up, no email, no subscription.
          </p>
          <ul className="mt-6 space-y-3 text-left">
            {bullets.map((b) => (
              <li
                key={b.text}
                className="flex items-center gap-3 text-sm text-slate-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950/40">
                  <b.icon className="h-4 w-4 text-sky-300" />
                </span>
                {b.text}
              </li>
            ))}
          </ul>
          <Button className="mt-8 text-base" onClick={() => navigate('/login')}>
            Get Started
          </Button>
        </section>

        <footer className="mt-auto flex items-center justify-center gap-2 pt-20 text-xs text-slate-600">
          <Shield className="h-3 w-3" />
          Dry-land training only. Never practice breath holds in or near water
          without a trained buddy.
        </footer>
      </div>
    </div>
  );
}
