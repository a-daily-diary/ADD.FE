import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import {
  useRef,
  type ChangeEventHandler,
  type Dispatch,
  type MouseEventHandler,
  type SetStateAction,
} from 'react';
import type { ErrorResponse } from 'types/response';
import { ImagePickerIcon } from 'assets/icons';
import { DEFAULT_PROFILE_IMAGES } from 'constants/profile';
import { useImageUpload } from 'hooks/services/mutations/useImageUpload';
import { ScreenReaderOnly, SVGVerticalAlignStyle } from 'styles';

interface SelectProfileImageProps {
  previewImage: string;
  setPreviewImage: Dispatch<SetStateAction<string>>;
}

export const SelectProfileImage = ({
  previewImage,
  setPreviewImage,
}: SelectProfileImageProps) => {
  const imageRef = useRef<Array<HTMLImageElement | null>>([]);
  const imageUploadMutation = useImageUpload({
    path: 'users',
    onSuccess: (imgUrl: string) => {
      setPreviewImage(imgUrl);
    },
  });

  const handleImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (files !== null) {
      try {
        const imageFormData = new FormData();
        imageFormData.append('image', files[0]);

        imageUploadMutation(imageFormData);
      } catch (error) {
        if (isAxiosError<ErrorResponse>(error)) {
          console.log(error);
        }
      }
    }
  };

  const handleDefaultProfileImage: MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    imageRef.current.forEach((element, index) => {
      if (element === e.target) {
        setPreviewImage(DEFAULT_PROFILE_IMAGES[index].url);
      }
    });
  };

  return (
    <ImageFileContainer>
      <ImageFileLabel htmlFor="selectImageFile">
        <ImagePickerIcon />
      </ImageFileLabel>
      <ImageFileInput
        type="file"
        id="selectImageFile"
        accept="image/*"
        onChange={handleImageFile}
      />
      <>
        {DEFAULT_PROFILE_IMAGES.map((image, index) => {
          const { id, url } = image;
          return (
            <ImageButton
              key={`default-images-${id}`}
              type="button"
              onClick={handleDefaultProfileImage}
              isActive={url === previewImage}
            >
              <Image
                ref={(element) => (imageRef.current[index] = element)}
                src={url}
                alt={`기본 프로필 이미지 ${id}`}
                width={60}
                height={60}
              />
            </ImageButton>
          );
        })}
      </>
    </ImageFileContainer>
  );
};

const ImageFileContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: fit-content;
  margin: 12px auto 36px;
`;

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

const ImageButton = styled.button<{ isActive: boolean }>`
  ${SVGVerticalAlignStyle}
  overflow: hidden;
  padding: 1px;
  border: 2px solid
    ${({ theme, isActive }) =>
      isActive ? theme.colors.primary_00 : 'transparent'};
  border-radius: 50%;
  transition: border 0.2s;
  aspect-ratio: 1;
`;
