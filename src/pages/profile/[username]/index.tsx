import { QueryClient, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { getServerSession } from 'next-auth';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import * as api from 'api';
import { Seo } from 'components/common';
import {
  ActivitiesContainer,
  ProfileContainer,
  ProfileTab,
} from 'components/profile';
import { PAGE_PATH } from 'constants/common';
import { queryKeys } from 'constants/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const YourProfile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username }) => {
  return (
    <>
      <Seo title={`${username} 프로필 | a daily diary`} />
      <ProfileContainer username={username} isMyProfile={false} />
      <ProfileTab username={username} />

      <ActivitiesContainer title={`${username} - 활동`} username={username} />
    </>
  );
};

export const getServerSideProps = (async (context) => {
  const { req, res, params } = context;
  const username = params?.username as string;

  const session = await getServerSession(req, res, authOptions);

  if (session === null) {
    return {
      redirect: {
        destination: PAGE_PATH.account.login,
        permanent: false,
      },
    };
  }

  const { accessToken, username: loggedInUsername } = session.user;

  if (loggedInUsername === username) {
    return {
      redirect: {
        destination: PAGE_PATH.profile.index,
        permanent: false,
      },
    };
  }

  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery([queryKeys.users, username], async () => {
      return await api.getProfileByUsername({ username, config: headers });
    });
    await queryClient.fetchQuery([queryKeys.badges, username], async () => {
      return await api.getBadgesByUsername({ username, config: headers });
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        notFound: true,
      };
    }
  }

  return { props: { dehydratedState: dehydrate(queryClient), username } };
}) satisfies GetServerSideProps;

export default YourProfile;
