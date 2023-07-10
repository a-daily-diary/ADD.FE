import type { User } from 'next-auth';

export interface DiaryForm {
  title: string;
  content: string;
  imgUrl: string | null;
  isPublic: boolean;
}

/*
 * Request Data Types
 */

// 다이어리 작성
export type DiaryRequest = DiaryForm;

// 다이어리 편집
export interface EditDiaryRequest extends DiaryRequest {
  diaryId: string;
}

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

// 일기 리스트
export interface Diaries {
  diaries: DiaryDetail[];
  totalCount: number;
  totalPage: number;
}
