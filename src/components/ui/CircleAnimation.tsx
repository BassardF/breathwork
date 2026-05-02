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
  breathingProgress?: number;
}

function CircleAnimationInner({
  phase,
  intensity = 1,
  durationMs = 700,
  breathingProgress,
}: CircleAnimationProps) {
  const emptyScale = 0.65;
  const fullScale = 1.1 + intensity * 0.05;
  const isEmpty = phase === 'rest' || phase === 'exhale' || phase === 'hold-empty';
  const isFull = phase === 'hold' || phase === 'hold-full' || phase === 'inhale';
  const isTransitioning = phase === 'inhale' || phase === 'exhale';

  const scale =
    breathingProgress !== undefined
      ? emptyScale + (fullScale - emptyScale) * breathingProgress
      : isEmpty
        ? emptyScale
        : isFull
          ? fullScale
          : 1;

  const ringOpacity =
    breathingProgress !== undefined
      ? 0.5 + (0.75 - 0.5) * breathingProgress
      : phase === 'idle'
        ? 0.4
        : isFull
          ? 0.75
          : 0.5;

  const animationStyle = {
    transform: `scale(${scale})`,
    transitionDuration:
      breathingProgress !== undefined ? '0ms' : `${durationMs}ms`,
    transitionTimingFunction: isTransitioning ? 'linear' : 'ease-out',
  };

  return (
    <div className="relative mx-auto flex h-80 w-80 items-center justify-center">
      <div
        aria-hidden="true"
        className="absolute h-72 w-72 rounded-full border-2 border-sky-300/20 transition-opacity duration-500 ease-out"
        style={{ opacity: ringOpacity }}
      />
      <div
        aria-hidden="true"
        className="absolute h-56 w-56 rounded-full border-2 border-sky-200/15 bg-sky-950/40 transition-transform duration-500 ease-out will-change-transform"
        style={animationStyle}
      />
      <div
        className="h-40 w-40 rounded-full border-2 border-sky-200/20 bg-sky-900/80 shadow-lg shadow-sky-900/30 transition-transform duration-500 ease-out will-change-transform"
        style={animationStyle}
      />
    </div>
  );
}

export const CircleAnimation = memo(CircleAnimationInner);
