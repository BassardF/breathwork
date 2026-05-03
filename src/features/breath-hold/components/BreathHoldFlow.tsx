import { useEffect, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { CircleAnimation } from '../../../components/ui/CircleAnimation';
import { ConfirmModal } from '../../../components/ui/ConfirmModal';
import { InfoBlock } from '../../../components/ui/InfoBlock';
import { TimerText } from '../../../components/ui/TimerText';
import { useTimer } from '../../../hooks/useTimer';
import { useWakeLock } from '../../../hooks/useWakeLock';
import { useSessionStore } from '../../../stores/sessionStore';
import { formatClock, formatDurationPrecise } from '../../../utils/formatTime';
import { useBreathHoldsQuery, useDeleteBreathHoldMutation, useSaveBreathHoldMutation } from '../queries';

const READY_SECONDS = 10;

export function BreathHoldFlow() {
  const { data: holds = [] } = useBreathHoldsQuery();
  const saveMutation = useSaveBreathHoldMutation();
  const deleteMutation = useDeleteBreathHoldMutation();
  const [stage, setStage] = useState<'idle' | 'countdown' | 'holding' | 'finished'>('idle');
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const bestResult = holds[0]?.duration_seconds ?? 0;
  const isNewRecord = lastResult !== null && lastResult >= bestResult;
  const startSession = useSessionStore((state) => state.startSession);
  const updateSession = useSessionStore((state) => state.updateSession);
  const clearSession = useSessionStore((state) => state.clearSession);
  const holdTimer = useTimer();
  const {
    elapsedMs: holdElapsedMs,
    pause: pauseHold,
    reset: resetHold,
    start: startHold,
  } = holdTimer;

  const countdown = useTimer({
    direction: 'down',
    initialMs: READY_SECONDS * 1000,
    onComplete: () => {
      setStage('holding');
    },
  });
  const { pause: pauseCountdown, reset: resetCountdown, seconds: countdownSeconds, start: startCountdown } = countdown;

  useWakeLock(stage === 'countdown' || stage === 'holding');

  useEffect(() => {
    if (stage === 'holding') {
      resetHold(0);
      startHold();
      updateSession({ phase: 'hold' });
    }
  }, [resetHold, stage, startHold, updateSession]);

  useEffect(() => {
    updateSession({
      elapsed: holdElapsedMs,
      isRunning: stage === 'countdown' || stage === 'holding',
    });
  }, [holdElapsedMs, stage, updateSession]);

  const leaderboard = useMemo(
    () =>
      holds.map((entry, index) => ({
        ...entry,
        rank: index + 1,
        isCurrent: lastResult !== null && entry.duration_seconds === lastResult,
      })),
    [holds, lastResult],
  );

  const start = () => {
    setLastResult(null);
    setStage('countdown');
    startSession('breath-hold', 'countdown');
    resetHold(0);
    resetCountdown(READY_SECONDS * 1000);
    startCountdown();
  };

  const stop = async () => {
    pauseHold();
    pauseCountdown();
    const seconds = Math.max(1, Math.round(holdElapsedMs / 1000));
    setLastResult(seconds);
    setStage('finished');
    updateSession({ phase: 'complete', isRunning: false });
    await saveMutation.mutateAsync(seconds);
    clearSession();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,420px)]">
      <Card className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">Max Breath Hold</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Static apnea PB</h2>
          </div>
          {isNewRecord ? <Badge>New Record</Badge> : null}
        </div>
        <InfoBlock
          description="A static apnea test measures how long you can comfortably hold your breath after a full exhale (or inhale). This is your baseline — track it over time to see your progress."
          tips={[
            'Always practice in a safe environment — seated or lying down, never in water.',
            'Exhale fully before starting your hold for a consistent baseline.',
            'Relax your body completely — tension burns oxygen.',
            'Don\'t push to discomfort. The goal is a calm, controlled hold.',
            'Wait at least 2-3 minutes between attempts to recover fully.',
          ]}
        />
        <CircleAnimation phase={stage === 'countdown' ? 'rest' : stage === 'holding' ? 'hold' : 'idle'} intensity={1.4} />
        {stage === 'countdown' ? (
          <TimerText value={formatClock(countdownSeconds)} label="Get ready" />
        ) : (
          <TimerText value={formatDurationPrecise(holdElapsedMs)} label={stage === 'holding' ? 'Holding' : 'Timer'} />
        )}
        <div className="flex gap-3">
          {stage === 'idle' || stage === 'finished' ? (
            <Button fullWidth onClick={start}>
              Start test
            </Button>
          ) : (
            <Button fullWidth variant="danger" onClick={() => void stop()}>
              Stop
            </Button>
          )}
        </div>
        {lastResult !== null ? (
          <div className="rounded-[28px] border border-white/8 bg-slate-950/50 p-4 text-sm text-slate-300">
            Recorded {formatClock(lastResult)} at {new Date().toLocaleString()}.
          </div>
        ) : null}
      </Card>

      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Leaderboard</h3>
          <span className="text-sm text-slate-500">{holds.length} entries</span>
        </div>
        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between rounded-3xl border px-4 py-3 ${entry.isCurrent ? 'border-sky-300/30 bg-sky-300/10' : 'border-white/6 bg-slate-950/45'}`}
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">#{entry.rank}</p>
                <p className="mt-1 text-lg font-medium text-white">{formatClock(entry.duration_seconds)}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <p className="text-sm text-slate-400">{new Date(entry.recorded_at).toLocaleDateString()}</p>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(entry.id)}
                  className="text-slate-600 hover:text-rose-400 transition-colors cursor-pointer"
                  aria-label="Delete entry"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {leaderboard.length === 0 ? <p className="text-sm text-slate-500">No recorded holds yet.</p> : null}
        </div>
        <ConfirmModal
          open={deleteTarget !== null}
          title="Delete entry"
          message="This will permanently remove this breath hold record. Are you sure?"
          confirmLabel="Delete"
          onConfirm={() => {
            if (deleteTarget) {
              void deleteMutation.mutateAsync(deleteTarget);
            }
            setDeleteTarget(null);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      </Card>
    </div>
  );
}
