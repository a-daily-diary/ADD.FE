import { useQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useDiaries = () => {
  const { data: diariesData, isLoading } = useQuery(
    [queryKeys.diaries],
    api.getDiaries,
  );
  return { diariesData, isLoading };
};
