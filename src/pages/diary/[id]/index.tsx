import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import type { NextPage, GetServerSidePropsContext } from 'next';
import type { User } from 'next-auth';
import type { ErrorResponse } from 'types/response';
import * as api from 'api';
import { EditIcon, ReportIcon, TrashIcon } from 'assets/icons';
import { DiaryCommentsContainer } from 'components/comment';
import {
  FloatingMenu,
  FullPageLoading,
  ConfirmModal,
  Seo,
} from 'components/common';
import { DiaryDetailContainer } from 'components/diary';
import { Header, HeaderLeft, HeaderRight } from 'components/layouts';
import { PAGE_PATH } from 'constants/common';
import { MODAL_BUTTON, MODAL_MESSAGE } from 'constants/modal';
import { queryKeys } from 'constants/services';
import { useClickOutside, useModal } from 'hooks/common';
import { useDeleteDiary, useDiary } from 'hooks/services';
import { getServerSidePropsWithAuth } from 'lib/auth';
import { errorResponseMessage } from 'utils';

interface DiaryDetailPageProps {
  user: User;
}

const DiaryDetailPage: NextPage<DiaryDetailPageProps> = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;

  const { isVisible: isVisibleDeleteModal, handleModal: handleDeleteModal } =
    useModal();
  const { ref, isVisible, setIsVisible } = useClickOutside();

  const { diaryData, isLoading } = useDiary(id as string);
  const deleteDiaryMutation = useDeleteDiary();

  const handleGoToEdit = () => {
    void router.push(PAGE_PATH.diary.edit(id as string));
  };

  const handleDeleteDiary = () => {
    deleteDiaryMutation(
      { id: id as string },
      {
        onSuccess: () => {
          router.back();
        },
        onError: (error) => {
          if (isAxiosError<ErrorResponse>(error)) {
            alert(errorResponseMessage(error.response?.data.message));
          }
        },
      },
    );
  };

  if (diaryData === undefined || isLoading) return <FullPageLoading />;

  const { author, title } = diaryData;
  const isAuthor = author.id === user.id;

  return (
    <>
      <Seo title={`${title} | a daily diary`} />
      <Header
        left={<HeaderLeft type="이전" />}
        right={
          <>
            <HeaderRight
              buttonRef={ref}
              type="더보기"
              onClick={() => {
                setIsVisible((state) => !state);
              }}
            />
            {isVisible && (
              <FloatingMenu
                items={
                  isAuthor
                    ? [
                        {
                          icon: <EditIcon />,
                          label: '수정하기',
                          onClick: handleGoToEdit,
                        },
                        {
                          icon: <TrashIcon />,
                          label: '삭제하기',
                          onClick: handleDeleteModal.open,
                        },
                      ]
                    : [
                        {
                          icon: <ReportIcon />,
                          label: '신고하기',
                          onClick: () => {
                            confirm('신고하시겠습니까?'); // TODO: 신고하기 기능
                          },
                        },
                      ]
                }
              />
            )}
          </>
        }
      />
      <Section>
        <DiaryDetailContainer {...diaryData} />
        <DiaryCommentsContainer diaryId={id as string} />
      </Section>
      <ConfirmModal
        isVisible={isVisibleDeleteModal}
        message={MODAL_MESSAGE.delete}
        confirmText={MODAL_BUTTON.delete}
        onClose={handleDeleteModal.close}
        onConfirm={handleDeleteDiary}
      />
    </>
  );
};

export const getServerSideProps = getServerSidePropsWithAuth(
  async (context: GetServerSidePropsContext) => {
    const { user, query } = context;
    const { id } = query;

    const { accessToken } = user as User;

    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
      [queryKeys.diaries, id],
      async () =>
        await api.getDiaryDetail({ id: id as string, config: headers }),
    );

    return { props: { dehydratedState: dehydrate(queryClient), user } };
  },
);

export default DiaryDetailPage;

const Section = styled.section`
  margin-top: 54px;
`;
