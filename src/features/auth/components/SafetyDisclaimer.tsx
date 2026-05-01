import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { updateSafetyAcknowledgement } from '../../../lib/repository';
import { useAuthStore } from '../../../stores/authStore';

export function SafetyDisclaimer() {
  const setSafetyAcknowledged = useAuthStore((state) => state.setSafetyAcknowledged);

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <Card className="max-w-2xl space-y-6">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.32em] text-slate-500 uppercase">Safety</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">Acknowledge before training</h1>
          <p className="text-lg leading-8 text-slate-300">
            Breath hold training carries risk of hypoxic blackout. Never practice alone or in/near water without a
            trained buddy. This app is designed for dry land training only.
          </p>
        </div>
        <Button
          fullWidth
          onClick={async () => {
            await updateSafetyAcknowledgement();
            setSafetyAcknowledged(true);
          }}
        >
          I understand
        </Button>
      </Card>
    </div>
  );
}
