import { Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { AuthPage } from './features/auth/components/AuthPage';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { LandingPage } from './features/landing/components/LandingPage';
import { BreathHoldPage } from './pages/BreathHoldPage';
import { Co2Page } from './pages/Co2Page';
import { O2Page } from './pages/O2Page';
import { PatternsPage } from './pages/PatternsPage';
import { SettingsPage } from './pages/SettingsPage';
import { StatsPage } from './pages/StatsPage';
import { LearnPage } from './pages/LearnPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/hold" element={<BreathHoldPage />} />
          <Route path="/co2" element={<Co2Page />} />
          <Route path="/o2" element={<O2Page />} />
          <Route path="/patterns" element={<PatternsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/learn" element={<LearnPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
