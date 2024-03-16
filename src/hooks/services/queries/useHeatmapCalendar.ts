import { useQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useHeatmapCalendar = (username: string) => {
  const { data: heatmapCalendarData, isLoading } = useQuery(
    [queryKeys.heatmap, username],
    async () => await api.getHeatmapByUsername({ username }),
  );
  return { heatmapCalendarData, isLoading };
};
