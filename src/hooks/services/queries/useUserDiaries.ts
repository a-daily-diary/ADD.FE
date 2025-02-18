import { useInfiniteQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useUserDiaries = (username: string, searchKeyword?: string) => {
  const { data, isFetching, isFetchingNextPage, isError, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.diaries, username, searchKeyword],
      queryFn: async ({ pageParam = 1 }) =>
        await api.getDiariesByUsername({
          username,
          searchKeyword,
          currentPage: pageParam as number,
        }),
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
