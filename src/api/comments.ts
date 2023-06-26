import type { AxiosRequestConfig } from 'axios';
import type { CommentRequest, CommentResponse, Comments } from 'types/Comment';
import type { SuccessResponse } from 'types/Response';
import { API_PATH } from 'constants/api/path';
import axios from 'lib/axios';

export const writeComment = async ({ diaryId, comment }: CommentRequest) => {
  const {
    data: { data },
  } = await axios.post<SuccessResponse<CommentResponse>>(
    `${API_PATH.diaries.index}/${diaryId}/comment`,
    {
      diaryId,
      comment,
    },
  );
  return data;
};

export const getComments = async (
  diaryId: string,
  config?: AxiosRequestConfig,
) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<Comments>>(
    `${API_PATH.diaries.index}/${diaryId}/comment`,
    config,
  );
  return data;
};
