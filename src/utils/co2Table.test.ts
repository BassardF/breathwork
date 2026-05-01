import { buildCo2Table } from './co2Table';

describe('buildCo2Table', () => {
  it('builds 8 rounds with a fixed hold', () => {
    const rounds = buildCo2Table({ pbSeconds: 180 });
    expect(rounds).toHaveLength(8);
    expect(rounds[0]).toEqual({ holdSeconds: 90, restSeconds: 360 });
    expect(rounds[7]).toEqual({ holdSeconds: 90, restSeconds: 255 });
  });

  it('enforces bounds for percentage and minimum rest', () => {
    const rounds = buildCo2Table({
      pbSeconds: 40,
      holdPct: 0.9,
      startRestSeconds: 50,
      restDecrementSeconds: 10,
    });
    expect(rounds[0].holdSeconds).toBe(36);
    expect(rounds[7].restSeconds).toBe(3);
  });
});
