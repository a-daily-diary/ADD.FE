import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { GetServerSideProps, NextPage } from 'next';
import type { ChangeEventHandler, FocusEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { DiaryForm } from 'types/diary';
import type { ErrorResponse } from 'types/response';
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
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from 'components/layouts';
import { DIARY_MESSAGE } from 'constants/diary';
import { queryKeys } from 'constants/queryKeys';
import { useBeforeLeave } from 'hooks/common';
import { useDiary } from 'hooks/services';
import { useEditDiary } from 'hooks/services/mutations/useEditDiary';
import { useImageUpload } from 'hooks/services/mutations/useImageUpload';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { ScreenReaderOnly } from 'styles';
import { dateFormat, errorResponseMessage, textareaAutosize } from 'utils';

const EditDiary: NextPage = () => {
  const router = useRouter();
  const {
    query: { id },
    asPath,
  } = router;

  const { diaryData, isLoading } = useDiary(id as string);

  const [previewImage, setPreviewImage] = useState<string>(
    diaryData?.imgUrl == null ? '' : diaryData?.imgUrl,
  );
  const isPhotoActive = previewImage.length > 0;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { isValid },
  } = useForm<DiaryForm>({
    mode: 'onChange',
    defaultValues: {
      title: diaryData?.title,
      content: diaryData?.content,
      imgUrl: diaryData?.imgUrl,
      isPublic: diaryData?.isPublic,
    },
  });
  const { isPublic: watchIsPublic, title: watchTitle } = watch();

  useBeforeLeave({ message: DIARY_MESSAGE.popstate, path: asPath });

  const editDiaryMutation = useEditDiary(id as string);
  const imageUploadMutation = useImageUpload({
    path: 'diaries',
    onSuccess: (imgUrl: string) => {
      setPreviewImage(imgUrl);
      setValue('imgUrl', imgUrl);
    },
  });

  useEffect(() => {
    setFocus('content');
  }, [setFocus]);

  const handleOnChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (files !== null) {
      try {
        const imageFormData = new FormData();
        imageFormData.append('image', files[0]);

        imageUploadMutation(imageFormData);
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

  const handleOnFocusTextarea: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    const { target } = e;
    setTimeout(() => {
      target.style.height = `${target.scrollHeight}px`;
    }, 0);
  };

  const onSubmit: SubmitHandler<DiaryForm> = async (data) => {
    try {
      const { title, content, imgUrl, isPublic } = data;
      editDiaryMutation({
        title,
        content,
        imgUrl,
        isPublic,
        id: id as string,
      });

      await router.replace(`/diary/${id as string}`);
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        alert(errorResponseMessage(error.response?.data.message));
      }
    }
  };

  if (diaryData === undefined) return <div />;
  if (isLoading) return <div>Loading</div>;

  const { title, createdAt } = diaryData;

  const createdAtDate = dateFormat(createdAt) as string;

  return (
    <>
      <Seo title="일기 편집 | a daily diary" />
      <Section>
        <Title>일기 편집</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* NOTE: 등록 버튼을 사용하기 위해 form 요소 내에 Header가 존재함 */}
          <Header
            left={
              <HeaderLeft
                type="닫기"
                onClick={() => {
                  router.back();
                }}
              />
            }
            title={<HeaderTitle title={createdAtDate} fontWeight={700} />}
            right={<HeaderRight type="수정" disabled={!isValid} />}
          />
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
                <ResponsiveImage src={previewImage} alt={watchTitle ?? title} />
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
              onFocus={handleOnFocusTextarea}
            />
          </ContentContainer>
        </form>
      </Section>
    </>
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
    [queryKeys.diaries, id],
    async () =>
      await api.getDiaryDetail({
        id: id as string,
        config: {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      }),
  );
  return { props: { dehydratedState: dehydrate(queryClient) } };
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
  ${({ theme }) => theme.fonts.body_04};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_04};
  }
`;
