import { useCallback, useEffect, useRef } from 'react';
import { useHRStore } from '../stores/hrStore';

export function useHeartRateRecorder(isRunning: boolean) {
  const bpm = useHRStore((s) => s.bpm);
  const isConnected = useHRStore((s) => s.isConnected);
  const samplesRef = useRef<number[]>([]);

  useEffect(() => {
    if (!isRunning || !isConnected || bpm === null) {
      return;
    }

    samplesRef.current.push(bpm);
  }, [bpm, isRunning, isConnected]);

  const getAverage = useCallback((): number | null => {
    const samples = samplesRef.current;
    if (samples.length === 0) {
      return null;
    }

    const sum = samples.reduce((a, b) => a + b, 0);
    return Math.round(sum / samples.length);
  }, []);

  const reset = useCallback(() => {
    samplesRef.current = [];
  }, []);

  return { getAverage, reset };
}
