import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { DiaryRequest } from 'types/Diary';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useWriteDiary = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async ({ title, content, imgUrl, isPublic }: DiaryRequest) => {
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
        await router.replace(`/diary/${diary.id}`);
      },
    },
  );

  return mutate;
};
