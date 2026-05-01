import { getCycleSeconds, validatePattern } from './patterns';

describe('patterns', () => {
  it('computes a cycle duration', () => {
    expect(
      getCycleSeconds([
        { name: 'Inhale', seconds: 4, kind: 'inhale' },
        { name: 'Exhale', seconds: 6, kind: 'exhale' },
      ]),
    ).toBe(10);
  });

  it('validates minimum duration', () => {
    expect(validatePattern([{ name: 'Hold', seconds: 0, kind: 'hold' }])).toBe(
      'Each phase must be at least one second.',
    );
  });
});
