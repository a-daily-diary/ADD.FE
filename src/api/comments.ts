import type {
  WriteCommentRequest,
  WriteCommentResponse,
  Comments,
  DeleteCommentRequest,
  GetCommentRequest,
} from 'types/comment';
import type { OnlyMessageResponse, SuccessResponse } from 'types/response';
import { API_PATH } from 'constants/api/path';
import axios from 'lib/axios';

export const getComments = async ({ diaryId, config }: GetCommentRequest) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<Comments>>(
    `${API_PATH.diaries.index}/${diaryId}/comment`,
    config,
  );
  return data;
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
