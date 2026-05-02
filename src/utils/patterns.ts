import type { BreathingPhase, PatternPreset } from '../types/domain';

export const PRESET_PATTERNS: PatternPreset[] = [
  {
    name: 'Box Breathing',
    description: 'Equal in-hold-out-hold. Used by Navy SEALs for focus and calm.',
    phases: [
      { name: 'Inhale', seconds: 4, kind: 'inhale' },
      { name: 'Hold', seconds: 4, kind: 'hold' },
      { name: 'Exhale', seconds: 4, kind: 'exhale' },
      { name: 'Hold', seconds: 4, kind: 'hold2' },
    ],
  },
  {
    name: '4-7-8',
    description: 'Dr. Weil\'s "Relaxing Breath". Long hold and exhale for deep calm.',
    phases: [
      { name: 'Inhale', seconds: 4, kind: 'inhale' },
      { name: 'Hold', seconds: 7, kind: 'hold' },
      { name: 'Exhale', seconds: 8, kind: 'exhale' },
    ],
  },
  {
    name: 'Cardiac Coherence',
    description: '5-5 resonant breathing at 0.1 Hz for heart rate variability optimization.',
    phases: [
      { name: 'Inhale', seconds: 5, kind: 'inhale' },
      { name: 'Exhale', seconds: 5, kind: 'exhale' },
    ],
  },
];

export function getCycleSeconds(phases: BreathingPhase[]): number {
  return phases.reduce((total, phase) => total + phase.seconds, 0);
}

export function getPatternSummary(phases: BreathingPhase[]): string {
  return phases.map((p) => String(p.seconds)).join('-');
}

export function getBreathsPerMinute(phases: BreathingPhase[]): number {
  const cycleSeconds = getCycleSeconds(phases);
  return Math.round((60 / cycleSeconds) * 10) / 10;
}

export function validatePattern(phases: BreathingPhase[]): string | null {
  if (phases.length === 0) {
    return 'Add at least one phase.';
  }

  if (phases.some((phase) => phase.seconds < 1)) {
    return 'Each phase must be at least one second.';
  }

  return null;
}
