import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CommentRequest } from 'types/Comment';
import * as api from 'api';
import { queryKeys } from 'constants/queryKeys';

export const useWriteComment = (diaryId: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async ({ diaryId, comment }: CommentRequest) =>
      await api.writeComment({
        diaryId,
        comment,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([queryKeys.comments, diaryId]);
        await queryClient.invalidateQueries([queryKeys.diaries, diaryId]);
      },
    },
  );

  return mutate;
};
