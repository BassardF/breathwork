import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { CircleAnimation } from '../../../components/ui/CircleAnimation';
import { InfoBlock } from '../../../components/ui/InfoBlock';
import { TimerText } from '../../../components/ui/TimerText';
import { useTimer } from '../../../hooks/useTimer';
import { useWakeLock } from '../../../hooks/useWakeLock';
import { useSessionStore } from '../../../stores/sessionStore';
import { buildCo2Table } from '../../../utils/co2Table';
import { formatClock } from '../../../utils/formatTime';
import { useBreathHoldsQuery } from '../../breath-hold/queries';
import { useSaveCo2SessionMutation } from '../queries';
import { getBreathingProgress } from '../../../utils/breathingAnimation';

export function Co2TableFlow() {
  const { data: holds = [] } = useBreathHoldsQuery();
  const saveMutation = useSaveCo2SessionMutation();
  const pb = holds[0]?.duration_seconds ?? 180;
  const [holdPct, setHoldPct] = useState(0.5);
  const [startRestSeconds, setStartRestSeconds] = useState(() => {
    const realPb = holds[0]?.duration_seconds;
    return realPb ? realPb * 2 : 300;
  });
  const [restDecrement, setRestDecrement] = useState(15);
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState<'setup' | 'rest' | 'hold' | 'complete'>('setup');
  const pbInitialized = useRef(false);

  useEffect(() => {
    if (!pbInitialized.current && holds.length > 0) {
      pbInitialized.current = true;
      setStartRestSeconds(holds[0].duration_seconds * 2);
    }
  }, [holds]);
  const startSession = useSessionStore((state) => state.startSession);
  const updateSession = useSessionStore((state) => state.updateSession);
  const clearSession = useSessionStore((state) => state.clearSession);

  const rounds = useMemo(() => buildCo2Table({ pbSeconds: pb, holdPct, startRestSeconds, restDecrementSeconds: restDecrement }), [holdPct, pb, restDecrement, startRestSeconds]);
  const currentRound = rounds[roundIndex];

  const timer = useTimer({
    direction: 'down',
    initialMs: currentRound ? currentRound.restSeconds * 1000 : 0,
    onComplete: () => {
      if (phase === 'rest') {
        setPhase('hold');
      } else if (roundIndex === rounds.length - 1) {
        setPhase('complete');
        updateSession({ phase: 'complete', isRunning: false });
        void saveMutation.mutateAsync({
          pb_used_seconds: pb,
          hold_pct: holdPct,
          completed_rounds: rounds.length,
        });
        clearSession();
      } else {
        const nextRound = roundIndex + 1;
        setRoundIndex(nextRound);
        setPhase('rest');
      }
    },
  });
  const { reset: resetTimer, seconds: timerSeconds, start: startTimer } = timer;

  useEffect(() => {
    if (phase !== 'setup' && phase !== 'complete' && currentRound) {
      const nextSeconds = phase === 'rest' ? currentRound.restSeconds : currentRound.holdSeconds;
      resetTimer(nextSeconds * 1000);
      startTimer();
      updateSession({ round: roundIndex + 1, phase, isRunning: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound, phase, resetTimer, roundIndex, startTimer]);

  useEffect(() => {
    updateSession({ elapsed: timer.elapsedMs });
  }, [timer.elapsedMs, updateSession]);

  useWakeLock(phase === 'rest' || phase === 'hold');

  const start = () => {
    startSession('co2', 'rest');
    setRoundIndex(0);
    setPhase('rest');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,420px)]">
      <Card className="space-y-6">
        <div>
          <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">CO2 Table</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Fixed hold. Falling rest.</h2>
        </div>
        <InfoBlock
          description="Builds tolerance to carbon dioxide by keeping your hold time fixed while reducing rest between rounds. Each round gets harder as less recovery time accumulates CO₂."
          tips={[
            'Start with a hold duration around 50% of your max breath hold for a comfortable first session.',
            'Breathe calmly during rest — slow, deep belly breaths, not rapid panting.',
            'If a round feels too easy, increase the hold percentage. If too hard, decrease it.',
            'Consistency matters more than intensity — aim to complete all 8 rounds.',
            'Log your sessions to track how your CO₂ tolerance improves over time.',
          ]}
        />
        <CircleAnimation
          phase={phase === 'hold' ? 'hold' : phase === 'setup' ? 'idle' : 'rest'}
          breathingProgress={
            phase === 'rest' && currentRound
              ? getBreathingProgress(
                  currentRound.restSeconds * 1000 - timer.elapsedMs,
                  currentRound.restSeconds * 1000,
                )
              : phase === 'hold'
                ? 1
                : undefined
          }
        />
        {phase === 'setup' ? (
          <div className="space-y-4">
            <label className="block text-sm text-slate-300">
              Hold: {Math.round(pb * holdPct)}s ({Math.round(holdPct * 100)}%)
              <input
                className="mt-2 w-full accent-sky-200"
                min={20}
                max={120}
                step={5}
                type="range"
                value={holdPct * 100}
                onChange={(event) => setHoldPct(Number(event.target.value) / 100)}
              />
            </label>
            <label className="block text-sm text-slate-300">
              Initial rest: {formatClock(startRestSeconds)}
              <input
                className="mt-2 w-full accent-sky-200"
                min={10}
                max={pb * 5}
                step={10}
                type="range"
                value={startRestSeconds}
                onChange={(event) => setStartRestSeconds(Number(event.target.value))}
              />
            </label>
            <label className="block text-sm text-slate-300">
              Rest drop per round: {restDecrement}s
              <input
                className="mt-2 w-full accent-sky-200"
                min={0}
                max={60}
                step={5}
                type="range"
                value={restDecrement}
                onChange={(event) => setRestDecrement(Number(event.target.value))}
              />
            </label>
            <Button fullWidth onClick={start}>
              Start session
            </Button>
          </div>
        ) : phase === 'complete' ? (
          <div className="space-y-4">
            <div className="space-y-3 text-center">
              <p className="text-sm tracking-[0.32em] text-sky-300 uppercase font-medium">Session summary</p>
              <p className="text-4xl font-semibold tracking-tight text-white">Complete</p>
            </div>
            <p className="text-center text-sm text-slate-400">All 8 rounds finished. Session saved.</p>
            <Button fullWidth onClick={() => setPhase('setup')}>
              Build another table
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <TimerText value={formatClock(timerSeconds)} label={`${phase} phase`} />
            <p className="text-center text-sm text-slate-400">
              Round {roundIndex + 1} of 8
            </p>
            <Button
              fullWidth
              variant="secondary"
              onClick={() => {
                resetTimer();
                setPhase('complete');
                clearSession();
                void saveMutation.mutateAsync({
                  pb_used_seconds: pb,
                  hold_pct: holdPct,
                  completed_rounds: roundIndex,
                });
              }}
            >
              End early
            </Button>
          </div>
        )}
      </Card>

      <Card className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Preview</h3>
        <div className="space-y-2">
          {rounds.map((round, index) => {
            const isDone = index < roundIndex && (phase !== 'setup' && phase !== 'complete');
            const isCurrent = index === roundIndex && phase !== 'setup' && phase !== 'complete';
            return (
              <div
                key={`${round.restSeconds}-${index}`}
                className={`grid grid-cols-3 rounded-3xl px-4 py-3 text-sm ${isDone ? 'bg-emerald-950/30 text-emerald-400' : isCurrent ? 'bg-sky-950/40 text-sky-300' : 'bg-slate-950/45 text-slate-300'}`}
              >
                <span>{isDone ? `✓ #${index + 1}` : `#${index + 1}`}</span>
                <span>Rest {formatClock(round.restSeconds)}</span>
                <span>Hold {formatClock(round.holdSeconds)}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
