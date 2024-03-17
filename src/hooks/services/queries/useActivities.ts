import { useQuery } from '@tanstack/react-query';
import type { GetActivitiesByUsernameRequest } from 'types/activity';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useActivities = ({
  username,
  year,
}: GetActivitiesByUsernameRequest) => {
  const { data: activitiesData, isLoading } = useQuery(
    [queryKeys.activities, username],
    async () => await api.getActivitiesByUsername({ username, year }),
  );
  return { activitiesData, isLoading };
};
