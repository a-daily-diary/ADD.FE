import styled from '@emotion/styled';
import type {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import * as api from 'api';
import { ResetPasswordForm } from 'components/account';
import { Seo } from 'components/common';
import { SERVER_SIDE_PROPS } from 'constants/server';
import { getServerSidePropsWithAuth } from 'lib/auth';
import { getQueryParams } from 'utils';

const ResetPassword: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ email, token }) => {
  return (
    <>
      <Seo title={'비밀번호 재성정 | a daily diary'} />
      <ContentWrapper>
        <ResetPasswordForm email={email} token={token} />
      </ContentWrapper>
    </>
  );
};

export const getServerSideProps = getServerSidePropsWithAuth(
  async (context: GetServerSidePropsContext) => {
    const { user, query } = context;

    if (user) {
      const { email, accessToken } = user;
      return { props: { email, token: accessToken } };
    }

    const [email] = getQueryParams(query.email);
    const [token] = getQueryParams(query.token);

    if (!email || !token) {
      return SERVER_SIDE_PROPS.REDIRECT_LOGIN;
    }

    try {
      await api.tempTokenValidation({
        email,
        tempToken: token,
      });

      return { props: { email, token } };
    } catch (error) {
      return SERVER_SIDE_PROPS.REDIRECT_LOGIN;
    }
  },
);

export default ResetPassword;

const ContentWrapper = styled.section`
  margin-top: 54px;
  padding: 30px 20px;
`;
