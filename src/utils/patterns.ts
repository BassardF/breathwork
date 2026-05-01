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
    name: 'Physiological Sigh',
    description: 'Double inhale + long exhale. Resets autonomic state instantly.',
    phases: [
      { name: 'Inhale', seconds: 1, kind: 'inhale' },
      { name: 'Top Up', seconds: 1, kind: 'inhale' },
      { name: 'Exhale', seconds: 6, kind: 'exhale' },
    ],
  },
  {
    name: 'Pursed Lip',
    description: 'Short inhale, long exhale through pursed lips. Calming and controlled.',
    phases: [
      { name: 'Inhale', seconds: 2, kind: 'inhale' },
      { name: 'Exhale', seconds: 4, kind: 'exhale' },
    ],
  },
  {
    name: '4-6',
    description: 'Longer exhale activates the parasympathetic nervous system.',
    phases: [
      { name: 'Inhale', seconds: 4, kind: 'inhale' },
      { name: 'Exhale', seconds: 6, kind: 'exhale' },
    ],
  },
  {
    name: '2-1-4',
    description: 'Quick reset — short breath in, pause, long breath out.',
    phases: [
      { name: 'Inhale', seconds: 2, kind: 'inhale' },
      { name: 'Hold', seconds: 1, kind: 'hold' },
      { name: 'Exhale', seconds: 4, kind: 'exhale' },
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
