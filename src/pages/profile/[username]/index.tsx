import { QueryClient, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import type { GetServerSidePropsContext, NextPage } from 'next';
import type { User } from 'next-auth';
import * as api from 'api';
import { ActivitiesContainer, ProfileLayout } from 'components/profile';
import { PAGE_PATH } from 'constants/common';
import { queryKeys } from 'constants/services';
import { getServerSidePropsWithAuth } from 'lib/auth';
import { getQueryParams } from 'utils';

const YourProfile: NextPage<{ username: string }> = ({ username }) => {
  return (
    <ProfileLayout isMyProfile={false} username={username}>
      <ActivitiesContainer title={`${username} - 활동`} username={username} />
    </ProfileLayout>
  );
};

export const getServerSideProps = getServerSidePropsWithAuth(
  async (context: GetServerSidePropsContext) => {
    const { user, query } = context;
    const [username] = getQueryParams(query.username);

    const { accessToken, username: loggedInUsername } = user as User;

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
        return await api.getBadgesByUsername({
          username,
          onlyPinned: true,
          config: headers,
        });
      });
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          notFound: true,
        };
      }
    }

    return { props: { dehydratedState: dehydrate(queryClient), username } };
  },
);

export default YourProfile;
