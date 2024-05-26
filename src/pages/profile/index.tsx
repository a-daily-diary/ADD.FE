import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import type { GetServerSideProps, NextPage } from 'next';
import * as api from 'api';
import { ActivitiesContainer, ProfileLayout } from 'components/profile';
import { SERVER_SIDE_PROPS } from 'constants/server';
import { queryKeys } from 'constants/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const MyProfile: NextPage = () => {
  const { data: session } = useSession();

  if (session === null) return <div>로그인이 필요합니다.</div>; // TODO:

  return (
    <ProfileLayout isMyProfile username={session.user.username}>
      <ActivitiesContainer
        title="프로필 - 활동"
        username={session.user.username}
      />
    </ProfileLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

  if (session === null) {
    return SERVER_SIDE_PROPS.REDIRECT_LOGIN;
  }

  const { username, accessToken } = session.user;

  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([queryKeys.users, username], async () => {
    return await api.getProfileByUsername({ username, config: headers });
  });
  await queryClient.prefetchQuery([queryKeys.badges, username], async () => {
    return await api.getBadgesByUsername({ username, config: headers });
  });
  return { props: { dehydratedState: dehydrate(queryClient), session } };
};

export default MyProfile;
