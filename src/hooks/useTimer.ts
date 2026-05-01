import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseTimerOptions {
  direction?: 'up' | 'down';
  initialMs?: number;
  autoStart?: boolean;
  onComplete?: () => void;
}

export function useTimer({
  direction = 'up',
  initialMs = 0,
  autoStart = false,
  onComplete,
}: UseTimerOptions = {}) {
  const [elapsedMs, setElapsedMs] = useState(direction === 'down' ? initialMs : 0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const accumulatedRef = useRef(0);
  const durationRef = useRef(initialMs);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const tick = (timestamp: number) => {
      if (startRef.current === null) {
        startRef.current = timestamp;
      }

      const runElapsed = timestamp - startRef.current;
      const totalElapsed = accumulatedRef.current + runElapsed;
      const nextValue =
        direction === 'down' ? Math.max(0, durationRef.current - totalElapsed) : totalElapsed;
      setElapsedMs(nextValue);

      if (direction === 'down' && nextValue <= 0) {
        setIsRunning(false);
        accumulatedRef.current = 0;
        startRef.current = null;
        onCompleteRef.current?.();
        return;
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [direction, isRunning]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    accumulatedRef.current =
      direction === 'down' ? durationRef.current - elapsedMs : elapsedMs;
    startRef.current = null;
  }, [direction, elapsedMs]);

  const reset = useCallback((nextMs = initialMs) => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }
    durationRef.current = nextMs;
    accumulatedRef.current = 0;
    startRef.current = null;
    setElapsedMs(direction === 'down' ? nextMs : 0);
    setIsRunning(false);
  }, [direction, initialMs]);

  return useMemo(
    () => ({
      elapsedMs,
      seconds: elapsedMs / 1000,
      isRunning,
      start,
      pause,
      reset,
      setIsRunning,
    }),
    [elapsedMs, isRunning, pause, reset, start],
  );
}
