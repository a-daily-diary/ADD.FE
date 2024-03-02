import styled from '@emotion/styled';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import type { GetServerSideProps, NextPage } from 'next';
import {
  FullPageLoading,
  ObserverTarget,
  ResponsiveImage,
  Seo,
} from 'components/common';
import { DiariesContainer } from 'components/diary';
import EmptyDiary from 'components/diary/EmptyDiary';
import { Header, HeaderLeft, HeaderRight } from 'components/layouts';
import { useIntersectionObserver } from 'hooks/common';
import { useDiaries } from 'hooks/services';

const Home: NextPage = () => {
  const { diariesData, isLoading, isError, fetchNextPage } = useDiaries();
  const { setTargetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
  });

  if (diariesData === undefined) return <FullPageLoading />;

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
      <DiariesContainer
        title="홈 일기 목록"
        diariesData={diariesData}
        empty={<EmptyDiary text="일기가 없습니다." />}
      />
      <ObserverTarget
        targetRef={setTargetRef}
        isLoading={isLoading}
        isError={isError}
      />
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

  return { props: { session } };
};

export default Home;

const BannerContainer = styled.div`
  margin-top: 54px;
  padding: 12px 20px 0;
`;
