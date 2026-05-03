import type { GoalEntry } from '../types';

export const GOALS: GoalEntry[] = [
  {
    goalId: 'hold-longer',
    label: 'Hold my breath longer',
    description:
      'Increase your static apnea personal best over time through structured CO\u2082 and O\u2082 table training combined with consistent max hold testing.',
    recommendedSections: ['breath-hold', 'co2', 'o2'],
    recommendedConcepts: ['co2-tolerance', 'hypoxic-response', 'dive-reflex', 'spleen-response'],
  },
  {
    goalId: 'reduce-anxiety',
    label: 'Reduce anxiety and panic',
    description:
      'Use extended exhale breathing patterns (4-7-8, cardiac coherence) to activate the parasympathetic nervous system and train CO\u2082 tolerance to reduce respiratory sensitivity.',
    recommendedSections: ['pattern', 'co2'],
    recommendedConcepts: ['vagal-tone', 'co2-tolerance', 'nervous-system'],
  },
  {
    goalId: 'improve-focus',
    label: 'Improve focus and concentration',
    description:
      'Box breathing and other rhythm-based patterns train attentional control and provide an anchor for the mind during high-pressure situations.',
    recommendedSections: ['pattern'],
    recommendedConcepts: ['hrv', 'nervous-system'],
  },
  {
    goalId: 'better-sleep',
    label: 'Sleep better and fall asleep faster',
    description:
      'The 4-7-8 pattern and diaphragmatic breathing before bed reduce sympathetic activation and prepare the nervous system for rest.',
    recommendedSections: ['pattern'],
    recommendedConcepts: ['vagal-tone', 'diaphragmatic-breathing', 'nervous-system'],
  },
  {
    goalId: 'stress-management',
    label: 'Manage daily stress',
    description:
      'Cardiac coherence breathing (5-5 at 6 breaths/min) resets autonomic balance and improves HRV, building resilience to daily stressors.',
    recommendedSections: ['pattern'],
    recommendedConcepts: ['hrv', 'vagal-tone', 'nervous-system'],
  },
  {
    goalId: 'track-progress',
    label: 'Track and measure progress',
    description:
      'Use structured sessions (CO\u2082 tables, O\u2082 tables, max holds) with logged results to see objective improvements in breath-hold time and tolerance.',
    recommendedSections: ['breath-hold', 'co2', 'o2'],
    recommendedConcepts: ['co2-tolerance', 'hypoxic-response'],
  },
  {
    goalId: 'mental-resilience',
    label: 'Build mental resilience',
    description:
      'Breath-hold training teaches you to stay calm under physiological stress. CO\u2082 and O\u2082 tables build tolerance to discomfort and train interoceptive awareness.',
    recommendedSections: ['breath-hold', 'co2', 'o2'],
    recommendedConcepts: ['co2-tolerance', 'hypoxic-response', 'dive-reflex'],
  },
  {
    goalId: 'reduce-panic',
    label: 'Reduce panic during breath holds',
    description:
      'CO\u2082 table training directly addresses the sensation of air hunger. By practicing under controlled conditions, you desensitize the panic response to breathlessness.',
    recommendedSections: ['co2', 'pattern'],
    recommendedConcepts: ['co2-tolerance', 'hypercapnia-drive', 'vagal-tone'],
  },
  {
    goalId: 'better-recovery',
    label: 'Improve recovery between efforts',
    description:
      'Learn diaphragmatic breathing and CO\u2082 tolerance techniques to normalize breathing more quickly after exertion, reducing rest time between rounds or sets.',
    recommendedSections: ['co2', 'pattern'],
    recommendedConcepts: ['diaphragmatic-breathing', 'vagal-tone', 'nervous-system'],
  },
];

export function getGoal(goalId: string): GoalEntry | undefined {
  return GOALS.find((g) => g.goalId === goalId);
}
