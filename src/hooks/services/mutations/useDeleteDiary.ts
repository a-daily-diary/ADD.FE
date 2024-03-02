import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { DeleteDiaryRequest } from 'types/diary';
import * as api from 'api';
import { queryKeys } from 'constants/service';

export const useDeleteDiary = ({ id }: DeleteDiaryRequest) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async ({ id }: DeleteDiaryRequest) => {
      await api.deleteDiaryDetail({ id });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([queryKeys.diaries]);
        await queryClient.invalidateQueries([queryKeys.diaries, id]);
      },
    },
  );

  return mutate;
};
