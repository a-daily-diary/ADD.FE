import type { SuccessResponse } from 'types/Response';
import type {
  UploadImageRequest,
  UploadImageResponse,
} from 'types/UploadImage';
import { API_PATH } from 'constants/api/path';
import axios from 'lib/axios';

export const uploadImage = async ({
  path,
  imageFormData,
}: UploadImageRequest) => {
  return await axios.post<SuccessResponse<UploadImageResponse>>(
    API_PATH[path].image,
    imageFormData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
};
