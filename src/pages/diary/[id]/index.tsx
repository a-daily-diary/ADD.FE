import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import type { GetServerSideProps, NextPage } from 'next';
import type { ErrorResponse } from 'types/response';
import * as api from 'api';
import { EditIcon, ReportIcon, TrashIcon } from 'assets/icons';
import { DiaryCommentsContainer } from 'components/comment';
import { FloatingMenu, FullPageLoading, Modal, Seo } from 'components/common';
import { DiaryDetailContainer } from 'components/diary';
import { Header, HeaderLeft, HeaderRight } from 'components/layouts';
import { MODAL_BUTTON, MODAL_MESSAGE } from 'constants/modal';
import { queryKeys } from 'constants/queryKeys';
import { useClickOutside, useModal } from 'hooks/common';
import { useDeleteDiary, useDiary } from 'hooks/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { errorResponseMessage } from 'utils';

const DiaryDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  const { isVisible: isVisibleDeleteModal, handleModal: handleDeleteModal } =
    useModal();
  const { ref, isVisible, setIsVisible } = useClickOutside();

  const { diaryData, isLoading } = useDiary(id as string);
  const deleteDiaryMutation = useDeleteDiary({ id: id as string });

  const handleDeleteDiary = () => {
    try {
      deleteDiaryMutation({ id: id as string });
      // TODO: 일기 삭제 후 라우팅 처리 수정
      router.back();
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        alert(errorResponseMessage(error.response?.data.message));
      }
    }
  };

  if (diaryData === undefined || isLoading) return <FullPageLoading />;

  const { author, title } = diaryData;
  const isAuthor = author.id === session?.user.id;

  return (
    <>
      <Seo title={`${title} | a daily diary`} />
      <Header
        left={<HeaderLeft type="이전" />}
        right={
          <HeaderRight
            buttonRef={ref}
            type="더보기"
            onClick={() => {
              setIsVisible((state) => !state);
            }}
          />
        }
      />
      {isVisible && (
        <FloatingMenu
          position="fixed"
          items={
            isAuthor
              ? [
                  {
                    icon: <EditIcon />,
                    label: '수정하기',
                    onClick: async () =>
                      await router.push(`/diary/${id as string}/edit`),
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
      <Section>
        <DiaryDetailContainer {...diaryData} />
        <DiaryCommentsContainer diaryId={id as string} />
      </Section>
      <Modal
        isVisible={isVisibleDeleteModal}
        message={MODAL_MESSAGE.delete}
        confirmText={MODAL_BUTTON.delete}
        onClose={handleDeleteModal.close}
        onConfirm={handleDeleteDiary}
      />
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
  const headers = {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [queryKeys.diaries, id],
    async () => await api.getDiaryDetail({ id: id as string, config: headers }),
  );
  await queryClient.prefetchQuery(
    [queryKeys.comments, id],
    async () =>
      await api.getComments({ diaryId: id as string, config: headers }),
  );
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default DiaryDetailPage;

const Section = styled.section`
  margin-top: 54px;
`;
