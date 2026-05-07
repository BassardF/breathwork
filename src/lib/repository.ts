/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Session, User } from '@supabase/supabase-js';
import { queryClient } from './queryClient';
import { supabase } from './supabase';
import { useAuthStore } from '../stores/authStore';
import type {
  BreathHoldEntry,
  BreathingPhase,
  BreathingSession,
  Co2Session,
  CustomPattern,
  O2Session,
} from '../types/domain';

const BREATH_HOLDS_KEY = 'apnea-breath-holds';
const CO2_SESSIONS_KEY = 'apnea-co2-sessions';
const O2_SESSIONS_KEY = 'apnea-o2-sessions';
const BREATHING_SESSIONS_KEY = 'apnea-breathing-sessions';
const CUSTOM_PATTERNS_KEY = 'apnea-custom-patterns';

function readLocal<T>(key: string): T[] {
  if (typeof window === 'undefined') {
    return [];
  }
  const raw = window.localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T[]) : [];
}

function writeLocal<T>(key: string, entries: T[]) {
  window.localStorage.setItem(key, JSON.stringify(entries));
}

function createId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

function requireUser(user: User | null): string {
  return user?.id ?? 'local-user';
}

export async function signInWithMagicLink(email: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin + window.location.pathname,
    },
  });
}

export async function signOut() {
  if (!supabase) {
    return;
  }
  await supabase.auth.signOut();
}

export async function updateSafetyAcknowledgement() {
  if (!supabase) {
    return;
  }
  await supabase.auth.updateUser({
    data: {
      safety_acknowledged: true,
    },
  });
}

export async function getSession() {
  if (useAuthStore.getState().isLocalMode) {
    return null;
  }
  if (!supabase) {
    return null;
  }
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function fetchBreathHolds(
  session: Session | null,
): Promise<BreathHoldEntry[]> {
  if (!supabase || !session) {
    return readLocal<BreathHoldEntry>(BREATH_HOLDS_KEY);
  }

  const client = supabase as any;
  const { data, error } = await client
    .from('breath_holds')
    .select('*')
    .order('duration_seconds', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteBreathHold(
  session: Session | null,
  id: string,
) {
  if (!supabase || !session) {
    const entries = readLocal<BreathHoldEntry>(BREATH_HOLDS_KEY);
    writeLocal(
      BREATH_HOLDS_KEY,
      entries.filter((e) => e.id !== id),
    );
    return;
  }

  const client = supabase as any;
  const { error } = await client.from('breath_holds').delete().eq('id', id);

  if (error) {
    throw error;
  }
}

export async function saveBreathHold(
  session: Session | null,
  durationSeconds: number,
  avg_heart_rate?: number,
) {
  if (!supabase || !session) {
    const nextEntry: BreathHoldEntry = {
      id: createId(),
      user_id: requireUser(session?.user ?? null),
      duration_seconds: durationSeconds,
      recorded_at: new Date().toISOString(),
      ...(avg_heart_rate !== undefined ? { avg_heart_rate } : {}),
    };
    const entries = [
      nextEntry,
      ...readLocal<BreathHoldEntry>(BREATH_HOLDS_KEY),
    ].sort((a, b) => b.duration_seconds - a.duration_seconds);
    writeLocal(BREATH_HOLDS_KEY, entries);
    return nextEntry;
  }

  const client = supabase as any;
  const { data, error } = await client
    .from('breath_holds')
    .insert({
      user_id: session.user.id,
      duration_seconds: durationSeconds,
      ...(avg_heart_rate !== undefined ? { avg_heart_rate } : {}),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  void queryClient.invalidateQueries({ queryKey: ['breath-holds'] });
  return data;
}

export async function fetchCo2Sessions(
  session: Session | null,
): Promise<Co2Session[]> {
  if (!supabase || !session) {
    return readLocal<Co2Session>(CO2_SESSIONS_KEY);
  }
  const client = supabase as any;
  const { data, error } = await client
    .from('co2_sessions')
    .select('*')
    .order('completed_at', { ascending: false });
  if (error) {
    throw error;
  }
  return data;
}

export async function saveCo2Session(
  session: Session | null,
  payload: Pick<
    Co2Session,
    'pb_used_seconds' | 'hold_pct' | 'completed_rounds'
  > & { avg_heart_rate?: number },
) {
  if (!supabase || !session) {
    const nextEntry: Co2Session = {
      id: createId(),
      user_id: requireUser(session?.user ?? null),
      completed_at: new Date().toISOString(),
      ...payload,
    };
    writeLocal(CO2_SESSIONS_KEY, [
      nextEntry,
      ...readLocal<Co2Session>(CO2_SESSIONS_KEY),
    ]);
    return nextEntry;
  }
  const client = supabase as any;
  const { data, error } = await client
    .from('co2_sessions')
    .insert({
      user_id: session.user.id,
      ...payload,
      ...(payload.avg_heart_rate !== undefined ? { avg_heart_rate: payload.avg_heart_rate } : {}),
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  void queryClient.invalidateQueries({ queryKey: ['co2-sessions'] });
  return data;
}

export async function fetchO2Sessions(
  session: Session | null,
): Promise<O2Session[]> {
  if (!supabase || !session) {
    return readLocal<O2Session>(O2_SESSIONS_KEY);
  }
  const client = supabase as any;
  const { data, error } = await client
    .from('o2_sessions')
    .select('*')
    .order('completed_at', { ascending: false });
  if (error) {
    throw error;
  }
  return data;
}

export async function saveO2Session(
  session: Session | null,
  payload: Pick<
    O2Session,
    | 'pb_used_seconds'
    | 'rest_duration_seconds'
    | 'max_hold_pct'
    | 'completed_rounds'
  > & { avg_heart_rate?: number },
) {
  if (!supabase || !session) {
    const nextEntry: O2Session = {
      id: createId(),
      user_id: requireUser(session?.user ?? null),
      completed_at: new Date().toISOString(),
      ...payload,
    };
    writeLocal(O2_SESSIONS_KEY, [
      nextEntry,
      ...readLocal<O2Session>(O2_SESSIONS_KEY),
    ]);
    return nextEntry;
  }
  const client = supabase as any;
  const { data, error } = await client
    .from('o2_sessions')
    .insert({
      user_id: session.user.id,
      ...payload,
      ...(payload.avg_heart_rate !== undefined ? { avg_heart_rate: payload.avg_heart_rate } : {}),
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  void queryClient.invalidateQueries({ queryKey: ['o2-sessions'] });
  return data;
}

export async function fetchBreathingSessions(
  session: Session | null,
): Promise<BreathingSession[]> {
  if (!supabase || !session) {
    return readLocal<BreathingSession>(BREATHING_SESSIONS_KEY);
  }
  const client = supabase as any;
  const { data, error } = await client
    .from('breathing_sessions')
    .select('*')
    .order('completed_at', { ascending: false });
  if (error) {
    throw error;
  }
  return (
    data as Array<
      { phases: BreathingPhase[] } & Omit<BreathingSession, 'phases'>
    >
  ).map((entry) => ({
    ...entry,
    phases: entry.phases,
  }));
}

export async function saveBreathingSession(
  session: Session | null,
  payload: Pick<
    BreathingSession,
    'pattern_name' | 'phases' | 'total_duration_seconds' | 'cycles_completed'
  > & { avg_heart_rate?: number },
) {
  if (!supabase || !session) {
    const nextEntry: BreathingSession = {
      id: createId(),
      user_id: requireUser(session?.user ?? null),
      completed_at: new Date().toISOString(),
      ...payload,
    };
    writeLocal(BREATHING_SESSIONS_KEY, [
      nextEntry,
      ...readLocal<BreathingSession>(BREATHING_SESSIONS_KEY),
    ]);
    return nextEntry;
  }
  const client = supabase as any;
  const { data, error } = await client
    .from('breathing_sessions')
    .insert({
      user_id: session.user.id,
      ...payload,
      ...(payload.avg_heart_rate !== undefined ? { avg_heart_rate: payload.avg_heart_rate } : {}),
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  void queryClient.invalidateQueries({ queryKey: ['breathing-sessions'] });
  return {
    ...data,
    phases: (data as { phases: BreathingPhase[] }).phases,
  } as BreathingSession;
}

export async function fetchCustomPatterns(
  session: Session | null,
): Promise<CustomPattern[]> {
  if (!supabase || !session) {
    return readLocal<CustomPattern>(CUSTOM_PATTERNS_KEY);
  }
  const client = supabase as any;
  const { data, error } = await client
    .from('custom_patterns')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }
  return (
    data as Array<{ phases: BreathingPhase[] } & Omit<CustomPattern, 'phases'>>
  ).map((entry) => ({
    ...entry,
    phases: entry.phases,
  }));
}

export async function saveCustomPattern(
  session: Session | null,
  payload: Pick<CustomPattern, 'name' | 'phases'>,
) {
  if (!supabase || !session) {
    const nextEntry: CustomPattern = {
      id: createId(),
      user_id: requireUser(session?.user ?? null),
      created_at: new Date().toISOString(),
      ...payload,
    };
    writeLocal(CUSTOM_PATTERNS_KEY, [
      nextEntry,
      ...readLocal<CustomPattern>(CUSTOM_PATTERNS_KEY),
    ]);
    return nextEntry;
  }
  const client = supabase as any;
  const { data, error } = await client
    .from('custom_patterns')
    .insert({
      user_id: session.user.id,
      ...payload,
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  void queryClient.invalidateQueries({ queryKey: ['custom-patterns'] });
  return {
    ...data,
    phases: (data as { phases: BreathingPhase[] }).phases,
  } as CustomPattern;
}
