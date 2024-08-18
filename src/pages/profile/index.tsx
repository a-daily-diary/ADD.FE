import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { GetServerSidePropsContext, NextPage } from 'next';
import type { User } from 'next-auth';
import * as api from 'api';
import { ActivitiesContainer, ProfileLayout } from 'components/profile';
import { queryKeys } from 'constants/services';
import { getServerSidePropsWithAuth } from 'lib/auth';

interface MyProfileProps {
  user: User;
}

const MyProfile: NextPage<MyProfileProps> = ({ user }) => {
  const { username } = user;

  return (
    <ProfileLayout isMyProfile username={username}>
      <ActivitiesContainer title="프로필 - 활동" username={username} />
    </ProfileLayout>
  );
};

export const getServerSideProps = getServerSidePropsWithAuth(
  async (context: GetServerSidePropsContext) => {
    const { user } = context;

    const { username, accessToken } = user as User;

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
      return await api.getBadgesByUsername({
        username,
        onlyPinned: true,
        config: headers,
      });
    });

    return { props: { dehydratedState: dehydrate(queryClient), user } };
  },
);

export default MyProfile;
