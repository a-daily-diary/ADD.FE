import { useMutation } from '@tanstack/react-query';
import * as api from 'api';

interface useImageUploadProps {
  path: 'users' | 'diaries';
  onSuccess: (imgUrl: string) => void;
}

export const useImageUpload = ({ path, onSuccess }: useImageUploadProps) => {
  const { mutate } = useMutation(
    async (imageFormData: FormData) => {
      const {
        data: {
          data: { imgUrl },
        },
      } = await api.uploadImage({ path, imageFormData });
      return imgUrl;
    },
    {
      onSuccess: (imgUrl) => {
        onSuccess(imgUrl);
      },
    },
  );

  return mutate;
};
