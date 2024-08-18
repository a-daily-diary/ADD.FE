import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useCancelFavoriteDiary = (diaryId: string) => {
  const queryClient = useQueryClient();

  return useMutation(async () => await api.cancelFavoriteDiary(diaryId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKeys.diaries]);
      await queryClient.invalidateQueries([queryKeys.diaries, diaryId]);
      await queryClient.invalidateQueries([queryKeys.bookmark]);
    },
  });
};
