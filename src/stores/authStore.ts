import type { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  safetyAcknowledged: boolean;
  setUser: (user: User | null) => void;
  setLoading: (value: boolean) => void;
  setSafetyAcknowledged: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    immer((set) => ({
      user: null,
      isLoading: true,
      safetyAcknowledged: false,
      setUser: (user) =>
        set((state) => {
          state.user = user;
          state.safetyAcknowledged = Boolean(user?.user_metadata?.safety_acknowledged);
        }),
      setLoading: (value) =>
        set((state) => {
          state.isLoading = value;
        }),
      setSafetyAcknowledged: (value) =>
        set((state) => {
          state.safetyAcknowledged = value;
        }),
    })),
    { name: 'auth-store' },
  ),
);
