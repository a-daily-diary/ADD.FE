import styled from '@emotion/styled';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement, ChangeEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { DiaryForm } from 'types/Diary';
import type { ErrorResponse } from 'types/Response';
import * as api from 'api';
import {
  PhotoInactiveIcon,
  PhotoActiveIcon,
  UnlockIcon,
  LockIcon,
  DeleteIcon,
} from 'assets/icons';
import ResponsiveImage from 'components/common/ResponsiveImage';
import Seo from 'components/common/Seo';
import {
  Layout,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from 'components/layouts';
import { DIARY_MESSAGE } from 'constants/diary';
import { useBeforeLeave } from 'hooks';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { ScreenReaderOnly } from 'styles';
import { dateFormat, errorResponseMessage, textareaAutosize } from 'utils';

const EditDiary: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQuery(
    ['diary-detail', id],
    async () => await api.getDiaryDetail(id as string),
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<DiaryForm>({ mode: 'onChange' });
  const { isPublic: watchIsPublic, title: watchTitle } = watch();

  const [previewImage, setPreviewImage] = useState<string>(
    data?.imgUrl == null ? '' : data?.imgUrl,
  );
  const isPhotoActive = previewImage.length > 0;

  useEffect(() => {
    if (data === undefined) return;
    setValue('title', data.title, { shouldValidate: true });
    setValue('content', data.content, { shouldValidate: true });
    setValue('imgUrl', data.imgUrl, { shouldValidate: true });
    setValue('isPublic', data.isPublic, { shouldValidate: true });
  }, [data]);

  useBeforeLeave({ message: DIARY_MESSAGE.popstate, path: router.asPath });

  const handleOnChangeImageFile: ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    const { files } = e.target;
    if (files !== null) {
      try {
        const imageFormData = new FormData();
        imageFormData.append('image', files[0]);

        const {
          data: {
            data: { imgUrl },
          },
        } = await api.uploadDiaryImage(imageFormData);

        setPreviewImage(imgUrl);
        setValue('imgUrl', imgUrl);
      } catch (error) {
        if (isAxiosError<ErrorResponse>(error)) {
          // TODO: 이미지 업로드 시 에러 처리
          console.log(error);
        }
      }
    }
  };

  const handleCancelImage = () => {
    setPreviewImage('');
    setValue('imgUrl', null);
  };

  const onSubmit: SubmitHandler<DiaryForm> = async (data) => {
    try {
      const { title, content, imgUrl, isPublic } = data;
      await api.editDiaryDetail(
        {
          title,
          content,
          imgUrl,
          isPublic,
        },
        id as string,
      );

      await router.replace(`/diary/${id as string}`);
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        alert(errorResponseMessage(error.response?.data.message));
      }
    }
  };

  if (data === undefined) return <div />;
  if (isLoading) return <div>Loading</div>;

  const createdAtDate = dateFormat(data?.createdAt) as string;

  return (
    <Section>
      <Title>일기 편집</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* NOTE: 등록 버튼을 사용하기 위해 form 요소 내에 Header가 존재함 */}
        <Header>
          <HeaderLeft
            type="닫기"
            onClick={() => {
              router.back();
            }}
          />
          <HeaderTitle title={createdAtDate} fontWeight={700} />
          <HeaderRight type="등록" disabled={!isValid} />
        </Header>
        <FormHeader>
          {/* TODO: 일기 템플릿 추가 */}
          <ImageFileLabel
            htmlFor="selectImageFile"
            isPhotoActive={!isPhotoActive}
          >
            {isPhotoActive ? <PhotoInactiveIcon /> : <PhotoActiveIcon />}
            사진 추가
            <PhotoText isPhotoActive={!isPhotoActive}>(1장)</PhotoText>
          </ImageFileLabel>
          <ImageFileInput
            type="file"
            id="selectImageFile"
            accept="image/*"
            onChange={handleOnChangeImageFile}
          />
          <PublicLabel htmlFor="isPublic" isPublic={watchIsPublic}>
            {watchIsPublic ? (
              <>
                <UnlockIcon />
                공개
              </>
            ) : (
              <>
                <LockIcon />
                비공개
              </>
            )}
          </PublicLabel>
          <PublicCheckbox
            id="isPublic"
            type="checkbox"
            {...register('isPublic')}
          />
        </FormHeader>
        <ContentContainer>
          <TitleTextarea
            id="title"
            placeholder="일기 제목을 작성해주세요."
            rows={1}
            {...register('title', {
              required: true,
              onChange: textareaAutosize,
              setValueAs: (value: string) => value.trim(),
            })}
          />
          {isPhotoActive && (
            <PreviewImageContainer>
              <ResponsiveImage src={previewImage} alt={watchTitle} />
              <CancelImageButton
                type="button"
                aria-label="사진 선택 취소"
                onClick={handleCancelImage}
              >
                <DeleteIcon />
              </CancelImageButton>
            </PreviewImageContainer>
          )}
          <ContentTextarea
            id="content"
            placeholder="일기 내용을 작성해주세요."
            rows={1}
            {...register('content', {
              required: true,
              onChange: textareaAutosize,
              setValueAs: (value: string) => value.trim(),
            })}
          />
        </ContentContainer>
      </form>
    </Section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;
  const { id } = query;
  const session = await getServerSession(req, res, authOptions);

  if (session === null) {
    return {
      redirect: {
        destination: '/account/login',
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ['diary-detail', id],
    async () =>
      await api.getDiaryDetail(id as string, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }),
  );
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

EditDiary.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Seo title="일기 편집 | a daily diary" />
      {page}
    </Layout>
  );
};

export default EditDiary;

const Section = styled.section`
  margin-top: 54px;
  min-height: 100vh;
`;

const Title = styled.h1`
  ${ScreenReaderOnly}
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: ${({ theme }) => theme.colors.bg_01};
  ${({ theme }) => theme.fonts.caption_01}
`;

const ImageFileLabel = styled.label<{ isPhotoActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${({ theme, isPhotoActive }) =>
    isPhotoActive ? theme.colors.gray_00 : theme.colors.gray_04};
  cursor: pointer;
`;

const PhotoText = styled.span<{ isPhotoActive: boolean }>`
  color: ${({ theme, isPhotoActive }) =>
    isPhotoActive ? theme.colors.gray_02 : theme.colors.gray_04};
`;

const ImageFileInput = styled.input`
  ${ScreenReaderOnly}
`;

const PublicLabel = styled.label<{ isPublic: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme, isPublic }) =>
    isPublic ? theme.colors.gray_01 : theme.colors.error};
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    width: 1px;
    height: 20px;
    margin-right: 12px;
    background-color: ${({ theme }) => theme.colors.gray_05};
  }
`;

const PublicCheckbox = styled.input`
  ${ScreenReaderOnly}
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
`;

const TitleTextarea = styled.textarea`
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_06};
  ${({ theme }) => theme.fonts.headline_01}
  font-weight: 500;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_04};
  }
`;

const PreviewImageContainer = styled.div`
  position: relative;
  margin-top: 16px;
`;

const CancelImageButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
`;

const ContentTextarea = styled.textarea`
  margin-top: 16px;
  ${({ theme }) => theme.fonts.body_04}

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_04};
  }
`;
