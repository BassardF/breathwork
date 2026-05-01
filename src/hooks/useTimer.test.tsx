import { act, renderHook } from '@testing-library/react';
import { useTimer } from './useTimer';

describe('useTimer', () => {
  let currentTime = 0;

  beforeEach(() => {
    currentTime = 0;
    let frameId = 0;
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      frameId += 1;
      setTimeout(() => {
        currentTime += 16;
        cb(currentTime);
      }, 16);
      return frameId;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('starts and increments', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(64);
    });

    expect(result.current.elapsedMs).toBeGreaterThan(0);
  });

  it('resets to the requested value', () => {
    const { result } = renderHook(() => useTimer({ direction: 'down', initialMs: 3000 }));

    act(() => {
      result.current.reset(2000);
    });

    expect(result.current.elapsedMs).toBe(2000);
  });

  it('counts down and completes', () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useTimer({ direction: 'down', initialMs: 100, onComplete }),
    );

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(160);
    });

    expect(result.current.elapsedMs).toBe(0);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
