import type { DiaryRequest, DiaryResponse, DiaryDetail } from 'types/Diary';
import type { OnlyMessageResponse, SuccessResponse } from 'types/Response';
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

export const getDiaryDetail = async (id: string) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<DiaryDetail>>(
    `${API_PATH.diaries.index}/${id}`,
  );
  return data;
};

export const deleteDiaryDetail = async (id: string) => {
  const {
    data: {
      data: { message },
    },
  } = await axios.delete<SuccessResponse<OnlyMessageResponse>>(
    `${API_PATH.diaries.index}/${id}`,
  );
  return message;
};
