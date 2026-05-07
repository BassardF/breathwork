import { useState } from 'react';
import { BluetoothOff, Heart } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useBluetoothHR } from '../../../hooks/useBluetoothHR';

export function SettingsFlow() {
  const { bpm, isConnected, deviceName, connect, disconnect, isSupported } = useBluetoothHR();
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

  const handleDisconnect = () => {
    disconnect();
    setError(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,420px)]">
      <Card className="space-y-6">
        <div>
          <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">Bluetooth</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Heart Rate Monitor</h2>
        </div>

        {!isSupported ? (
          <div className="rounded-3xl border border-white/8 bg-slate-950/45 px-5 py-8 text-center">
            <BluetoothOff className="mx-auto h-8 w-8 text-slate-600" />
            <p className="mt-3 text-sm text-slate-400">
              Web Bluetooth is not supported in this browser. Try Chrome, Edge, or Samsung Internet.
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
                <Heart className="mx-auto h-8 w-8 text-rose-400" fill="currentColor" />
                <p className="mt-3 text-6xl font-semibold tracking-tight text-white tabular-nums">
                  {bpm}
                </p>
                <p className="mt-1 text-sm text-slate-400">beats per minute</p>
              </div>
            ) : isConnected ? (
              <div className="rounded-3xl border border-white/8 bg-slate-950/45 px-5 py-8 text-center">
                <p className="text-sm text-slate-400">Waiting for first reading…</p>
              </div>
            ) : null}

            {error ? (
              <p className="text-sm text-rose-300">{error}</p>
            ) : null}
          </div>
        )}
      </Card>

      <Card className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Info</h3>
        <div className="space-y-3 text-sm text-slate-400">
          <p>
            Pair a Bluetooth Low Energy (BLE) heart rate monitor to see live BPM during training and
            record average heart rate with each session.
          </p>
          <ul className="list-disc space-y-1 pl-4">
            <li>Compatible with any standard BLE HR monitor (chest strap, arm band, watch)</li>
            <li>Heart rate is recorded alongside each session when connected</li>
            <li>View average HR in your statistics history</li>
            <li>Bluetooth must be enabled on your device</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
