import { buildO2Table } from './o2Table';

describe('buildO2Table', () => {
  it('builds an increasing hold ladder', () => {
    const rounds = buildO2Table({ pbSeconds: 180 });
    expect(rounds[0]).toEqual({ holdSeconds: 54, restSeconds: 120 });
    expect(rounds[7]).toEqual({ holdSeconds: 144, restSeconds: 120 });
  });

  it('enforces rest and max percentage boundaries', () => {
    const rounds = buildO2Table({ pbSeconds: 100, restSeconds: 999, maxHoldPct: 2 });
    expect(rounds[0].restSeconds).toBe(300);
    expect(rounds[7].holdSeconds).toBe(100);
  });
});
