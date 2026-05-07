import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBreathingSessions, fetchCustomPatterns, getSession, saveBreathingSession, saveCustomPattern } from '../../lib/repository';
import type { BreathingSession, CustomPattern } from '../../types/domain';

export function useBreathingSessionsQuery() {
  return useQuery({
    queryKey: ['breathing-sessions'],
    queryFn: async () => fetchBreathingSessions(await getSession()),
  });
}

export function useCustomPatternsQuery() {
  return useQuery({
    queryKey: ['custom-patterns'],
    queryFn: async () => fetchCustomPatterns(await getSession()),
  });
}

export function useSaveBreathingSessionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      payload: Pick<BreathingSession, 'pattern_name' | 'phases' | 'total_duration_seconds' | 'cycles_completed' | 'avg_heart_rate'>,
    ) => saveBreathingSession(await getSession(), payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['breathing-sessions'] });
    },
  });
}

export function useSaveCustomPatternMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Pick<CustomPattern, 'name' | 'phases'>) => saveCustomPattern(await getSession(), payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['custom-patterns'] });
    },
  });
}
