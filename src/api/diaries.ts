import type {
  WriteDiaryRequest,
  WriteDiaryResponse,
  DiaryDetail,
  Diaries,
  EditDiaryRequest,
  DeleteDiaryRequest,
  GetDiariesRequest,
  GetDiaryRequest,
  GetDiariesByUsernameRequest,
} from 'types/diary';
import type { OnlyMessageResponse, SuccessResponse } from 'types/response';
import { API_PATH, PAGE_SIZE } from 'constants/services';
import axios from 'lib/axios';

export const getDiaries = async ({ currentPage }: GetDiariesRequest) => {
  const currentPageIndex = currentPage - 1;
  const {
    data: { data },
  } = await axios.get<SuccessResponse<Diaries>>(`${API_PATH.diaries.index}`, {
    params: {
      skip: PAGE_SIZE * currentPageIndex,
      take: PAGE_SIZE,
    },
  });

  const nextPage: number | undefined =
    data.totalPage > currentPage ? currentPage + 1 : undefined;

  return { ...data, nextPage };
};

export const getDiariesByUsername = async ({
  currentPage,
  username,
}: GetDiariesByUsernameRequest) => {
  const currentPageIndex = currentPage - 1;
  const {
    data: { data },
  } = await axios.get<SuccessResponse<Diaries>>(`${API_PATH.diaries.index}`, {
    params: {
      username,
      skip: PAGE_SIZE * currentPageIndex,
      take: PAGE_SIZE,
    },
  });

  const nextPage: number | undefined =
    data.totalPage > currentPage ? currentPage + 1 : undefined;

  return { ...data, nextPage };
};

export const getBookmarkedDiariesByUsername = async ({
  currentPage,
  username,
}: GetDiariesByUsernameRequest) => {
  const currentPageIndex = currentPage - 1;
  const {
    data: { data },
  } = await axios.get<SuccessResponse<Diaries>>(
    `${API_PATH.diaries.bookmark}/${username}`,
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

export const writeDiary = async ({
  title,
  content,
  imgUrl,
  isPublic,
}: WriteDiaryRequest) => {
  const { data: diaryData } = await axios.post<
    SuccessResponse<WriteDiaryResponse>
  >(API_PATH.diaries.index, {
    title,
    content,
    imgUrl,
    isPublic,
  });
  return diaryData;
};

export const getDiaryDetail = async ({ id, config }: GetDiaryRequest) => {
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
  const { data: diaryData } = await axios.put<
    SuccessResponse<WriteDiaryResponse>
  >(`${API_PATH.diaries.index}/${id}`, {
    title,
    content,
    imgUrl,
    isPublic,
  });
  // TODO: 응답 데이터 메시지로 변경 요청, 변경 후 응답 타입 변경
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
