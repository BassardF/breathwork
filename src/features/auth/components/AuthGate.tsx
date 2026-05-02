import type { FormEvent, PropsWithChildren } from 'react';
import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { signInWithMagicLink } from '../../../lib/repository';
import { isSupabaseConfigured } from '../../../lib/supabase';
import { useAuthStore } from '../../../stores/authStore';
import { SafetyDisclaimer } from './SafetyDisclaimer';

export function AuthGate({ children }: PropsWithChildren) {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const safetyAcknowledged = useAuthStore((state) => state.safetyAcknowledged);
  const isLocalMode = useAuthStore((state) => state.isLocalMode);
  const localSafetyAcknowledged = useAuthStore(
    (state) => state.localSafetyAcknowledged,
  );
  const setLocalMode = useAuthStore((state) => state.setLocalMode);
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center text-slate-400">
        Loading session…
      </div>
    );
  }

  if (isLocalMode) {
    if (!localSafetyAcknowledged) {
      return <SafetyDisclaimer />;
    }
    return <>{children}</>;
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <Card className="max-w-xl space-y-6">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.32em] text-slate-500 uppercase">
              Personal Practice
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white">
              Quiet training. Clear numbers.
            </h1>
            <p className="text-sm leading-6 text-slate-400">
              Installable breathwork and static apnea training. Add Supabase
              credentials to enable cloud sync, or continue with local storage.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-slate-400">
              Cloud sync requires{' '}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">
                VITE_SUPABASE_URL
              </code>{' '}
              and{' '}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">
                VITE_SUPABASE_ANON_KEY
              </code>{' '}
              in{' '}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">
                .env.local
              </code>
              .
            </p>
            <Button fullWidth onClick={() => setLocalMode(true)}>
              Continue with Local Storage
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!user) {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatusMessage(null);
      setIsSubmitting(true);

      try {
        await signInWithMagicLink(email.trim());
        setStatusMessage(
          `Magic link sent to ${email.trim()}. Open the email on this device to finish sign-in.`,
        );
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unable to send magic link.';
        setStatusMessage(message);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="grid min-h-screen place-items-center px-4">
        <Card className="max-w-xl space-y-6">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.32em] text-slate-500 uppercase">
              Personal Practice
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white">
              Quiet training. Clear numbers.
            </h1>
            <p className="text-sm leading-6 text-slate-400">
              Installable breathwork and static apnea training, authenticated
              through email magic links and synced with Supabase.
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(event) => void handleSubmit(event)}
          >
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
            <Button fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Sending link…' : 'Send magic link'}
            </Button>
            {statusMessage ? (
              <p className="text-sm text-slate-400">{statusMessage}</p>
            ) : null}
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs text-slate-500">
              <span className="bg-slate-950 px-2">or</span>
            </div>
          </div>
          <Button variant="ghost" fullWidth onClick={() => setLocalMode(true)}>
            Continue without account →
          </Button>
          <p className="text-center text-xs text-slate-500">
            Data will be stored locally and won't sync across devices.
          </p>
        </Card>
      </div>
    );
  }

  if (!safetyAcknowledged) {
    return <SafetyDisclaimer />;
  }

  return <>{children}</>;
}
