import type { AxiosRequestConfig } from 'axios';

/* Request */

export interface GetProfileByUsernameRequest {
  username: string;
  config?: AxiosRequestConfig;
}
