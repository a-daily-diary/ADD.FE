import type { AxiosRequestConfig } from 'axios';
import type { User } from 'next-auth';

export interface DiaryDetail {
  id: string;
  title: string;
  content: string;
  imgUrl: string | null;
  isPublic: boolean;
  isBookmark: boolean;
  isFavorite: boolean;
  favoriteCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  author: User;
}

export interface Diaries {
  diaries: DiaryDetail[];
  totalCount: number;
  totalPage: number;
  nextPage: number | undefined;
}

export type DiaryForm = Pick<
  DiaryDetail,
  'title' | 'content' | 'imgUrl' | 'isPublic'
>;

/* Request */

export interface GetDiariesRequest {
  config?: AxiosRequestConfig;
  page: number;
}

export interface GetDiariesByUsernameRequest extends GetDiariesRequest {
  username: string;
}

export interface GetDiaryRequest {
  id: Pick<DiaryDetail, 'id'>['id'];
  config?: AxiosRequestConfig;
}

export type WriteDiaryRequest = Pick<
  DiaryDetail,
  'title' | 'content' | 'imgUrl' | 'isPublic'
>;

export type EditDiaryRequest = Pick<
  DiaryDetail,
  'id' | 'title' | 'content' | 'imgUrl' | 'isPublic'
>;

export type DeleteDiaryRequest = Pick<DiaryDetail, 'id'>;

/* Response */

export interface WriteDiaryResponse {
  diary: DiaryDetail;
  // TODO: badge 추가 예정
}
