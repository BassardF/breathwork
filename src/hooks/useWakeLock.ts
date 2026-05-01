import { useEffect, useRef } from 'react';

interface WakeLockSentinelLike {
  release: () => Promise<void>;
}

interface WakeLockNavigatorLike {
  wakeLock?: {
    request: (type: 'screen') => Promise<WakeLockSentinelLike>;
  };
}

export function useWakeLock(enabled: boolean) {
  const sentinelRef = useRef<WakeLockSentinelLike | null>(null);

  useEffect(() => {
    async function requestLock() {
      const nav = navigator as Navigator & WakeLockNavigatorLike;

      if (!enabled || !nav.wakeLock) {
        return;
      }

      try {
        sentinelRef.current = await nav.wakeLock.request('screen');
      } catch {
        sentinelRef.current = null;
      }
    }

    void requestLock();

    return () => {
      if (sentinelRef.current) {
        void sentinelRef.current.release();
      }
    };
  }, [enabled]);
}
