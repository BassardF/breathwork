import { memo } from 'react';

interface CircleAnimationProps {
  phase:
    | 'rest'
    | 'hold'
    | 'inhale'
    | 'exhale'
    | 'hold-full'
    | 'hold-empty'
    | 'idle';
  intensity?: number;
  durationMs?: number;
}

function CircleAnimationInner({
  phase,
  intensity = 1,
  durationMs = 700,
}: CircleAnimationProps) {
  const emptyScale = 0.8;
  const fullScale = 1.04 + intensity * 0.025;
  const isEmpty = phase === 'rest' || phase === 'exhale' || phase === 'hold-empty';
  const isFull = phase === 'hold' || phase === 'hold-full' || phase === 'inhale';
  const isTransitioning = phase === 'inhale' || phase === 'exhale';

  const scale = isEmpty ? emptyScale : isFull ? fullScale : 1;

  const ringOpacity =
    phase === 'idle' ? 0.28 : isFull ? 0.44 : 0.3;

  const animationStyle = {
    transform: `scale(${scale})`,
    transitionDuration: `${durationMs}ms`,
    transitionTimingFunction: isTransitioning ? 'linear' : 'ease-out',
  };

  return (
    <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
      <div
        aria-hidden="true"
        className="absolute h-56 w-56 rounded-full border border-sky-200/10 transition-opacity duration-500 ease-out"
        style={{ opacity: ringOpacity }}
      />
      <div
        aria-hidden="true"
        className="absolute h-44 w-44 rounded-full border border-sky-100/12 bg-slate-950/35 transition-transform duration-700 ease-out will-change-transform"
        style={animationStyle}
      />
      <div
        className="h-32 w-32 rounded-full border border-sky-100/10 bg-slate-900/90 transition-transform duration-700 ease-out will-change-transform"
        style={animationStyle}
      />
    </div>
  );
}

export const CircleAnimation = memo(CircleAnimationInner);
