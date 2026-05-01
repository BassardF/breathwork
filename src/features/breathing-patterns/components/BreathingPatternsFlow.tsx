import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { CircleAnimation } from '../../../components/ui/CircleAnimation';
import { TimerText } from '../../../components/ui/TimerText';
import { useTimer } from '../../../hooks/useTimer';
import { useWakeLock } from '../../../hooks/useWakeLock';
import type { BreathingPhase } from '../../../types/domain';
import { formatClock } from '../../../utils/formatTime';
import { getCycleSeconds, PRESET_PATTERNS, validatePattern } from '../../../utils/patterns';
import { useCustomPatternsQuery, useSaveBreathingSessionMutation, useSaveCustomPatternMutation } from '../queries';

const DURATIONS = [300, 600, 900, 1200];

type AnimationPhase =
  | 'rest'
  | 'hold'
  | 'inhale'
  | 'exhale'
  | 'hold-full'
  | 'hold-empty'
  | 'idle';

function getAnimationPhase(phase: BreathingPhase | undefined): AnimationPhase {
  if (!phase) {
    return 'idle';
  }

  if (phase.kind === 'inhale') {
    return 'inhale';
  }

  if (phase.kind === 'exhale') {
    return 'exhale';
  }

  if (phase.kind === 'hold') {
    return 'hold-full';
  }

  return 'hold-empty';
}

export function BreathingPatternsFlow() {
  const { data: customPatterns = [] } = useCustomPatternsQuery();
  const saveSessionMutation = useSaveBreathingSessionMutation();
  const savePatternMutation = useSaveCustomPatternMutation();
  const [selectedName, setSelectedName] = useState(PRESET_PATTERNS[0].name);
  const [phases, setPhases] = useState<BreathingPhase[]>(PRESET_PATTERNS[0].phases);
  const [totalDurationSeconds, setTotalDurationSeconds] = useState(600);
  const [status, setStatus] = useState<'setup' | 'running' | 'complete'>('setup');
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [patternNameInput, setPatternNameInput] = useState('');
  const [isCustomPattern, setIsCustomPattern] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');

  const cycleSeconds = getCycleSeconds(phases);
  const totalCycles = Math.floor(totalDurationSeconds / cycleSeconds);
  const currentPhase = phases[phaseIndex];
  const validationError = validatePattern(phases);
  const canStart = !validationError && totalCycles > 0;

  const timer = useTimer({
    direction: 'down',
    initialMs: currentPhase ? currentPhase.seconds * 1000 : 0,
    onComplete: () => {
      if (phaseIndex === phases.length - 1) {
        if (cycleIndex >= totalCycles - 1) {
          setStatus('complete');
          void saveSessionMutation.mutateAsync({
            pattern_name: isCustomPattern ? patternNameInput || 'Custom Pattern' : selectedName,
            phases,
            total_duration_seconds: totalDurationSeconds,
            cycles_completed: totalCycles,
          });
          return;
        }
        setCycleIndex((value) => value + 1);
        setPhaseIndex(0);
        return;
      }
      setPhaseIndex((value) => value + 1);
    },
  });
  const { reset: resetTimer, seconds: timerSeconds, start: startTimer } = timer;

  useEffect(() => {
    if (status === 'running' && currentPhase) {
      resetTimer(currentPhase.seconds * 1000);
      startTimer();
    }
  }, [currentPhase, resetTimer, startTimer, status]);

  useEffect(() => {
    if (status !== 'running') {
      setAnimationPhase(status === 'complete' ? 'idle' : 'hold-empty');
      return;
    }

    const nextPhase = getAnimationPhase(currentPhase);
    const frameId = window.requestAnimationFrame(() => {
      setAnimationPhase(nextPhase);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [currentPhase, status]);

  useWakeLock(status === 'running');

  const options = useMemo(
    () => [
      ...PRESET_PATTERNS.map((pattern) => ({ name: pattern.name, phases: pattern.phases })),
      ...customPatterns.map((pattern) => ({ name: pattern.name, phases: pattern.phases })),
    ],
    [customPatterns],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,420px)]">
      <Card className="space-y-6">
        <div>
          <p className="text-xs tracking-[0.28em] text-slate-500 uppercase">Breathing Pattern Trainer</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">Guided rhythm work</h2>
        </div>
        <CircleAnimation
          phase={animationPhase}
          intensity={1}
          durationMs={currentPhase ? currentPhase.seconds * 1000 : 700}
        />
        {status === 'running' && currentPhase ? (
          <div className="space-y-4">
            <TimerText value={formatClock(timerSeconds)} label={currentPhase.name} />
            <p className="text-center text-sm text-slate-400">
              Cycle {cycleIndex + 1} of {totalCycles} · {formatClock(cycleSeconds)} per cycle
            </p>
            <Button
              fullWidth
              variant="secondary"
              onClick={() => {
                setStatus('complete');
                void saveSessionMutation.mutateAsync({
                  pattern_name: isCustomPattern ? patternNameInput || 'Custom Pattern' : selectedName,
                  phases,
                  total_duration_seconds: totalDurationSeconds,
                  cycles_completed: cycleIndex,
                });
              }}
            >
              End session
            </Button>
          </div>
        ) : status === 'complete' ? (
          <div className="space-y-4">
            <TimerText value="Complete" label="Session saved" />
            {isCustomPattern ? (
              <div className="space-y-3">
                <input
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none"
                  placeholder="Save this pattern as…"
                  value={patternNameInput}
                  onChange={(event) => setPatternNameInput(event.target.value)}
                />
                <Button
                  fullWidth
                  onClick={() =>
                    void savePatternMutation.mutateAsync({
                      name: patternNameInput || 'Custom Pattern',
                      phases,
                    })
                  }
                >
                  Save custom pattern
                </Button>
              </div>
            ) : null}
            <Button fullWidth variant="secondary" onClick={() => setStatus('setup')}>
              Build another session
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block text-sm text-slate-300">
              Pattern
              <select
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none"
                value={selectedName}
                onChange={(event) => {
                  if (event.target.value === '__custom__') {
                    setSelectedName('Custom Pattern');
                    setPatternNameInput('Custom Pattern');
                    setPhases([
                      { name: 'Inhale', seconds: 4, kind: 'inhale' },
                      { name: 'Hold', seconds: 4, kind: 'hold' },
                      { name: 'Exhale', seconds: 6, kind: 'exhale' },
                    ]);
                    setIsCustomPattern(true);
                    return;
                  }
                  const selected = options.find((option) => option.name === event.target.value);
                  if (selected) {
                    setSelectedName(selected.name);
                    setPhases(selected.phases);
                    setPatternNameInput(selected.name);
                    setIsCustomPattern(false);
                  }
                }}
              >
                {options.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
                <option value="__custom__">Custom Pattern</option>
              </select>
            </label>
            <label className="block text-sm text-slate-300">
              Total duration
              <select
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none"
                value={totalDurationSeconds}
                onChange={(event) => setTotalDurationSeconds(Number(event.target.value))}
              >
                {DURATIONS.map((seconds) => (
                  <option key={seconds} value={seconds}>
                    {formatClock(seconds)}
                  </option>
                ))}
              </select>
            </label>
            {isCustomPattern ? (
              <div className="space-y-3 rounded-[28px] border border-white/8 bg-slate-950/45 p-4">
                <input
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none"
                  placeholder="Pattern name"
                  value={patternNameInput}
                  onChange={(event) => setPatternNameInput(event.target.value)}
                />
                {phases.map((phase, index) => (
                  <div key={`${phase.kind}-${index}`} className="grid grid-cols-[1.6fr_1fr_1fr_auto] gap-2">
                    <input
                      className="rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none"
                      value={phase.name}
                      onChange={(event) =>
                        setPhases((value) =>
                          value.map((entry, entryIndex) =>
                            entryIndex === index ? { ...entry, name: event.target.value } : entry,
                          ),
                        )
                      }
                    />
                    <input
                      className="rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none"
                      min={1}
                      type="number"
                      value={phase.seconds}
                      onChange={(event) =>
                        setPhases((value) =>
                          value.map((entry, entryIndex) =>
                            entryIndex === index ? { ...entry, seconds: Number(event.target.value) } : entry,
                          ),
                        )
                      }
                    />
                    <select
                      className="rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none"
                      value={phase.kind}
                      onChange={(event) =>
                        setPhases((value) =>
                          value.map((entry, entryIndex) =>
                            entryIndex === index
                              ? { ...entry, kind: event.target.value as BreathingPhase['kind'] }
                              : entry,
                          ),
                        )
                      }
                    >
                      <option value="inhale">Inhale</option>
                      <option value="hold">Hold</option>
                      <option value="exhale">Exhale</option>
                      <option value="hold2">Hold 2</option>
                    </select>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setPhases((value) => value.filter((_, entryIndex) => entryIndex !== index))}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    setPhases((value) => [...value, { name: 'Phase', seconds: 4, kind: 'hold' }])
                  }
                >
                  Add phase
                </Button>
              </div>
            ) : null}
            <Button
              fullWidth
              disabled={!canStart}
              onClick={() => {
                setAnimationPhase('hold-empty');
                setPhaseIndex(0);
                setCycleIndex(0);
                setStatus('running');
              }}
            >
              Start session
            </Button>
            {!canStart ? (
              <p className="text-sm text-rose-300">
                {validationError ?? 'Increase the total duration so at least one full cycle fits.'}
              </p>
            ) : (
              <p className="text-sm text-slate-500">
                {totalCycles} full cycle{totalCycles === 1 ? '' : 's'} fit in this session.
              </p>
            )}
          </div>
        )}
      </Card>

      <Card className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Preview</h3>
        <p className="text-sm text-slate-400">
          {formatClock(cycleSeconds)} per cycle · {totalCycles} full cycles fit into {formatClock(totalDurationSeconds)}.
        </p>
        <div className="space-y-2">
          {phases.map((phase) => (
            <div key={`${phase.name}-${phase.kind}`} className="flex items-center justify-between rounded-3xl bg-slate-950/45 px-4 py-3 text-sm text-slate-300">
              <span>{phase.name}</span>
              <span>{phase.seconds}s</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
