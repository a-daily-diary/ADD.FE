import { useQuery } from '@tanstack/react-query';
import type { GetActivityDetailRequest } from 'types/activity';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useActivityDetail = ({
  username,
  dateString,
}: GetActivityDetailRequest) => {
  const { data: activityDetailData, isLoading } = useQuery(
    [queryKeys.activities, username, dateString],
    async () => await api.getActivityDetail({ username, dateString }),
  );

  return { activityDetailData, isLoading };
};
