import type { User } from 'next-auth';

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
