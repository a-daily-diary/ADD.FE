import styled from '@emotion/styled';
import type { ReactElement } from 'react';
import Seo from 'components/common/Seo';
import { Layout, Header, HeaderLeft, HeaderRight } from 'components/layouts';
import DiaryCommentsContainer from 'containers/diary/DiaryCommentsContainer';
import DiaryContainer from 'containers/diary/DiaryContainer';

const DiaryDetailPage = () => {
  return (
    <Section>
      <DiaryContainer />
      <DiaryCommentsContainer />
    </Section>
  );
};

DiaryDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Seo title={'a daily diary'} />
      <Header>
        <HeaderLeft type="이전" />
        <HeaderRight type="더보기" />
      </Header>
      {page}
    </Layout>
  );
};

export default DiaryDetailPage;

const Section = styled.section`
  margin-top: 54px;
`;
