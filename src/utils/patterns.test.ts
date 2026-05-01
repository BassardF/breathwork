import { getBreathsPerMinute, getCycleSeconds, getPatternSummary, validatePattern } from './patterns';

describe('patterns', () => {
  it('computes a cycle duration', () => {
    expect(
      getCycleSeconds([
        { name: 'Inhale', seconds: 4, kind: 'inhale' },
        { name: 'Exhale', seconds: 6, kind: 'exhale' },
      ]),
    ).toBe(10);
  });

  it('summarises phases as dash-joined seconds', () => {
    expect(
      getPatternSummary([
        { name: 'Inhale', seconds: 4, kind: 'inhale' },
        { name: 'Hold', seconds: 4, kind: 'hold' },
        { name: 'Exhale', seconds: 4, kind: 'exhale' },
        { name: 'Hold', seconds: 4, kind: 'hold2' },
      ]),
    ).toBe('4-4-4-4');
  });

  it('computes breaths per minute', () => {
    expect(
      getBreathsPerMinute([
        { name: 'Inhale', seconds: 5, kind: 'inhale' },
        { name: 'Exhale', seconds: 5, kind: 'exhale' },
      ]),
    ).toBe(6);
  });

  it('validates minimum duration', () => {
    expect(validatePattern([{ name: 'Hold', seconds: 0, kind: 'hold' }])).toBe(
      'Each phase must be at least one second.',
    );
  });
});
