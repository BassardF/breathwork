import { Link, Route, Routes } from 'react-router-dom';
import { PageHeader } from './components/layout/PageHeader';
import { AppShell } from './components/layout/AppShell';
import { AuthGate } from './features/auth/components/AuthGate';
import { BreathHoldFlow } from './features/breath-hold/components/BreathHoldFlow';
import { Co2TableFlow } from './features/co2-table/components/Co2TableFlow';
import { O2TableFlow } from './features/o2-table/components/O2TableFlow';
import { BreathingPatternsFlow } from './features/breathing-patterns/components/BreathingPatternsFlow';
import { SettingsFlow } from './features/settings/components/SettingsFlow';
import { StatisticsView } from './features/statistics/components/StatisticsView';
import { LearnOverview } from './features/learn/components/LearnOverview';

function BreathHoldPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Static Apnea"
        title="Max Breath Hold"
        description="A ten-second ready phase followed by a clean, full-screen timer and immediate leaderboard feedback."
      />
      <p className="-mt-4">
        <Link to="/learn?section=breath-hold" className="text-xs text-sky-400/60 hover:text-sky-300 transition-colors">
          Learn why this works →
        </Link>
      </p>
      <BreathHoldFlow />
    </div>
  );
}

function Co2Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="CO₂ Tolerance"
        title="CO2 Table"
        description="Fixed hold duration, descending rest windows, and a preview before you begin."
      />
      <p className="-mt-4">
        <Link to="/learn?section=co2" className="text-xs text-sky-400/60 hover:text-sky-300 transition-colors">
          Learn why this works →
        </Link>
      </p>
      <Co2TableFlow />
    </div>
  );
}

function O2Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="O₂ Tolerance"
        title="O2 Table"
        description="Steady recovery time with progressively longer holds based on your current personal best."
      />
      <p className="-mt-4">
        <Link to="/learn?section=o2" className="text-xs text-sky-400/60 hover:text-sky-300 transition-colors">
          Learn why this works →
        </Link>
      </p>
      <O2TableFlow />
    </div>
  );
}

function PatternsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Conscious Breathing"
        title="Breathing Pattern Trainer"
        description="Preset rhythm work, saved custom patterns, and smooth inhale-exhale pacing."
      />
      <p className="-mt-4">
        <Link to="/learn?section=pattern" className="text-xs text-sky-400/60 hover:text-sky-300 transition-colors">
          Learn why this works →
        </Link>
      </p>
      <BreathingPatternsFlow />
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Bluetooth HR monitor pairing, device management, and live heart rate display."
      />
      <SettingsFlow />
    </div>
  );
}

function StatsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tracking"
        title="Statistics"
        description="Personal records, training trends, and a unified reverse-chronological session log."
      />
      <StatisticsView />
    </div>
  );
}

function LearnPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge Base"
        title="Learn"
        description="Understand the why and the how behind every training method. Browse by goal or explore physiology concepts."
      />
      <LearnOverview />
    </div>
  );
}

export function App() {
  return (
    <AuthGate>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<BreathHoldPage />} />
          <Route path="/co2" element={<Co2Page />} />
          <Route path="/o2" element={<O2Page />} />
          <Route path="/patterns" element={<PatternsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/learn" element={<LearnPage />} />
        </Route>
      </Routes>
    </AuthGate>
  );
}
