import { useQuery } from '@tanstack/react-query';
import {
  fetchBreathHolds,
  fetchBreathingSessions,
  fetchCo2Sessions,
  fetchO2Sessions,
  getSession,
} from '../../lib/repository';

export function useStatisticsQuery() {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const session = await getSession();
      const [breathHolds, co2Sessions, o2Sessions, breathingSessions] = await Promise.all([
        fetchBreathHolds(session),
        fetchCo2Sessions(session),
        fetchO2Sessions(session),
        fetchBreathingSessions(session),
      ]);
      return { breathHolds, co2Sessions, o2Sessions, breathingSessions };
    },
  });
}
