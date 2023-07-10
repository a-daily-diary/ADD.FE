import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useBookmarkDiary = (diaryId: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(async () => await api.bookmarkDiary(diaryId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKeys.diaries]);
      await queryClient.invalidateQueries([queryKeys.diaries, diaryId]);
    },
  });

  return mutate;
};
