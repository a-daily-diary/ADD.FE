import type {
  WriteCommentRequest,
  WriteCommentResponse,
  Comments,
  DeleteCommentRequest,
  GetCommentRequest,
} from 'types/comment';
import type { OnlyMessageResponse, SuccessResponse } from 'types/response';
import { API_PATH, PAGE_SIZE } from 'constants/services';
import axios from 'lib/axios';

export const getComments = async ({
  diaryId,
  currentPage,
}: GetCommentRequest) => {
  const currentPageIndex = currentPage - 1;
  const {
    data: { data },
  } = await axios.get<SuccessResponse<Comments>>(
    `${API_PATH.diaries.index}/${diaryId}/comment`,
    {
      params: {
        skip: PAGE_SIZE * currentPageIndex,
        take: PAGE_SIZE,
      },
    },
  );

  const nextPage: number | undefined =
    data.totalPage > currentPage ? currentPage + 1 : undefined;

  return { ...data, nextPage };
};

export const writeComment = async ({
  diaryId,
  comment,
}: WriteCommentRequest) => {
  const {
    data: { data },
  } = await axios.post<SuccessResponse<WriteCommentResponse>>(
    `${API_PATH.diaries.index}/${diaryId}/comment`,
    {
      diaryId,
      comment,
    },
  );
  return data;
};

export const deleteComments = async ({
  diaryId,
  commentId,
}: DeleteCommentRequest) => {
  const {
    data: {
      data: { message },
    },
  } = await axios.delete<SuccessResponse<OnlyMessageResponse>>(
    `${API_PATH.diaries.index}/${diaryId}/comment/${commentId}`,
  );
  return message;
};
