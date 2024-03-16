import { useQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useHeatmapCalendar = (username: string) => {
  const { data: heatmapCalendarData, isLoading } = useQuery(
    [queryKeys.activities, username],
    async () => await api.getActivitiesByUsername({ username }),
  );
  return { heatmapCalendarData, isLoading };
};
