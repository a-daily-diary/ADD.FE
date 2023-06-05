import type { LoginRequest, LoginResponse } from 'types/Login';
import type {
  ExistsRequest,
  RegisterRequest,
  RegisterResponse,
} from 'types/Register';
import type { SuccessResponse } from 'types/Response';
import { API_PATH } from 'constants/api/path';
import axios from 'lib/axios';

export const register = async ({
  email,
  username,
  password,
  imgUrl,
  termsAgreementIdList,
}: RegisterRequest) => {
  return await axios.post<SuccessResponse<RegisterResponse>>(
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
  return await axios.post<SuccessResponse<RegisterResponse>>(
    API_PATH.users.emailExists,
    {
      email,
    },
  );
};

export const usernameExists = async ({ username }: ExistsRequest) => {
  return await axios.post<SuccessResponse<RegisterResponse>>(
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
