import styled from '@emotion/styled';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { MouseEventHandler, ChangeEventHandler } from 'react';
import type { RegisterSchema } from 'types/Register';
import SelectImageIcon from 'assets/icons/select_image.svg';
import { DEFAULT_PROFILE_IMAGES } from 'constants/profile';
import { ScreenReaderOnly } from 'styles/ScreenReaderStyle';

const RegisterProfileImage = () => {
  const { register, setValue } = useFormContext<RegisterSchema>();
  const imageRef = useRef<Array<HTMLImageElement | null>>([]);
  const [previewImage, setPreviewImage] = useState<string>(
    DEFAULT_PROFILE_IMAGES[0].url,
  );

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleImageFile: ChangeEventHandler = (e) => {
    const { files } = e.target as HTMLInputElement;

    if (files !== null) {
      const imageUrl = URL.createObjectURL(files[0]);
      setPreviewImage(imageUrl);
    }
  };

  const handleOnClickProfileImage: MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    imageRef.current.forEach((element, index) => {
      if (element === e.target) {
        setPreviewImage(DEFAULT_PROFILE_IMAGES[index].url);
        setValue('imgUrl', DEFAULT_PROFILE_IMAGES[index].url, {
          shouldValidate: true,
        });
      }
    });
  };

  return (
    <section>
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
        <ImageFileLabel htmlFor="selectImageFile">
          <SelectImageIcon />
        </ImageFileLabel>
        <ImageFileInput
          {...register('imgUrl', {
            onChange: handleImageFile,
          })}
          type="file"
          id="selectImageFile"
          accept="image/*"
        />
        <>
          {DEFAULT_PROFILE_IMAGES.map((image, index) => {
            const { id, url } = image;
            return (
              <ImageButton
                key={`default-images-${id}`}
                type="button"
                onClick={handleOnClickProfileImage}
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
    </section>
  );
};

export default RegisterProfileImage;

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
  overflow: hidden;
  padding: 1px;
  border: 2px solid
    ${({ theme, isActive }) =>
      isActive ? theme.colors.primary_00 : 'transparent'};
  border-radius: 50%;
  font-size: 0;
  transition: border 0.2s;
  aspect-ratio: 1;
`;
