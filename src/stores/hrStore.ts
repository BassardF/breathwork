import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface HRState {
  bpm: number | null;
  isConnected: boolean;
  deviceName: string | null;
  setBpm: (bpm: number) => void;
  setConnected: (deviceName: string) => void;
  setDisconnected: () => void;
}

export const useHRStore = create<HRState>()(
  devtools(
    (set) => ({
      bpm: null,
      isConnected: false,
      deviceName: null,
      setBpm: (bpm) => set({ bpm }),
      setConnected: (deviceName) => set({ isConnected: true, deviceName }),
      setDisconnected: () => set({ isConnected: false, deviceName: null, bpm: null }),
    }),
    { name: 'hr-store' },
  ),
);
