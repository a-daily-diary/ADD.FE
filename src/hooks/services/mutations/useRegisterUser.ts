import { useMutation } from '@tanstack/react-query';
import type { RegisterRequest } from 'types/register';
import * as api from 'api';

interface UseRegisterUserProps {
  onSuccess: () => void;
}

export const useRegisterUser = ({ onSuccess }: UseRegisterUserProps) => {
  const { mutate } = useMutation(
    async ({
      email,
      username,
      password,
      imgUrl,
      termsAgreementIdList,
    }: RegisterRequest) => {
      await api.register({
        email,
        username,
        password,
        imgUrl,
        termsAgreementIdList,
      });
    },
    {
      onSuccess: () => {
        onSuccess();
      },
    },
  );
  return mutate;
};
