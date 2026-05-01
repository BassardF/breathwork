import type { Co2Round } from '../types/domain';

interface Co2TableOptions {
  pbSeconds: number;
  holdPct?: number;
  startRestSeconds?: number;
  restDecrementSeconds?: number;
}

export function buildCo2Table({
  pbSeconds,
  holdPct = 0.5,
  startRestSeconds = pbSeconds * 2,
  restDecrementSeconds = 15,
}: Co2TableOptions): Co2Round[] {
  const boundedHoldPct = Math.min(1.2, Math.max(0.2, holdPct));
  const holdSeconds = Math.max(15, Math.round(pbSeconds * boundedHoldPct));

  return Array.from({ length: 8 }, (_, index) => ({
    holdSeconds,
    restSeconds: Math.max(3, Math.round(startRestSeconds - index * restDecrementSeconds)),
  }));
}
