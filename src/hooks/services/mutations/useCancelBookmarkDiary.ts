import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/services';

interface UseCancelBookmarkDiaryProps {
  diaryId: string;
  username: string;
}

export const useCancelBookmarkDiary = ({
  diaryId,
  username,
}: UseCancelBookmarkDiaryProps) => {
  const queryClient = useQueryClient();

  return useMutation(async () => await api.cancelBookmarkDiary(diaryId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKeys.diaries]);
      await queryClient.invalidateQueries([queryKeys.diaries, diaryId]);
      await queryClient.invalidateQueries([queryKeys.bookmark, username]);
    },
  });
};
