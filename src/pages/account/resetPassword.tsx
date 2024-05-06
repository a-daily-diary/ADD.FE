import styled from '@emotion/styled';
import type { GetServerSideProps, NextPage } from 'next/types';
import * as api from 'api';
import { ResetPasswordForm } from 'components/account';
import { Seo } from 'components/common';
import { PAGE_PATH } from 'constants/common';
import { getQueryParams } from 'utils';

interface ResetPasswordPageProps {
  email: string;
  token: string;
}

const ResetPassword: NextPage<ResetPasswordPageProps> = ({
  email,
  token,
}: ResetPasswordPageProps) => {
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
  const [email] = getQueryParams(query.email);
  const [token] = getQueryParams(query.token);

  const REDIRECT_LOGIN_PAGE_PROPS = {
    redirect: {
      destination: PAGE_PATH.account.login,
      permanent: false,
    },
  };

  if (!email || !token) {
    return REDIRECT_LOGIN_PAGE_PROPS;
  }

  try {
    await api.tempTokenValidation({
      email,
      tempToken: token,
    });

    return { props: { email, token } };
  } catch (error) {
    return REDIRECT_LOGIN_PAGE_PROPS;
  }
};

export default ResetPassword;

const ContentWrapper = styled.section`
  margin-top: 54px;
  padding: 30px 20px;
`;
