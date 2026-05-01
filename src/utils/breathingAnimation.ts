const INHALE_MS = 4000;
const EXHALE_MS = 6000;
const CYCLE_MS = INHALE_MS + EXHALE_MS;

export function getBreathingProgress(
  elapsedMs: number,
  phaseDurationMs: number,
): number {
  const timeUntilEnd = phaseDurationMs - elapsedMs;
  const cyclePos = ((INHALE_MS - timeUntilEnd) % CYCLE_MS + CYCLE_MS) % CYCLE_MS;

  if (cyclePos <= INHALE_MS) {
    return cyclePos / INHALE_MS;
  }

  return 1 - (cyclePos - INHALE_MS) / EXHALE_MS;
}
