import { useInfiniteQuery } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useComments = (diaryId: string) => {
  const { data, isFetching, isFetchingNextPage, isError, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.comments, diaryId],
      queryFn: async ({ pageParam = 0 }) =>
        await api.getComments({ diaryId, page: pageParam as number }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const isLoading = isFetching && !isFetchingNextPage;

  return {
    commentsData: data?.pages,
    isLoading,
    isError,
    fetchNextPage,
  };
};
