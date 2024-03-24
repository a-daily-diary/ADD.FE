import type { LoginRequest, LoginResponse } from 'types/login';
import type { PasswordResetLinkRequest } from 'types/password';
import type { ExistsRequest, RegisterRequest } from 'types/register';
import type { OnlyMessageResponse, SuccessResponse } from 'types/response';
import { API_PATH } from 'constants/services';
import axios from 'lib/axios';

export const register = async ({
  email,
  username,
  password,
  imgUrl,
  termsAgreementIdList,
}: RegisterRequest) => {
  return await axios.post<SuccessResponse<OnlyMessageResponse>>(
    API_PATH.users.register,
    {
      email,
      username,
      password,
      imgUrl,
      termsAgreementIdList,
    },
  );
};

export const emailExists = async ({ email }: ExistsRequest) => {
  return await axios.post<SuccessResponse<OnlyMessageResponse>>(
    API_PATH.users.emailExists,
    {
      email,
    },
  );
};

export const usernameExists = async ({ username }: ExistsRequest) => {
  return await axios.post<SuccessResponse<OnlyMessageResponse>>(
    API_PATH.users.usernameExists,
    {
      username,
    },
  );
};

export const login = async ({ email, password }: LoginRequest) => {
  return await axios.post<SuccessResponse<LoginResponse>>(
    API_PATH.users.login,
    { email, password },
  );
};

export const passwordResetLink = async ({
  email,
  redirectUrl,
}: PasswordResetLinkRequest) => {
  return await axios.post<SuccessResponse<OnlyMessageResponse>>(
    API_PATH.users.passwordResetLink,
    { email, redirectUrl },
  );
};
