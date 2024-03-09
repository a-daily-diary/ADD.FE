import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { EditProfileRequest } from 'types/profile';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useEditProfile = (username: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async ({ username, imgUrl }: EditProfileRequest) =>
      await api.editProfile({
        username,
        imgUrl,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([queryKeys.users, username]);
      },
    },
  );

  return mutate;
};
