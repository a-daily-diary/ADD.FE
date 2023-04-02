import styled from '@emotion/styled';
import Link from 'next/link';
import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import ResponsiveImage from 'components/common/ResponsiveImage';
import Seo from 'components/common/Seo';
import DiaryList from 'components/diary/DiaryList';
import Layout from 'components/layouts/Layout';
import Header from 'components/layouts/header/Header';
import HeaderLeft from 'components/layouts/header/HeaderLeft';
import HeaderRight from 'components/layouts/header/HeaderRight';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Seo title={'a daily diary'} />
      <BannerContainer>
        <Link href={'/write'}>
          <ResponsiveImage
            src="/images/main/banner/go_to_write.png"
            alt="오늘 영어 일기 쓰러가기"
            width={640}
            height={132}
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
      <Header>
        <HeaderLeft menu="로고" />
        <HeaderRight menu="검색" />
      </Header>
      {page}
    </Layout>
  );
};

export default Home;

const BannerContainer = styled.div`
  padding: 12px 20px 0;
`;
