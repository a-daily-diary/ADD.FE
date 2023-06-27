import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CommentRequest } from 'types/Comment';
import * as api from 'api';

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
        await queryClient.invalidateQueries(['comments', diaryId]);
        await queryClient.invalidateQueries(['diary-detail', diaryId]);
      },
    },
  );

  return mutate;
};
