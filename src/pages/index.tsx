import styled from '@emotion/styled';
import Link from 'next/link';
import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import ResponsiveImage from 'components/common/ResponsiveImage';
import Seo from 'components/common/Seo';
import DiaryList from 'components/diary/DiaryList';
import {
  Header,
  HeaderLeft,
  HeaderRight,
  Layout,
  Navbar,
} from 'components/layouts';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <BannerContainer>
        <Link href={'/write'}>
          <ResponsiveImage
            src="/images/main/banner/go_to_write.png"
            alt="오늘 영어 일기 쓰러가기"
            aspectRatio={640 / 132}
          />
        </Link>
      </BannerContainer>
      <DiaryList />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Seo title={'a daily diary'} />
      <Header>
        <HeaderLeft type="로고" />
        <HeaderRight type="검색" />
      </Header>
      {page}
      <Navbar />
    </Layout>
  );
};

export default Home;

const BannerContainer = styled.div`
  padding: 12px 20px 0;
`;
