import styled from '@emotion/styled';
import type { GetServerSideProps, NextPage } from 'next/types';
import * as api from 'api';
import { ResetPasswordForm } from 'components/account';
import { Seo } from 'components/common';
import { PAGE_PATH } from 'constants/common';
import { getQueryParam } from 'utils';

interface PageProps {
  email: string;
  token: string;
}

const ResetPassword: NextPage<PageProps> = ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  return (
    <>
      <Seo title={'비밀번호 재성정 | a daily diary'} />
      <ContentWrapper>
        <ResetPasswordForm email={email} token={token} />
      </ContentWrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const email = getQueryParam(query.email);
  const token = getQueryParam(query.token);

  const REDIRECT_LOGIN_PAGE_PROPS = {
    redirect: {
      destination: PAGE_PATH.account.login,
      permanent: false,
    },
  };

  if (email.length === 0 || token.length === 0) {
    return REDIRECT_LOGIN_PAGE_PROPS;
  } else {
    try {
      await api.tempTokenValidation({
        email: email[0],
        tempToken: token[0],
      });

      return { props: { email: email[0], token: token[0] } };
    } catch (error) {
      return REDIRECT_LOGIN_PAGE_PROPS;
    }
  }
};

export default ResetPassword;

const ContentWrapper = styled.section`
  margin-top: 54px;
  padding: 30px 20px;
`;
