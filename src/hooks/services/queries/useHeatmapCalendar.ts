import { useQuery } from '@tanstack/react-query';
import * as api from 'api';

// TODO: #201 merge 후 queryKey 수정
export const useHeatmapCalendar = (username: string) => {
  const { data: heatmapCalendarData, isLoading } = useQuery(
    ['heatmap', username],
    async () => await api.getHeatmapByUsername({ username }),
  );
  return { heatmapCalendarData, isLoading };
};
