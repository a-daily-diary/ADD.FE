import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/services';

interface UseBookmarkDiaryProps {
  diaryId: string;
}

export const useBookmarkDiary = ({ diaryId }: UseBookmarkDiaryProps) => {
  const queryClient = useQueryClient();

  return useMutation(async () => await api.bookmarkDiary(diaryId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKeys.diaries]);
      await queryClient.invalidateQueries([queryKeys.diaries, diaryId]);
      await queryClient.invalidateQueries([queryKeys.bookmark]);
    },
  });
};
