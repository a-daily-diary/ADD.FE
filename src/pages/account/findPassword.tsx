import styled from '@emotion/styled';
import type { NextPage } from 'next/types';
import { FindPasswordForm } from 'components/account';
import { Seo } from 'components/common';
import { Header, HeaderLeft, HeaderTitle } from 'components/layouts';

const FindPassword: NextPage = () => {
  return (
    <>
      <Seo title={'비밀번호 찾기 | a daily diary'} />
      <Header
        left={<HeaderLeft type="이전" />}
        title={<HeaderTitle title={'비밀번호 찾기'} position={'left'} />}
      />
      <ContentWrapper>
        <FindPasswordForm />
      </ContentWrapper>
    </>
  );
};

export default FindPassword;

const ContentWrapper = styled.section`
  margin-top: 54px;
  padding: 30px 20px;
`;
