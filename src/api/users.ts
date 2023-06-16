import type { LoginRequest, LoginResponse } from 'types/Login';
import type { ExistsRequest, RegisterRequest } from 'types/Register';
import type { OnlyMessageResponse, SuccessResponse } from 'types/Response';
import { API_PATH } from 'constants/api/path';
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
