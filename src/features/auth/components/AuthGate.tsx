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
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return <div className="grid min-h-screen place-items-center text-slate-400">Loading session…</div>;
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <Card className="max-w-xl space-y-4">
          <h1 className="text-3xl font-semibold text-white">Supabase configuration required</h1>
          <p className="text-sm leading-6 text-slate-400">
            Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to run email auth and cloud sync. Until then, the app
            will use local storage for reads and writes.
          </p>
          <Button onClick={() => window.location.reload()}>Reload after env setup</Button>
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
        setStatusMessage(`Magic link sent to ${email.trim()}. Open the email on this device to finish sign-in.`);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to send magic link.';
        setStatusMessage(message);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="grid min-h-screen place-items-center px-4">
        <Card className="max-w-xl space-y-6">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.32em] text-slate-500 uppercase">Personal Practice</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white">Quiet training. Clear numbers.</h1>
            <p className="text-sm leading-6 text-slate-400">
              Installable breathwork and static apnea training, authenticated through email magic links and synced with Supabase.
            </p>
          </div>
          <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
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
            {statusMessage ? <p className="text-sm text-slate-400">{statusMessage}</p> : null}
          </form>
        </Card>
      </div>
    );
  }

  if (!safetyAcknowledged) {
    return <SafetyDisclaimer />;
  }

  return <>{children}</>;
}
