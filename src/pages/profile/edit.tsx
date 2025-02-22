import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { GetServerSidePropsContext, NextPage } from 'next';
import type { User } from 'next-auth';
import type { SubmitHandler } from 'react-hook-form';
import type { EditProfileForm } from 'types/profile';
import type {
  ErrorResponse,
  OnlyMessageResponse,
  SuccessResponse,
} from 'types/response';
import * as api from 'api';

import { BadgesContainer } from 'components/badge';
import { Seo } from 'components/common';
import { FormInput } from 'components/form';
import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from 'components/layouts';
import { NoLinkProfileImage, SelectProfileImage } from 'components/profile';
import { PAGE_PATH } from 'constants/common';
import { queryKeys } from 'constants/services';
import {
  ERROR_MESSAGE,
  INVALID_VALUE,
  VALID_VALUE,
} from 'constants/validation';
import { useAlert } from 'hooks/common/useAlert';
import { useEditProfile } from 'hooks/services';
import { getServerSidePropsWithAuth } from 'lib/auth';
import { ScreenReaderOnly } from 'styles';
import { errorResponseMessage } from 'utils';

interface ProfileEditPageProps {
  user: User;
}

const ProfileEditPage: NextPage<ProfileEditPageProps> = ({ user }) => {
  const { email, username, imgUrl } = user;

  const router = useRouter();
  const { update } = useSession();
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
      email,
      username,
      imgUrl,
    },
  });

  const { action: alertAction, Alert } = useAlert();

  const [successDuplicateCheckUsername, setSuccessDuplicateCheckUsername] =
    useState<SuccessResponse<OnlyMessageResponse> | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string>(imgUrl);

  const { mutate: editProfileMutate } = useEditProfile();

  useEffect(() => {
    if (previewImage.length === 0) {
      alertAction('선택된 이미지가 없습니다. 다시 시도해주세요.');
      return;
    }

    setValue('imgUrl', previewImage);
  }, [previewImage]);

  const handleDuplicateCheckUsername = async () => {
    const { username } = getValues();
    const currentUsername = user.username;

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

  const onSubmit: SubmitHandler<EditProfileForm> = (data) => {
    const { username, imgUrl } = data;

    // TODO: 프로필 수정 시 동작 확인 필요, 현재 사용 중인 닉네임일 경우 서버 처리 수정 필요
    editProfileMutate(
      { username, imgUrl },
      {
        onSuccess: async () => {
          await update({ username, imgUrl });
          await router.replace(PAGE_PATH.profile.index);
        },
        onError: (error) => {
          if (isAxiosError<ErrorResponse>(error)) {
            alert(errorResponseMessage(error.response?.data.message));
          }
        },
      },
    );
  };

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
            username={username}
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

        <BadgesContainer />
      </Section>
      {Alert}
    </>
  );
};

export const getServerSideProps = getServerSidePropsWithAuth(
  async (context: GetServerSidePropsContext) => {
    const { user } = context;

    const { username, accessToken } = user as User;

    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
      [queryKeys.badges, 'username'],
      async () => {
        return await api.getBadgesByUsername({ username, config: headers });
      },
    );
    return { props: { dehydratedState: dehydrate(queryClient), user } };
  },
);

export default ProfileEditPage;

const Section = styled.section`
  margin-top: 54px;
`;

const Title = styled.h1`
  ${ScreenReaderOnly}
`;

const Form = styled.form`
  padding: 28px 20px;
  border-bottom: 12px solid ${({ theme }) => theme.colors.gray_06};
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
