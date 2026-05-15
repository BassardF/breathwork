import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const HOLD_PREP_ENABLED_KEY = 'apnea-hold-prep-enabled';
const HOLD_PREP_SECONDS_KEY = 'apnea-hold-prep-seconds';
const DEFAULT_PREP_SECONDS = 10;

interface SettingsState {
  holdPrepTimeEnabled: boolean;
  holdPrepTimeSeconds: number;
  setHoldPrepTimeEnabled: (value: boolean) => void;
  setHoldPrepTimeSeconds: (value: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  devtools(
    immer((set) => ({
      holdPrepTimeEnabled:
        typeof window !== 'undefined'
          ? window.localStorage.getItem(HOLD_PREP_ENABLED_KEY) !== 'false'
          : true,
      holdPrepTimeSeconds:
        typeof window !== 'undefined'
          ? Number(
              window.localStorage.getItem(HOLD_PREP_SECONDS_KEY) ??
                DEFAULT_PREP_SECONDS,
            )
          : DEFAULT_PREP_SECONDS,
      setHoldPrepTimeEnabled: (value) =>
        set((state) => {
          state.holdPrepTimeEnabled = value;
          window.localStorage.setItem(
            HOLD_PREP_ENABLED_KEY,
            value ? 'true' : 'false',
          );
        }),
      setHoldPrepTimeSeconds: (value) =>
        set((state) => {
          state.holdPrepTimeSeconds = value;
          window.localStorage.setItem(HOLD_PREP_SECONDS_KEY, String(value));
        }),
    })),
    { name: 'settings-store' },
  ),
);
