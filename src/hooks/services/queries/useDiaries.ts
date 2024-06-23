import { useInfiniteQuery } from '@tanstack/react-query';
import type { SortByType } from 'types/search';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useDiaries = (searchKeyword?: string, sortBy?: SortByType) => {
  const { data, isFetching, isFetchingNextPage, isError, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.diaries, searchKeyword, sortBy],
      queryFn: async ({ pageParam = 1 }) =>
        await api.getDiaries({
          currentPage: pageParam as number,
          searchKeyword,
          sortBy,
        }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const isLoading = isFetching && !isFetchingNextPage;

  return { diariesData: data?.pages, isLoading, isError, fetchNextPage };
};
