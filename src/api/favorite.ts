import type { OnlyMessageResponse, SuccessResponse } from 'types/Response';
import { API_PATH } from 'constants/api/path';
import axios from 'lib/axios';

export const favoriteDiary = async (diaryId: string) => {
  const {
    data: { data },
  } = await axios.post<SuccessResponse<OnlyMessageResponse>>(
    `${API_PATH.diaries.index}/${diaryId}/favorite`,
  );
  return data;
};

export const cancelFavoriteDiary = async (diaryId: string) => {
  const {
    data: {
      data: { message },
    },
  } = await axios.delete<SuccessResponse<OnlyMessageResponse>>(
    `${API_PATH.diaries.index}/${diaryId}/favorite`,
  );
  return message;
};
