import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useFavoriteDiary = (diaryId: string) => {
  const queryClient = useQueryClient();

  return useMutation(async () => await api.favoriteDiary(diaryId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKeys.diaries]);
      await queryClient.invalidateQueries([queryKeys.diaries, diaryId]);
    },
  });
};
