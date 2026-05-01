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
  const safeRest = Math.min(180, Math.max(60, restSeconds));
  const boundedStart = Math.min(0.5, Math.max(0.2, startHoldPct));
  const boundedMax = Math.min(0.9, Math.max(0.7, maxHoldPct));
  const step = (boundedMax - boundedStart) / 7;

  return Array.from({ length: 8 }, (_, index) => ({
    holdSeconds: Math.max(15, Math.round(pbSeconds * (boundedStart + step * index))),
    restSeconds: safeRest,
  }));
}
