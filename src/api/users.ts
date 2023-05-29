import type { LoginRequest, LoginResponse } from 'types/Login';
import type {
  DuplicationCheckRequest,
  RegisterRequest,
  RegisterResponse,
} from 'types/Register';
import type { SuccessResponse } from 'types/Response';
import axios from 'lib/axios';

export const register = async ({
  email,
  username,
  password,
  imgUrl,
  isAgree,
}: RegisterRequest) => {
  return await axios.post<RegisterRequest, SuccessResponse<RegisterResponse>>(
    '/users',
    {
      email,
      username,
      password,
      imgUrl,
      isAgree: true, // TODO: API에서 데이터 구조 수정 필요
    },
  );
};

export const emailExists = async (email: string) => {
  return await axios.post<
    DuplicationCheckRequest,
    SuccessResponse<RegisterResponse>
  >('/users/email-check', {
    email,
  });
};

export const usernameExists = async (username: string) => {
  return await axios.post<
    DuplicationCheckRequest,
    SuccessResponse<RegisterResponse>
  >('/users/username-check', {
    username,
  });
};

export const login = async ({ email, password }: LoginRequest) => {
  return await axios.post<LoginRequest, SuccessResponse<LoginResponse>>(
    '/users/login',
    { email, password },
  );
};
