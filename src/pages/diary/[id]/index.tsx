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
import FloatingMenu from 'components/common/FloatingMenu';
import Seo from 'components/common/Seo';
import { Header, HeaderLeft, HeaderRight } from 'components/layouts';
import { queryKeys } from 'constants/queryKeys';
import { DiaryCommentsContainer, DiaryDetailContainer } from 'containers/diary';
import { useClickOutside } from 'hooks/common';
import { useDiary } from 'hooks/services';
import { useDeleteDiary } from 'hooks/services/mutations/useDeleteDiary';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { errorResponseMessage } from 'utils';

const DiaryDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  const { diaryData, isLoading } = useDiary(id as string);

  const { ref, isVisible, setIsVisible } = useClickOutside();

  const deleteDiaryMutation = useDeleteDiary({ id: id as string });

  const handleDeleteDiary = () => {
    if (confirm('삭제하시겠습니까?')) {
      try {
        deleteDiaryMutation({ id: id as string });
        // TODO: 일기 삭제 후 라우팅 처리 수정
        router.back();
      } catch (error) {
        if (isAxiosError<ErrorResponse>(error)) {
          alert(errorResponseMessage(error.response?.data.message));
        }
      }
    }
  };

  if (diaryData === undefined) return <div />;
  if (isLoading) return <div>Loading</div>;

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
                    onClick: handleDeleteDiary,
                  },
                ]
              : [
                  {
                    icon: <ReportIcon />,
                    label: '신고하기',
                    onClick: () => {
                      confirm('신고하시겠습니까?');
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
