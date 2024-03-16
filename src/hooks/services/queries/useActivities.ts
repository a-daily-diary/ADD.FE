import { useQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useActivities = (username: string) => {
  const { data: activitiesData, isLoading } = useQuery(
    [queryKeys.activities, username],
    async () => await api.getActivitiesByUsername({ username }),
  );
  return { activitiesData, isLoading };
};
