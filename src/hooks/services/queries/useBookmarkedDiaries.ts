import { useInfiniteQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useBookmarkedDiaries = (username: string) => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.bookmark, username],
      queryFn: async ({ pageParam = 0 }) =>
        await api.getBookmarkedDiariesByUsername({
          username,
          page: pageParam as number,
        }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const isLoading = isFetching && !isFetchingNextPage;

  return {
    bookmarkedDiariesData: data?.pages,
    isLoading,
    fetchNextPage,
  };
};
