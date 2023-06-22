import type { AxiosRequestConfig } from 'axios';

import type { Comments } from 'types/Comment';
import type { SuccessResponse } from 'types/Response';
import { API_PATH } from 'constants/api/path';
import axios from 'lib/axios';

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
