import { useInfiniteQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useDiaries = () => {
  const { data, isFetching, isFetchingNextPage, isError, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.diaries],
      queryFn: async ({ pageParam = 1 }) =>
        await api.getDiaries({ currentPage: pageParam as number }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const isLoading = isFetching && !isFetchingNextPage;

  return { diariesData: data?.pages, isLoading, isError, fetchNextPage };
};
