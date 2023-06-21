import styled from '@emotion/styled';
import Link from 'next/link';
import type { NextPage } from 'next';
import ResponsiveImage from 'components/common/ResponsiveImage';
import Seo from 'components/common/Seo';
import DiaryList from 'components/diary/DiaryList';
import { Header, HeaderLeft, HeaderRight } from 'components/layouts';

const Home: NextPage = () => {
  return (
    <>
      <Seo title={'a daily diary'} />
      <Header
        left={<HeaderLeft type="로고" />}
        right={<HeaderRight type="검색" />}
      />
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

export default Home;

const BannerContainer = styled.div`
  margin-top: 54px;
  padding: 12px 20px 0;
`;
