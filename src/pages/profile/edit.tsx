import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { NextPage } from 'next';
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import type { EditProfileForm } from 'types/profile';
import type {
  ErrorResponse,
  OnlyMessageResponse,
  SuccessResponse,
} from 'types/response';
import * as api from 'api';
import { ImagePickerIcon } from 'assets/icons';
import { Seo } from 'components/common';
import { FormInput } from 'components/form';
import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from 'components/layouts';
import { DEFAULT_PROFILE_IMAGES } from 'constants/profile';
import {
  ERROR_MESSAGE,
  INVALID_VALUE,
  VALID_VALUE,
} from 'constants/validation';
import { useImageUpload } from 'hooks/services/mutations/useImageUpload';
import { SVGVerticalAlignStyle, ScreenReaderOnly } from 'styles';
import { errorResponseMessage } from 'utils';

const ProfileEditPage: NextPage = () => {
  const { data: session } = useSession();
  const {
    register,
    getValues,
    setValue,
    formState: { errors, isValid },
    setError,
  } = useForm<EditProfileForm>({
    mode: 'onChange',
    defaultValues: {
      email: session?.user.email !== null ? session?.user.email : '',
      username: session?.user.username !== null ? session?.user.username : '',
      imgUrl: session?.user.imgUrl !== null ? session?.user.imgUrl : '',
    },
  });

  const [successDuplicateCheckUsername, setSuccessDuplicateCheckUsername] =
    useState<SuccessResponse<OnlyMessageResponse> | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string>(getValues('imgUrl'));
  const imageRef = useRef<Array<HTMLImageElement | null>>([]);

  const imageUploadMutation = useImageUpload({
    path: 'users',
    onSuccess: (imgUrl: string) => {
      setPreviewImage(imgUrl);
    },
  });

  if (session === null) return <div>로그인이 필요합니다.</div>; // TODO: 로그인 페이지로 이동 모달 생성하여 적용하기

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

  const handleDuplicateCheckUsername = async () => {
    // TODO: 현재 사용중인 username과 동일한 경우 처리 필요
    try {
      const { username } = getValues();
      const { data } = await api.usernameExists({ username });

      setSuccessDuplicateCheckUsername(data);
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        setError('username', {
          type: 'exist',
          message: errorResponseMessage(error.response?.data.message),
        });
        setSuccessDuplicateCheckUsername(undefined);
      }
    }
  };

  useEffect(() => {
    setValue('imgUrl', previewImage);
  }, [previewImage, setValue]);

  return (
    <>
      <Seo title="프로필 수정 | a daily diary" />
      <Section>
        <Title>프로필 수정</Title>
        <Form>
          <Header
            left={<HeaderLeft type="이전" />}
            title={<HeaderTitle title="프로필" />}
            right={<HeaderRight type="저장" disabled={!isValid} />}
          />
          <ProfileImage
            src={previewImage}
            alt={session.user.username}
            width={160}
            height={160}
            priority
          />
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
          <FormInputContainer>
            <FormInput
              register={register('email', { disabled: true })}
              type="text"
              placeholder="이메일"
              label="이메일"
              isShowLabel={true}
            />
            <FormInput
              register={register('username', {
                required: ERROR_MESSAGE.username.required,
                minLength: {
                  value: VALID_VALUE.username.min,
                  message: ERROR_MESSAGE.username.length,
                },
                maxLength: {
                  value: VALID_VALUE.username.max,
                  message: ERROR_MESSAGE.username.length,
                },
                pattern: {
                  value: VALID_VALUE.username.pattern,
                  message: ERROR_MESSAGE.username.pattern,
                },
                validate: (value) =>
                  !INVALID_VALUE.username.test(value) ||
                  ERROR_MESSAGE.username.invalidPattern,
              })}
              type="text"
              placeholder="닉네임"
              label="닉네임"
              errors={errors.username}
              success={successDuplicateCheckUsername}
              isShowLabel={true}
              button={
                <DuplicateCheckButton
                  type="button"
                  onClick={handleDuplicateCheckUsername}
                >
                  중복확인
                </DuplicateCheckButton>
              }
            />
          </FormInputContainer>
        </Form>
      </Section>
    </>
  );
};

export default ProfileEditPage;

const Section = styled.section`
  margin-top: 54px;
  min-height: calc(100vh - 54px);
`;

const Title = styled.h1`
  ${ScreenReaderOnly}
`;

const Form = styled.form`
  padding: 28px 20px;
`;

const ProfileImage = styled(Image)`
  display: block;
  margin: 0 auto;
  border-radius: 50%;
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

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

const DuplicateCheckButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 6px;
  padding: 8px 10px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.primary_03};
  color: ${({ theme }) => theme.colors.primary_01};
  ${({ theme }) => theme.fonts.caption_01}
`;
