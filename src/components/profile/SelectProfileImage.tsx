import styled from '@emotion/styled';
import Image from 'next/image';
import { ProfileUpload } from 'components/common';
import { DEFAULT_PROFILE_IMAGES } from 'constants/profile';
import { SVGVerticalAlignStyle } from 'styles';

interface SelectProfileImageProps {
  previewImage: string;
  onChangePreviewImage: (imageUrl: string) => void;
}

export const SelectProfileImage = ({
  previewImage,
  onChangePreviewImage,
}: SelectProfileImageProps) => {
  return (
    <ImageFileContainer>
      <ProfileUpload onChange={onChangePreviewImage} />
      {DEFAULT_PROFILE_IMAGES.map((image) => {
        const { id, url } = image;
        return (
          <ImageButton
            key={`default-images-${id}`}
            type="button"
            onClick={() => {
              onChangePreviewImage(image.url);
            }}
            isActive={url === previewImage}
          >
            <Image
              src={url}
              alt={`기본 프로필 이미지 ${id}`}
              width={60}
              height={60}
            />
          </ImageButton>
        );
      })}
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
