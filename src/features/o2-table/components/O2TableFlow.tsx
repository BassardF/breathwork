import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { CircleAnimation } from '../../../components/ui/CircleAnimation';
import { InfoBlock } from '../../../components/ui/InfoBlock';
import { TimerText } from '../../../components/ui/TimerText';
import { useTimer } from '../../../hooks/useTimer';
import { useWakeLock } from '../../../hooks/useWakeLock';
import { useSessionStore } from '../../../stores/sessionStore';
import { buildO2Table } from '../../../utils/o2Table';
import { formatClock } from '../../../utils/formatTime';
import { useBreathHoldsQuery } from '../../breath-hold/queries';
import { useSaveO2SessionMutation } from '../queries';
import { getBreathingProgress } from '../../../utils/breathingAnimation';

export function O2TableFlow() {
  const { data: holds = [] } = useBreathHoldsQuery();
  const saveMutation = useSaveO2SessionMutation();
  const pb = holds[0]?.duration_seconds ?? 180;
  const [restSeconds, setRestSeconds] = useState(120);
  const [maxHoldPct, setMaxHoldPct] = useState(0.8);
  const [startHoldPct, setStartHoldPct] = useState(0.3);
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState<'setup' | 'rest' | 'hold' | 'complete'>('setup');
  const startSession = useSessionStore((state) => state.startSession);
  const updateSession = useSessionStore((state) => state.updateSession);
  const clearSession = useSessionStore((state) => state.clearSession);

  const rounds = useMemo(() => buildO2Table({ pbSeconds: pb, restSeconds, maxHoldPct, startHoldPct }), [maxHoldPct, pb, restSeconds, startHoldPct]);
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
        clearSession();
        void saveMutation.mutateAsync({
          pb_used_seconds: pb,
          rest_duration_seconds: restSeconds,
          max_hold_pct: maxHoldPct,
          completed_rounds: rounds.length,
        });
      } else {
        setRoundIndex((value) => value + 1);
        setPhase('rest');
      }
    },
  });
  const { reset: resetTimer, seconds: timerSeconds, start: startTimer } = timer;

  useEffect(() => {
    if (phase === 'rest' && currentRound) {
      resetTimer(currentRound.restSeconds * 1000);
      startTimer();
      updateSession({ round: roundIndex + 1, phase, isRunning: true });
    }
    if (phase === 'hold' && currentRound) {
      resetTimer(currentRound.holdSeconds * 1000);
      startTimer();
      updateSession({ round: roundIndex + 1, phase, isRunning: true });
    }
  }, [currentRound, phase, resetTimer, roundIndex, startTimer, updateSession]);

  useEffect(() => {
    updateSession({ elapsed: timer.elapsedMs });
  }, [timer.elapsedMs, updateSession]);

  useWakeLock(phase === 'rest' || phase === 'hold');

  const start = () => {
    startSession('o2', 'rest');
    setRoundIndex(0);
    setPhase('rest');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,420px)]">
      <Card className="space-y-6">
        <div>
          <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">O2 Table</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Fixed rest. Rising hold.</h2>
        </div>
        <InfoBlock
          description="Builds tolerance to low oxygen by keeping rest fixed while increasing hold time each round. Trains your body to perform under progressive oxygen debt."
          tips={[
            'Set your rest duration long enough to feel recovered between rounds (2-3 minutes is a good start).',
            'Start with a conservative max hold target around 60-70% of your PB.',
            'Focus on relaxation during holds — a still body consumes less oxygen.',
            'The last 2-3 rounds are where the adaptation happens. Push gently.',
            'Skip a day between O2 table sessions — your nervous system needs recovery time.',
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
              Rest duration: {formatClock(restSeconds)}
              <input
                className="mt-2 w-full accent-sky-200"
                min={30}
                max={300}
                step={10}
                type="range"
                value={restSeconds}
                onChange={(event) => setRestSeconds(Number(event.target.value))}
              />
            </label>
            <label className="block text-sm text-slate-300">
              Max hold target: {Math.round(maxHoldPct * 100)}%
              <input
                className="mt-2 w-full accent-sky-200"
                min={50}
                max={100}
                step={5}
                type="range"
                value={maxHoldPct * 100}
                onChange={(event) => setMaxHoldPct(Number(event.target.value) / 100)}
              />
            </label>
            <label className="block text-sm text-slate-300">
              Starting hold: {Math.round(startHoldPct * 100)}%
              <input
                className="mt-2 w-full accent-sky-200"
                min={10}
                max={70}
                step={5}
                type="range"
                value={startHoldPct * 100}
                onChange={(event) => setStartHoldPct(Number(event.target.value) / 100)}
              />
            </label>
            <Button fullWidth onClick={start}>
              Start session
            </Button>
          </div>
        ) : phase === 'complete' ? (
          <div className="space-y-4">
            <TimerText value="Complete" label="Session summary" />
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
                setPhase('complete');
                updateSession({ phase: 'complete', isRunning: false });
                clearSession();
                void saveMutation.mutateAsync({
                  pb_used_seconds: pb,
                  rest_duration_seconds: restSeconds,
                  max_hold_pct: maxHoldPct,
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
                key={`${round.holdSeconds}-${index}`}
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
