import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCo2Sessions, getSession, saveCo2Session } from '../../lib/repository';
import type { Co2Session } from '../../types/domain';

export function useCo2SessionsQuery() {
  return useQuery({
    queryKey: ['co2-sessions'],
    queryFn: async () => fetchCo2Sessions(await getSession()),
  });
}

export function useSaveCo2SessionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      payload: Pick<Co2Session, 'pb_used_seconds' | 'hold_pct' | 'completed_rounds'>,
    ) => saveCo2Session(await getSession(), payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['co2-sessions'] });
    },
  });
}
