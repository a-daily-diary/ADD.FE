import { useMutation } from '@tanstack/react-query';
import * as api from 'api';

export const useAddToBlackList = () => {
  return useMutation(
    async (blockedUserId: string) => await api.addToBlackList(blockedUserId),
  );
};
