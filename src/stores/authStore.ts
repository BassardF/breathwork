import type { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const LOCAL_MODE_KEY = 'apnea-local-mode';
const LOCAL_SAFETY_KEY = 'apnea-safety-acknowledged';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  safetyAcknowledged: boolean;
  isLocalMode: boolean;
  localSafetyAcknowledged: boolean;
  setUser: (user: User | null) => void;
  setLoading: (value: boolean) => void;
  setSafetyAcknowledged: (value: boolean) => void;
  setLocalMode: (value: boolean) => void;
  setLocalSafetyAcknowledged: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    immer((set) => ({
      user: null,
      isLoading: true,
      safetyAcknowledged: false,
      isLocalMode:
        typeof window !== 'undefined' &&
        window.localStorage.getItem(LOCAL_MODE_KEY) === 'true',
      localSafetyAcknowledged:
        typeof window !== 'undefined' &&
        window.localStorage.getItem(LOCAL_SAFETY_KEY) === 'true',
      setUser: (user) =>
        set((state) => {
          state.user = user;
          state.safetyAcknowledged = Boolean(
            user?.user_metadata?.safety_acknowledged,
          );
        }),
      setLoading: (value) =>
        set((state) => {
          state.isLoading = value;
        }),
      setSafetyAcknowledged: (value) =>
        set((state) => {
          state.safetyAcknowledged = value;
        }),
      setLocalMode: (value) =>
        set((state) => {
          state.isLocalMode = value;
          window.localStorage.setItem(LOCAL_MODE_KEY, value ? 'true' : 'false');
        }),
      setLocalSafetyAcknowledged: (value) =>
        set((state) => {
          state.localSafetyAcknowledged = value;
          window.localStorage.setItem(
            LOCAL_SAFETY_KEY,
            value ? 'true' : 'false',
          );
        }),
    })),
    { name: 'auth-store' },
  ),
);
