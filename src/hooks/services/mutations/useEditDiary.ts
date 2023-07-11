import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { EditDiaryRequest } from 'types/diary';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useEditDiary = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async ({ title, content, imgUrl, isPublic, id }: EditDiaryRequest) =>
      await api.editDiaryDetail({
        title,
        content,
        imgUrl,
        isPublic,
        id,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([queryKeys.diaries, id]);
      },
    },
  );

  return mutate;
};
