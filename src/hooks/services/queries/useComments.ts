import { useQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useComments = (diaryId: string) => {
  const { data: commentsData, isLoading } = useQuery(
    [queryKeys.comments, diaryId],
    async () => await api.getComments({ diaryId }),
  );
  return { commentsData, isLoading };
};
