import { useInfiniteQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useUserDiaries = (username: string) => {
  const { data, isFetching, isFetchingNextPage, isError, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.diaries, username],
      queryFn: async ({ pageParam = 0 }) =>
        await api.getDiariesByUsername({ username, page: pageParam as number }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const isLoading = isFetching && !isFetchingNextPage;

  return {
    userDiariesData: data?.pages,
    isLoading,
    isError,
    fetchNextPage,
  };
};
