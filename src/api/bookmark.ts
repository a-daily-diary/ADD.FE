import type { OnlyMessageResponse, SuccessResponse } from 'types/response';
import { API_PATH } from 'constants/services';
import axios from 'lib/axios';

export const bookmarkDiary = async (diaryId: string) => {
  const {
    data: { data },
  } = await axios.post<SuccessResponse<OnlyMessageResponse>>(
    `${API_PATH.diaries.index}/${diaryId}/bookmark`,
  );
  return data;
};

export const cancelBookmarkDiary = async (diaryId: string) => {
  const {
    data: {
      data: { message },
    },
  } = await axios.delete<SuccessResponse<OnlyMessageResponse>>(
    `${API_PATH.diaries.index}/${diaryId}/bookmark`,
  );
  return message;
};
