import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { WriteDiaryRequest } from 'types/diary';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useWriteDiary = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ title, content, imgUrl, isPublic }: WriteDiaryRequest) => {
      const {
        data: { diary },
      } = await api.writeDiary({
        title,
        content,
        imgUrl,
        isPublic,
      });
      return diary;
    },
    {
      onSuccess: async (diary) => {
        await queryClient.invalidateQueries([queryKeys.diaries, diary.id]);
      },
    },
  );
};
