import { useQuery } from '@tanstack/react-query';
import type { GetHeatmapDetailRequest } from 'types/heatmap';
import * as api from 'api';

export const useHeatmapDetail = ({
  username,
  dateString,
}: GetHeatmapDetailRequest) => {
  const { data: heatmapDetailData, isLoading } = useQuery(
    ['heatmap', username, dateString],
    async () => await api.getHeatmapDetail({ username, dateString }),
  );

  return { heatmapDetailData, isLoading };
};
