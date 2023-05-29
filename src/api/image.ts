import type { UploadImageRequest, UploadImageResponse } from 'types/Register';
import type { SuccessResponse } from 'types/Response';
import axios from 'lib/axios';

export const uploadUserImage = async (imageFormData: FormData) => {
  return await axios.post<
    UploadImageRequest,
    SuccessResponse<UploadImageResponse>
  >('/users/upload', imageFormData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
