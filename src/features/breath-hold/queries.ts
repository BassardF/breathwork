import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBreathHolds, getSession, saveBreathHold } from '../../lib/repository';

export function useBreathHoldsQuery() {
  return useQuery({
    queryKey: ['breath-holds'],
    queryFn: async () => fetchBreathHolds(await getSession()),
  });
}

export function useSaveBreathHoldMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (durationSeconds: number) => saveBreathHold(await getSession(), durationSeconds),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['breath-holds'] });
    },
  });
}
