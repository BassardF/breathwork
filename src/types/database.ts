export interface Database {
  public: {
    Tables: {
      breath_holds: {
        Row: {
          id: string;
          user_id: string;
          duration_seconds: number;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          duration_seconds: number;
          recorded_at?: string;
        };
      };
      co2_sessions: {
        Row: {
          id: string;
          user_id: string;
          pb_used_seconds: number;
          hold_pct: number;
          completed_rounds: number;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          pb_used_seconds: number;
          hold_pct: number;
          completed_rounds: number;
          completed_at?: string;
        };
      };
      o2_sessions: {
        Row: {
          id: string;
          user_id: string;
          pb_used_seconds: number;
          rest_duration_seconds: number;
          max_hold_pct: number;
          completed_rounds: number;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          pb_used_seconds: number;
          rest_duration_seconds: number;
          max_hold_pct: number;
          completed_rounds: number;
          completed_at?: string;
        };
      };
      breathing_sessions: {
        Row: {
          id: string;
          user_id: string;
          pattern_name: string;
          phases: unknown;
          total_duration_seconds: number;
          cycles_completed: number;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          pattern_name: string;
          phases: unknown;
          total_duration_seconds: number;
          cycles_completed: number;
          completed_at?: string;
        };
      };
      custom_patterns: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          phases: unknown;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          phases: unknown;
          created_at?: string;
        };
      };
    };
  };
}
