import { useQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useBookmarkedDiaries = (username: string) => {
  const { data: bookmarkedDiariesData, isLoading } = useQuery(
    [queryKeys.bookmark, username], // TODO: 북마트한 다이어리 queryKeys 확인
    async () => await api.getBookmarkedDiariesByUsername({ username }),
  );
  return { bookmarkedDiariesData, isLoading };
};
