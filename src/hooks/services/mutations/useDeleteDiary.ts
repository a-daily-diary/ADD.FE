import { useMutation } from '@tanstack/react-query';
import type { DeleteDiaryRequest } from 'types/diary';
import * as api from 'api';

export const useDeleteDiary = () => {
  const { mutate } = useMutation(async ({ id }: DeleteDiaryRequest) => {
    await api.deleteDiaryDetail({ id });
  });

  return mutate;
};
