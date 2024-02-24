import { useInfiniteQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useDiaries = () => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.diaries],
      queryFn: async ({ pageParam = 0 }) =>
        await api.getDiaries({ page: pageParam as number }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const isLoading = isFetching && !isFetchingNextPage;

  return { diariesData: data?.pages, isLoading, fetchNextPage };
};
