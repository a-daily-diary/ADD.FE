import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from 'api';

export const useBookmarkDiary = (diaryId: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(async () => await api.bookmarkDiary(diaryId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['diaries']);
      await queryClient.invalidateQueries(['diary-detail', diaryId]);
    },
  });

  return mutate;
};
