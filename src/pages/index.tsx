import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import type { GetServerSideProps, NextPage } from 'next';
import * as api from 'api';
import ResponsiveImage from 'components/common/ResponsiveImage';
import Seo from 'components/common/Seo';
import { DiariesContainer } from 'components/diary';
import { Header, HeaderLeft, HeaderRight } from 'components/layouts';
import { queryKeys } from 'constants/queryKeys';

const Home: NextPage = () => {
  return (
    <>
      <Seo title={'a daily diary'} />
      <Header
        left={<HeaderLeft type="로고" />}
        right={<HeaderRight type="검색" />}
      />
      <BannerContainer>
        <Link href={'/diary'}>
          <ResponsiveImage
            src="/images/main/banner/go_to_write.png"
            alt="오늘 영어 일기 쓰러가기"
            aspectRatio={640 / 132}
          />
        </Link>
      </BannerContainer>
      <DiariesContainer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
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
    [queryKeys.diaries],
    async () =>
      await api.getDiaries({
        config: {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      }),
  );
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Home;

const BannerContainer = styled.div`
  margin-top: 54px;
  padding: 12px 20px 0;
`;
