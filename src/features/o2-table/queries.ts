import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchO2Sessions, getSession, saveO2Session } from '../../lib/repository';
import type { O2Session } from '../../types/domain';

export function useO2SessionsQuery() {
  return useQuery({
    queryKey: ['o2-sessions'],
    queryFn: async () => fetchO2Sessions(await getSession()),
  });
}

export function useSaveO2SessionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      payload: Pick<O2Session, 'pb_used_seconds' | 'rest_duration_seconds' | 'max_hold_pct' | 'completed_rounds'>,
    ) => saveO2Session(await getSession(), payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['o2-sessions'] });
    },
  });
}
