import { useInfiniteQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useBookmarkedDiaries = (username: string) => {
  const { data, isFetching, isFetchingNextPage, isError, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.bookmark, username],
      queryFn: async ({ pageParam = 1 }) =>
        await api.getBookmarkedDiariesByUsername({
          username,
          currentPage: pageParam as number,
        }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const isLoading = isFetching && !isFetchingNextPage;

  return {
    bookmarkedDiariesData: data?.pages,
    isLoading,
    isError,
    fetchNextPage,
  };
};
