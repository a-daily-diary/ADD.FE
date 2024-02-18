import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { NextPage } from 'next';
import type { SubmitHandler } from 'react-hook-form';
import type { EditProfileForm } from 'types/profile';
import type {
  ErrorResponse,
  OnlyMessageResponse,
  SuccessResponse,
} from 'types/response';
import * as api from 'api';
import { Seo } from 'components/common';
import { FormInput } from 'components/form';
import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from 'components/layouts';
import { NoLinkProfileImage, SelectProfileImage } from 'components/profile';
import {
  ERROR_MESSAGE,
  INVALID_VALUE,
  VALID_VALUE,
} from 'constants/validation';
import { useEditProfile } from 'hooks/services';
import { ScreenReaderOnly } from 'styles';
import { errorResponseMessage } from 'utils';

const ProfileEditPage: NextPage = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const {
    register,
    getValues,
    setValue,
    formState: { errors, isValid },
    setError,
    handleSubmit,
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

  const editProfileMutation = useEditProfile(session?.user.username as string);

  const handleDuplicateCheckUsername = async () => {
    const { username } = getValues();
    const currentUsername = session?.user.username;

    if (currentUsername === username) {
      const data = {
        data: {
          message: '현재 사용 중인 닉네임입니다.', // TODO: message 논의 필요
        },
        success: true as const,
      };

      setSuccessDuplicateCheckUsername(data);

      return;
    }

    try {
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

  const onSubmit: SubmitHandler<EditProfileForm> = async (data) => {
    try {
      const { username, imgUrl } = data;

      editProfileMutation({ username, imgUrl });
      void update({ username, imgUrl });

      await router.replace('/profile');
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        // TODO: 에러 처리
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setValue('imgUrl', previewImage);
  }, [previewImage, setValue]);

  if (session === null) return <div>로그인이 필요합니다.</div>; // TODO: 로그인 페이지로 이동 모달 생성하여 적용하기

  return (
    <>
      <Seo title="프로필 수정 | a daily diary" />
      <Section>
        <Title>프로필 수정</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Header
            left={<HeaderLeft type="이전" />}
            title={<HeaderTitle title="프로필" />}
            right={
              <HeaderRight
                type="저장"
                disabled={
                  !isValid || successDuplicateCheckUsername === undefined
                }
              />
            }
          />
          <NoLinkProfileImage
            size="xl"
            src={previewImage}
            username={session.user.username}
          />
          <SelectProfileImage
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />
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
                onChange: () => {
                  setSuccessDuplicateCheckUsername(undefined);
                },
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
                  disabled={!isValid}
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

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
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

  &:disabled {
    color: ${({ theme }) => theme.colors.gray_04};
    background-color: ${({ theme }) => theme.colors.gray_06};
  }
`;
