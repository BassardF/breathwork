import { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { useHRStore } from '../../stores/hrStore';

export function BpmIndicator() {
  const bpm = useHRStore((s) => s.bpm);
  const isConnected = useHRStore((s) => s.isConnected);

  if (!isConnected || bpm === null) {
    return null;
  }

  return <BpmDisplay bpm={bpm} />;
}

function BpmDisplay({ bpm }: { bpm: number }) {
  const prevRef = useRef(bpm);
  const beatRef = useRef(false);

  useEffect(() => {
    if (prevRef.current !== bpm) {
      beatRef.current = true;
      prevRef.current = bpm;
      const timer = setTimeout(() => { beatRef.current = false; }, 300);
      return () => clearTimeout(timer);
    }
  }, [bpm]);

  return (
    <div className="flex items-center gap-1.5">
      <Heart
        className={`h-3.5 w-3.5 transition-transform ${beatRef.current ? 'scale-125 text-rose-400' : 'text-rose-400/70'}`}
        fill="currentColor"
      />
      <span className="text-sm font-medium text-white tabular-nums">{bpm}</span>
      <span className="text-[10px] text-slate-500">BPM</span>
    </div>
  );
}
