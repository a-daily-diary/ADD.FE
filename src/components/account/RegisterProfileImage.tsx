import styled from '@emotion/styled';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import type { RegisterForm } from 'types/register';
import { ProfileUpload } from 'components/common';
import { DEFAULT_PROFILE_IMAGES } from 'constants/profile';
import { FadeInAnimationStyle, SVGVerticalAlignStyle } from 'styles';

export const RegisterProfileImage = () => {
  const { setValue, watch } = useFormContext<RegisterForm>();

  const previewImage = watch('imgUrl');

  const onChangePreviewImage = (imageUrl: string) => {
    setValue('imgUrl', imageUrl);
  };

  return (
    <>
      <Section>
        <TitleContainer>
          <Title>프로필 사진을 등록해주세요.</Title>
          <DescriptionText>
            프로필로 등록할 사진을 앨범에서 가져오시거나, <br /> 기본 프로필
            이미지에서 선택해주세요.
          </DescriptionText>
        </TitleContainer>
        <PreviewImageContainer>
          <PreviewImage
            src={previewImage}
            alt="프로필"
            width={160}
            height={160}
          />
        </PreviewImageContainer>
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
      </Section>
    </>
  );
};

const Section = styled.section`
  ${FadeInAnimationStyle}
`;

const TitleContainer = styled.div`
  margin-bottom: 48px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_01}
`;

const DescriptionText = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_07};
`;

const PreviewImageContainer = styled.div`
  overflow: hidden;
  width: 160px;
  margin: 0 auto;
  border-radius: 50%;
  aspect-ratio: 1;
`;

const PreviewImage = styled(Image)`
  object-fit: cover;
`;

const ImageFileContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: fit-content;
  margin: 32px auto;
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
