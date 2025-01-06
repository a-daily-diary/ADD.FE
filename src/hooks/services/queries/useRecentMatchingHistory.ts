import { useQuery } from '@tanstack/react-query';
import * as api from 'api';

import { queryKeys } from 'constants/services';

export const useRecentMatchingHistory = () => {
  const response = useQuery(
    [queryKeys.recentMatchingHistory],
    async () => await api.getRecentMatchingHistory(),
  );

  return response;
};
