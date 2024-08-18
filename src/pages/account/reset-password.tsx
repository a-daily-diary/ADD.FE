import styled from '@emotion/styled';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next/types';
import * as api from 'api';
import { ResetPasswordForm } from 'components/account';
import { Seo } from 'components/common';
import { SERVER_SIDE_PROPS } from 'constants/server';
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

export const getServerSideProps = (async (context) => {
  const { query } = context;
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
}) satisfies GetServerSideProps;

export default ResetPassword;

const ContentWrapper = styled.section`
  margin-top: 54px;
  padding: 30px 20px;
`;
