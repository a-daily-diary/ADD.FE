import { useInfiniteQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useBookmarkedDiaries = (
  username: string,
  searchKeyword?: string,
) => {
  const { data, isFetching, isFetchingNextPage, isError, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.bookmark, username, searchKeyword],
      queryFn: async ({ pageParam = 1 }) =>
        await api.getBookmarkedDiariesByUsername({
          username,
          searchKeyword,
          currentPage: pageParam as number,
        }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
      cacheTime: 0, // FIXME: 더 좋은 방식에 대한 고민 필요
    });

  const isLoading = isFetching && !isFetchingNextPage;

  return {
    bookmarkedDiariesData: data?.pages,
    isLoading,
    isError,
    fetchNextPage,
  };
};
