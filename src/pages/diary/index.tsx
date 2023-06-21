import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { NextPage } from 'next';
import type { ChangeEventHandler } from 'react';
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
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from 'components/layouts';
import { DIARY_MESSAGE } from 'constants/diary';
import { useBeforeLeave } from 'hooks';
import { ScreenReaderOnly } from 'styles';
import { dateFormat, errorResponseMessage, textareaAutosize } from 'utils';

const WriteDiary: NextPage = () => {
  const today = dateFormat(new Date().toISOString()) as string;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<DiaryForm>({
    mode: 'onChange',
    defaultValues: { imgUrl: null, isPublic: true },
  });
  const { isPublic: watchIsPublic, title: watchTitle } = watch();

  const [previewImage, setPreviewImage] = useState<string>('');
  const isPhotoActive = previewImage.length > 0;

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
      const {
        data: { diary },
      } = await api.writeDiary({
        title,
        content,
        imgUrl,
        isPublic,
      });

      // TODO: badge 데이터가 있는 경우, 모달로 배지 획득 알람 띄우기
      await router.replace(`/diary/${diary.id}`);
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        alert(errorResponseMessage(error.response?.data.message));
      }
    }
  };

  return (
    <>
      <Seo title="일기 작성 | a daily diary" />
      <Section>
        <Title>일기 작성</Title>
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
            title={<HeaderTitle title={today} fontWeight={700} />}
            right={<HeaderRight type="등록" disabled={!isValid} />}
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
    </>
  );
};

export default WriteDiary;

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
