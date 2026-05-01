import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { SessionPhase, TrainingType } from '../types/domain';

interface SessionState {
  type: TrainingType | null;
  phase: SessionPhase;
  round: number;
  elapsed: number;
  isRunning: boolean;
  startSession: (type: TrainingType, phase?: SessionPhase) => void;
  updateSession: (patch: Partial<Pick<SessionState, 'phase' | 'round' | 'elapsed' | 'isRunning'>>) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  devtools(
    immer((set) => ({
      type: null,
      phase: 'idle',
      round: 0,
      elapsed: 0,
      isRunning: false,
      startSession: (type, phase = 'idle') =>
        set((state) => {
          state.type = type;
          state.phase = phase;
          state.round = 0;
          state.elapsed = 0;
          state.isRunning = true;
        }),
      updateSession: (patch) =>
        set((state) => {
          Object.assign(state, patch);
        }),
      clearSession: () =>
        set((state) => {
          state.type = null;
          state.phase = 'idle';
          state.round = 0;
          state.elapsed = 0;
          state.isRunning = false;
        }),
    })),
    { name: 'session-store' },
  ),
);
