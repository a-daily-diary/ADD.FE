import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { WriteDiaryRequest } from 'types/diary';
import * as api from 'api';
import { PAGE_PATH } from 'constants/common';
import { queryKeys } from 'constants/services';

export const useWriteDiary = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
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
        await router.replace(PAGE_PATH(diary.id).diary.detail);
      },
    },
  );

  return mutate;
};
