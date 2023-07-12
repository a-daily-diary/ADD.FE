import type { User } from 'next-auth';

export type LoginForm = LoginRequest;

/* Request */

export interface LoginRequest {
  email: string;
  password: string;
}

/* Response */

export interface LoginResponse {
  token: Pick<User, 'accessToken'>['accessToken'];
  user: Omit<User, 'accessToken'>;
}
