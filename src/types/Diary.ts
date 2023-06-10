import type { User } from 'next-auth';

export interface DiaryForm {
  title: string;
  content: string;
  imgUrl?: string;
  isPublic: boolean;
}

/*
 * Request Data Types
 */

// 다이어리 작성
export type DiaryRequest = DiaryForm;

/*
 * Response Data Types
 */

// 다이어리 작성
export interface DiaryResponse {
  diary: DiaryDetail;
  // TODO: badge 추가 예정
}

/*
 * Other Types
 */

// 일기 상세
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
