import { useMutation } from '@tanstack/react-query';
import * as api from 'api';

interface useImageUploadProps {
  path: 'users' | 'diaries';
}

export const useImageUpload = ({ path }: useImageUploadProps) => {
  const { mutate } = useMutation(async (imageFormData: FormData) => {
    const {
      data: {
        data: { imgUrl },
      },
    } = await api.uploadImage({ path, imageFormData });
    return imgUrl;
  });

  return mutate;
};
