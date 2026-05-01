import type { BreathingPhase, PatternPreset } from '../types/domain';

export const PRESET_PATTERNS: PatternPreset[] = [
  {
    name: 'Box Breathing',
    phases: [
      { name: 'Inhale', seconds: 4, kind: 'inhale' },
      { name: 'Hold', seconds: 4, kind: 'hold' },
      { name: 'Exhale', seconds: 4, kind: 'exhale' },
      { name: 'Hold', seconds: 4, kind: 'hold2' },
    ],
  },
  {
    name: '4-7-8',
    phases: [
      { name: 'Inhale', seconds: 4, kind: 'inhale' },
      { name: 'Hold', seconds: 7, kind: 'hold' },
      { name: 'Exhale', seconds: 8, kind: 'exhale' },
    ],
  },
  {
    name: '2-1-4',
    phases: [
      { name: 'Inhale', seconds: 2, kind: 'inhale' },
      { name: 'Hold', seconds: 1, kind: 'hold' },
      { name: 'Exhale', seconds: 4, kind: 'exhale' },
    ],
  },
  {
    name: 'Physiological Sigh',
    phases: [
      { name: 'Inhale', seconds: 1, kind: 'inhale' },
      { name: 'Top Up', seconds: 1, kind: 'inhale' },
      { name: 'Exhale', seconds: 6, kind: 'exhale' },
    ],
  },
];

export function getCycleSeconds(phases: BreathingPhase[]): number {
  return phases.reduce((total, phase) => total + phase.seconds, 0);
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
