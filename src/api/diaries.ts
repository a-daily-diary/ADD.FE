import type { DiaryRequest, DiaryResponse } from 'types/Diary';
import type { SuccessResponse } from 'types/Response';
import { API_PATH } from 'constants/api/path';
import axios from 'lib/axios';

export const writeDiary = async ({
  title,
  content,
  imgUrl,
  isPublic,
}: DiaryRequest) => {
  const { data: diaryData } = await axios.post<SuccessResponse<DiaryResponse>>(
    API_PATH.diaries.index,
    {
      title,
      content,
      imgUrl,
      isPublic,
    },
  );
  return diaryData;
};
