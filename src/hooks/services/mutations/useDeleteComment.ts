import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { DeleteCommentRequest } from 'types/comment';
import * as api from 'api';
import { queryKeys } from 'constants/services';

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
        await queryClient.invalidateQueries([queryKeys.comments, diaryId]);
        await queryClient.invalidateQueries([queryKeys.diaries, diaryId]);
      },
    },
  );

  return mutate;
};
