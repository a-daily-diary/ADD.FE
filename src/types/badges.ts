import type { AxiosRequestConfig } from 'axios';

export interface UserToBadge {
  id: string;
  isPinned: boolean;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
  hasOwn: boolean;
  userToBadge: UserToBadge | null;
}

export interface GetBadgesByUsernameRequest {
  username: string;
  onlyPinned?: boolean;
  config?: AxiosRequestConfig;
}
