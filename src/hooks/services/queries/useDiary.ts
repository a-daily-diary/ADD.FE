import { useQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useDiary = (id: string) => {
  const { data: diaryData, isLoading } = useQuery(
    [queryKeys.diaries, id],
    async () => await api.getDiaryDetail({ id }),
  );
  return { diaryData, isLoading };
};
