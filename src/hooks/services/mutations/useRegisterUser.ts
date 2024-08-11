import { useMutation } from '@tanstack/react-query';
import type { RegisterRequest } from 'types/register';
import * as api from 'api';

export const useRegisterUser = () => {
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
  );

  return mutate;
};
