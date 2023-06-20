import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { type ReactElement } from 'react';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout } from 'pages/_app';
import type { ErrorResponse } from 'types/Response';
import * as api from 'api';
import { EditIcon, TrashIcon } from 'assets/icons';
import FloatingMenu from 'components/common/FloatingMenu';
import Seo from 'components/common/Seo';
import { Layout, Header, HeaderLeft, HeaderRight } from 'components/layouts';
import DiaryCommentsContainer from 'containers/diary/DiaryCommentsContainer';
import DiaryContainer from 'containers/diary/DiaryContainer';
import { useClickOutside } from 'hooks';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { errorResponseMessage } from 'utils';

const DiaryDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { ref, isVisible, setIsVisible } = useClickOutside();

  const handleDeleteDiary = async () => {
    if (confirm('삭제하시겠습니까?')) {
      try {
        const message = await api.deleteDiaryDetail(id as string);
        alert(message);
        // TODO: 일기 삭제 후 라우팅 처리 수정
        router.back();
      } catch (error) {
        if (isAxiosError<ErrorResponse>(error)) {
          alert(errorResponseMessage(error.response?.data.message));
        }
      }
    }
  };

  return (
    <Section>
      <Header>
        <HeaderLeft type="이전" />
        <HeaderRight
          buttonRef={ref}
          type="더보기"
          onClick={() => {
            setIsVisible((state) => !state);
          }}
        />
        {isVisible && (
          <FloatingMenu
            items={[
              {
                icon: <EditIcon />,
                label: '수정하기',
                onClick: async () =>
                  await router.push(`/diary/${id as string}/edit`), // TODO: 일기 수정하기 페이지 생성 후 라우터 수정
              },
              {
                icon: <TrashIcon />,
                label: '삭제하기',
                onClick: handleDeleteDiary,
              },
            ]}
          />
        )}
      </Header>
      <DiaryContainer />
      <DiaryCommentsContainer />
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

DiaryDetailPage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <Seo title={'a daily diary'} />
      {page}
    </Layout>
  );
};

export default DiaryDetailPage;

const Section = styled.section`
  margin-top: 54px;
`;
