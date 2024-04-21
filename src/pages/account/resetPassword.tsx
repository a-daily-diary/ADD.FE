import styled from '@emotion/styled';
import type { NextPage } from 'next/types';
import { ResetPasswordForm } from 'components/account';
import { Seo } from 'components/common';

const ResetPassword: NextPage = () => {
  return (
    <>
      <Seo title={'비밀번호 재성정 | a daily diary'} />
      <ContentWrapper>
        <ResetPasswordForm />
      </ContentWrapper>
    </>
  );
};

export default ResetPassword;

const ContentWrapper = styled.section`
  margin-top: 54px;
  padding: 30px 20px;
`;
