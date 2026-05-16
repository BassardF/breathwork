import { useState } from 'react';
import type { FormEvent } from 'react';
import { BluetoothOff, Heart } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { InfoBlock } from '../../../components/ui/InfoBlock';
import { useBluetoothHR } from '../../../hooks/useBluetoothHR';
import { useSettingsStore } from '../../../stores/settingsStore';
import { useAuthStore } from '../../../stores/authStore';
import { isSupabaseConfigured } from '../../../lib/supabase';
import { signInWithMagicLink } from '../../../lib/repository';

export function SettingsFlow() {
  const { bpm, isConnected, deviceName, connect, disconnect, isSupported } =
    useBluetoothHR();
  const [error, setError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setError(null);
    setConnecting(true);
    try {
      await connect();
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'NotFoundError') {
          setError('No device was selected.');
        } else {
          setError(err.message);
        }
      }
    } finally {
      setConnecting(false);
    }
  };

  const user = useAuthStore((state) => state.user);
  const isLocalMode = useAuthStore((state) => state.isLocalMode);

  const {
    holdPrepTimeEnabled,
    holdPrepTimeSeconds,
    setHoldPrepTimeEnabled,
    setHoldPrepTimeSeconds,
  } = useSettingsStore();

  const [email, setEmail] = useState('');
  const [linkStatus, setLinkStatus] = useState<string | null>(null);
  const [isLinking, setIsLinking] = useState(false);

  const handleLinkAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLinkStatus(null);
    setIsLinking(true);
    try {
      await signInWithMagicLink(email.trim());
      setLinkStatus(
        `Magic link sent to ${email.trim()}. Open the email on this device to link your account.`,
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to send magic link.';
      setLinkStatus(message);
    } finally {
      setIsLinking(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setError(null);
  };

  return (
    <div className="space-y-6">
      {isLocalMode && !user ? (
        <Card className="space-y-6">
          <div>
            <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">
              Account
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Cloud Sync
            </h2>
          </div>

          {isSupabaseConfigured ? (
            <form
              className="space-y-4"
              onSubmit={(event) => void handleLinkAccount(event)}
            >
              <p className="text-sm text-slate-400">
                Link your local data to a real account to sync across devices.
              </p>
              <label className="block text-sm text-slate-300">
                Email
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>
              <Button fullWidth disabled={isLinking}>
                {isLinking ? 'Sending link…' : 'Link account'}
              </Button>
              {linkStatus ? (
                <p className="text-sm text-slate-400">{linkStatus}</p>
              ) : null}
            </form>
          ) : (
            <div className="space-y-3 text-sm text-slate-400">
              <p>
                To enable cloud sync, add your Supabase credentials in a{' '}
                <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">
                  .env.local
                </code>{' '}
                file:
              </p>
              <pre className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-xs text-slate-400">
                {`VITE_SUPABASE_URL=your_url\nVITE_SUPABASE_ANON_KEY=your_key`}
              </pre>
            </div>
          )}
        </Card>
      ) : null}

      <Card className="space-y-6">
        <div>
          <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">
            Bluetooth
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Heart Rate Monitor
          </h2>
        </div>

        <InfoBlock
          description="Web Bluetooth lets the browser talk directly to BLE devices, but it comes with a few important restrictions."
          tips={[
            'Only works in Chrome, Edge, and Samsung Internet — Safari and Firefox are not supported.',
            'Requires HTTPS (or localhost during development). Plain HTTP will not work.',
            'You must tap the "Connect" button to trigger the device chooser — it cannot be automated.',
            'The connection may drop if the device goes out of range. Reconnection requires a fresh pairing.',
            'iOS support is limited and often unreliable. A native app may be needed for consistent results.',
            'Only one HR monitor can be connected at a time.',
          ]}
        />

        {!isSupported ? (
          <div className="rounded-3xl border border-white/8 bg-slate-950/45 px-5 py-8 text-center">
            <BluetoothOff className="mx-auto h-8 w-8 text-slate-600" />
            <p className="mt-3 text-sm text-slate-400">
              Web Bluetooth is not supported in this browser. Try Chrome, Edge,
              or Samsung Internet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-3xl border border-white/8 bg-slate-950/45 px-5 py-4">
              <div className="flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-400 shadow-[0_0_8px] shadow-green-400/50' : 'bg-slate-600'}`}
                />
                <div>
                  <p className="text-sm font-medium text-white">
                    {isConnected ? deviceName : 'Not connected'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {isConnected ? 'Connected' : 'No HR monitor paired'}
                  </p>
                </div>
              </div>
              {isConnected ? (
                <Button variant="secondary" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              ) : (
                <Button onClick={handleConnect} disabled={connecting}>
                  {connecting ? 'Connecting…' : 'Connect'}
                </Button>
              )}
            </div>

            {isConnected && bpm !== null ? (
              <div className="rounded-3xl bg-sky-950/30 border border-sky-300/15 px-5 py-8 text-center">
                <Heart
                  className="mx-auto h-8 w-8 text-rose-400"
                  fill="currentColor"
                />
                <p className="mt-3 text-6xl font-semibold tracking-tight text-white tabular-nums">
                  {bpm}
                </p>
                <p className="mt-1 text-sm text-slate-400">beats per minute</p>
              </div>
            ) : isConnected ? (
              <div className="rounded-3xl border border-white/8 bg-slate-950/45 px-5 py-8 text-center">
                <p className="text-sm text-slate-400">
                  Waiting for first reading…
                </p>
              </div>
            ) : null}

            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          </div>
        )}

        <div className="space-y-3 text-sm text-slate-400">
          <p>
            Pair a Bluetooth Low Energy (BLE) heart rate monitor to see live BPM
            during training and record average heart rate with each session.
          </p>
          <ul className="list-disc space-y-1 pl-4">
            <li>
              Compatible with any standard BLE HR monitor (chest strap, arm
              band, watch)
            </li>
            <li>
              Heart rate is recorded alongside each session when connected
            </li>
            <li>View average HR in your statistics history</li>
            <li>Bluetooth must be enabled on your device</li>
          </ul>
        </div>
      </Card>

      <Card className="space-y-6">
        <div>
          <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">
            Breath Hold
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Preparation
          </h2>
        </div>

        <div className="rounded-3xl border border-white/8 bg-slate-950/45 px-5 py-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={holdPrepTimeEnabled}
              onChange={(e) => setHoldPrepTimeEnabled(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-slate-800 text-sky-400 accent-sky-400 focus:ring-2 focus:ring-sky-400/50"
            />
            <div>
              <p className="text-sm font-medium text-white">
                Preparation countdown
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                When disabled, the hold starts immediately.
              </p>
            </div>
          </label>
        </div>

        {holdPrepTimeEnabled ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Countdown</span>
              <span className="text-lg font-medium text-white tabular-nums">
                {holdPrepTimeSeconds}s
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={30}
              step={1}
              value={holdPrepTimeSeconds}
              onChange={(e) => setHoldPrepTimeSeconds(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-800 accent-sky-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-sky-400/30 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-sky-400 [&::-moz-range-thumb]:border-0"
            />
            <div className="flex justify-between text-xs text-slate-600">
              <span>3s</span>
              <span>30s</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No countdown — starts immediately.
          </p>
        )}
      </Card>
    </div>
  );
}
