import { useQuery } from '@tanstack/react-query';
import type { GetActivityDetailRequest } from 'types/activity';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useHeatmapDetail = ({
  username,
  dateString,
}: GetActivityDetailRequest) => {
  const { data: heatmapDetailData, isLoading } = useQuery(
    [queryKeys.activities, username, dateString],
    async () => await api.getActivityDetail({ username, dateString }),
  );

  return { heatmapDetailData, isLoading };
};
