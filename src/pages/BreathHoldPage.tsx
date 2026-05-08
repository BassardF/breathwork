import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { BreathHoldFlow } from '../features/breath-hold/components/BreathHoldFlow';

export function BreathHoldPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Static Apnea"
        title="Max Breath Hold"
        description="A ten-second ready phase followed by a clean, full-screen timer and immediate leaderboard feedback."
      />
      <p className="-mt-4">
        <Link
          to="/learn?section=breath-hold"
          className="text-xs text-sky-400/60 hover:text-sky-300 transition-colors"
        >
          Learn why this works →
        </Link>
      </p>
      <BreathHoldFlow />
    </div>
  );
}
