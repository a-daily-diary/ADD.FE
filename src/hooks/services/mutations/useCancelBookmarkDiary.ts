import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useCancelBookmarkDiary = (diaryId: string, username: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async () => await api.cancelBookmarkDiary(diaryId),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([queryKeys.diaries]);
        await queryClient.invalidateQueries([queryKeys.diaries, diaryId]);
        await queryClient.invalidateQueries([queryKeys.bookmark, username]);
      },
    },
  );

  return mutate;
};
