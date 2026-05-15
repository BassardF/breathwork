import { PageHeader } from '../components/layout/PageHeader';
import { SettingsFlow } from '../features/settings/components/SettingsFlow';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Bluetooth HR monitor pairing, device management, live heart rate display, and training preferences."
      />
      <SettingsFlow />
    </div>
  );
}
