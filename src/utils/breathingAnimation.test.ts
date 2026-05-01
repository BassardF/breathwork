import { describe, expect, it } from 'vitest';
import { getBreathingProgress } from './breathingAnimation';

describe('getBreathingProgress', () => {
  it('returns 1 at the end of the phase (inhale complete)', () => {
    expect(getBreathingProgress(120_000, 120_000)).toBe(1);
  });

  it('returns 0 at inhale start (4s before end)', () => {
    expect(getBreathingProgress(116_000, 120_000)).toBe(0);
  });

  it('returns 0.5 mid-inhale (2s before end)', () => {
    expect(getBreathingProgress(118_000, 120_000)).toBeCloseTo(0.5);
  });

  it('returns 0.5 mid-exhale (7s before end)', () => {
    expect(getBreathingProgress(113_000, 120_000)).toBeCloseTo(0.5);
  });

  it('is always between 0 and 1 for any elapsed time', () => {
    for (let i = 0; i <= 120_000; i += 100) {
      const p = getBreathingProgress(i, 120_000);
      expect(p).toBeGreaterThanOrEqual(0);
      expect(p).toBeLessThanOrEqual(1);
    }
  });

  it('reaches 1 at each cycle boundary (timeUntilEnd = n * CYCLE_MS)', () => {
    expect(getBreathingProgress(120_000, 120_000)).toBe(1);
    expect(getBreathingProgress(110_000, 120_000)).toBe(1);
    expect(getBreathingProgress(100_000, 120_000)).toBe(1);
  });
});
