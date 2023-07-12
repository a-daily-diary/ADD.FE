import type { SuccessResponse } from 'types/response';
import type {
  UploadImageRequest,
  UploadImageResponse,
} from 'types/uploadImage';
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
