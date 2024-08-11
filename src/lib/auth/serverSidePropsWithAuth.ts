import { getServerSession } from 'next-auth';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import type { GetServerSidePropsContext as GetServerSidePropsContextType } from 'next/types';
import { SERVER_SIDE_PROPS } from 'constants/server';
import { authOptions } from 'pages/api/auth/[...nextauth]';

type WithAuthOptions<P> = (
  context: GetServerSidePropsContextType,
) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>;

export const getServerSidePropsWithAuth =
  <P extends Record<string, unknown>>(getServerSideProps: WithAuthOptions<P>) =>
  async (context: GetServerSidePropsContext) => {
    const { req, res } = context;
    const session = await getServerSession(req, res, authOptions);

    if (session === null) {
      return SERVER_SIDE_PROPS.REDIRECT_LOGIN;
    }

    context.user = session.user;

    const serverSideProps = await getServerSideProps(context);

    return { ...serverSideProps };
  };
