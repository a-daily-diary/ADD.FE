import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { DeleteCommentRequest } from 'types/Comment';
import * as api from 'api';

export const useDeleteComment = (diaryId: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async ({ diaryId, commentId }: DeleteCommentRequest) =>
      await api.deleteComments({
        diaryId,
        commentId,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['comments', diaryId]);
      },
    },
  );

  return mutate;
};
