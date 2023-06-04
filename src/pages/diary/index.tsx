import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { NextPageWithLayout } from 'pages/_app';
import type { FormEventHandler, ReactElement, ChangeEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { DiaryForm } from 'types/Diary';
import DeleteIcon from 'assets/icons/delete.svg';
import LockIcon from 'assets/icons/lock.svg';
import PhotoActiveIcon from 'assets/icons/photo_active.svg';
import PhotoInactiveIcon from 'assets/icons/photo_inactive.svg';
import UnLockIcon from 'assets/icons/unlock.svg';
import ResponsiveImage from 'components/common/ResponsiveImage';
import Seo from 'components/common/Seo';
import {
  Layout,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from 'components/layouts';
import { ScreenReaderOnly } from 'styles';
import { dateFormat, textareaAutosize } from 'utils';

const WriteDiary: NextPageWithLayout = () => {
  const today = dateFormat(new Date().toISOString()) as string;
  const [previewImage, setPreviewImage] = useState<string>('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<DiaryForm>({
    mode: 'onChange',
    defaultValues: { isPublic: true },
  });
  const { isPublic: watchIsPublic, title: watchTitle } = watch();
  const isPhotoActive = previewImage.length > 0;

  const onSubmit: SubmitHandler<DiaryForm> = (data) => {
    console.log(data);
  };

  const handleTextarea: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const element = e.target as HTMLTextAreaElement;
    textareaAutosize(element);
  };

  const handleOnChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (files !== null) {
      const imageUrl = URL.createObjectURL(files[0]);
      setPreviewImage(imageUrl);
    }
  };

  const handleCancelImage = () => {
    setPreviewImage('');
    setValue('imgUrl', undefined);
  };

  return (
    <Section>
      <Title>일기 작성</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <HeaderLeft
            type="닫기"
            onClick={() => {
              router.back();
            }}
          />
          <HeaderTitle title={today} fontWeight={700} />
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
            {...register('imgUrl', {
              onChange: handleOnChangeImageFile,
            })}
          />
          <PublicLabel htmlFor="isPublic" isPublic={watchIsPublic}>
            {watchIsPublic ? (
              <>
                <UnLockIcon />
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
              onChange: handleTextarea,
            })}
          />
          {isPhotoActive && (
            <PreviewImageContainer>
              <ResponsiveImage
                src={previewImage}
                alt={watchTitle}
                width={100}
                height={100}
                aspectRatio={'auto'}
              />
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
              onChange: handleTextarea,
            })}
          />
        </ContentContainer>
      </form>
    </Section>
  );
};

WriteDiary.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Seo title="일기 작성 | a daily diary" />
      {page}
    </Layout>
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
function useRef<T>(arg0: never[]) {
  throw new Error('Function not implemented.');
}
