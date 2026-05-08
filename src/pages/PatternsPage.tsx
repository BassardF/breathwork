import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { BreathingPatternsFlow } from '../features/breathing-patterns/components/BreathingPatternsFlow';

export function PatternsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Conscious Breathing"
        title="Breathing Pattern Trainer"
        description="Preset rhythm work, saved custom patterns, and smooth inhale-exhale pacing."
      />
      <p className="-mt-4">
        <Link
          to="/learn?section=pattern"
          className="text-xs text-sky-400/60 hover:text-sky-300 transition-colors"
        >
          Learn why this works →
        </Link>
      </p>
      <BreathingPatternsFlow />
    </div>
  );
}
