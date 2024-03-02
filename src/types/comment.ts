import type { DiaryDetail } from './diary';
import type { AxiosRequestConfig } from 'axios';
import type { User } from 'next-auth';

export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  comment: string;
  commenter: User;
  diary: DiaryDetail;
}

export interface Comments {
  comments: Comment[];
  totalCount: number;
  totalPage: number;
  nextPage: number | undefined;
}

export type CommentForm = Pick<Comment, 'comment'>;

/* Request */

export interface GetCommentRequest {
  diaryId: Pick<DiaryDetail, 'id'>['id'];
  currentPage: number;
}

export interface WriteCommentRequest extends CommentForm {
  diaryId: Pick<DiaryDetail, 'id'>['id'];
}

export interface DeleteCommentRequest {
  diaryId: Pick<DiaryDetail, 'id'>['id'];
  commentId: Pick<Comment, 'id'>['id'];
}

/* Response */

export interface WriteCommentResponse {
  comment: Comment;
  // TODO: badge 추가
}
