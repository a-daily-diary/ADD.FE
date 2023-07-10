import type { AxiosRequestConfig } from 'axios';
import type {
  DiaryRequest,
  DiaryResponse,
  DiaryDetail,
  Diaries,
  EditDiaryRequest,
  DeleteDiaryRequest,
} from 'types/Diary';
import type { OnlyMessageResponse, SuccessResponse } from 'types/Response';
import { API_PATH } from 'constants/api/path';
import axios from 'lib/axios';

export const getDiaries = async (config?: AxiosRequestConfig) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<Diaries>>(
    `${API_PATH.diaries.index}`,
    config,
  );
  return data;
};

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

export const getDiaryDetail = async (
  id: string,
  config?: AxiosRequestConfig,
) => {
  const {
    data: { data },
  } = await axios.get<SuccessResponse<DiaryDetail>>(
    `${API_PATH.diaries.index}/${id}`,
    config,
  );
  return data;
};

export const editDiaryDetail = async ({
  title,
  content,
  imgUrl,
  isPublic,
  id,
}: EditDiaryRequest) => {
  const { data: diaryData } = await axios.put<SuccessResponse<DiaryResponse>>(
    `${API_PATH.diaries.index}/${id}`,
    {
      title,
      content,
      imgUrl,
      isPublic,
    },
  );
  // TODO: 수정 완료 후 메시지 반환으로 변경 요청 후 해당 반환값 수정
  return diaryData;
};

export const deleteDiaryDetail = async ({ id }: DeleteDiaryRequest) => {
  const {
    data: {
      data: { message },
    },
  } = await axios.delete<SuccessResponse<OnlyMessageResponse>>(
    `${API_PATH.diaries.index}/${id}`,
  );
  return message;
};
