import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, BarChart3, Heart, Shield } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

function BreathHoldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Co2Icon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.5 7h5M15 13l-4 2M12 17l-3 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function O2Icon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="4" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="19" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="9" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="19" r="1.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2 16c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

const features = [
  {
    icon: BreathHoldIcon,
    title: 'Max Breath Hold',
    description: 'Static apnea timer with instant leaderboard feedback.',
    label: 'Static Apnea',
    color: 'from-sky-400/20 to-sky-950/10',
  },
  {
    icon: Co2Icon,
    title: 'CO\u2082 Table',
    description: 'Fixed holds with descending rest windows.',
    label: 'CO\u2082 Tolerance',
    color: 'from-amber-400/20 to-amber-950/10',
  },
  {
    icon: O2Icon,
    title: 'O\u2082 Table',
    description: 'Progressive hold durations that ramp up safely.',
    label: 'O\u2082 Tolerance',
    color: 'from-rose-400/20 to-rose-950/10',
  },
  {
    icon: WaveIcon,
    title: 'Breathing Patterns',
    description:
      'Guided rhythm work \u2014 Box, 4-7-8, Cardiac Coherence, or custom.',
    label: 'Conscious Breathing',
    color: 'from-teal-400/20 to-teal-950/10',
  },
] as const;

const extras = [
  {
    icon: BookOpen,
    title: 'Learn',
    description: 'Physiology concepts and training guides.',
  },
  {
    icon: BarChart3,
    title: 'Statistics',
    description: 'Personal records, trends, and session history.',
  },
  {
    icon: Heart,
    title: 'Bluetooth HR',
    description: 'Live BPM from any standard BLE monitor.',
  },
] as const;

function Orb({
  className,
  size,
  color,
}: {
  className?: string;
  size: number;
  color: string;
}) {
  return (
    <div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size, background: color }}
    />
  );
}

export function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = 'y proximity';
    return () => {
      html.style.scrollSnapType = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070e17] text-slate-100 overflow-x-hidden">
      {/* ───── HERO ───── */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-20 snap-start snap-always">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <Orb
            size={800}
            color="radial-gradient(circle, rgba(56,189,248,0.08), transparent)"
            className="-left-1/4 top-1/4"
          />
          <Orb
            size={600}
            color="radial-gradient(circle, rgba(168,85,247,0.06), transparent)"
            className="right-0 top-0"
          />
          <Orb
            size={500}
            color="radial-gradient(circle, rgba(244,63,94,0.05), transparent)"
            className="bottom-0 left-1/3"
          />

          {/* subtle grid overlay */}
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.03]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="grid"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 48 0 L 0 0 0 48"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* fade to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#070e17] to-transparent" />
          <style>{`@keyframes scrollBounce { 0%, 100% { top: 0; opacity: 1; } 50% { top: 16px; opacity: 0.3; } }`}</style>
        </div>

        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="relative mb-8">
            <div
              className="absolute inset-0 rounded-[28px] bg-sky-400/10 blur-2xl"
              aria-hidden="true"
            />
            <svg
              width="72"
              height="72"
              viewBox="0 0 192 192"
              className="relative"
            >
              <rect width="192" height="192" rx="40" fill="#070e17" />
              <circle cx="96" cy="96" r="54" fill="#173450" />
              <circle cx="96" cy="96" r="36" fill="#D2E8F5" />
              <path
                d="M96 56C104.837 56 112 63.1634 112 72V120C112 128.837 104.837 136 96 136C87.1634 136 80 128.837 80 120V72C80 63.1634 87.1634 56 96 56Z"
                fill="#070e17"
              />
            </svg>
          </div>

          <p className="mb-4 text-xs tracking-[0.35em] text-sky-300/60 uppercase">
            Breathwork &bull; Static Apnea
          </p>

          <h1 className="text-5xl font-semibold tracking-tighter sm:text-7xl sm:leading-[1.05]">
            <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Master your breath.
            </span>
            <br />
            <span className="bg-gradient-to-b from-sky-200 via-sky-300 to-sky-500 bg-clip-text text-transparent">
              Track your progress.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-balance text-base leading-relaxed text-slate-400 sm:text-lg">
            Train breath holds, build CO<sub>2</sub> and O<sub>2</sub>{' '}
            tolerance, and practice guided rhythms. Works offline. No account
            required.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button
              className="text-base px-8"
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
            <p className="text-xs text-slate-500">
              No sign-up &bull; Free &bull; PWA
            </p>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="relative h-8 w-[1px] bg-gradient-to-b from-slate-600/50 to-transparent">
            <div
              className="absolute left-1/2 top-0 h-3 w-[1px] -translate-x-1/2 bg-slate-400"
              style={{
                animation: 'scrollBounce 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="px-6 py-24 sm:py-32 snap-start snap-always">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="text-xs tracking-[0.35em] text-sky-300/60 uppercase mb-3">
              Four Training Modes
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to&nbsp;train
            </h2>
            <p className="mt-3 text-slate-400">
              Purpose-built tools for each phase of breathwork practice.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.04] bg-white/[0.04] sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative bg-[#070e17] p-8 transition-all duration-500 hover:bg-sky-950/[0.06]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${f.color}, transparent)`,
                  }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.06] bg-sky-950/30 text-sky-300 transition-all duration-300 group-hover:border-sky-400/20 group-hover:bg-sky-950/50 group-hover:scale-110 group-hover:text-sky-200">
                    <f.icon />
                  </div>
                  <p className="text-[11px] tracking-[0.25em] text-slate-500 uppercase mb-1.5">
                    {f.label}
                  </p>
                  <h3 className="text-xl font-medium text-white transition-colors group-hover:text-sky-100">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── EXTRAS ───── */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.04] bg-white/[0.04] sm:grid-cols-3">
            {extras.map((e) => (
              <div
                key={e.title}
                className="group bg-[#070e17] p-8 transition-all duration-300 hover:bg-sky-950/[0.06]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-sky-950/30 text-sky-300 transition-all duration-300 group-hover:border-sky-400/20 group-hover:bg-sky-950/50 group-hover:text-sky-200">
                  <e.icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-white group-hover:text-sky-100 transition-colors">
                  {e.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  {e.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="relative px-6 pb-32 sm:pb-40">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <Orb
            size={700}
            color="radial-gradient(circle, rgba(56,189,248,0.06), transparent)"
            className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
              Start in seconds.
            </span>
            <br />
            <span className="bg-gradient-to-b from-sky-200 to-sky-400 bg-clip-text text-transparent">
              No strings attached.
            </span>
          </h2>

          <div className="mt-10 inline-flex flex-col items-center gap-3 rounded-2xl border border-white/[0.04] bg-white/[0.02] px-10 py-7">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px] shadow-emerald-400/50" />
              <span className="text-sm text-slate-300">
                No account required
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px] shadow-emerald-400/50" />
              <span className="text-sm text-slate-300">Works offline</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px] shadow-emerald-400/50" />
              <span className="text-sm text-slate-300">Installable PWA</span>
            </div>
          </div>

          <Button
            className="mt-10 text-base px-10 py-3.5"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-white/[0.03] px-6 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-xs text-slate-600">
          <Shield className="h-3 w-3 text-slate-600" />
          Dry-land training only. Never practice breath holds in or near water
          without a trained buddy.
        </div>
      </footer>
    </div>
  );
}
