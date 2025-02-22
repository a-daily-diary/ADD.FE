import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import type { ChangeEventHandler } from 'react';
import type { ErrorResponse } from 'types/response';
import { ImagePickerIcon } from 'assets/icons';
import { ALLOW_IMAGE_TYPES } from 'constants/profile';
import { useAlert } from 'hooks/common/useAlert';
import { useImageUpload } from 'hooks/services';
import { ScreenReaderOnly } from 'styles';

interface ProfileUploadProps {
  onChange: (value: string) => void;
}

export const ProfileUpload = ({ onChange }: ProfileUploadProps) => {
  const { action: alertAction, Alert } = useAlert();

  const { mutate: imageUploadMutate } = useImageUpload({ path: 'users' });

  const handleImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    // NOTE: input의 multiple 속성이 없으므로 files length는 최대 1임을 보장합니다.
    const file = e.target.files?.[0];
    if (!file) return;

    // NOTE: input의 accept 속성은 개발자 도구에서 제거할 수 있기 때문에, 이중으로 체크합니다.
    if (!ALLOW_IMAGE_TYPES.includes(file.type)) {
      alertAction('SVG 파일은 업로드할 수 없습니다.');
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append('image', file);

    imageUploadMutate(imageFormData, {
      onSuccess: (imgUrl) => {
        onChange(imgUrl);
      },
      onError: (error) => {
        if (isAxiosError<ErrorResponse>(error)) {
          console.log(error);
        }
      },
    });
  };

  return (
    <>
      <ImageFileLabel htmlFor="selectImageFile">
        <ImagePickerIcon />
      </ImageFileLabel>
      <ImageFileInput
        type="file"
        id="selectImageFile"
        accept={ALLOW_IMAGE_TYPES.join(', ')}
        onChange={handleImageFile}
      />
      {Alert}
    </>
  );
};

const ImageFileLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.bg_02};
  aspect-ratio: 1;
  cursor: pointer;
`;

const ImageFileInput = styled.input`
  ${ScreenReaderOnly}
`;
