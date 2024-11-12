import { useMutation } from '@tanstack/react-query';
import * as api from 'api';

export const useBlockUser = () => {
  return useMutation(
    async (blockedUserId: string) => await api.blockUser(blockedUserId),
  );
};
