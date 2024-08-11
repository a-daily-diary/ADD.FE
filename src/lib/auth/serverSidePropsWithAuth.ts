import { getServerSession } from 'next-auth';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { SERVER_SIDE_PROPS } from 'constants/server';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export const getServerSidePropsWithAuth =
  (getServerSideProps: GetServerSideProps) =>
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
