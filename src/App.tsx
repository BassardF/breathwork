import { Route, Routes } from 'react-router-dom';
import { PageHeader } from './components/layout/PageHeader';
import { AppShell } from './components/layout/AppShell';
import { AuthGate } from './features/auth/components/AuthGate';
import { BreathHoldFlow } from './features/breath-hold/components/BreathHoldFlow';
import { Co2TableFlow } from './features/co2-table/components/Co2TableFlow';
import { O2TableFlow } from './features/o2-table/components/O2TableFlow';
import { BreathingPatternsFlow } from './features/breathing-patterns/components/BreathingPatternsFlow';
import { StatisticsView } from './features/statistics/components/StatisticsView';

function BreathHoldPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Feature 1"
        title="Max Breath Hold"
        description="A ten-second ready phase followed by a clean, full-screen timer and immediate leaderboard feedback."
      />
      <BreathHoldFlow />
    </div>
  );
}

function Co2Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Feature 2"
        title="CO2 Table"
        description="Fixed hold duration, descending rest windows, and a preview before you begin."
      />
      <Co2TableFlow />
    </div>
  );
}

function O2Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Feature 3"
        title="O2 Table"
        description="Steady recovery time with progressively longer holds based on your current personal best."
      />
      <O2TableFlow />
    </div>
  );
}

function PatternsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Feature 4"
        title="Breathing Pattern Trainer"
        description="Preset rhythm work, saved custom patterns, and smooth inhale-exhale pacing."
      />
      <BreathingPatternsFlow />
    </div>
  );
}

function StatsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Feature 5"
        title="Statistics"
        description="Personal records, training trends, and a unified reverse-chronological session log."
      />
      <StatisticsView />
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
          <Route path="/stats" element={<StatsPage />} />
        </Route>
      </Routes>
    </AuthGate>
  );
}
