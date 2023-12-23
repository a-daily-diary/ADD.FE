import type { RegisterRequest } from './register';
import type { AxiosRequestConfig } from 'axios';

export type EditProfileForm = Pick<
  RegisterRequest,
  'email' | 'username' | 'imgUrl'
>;

/* Request */

export interface GetProfileByUsernameRequest {
  username: string;
  config?: AxiosRequestConfig;
}

export type EditProfileRequest = Pick<RegisterRequest, 'username' | 'imgUrl'>;
