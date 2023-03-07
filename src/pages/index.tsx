import styled from '@emotion/styled';
import Head from 'next/head';
import Link from 'next/link';
import NextImage from 'components/common/NextImage';
import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import DiaryList from 'components/diary/DiaryList';
import Layout from 'components/layouts/Layout';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home | ADD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BannerContainer>
        <Link href={'/write'}>
          <NextImage
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
  return <Layout>{page}</Layout>;
};

export default Home;

const BannerContainer = styled.div`
  padding: 12px 20px 0;
`;
