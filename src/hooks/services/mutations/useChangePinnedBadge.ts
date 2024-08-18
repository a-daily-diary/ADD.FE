import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useChangePinnedBadge = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (badgeId: string) =>
      await api.patchPinnedBadgeByBadgeId({ id: badgeId }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([queryKeys.badges]);
      },
    },
  );
};
