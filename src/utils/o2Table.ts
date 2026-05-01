import type { O2Round } from '../types/domain';

interface O2TableOptions {
  pbSeconds: number;
  restSeconds?: number;
  startHoldPct?: number;
  maxHoldPct?: number;
}

export function buildO2Table({
  pbSeconds,
  restSeconds = 120,
  startHoldPct = 0.3,
  maxHoldPct = 0.8,
}: O2TableOptions): O2Round[] {
  const safeRest = Math.min(300, Math.max(30, restSeconds));
  const boundedStart = Math.min(0.7, Math.max(0.1, startHoldPct));
  const boundedMax = Math.min(1.0, Math.max(0.5, maxHoldPct));
  const step = (boundedMax - boundedStart) / 7;

  return Array.from({ length: 8 }, (_, index) => ({
    holdSeconds: Math.max(15, Math.round(pbSeconds * (boundedStart + step * index))),
    restSeconds: safeRest,
  }));
}
