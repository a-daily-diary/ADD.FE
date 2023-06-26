import type { User } from 'next-auth';

export interface CommentForm {
  comment: string;
}

/*
 * Request Data Types
 */

// 댓글 작성
export interface CommentRequest extends CommentForm {
  diaryId: string;
}

/*
 * Response Data Types
 */

// 댓글 작성
export interface CommentResponse {
  comment: Comment;
  // TODO: badge 추가 예정
}

/*
 * Other Types
 */

// 댓글
export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  comment: string;
  commenter: User;
}

// 댓글 리스트
export interface Comments {
  comments: Comment[];
  totalCount: number;
  totalPage: number;
}
