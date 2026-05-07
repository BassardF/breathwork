export type TrainingType = 'breath-hold' | 'co2' | 'o2' | 'pattern';

export type SessionPhase = 'idle' | 'countdown' | 'rest' | 'hold' | 'inhale' | 'exhale' | 'pause' | 'complete';

export interface BreathHoldEntry {
  id: string;
  user_id: string;
  duration_seconds: number;
  recorded_at: string;
  avg_heart_rate?: number;
}

export interface Co2Session {
  id: string;
  user_id: string;
  pb_used_seconds: number;
  hold_pct: number;
  completed_rounds: number;
  completed_at: string;
  avg_heart_rate?: number;
}

export interface O2Session {
  id: string;
  user_id: string;
  pb_used_seconds: number;
  rest_duration_seconds: number;
  max_hold_pct: number;
  completed_rounds: number;
  completed_at: string;
  avg_heart_rate?: number;
}

export interface BreathingPhase {
  name: string;
  seconds: number;
  kind: 'inhale' | 'hold' | 'exhale' | 'hold2';
}

export interface BreathingSession {
  id: string;
  user_id: string;
  pattern_name: string;
  phases: BreathingPhase[];
  total_duration_seconds: number;
  cycles_completed: number;
  completed_at: string;
  avg_heart_rate?: number;
}

export interface CustomPattern {
  id: string;
  user_id: string;
  name: string;
  phases: BreathingPhase[];
  created_at: string;
}

export interface CombinedHistoryItem {
  id: string;
  type: TrainingType;
  timestamp: string;
  label: string;
  detail: string;
}

export interface Co2Round {
  holdSeconds: number;
  restSeconds: number;
}

export interface O2Round {
  holdSeconds: number;
  restSeconds: number;
}

export interface PatternPreset {
  name: string;
  phases: BreathingPhase[];
  description: string;
}
