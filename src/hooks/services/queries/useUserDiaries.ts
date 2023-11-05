import { useQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useUserDiaries = (username: string) => {
  const { data: userDiariesData, isLoading } = useQuery(
    [queryKeys.diaries, username],
    async () => await api.getDiariesByUsername({ username }),
  );
  return { userDiariesData, isLoading };
};
