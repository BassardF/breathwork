import { formatClock, formatDurationPrecise } from './formatTime';

describe('formatTime', () => {
  it('formats whole seconds as a clock', () => {
    expect(formatClock(185)).toBe('03:05');
  });

  it('formats milliseconds as mm:ss.cc', () => {
    expect(formatDurationPrecise(123456)).toBe('02:03.45');
  });
});
