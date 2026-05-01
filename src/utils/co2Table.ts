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
  const boundedHoldPct = Math.min(0.65, Math.max(0.4, holdPct));
  const holdSeconds = Math.max(15, Math.round(pbSeconds * boundedHoldPct));

  return Array.from({ length: 8 }, (_, index) => ({
    holdSeconds,
    restSeconds: Math.max(30, Math.round(startRestSeconds - index * restDecrementSeconds)),
  }));
}
