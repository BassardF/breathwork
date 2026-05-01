import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { CircleAnimation } from '../../../components/ui/CircleAnimation';
import { TimerText } from '../../../components/ui/TimerText';
import { useTimer } from '../../../hooks/useTimer';
import { useWakeLock } from '../../../hooks/useWakeLock';
import { useSessionStore } from '../../../stores/sessionStore';
import { buildCo2Table } from '../../../utils/co2Table';
import { formatClock } from '../../../utils/formatTime';
import { useBreathHoldsQuery } from '../../breath-hold/queries';
import { useSaveCo2SessionMutation } from '../queries';

export function Co2TableFlow() {
  const { data: holds = [] } = useBreathHoldsQuery();
  const saveMutation = useSaveCo2SessionMutation();
  const pb = holds[0]?.duration_seconds ?? 180;
  const [holdPct, setHoldPct] = useState(0.5);
  const [startRestSeconds, setStartRestSeconds] = useState(pb * 2);
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState<'setup' | 'rest' | 'hold' | 'complete'>('setup');
  const startSession = useSessionStore((state) => state.startSession);
  const updateSession = useSessionStore((state) => state.updateSession);
  const clearSession = useSessionStore((state) => state.clearSession);

  useEffect(() => {
    setStartRestSeconds(pb * 2);
  }, [pb]);

  const rounds = useMemo(() => buildCo2Table({ pbSeconds: pb, holdPct, startRestSeconds }), [holdPct, pb, startRestSeconds]);
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
  }, [currentRound, phase, resetTimer, roundIndex, startTimer, updateSession]);

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
        <CircleAnimation phase={phase === 'hold' ? 'hold' : 'rest'} intensity={phase === 'hold' ? 0.8 : 1.2} />
        {phase === 'setup' ? (
          <div className="space-y-4">
            <label className="block text-sm text-slate-300">
              Hold target: {Math.round(holdPct * 100)}%
              <input
                className="mt-2 w-full accent-sky-200"
                min={40}
                max={65}
                step={5}
                type="range"
                value={holdPct * 100}
                onChange={(event) => setHoldPct(Number(event.target.value) / 100)}
              />
            </label>
            <label className="block text-sm text-slate-300">
              Starting rest: {formatClock(startRestSeconds)}
              <input
                className="mt-2 w-full accent-sky-200"
                min={30}
                max={pb * 3}
                step={15}
                type="range"
                value={startRestSeconds}
                onChange={(event) => setStartRestSeconds(Number(event.target.value))}
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
          {rounds.map((round, index) => (
            <div key={`${round.restSeconds}-${index}`} className="grid grid-cols-3 rounded-3xl bg-slate-950/45 px-4 py-3 text-sm text-slate-300">
              <span>#{index + 1}</span>
              <span>Rest {formatClock(round.restSeconds)}</span>
              <span>Hold {formatClock(round.holdSeconds)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
