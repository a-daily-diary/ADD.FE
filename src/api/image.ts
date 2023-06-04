import type { UploadImageRequest, UploadImageResponse } from 'types/Register';
import type { SuccessResponse } from 'types/Response';
import { API_PATH } from 'constants/api/path';
import axios from 'lib/axios';

export const uploadUserImage = async (imageFormData: UploadImageRequest) => {
  return await axios.post<SuccessResponse<UploadImageResponse>>(
    API_PATH.users.image,
    imageFormData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
};
