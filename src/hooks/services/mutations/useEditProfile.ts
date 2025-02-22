import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { EditProfileRequest } from 'types/profile';
import * as api from 'api';
import { queryKeys } from 'constants/services';

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ username, imgUrl }: EditProfileRequest) =>
      await api.editProfile({
        username,
        imgUrl,
      }),
    {
      onSuccess: async ({ username }) => {
        await queryClient.invalidateQueries([queryKeys.users, username]);
      },
    },
  );
};
