import { QueryClient, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { getServerSession } from 'next-auth';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import * as api from 'api';
import { FullPageLoading, ObserverTarget } from 'components/common';
import { DiariesContainer } from 'components/diary';
import EmptyDiary from 'components/diary/EmptyDiary';
import { ProfileLayout } from 'components/profile';
import { PAGE_PATH } from 'constants/common';
import { queryKeys } from 'constants/services';
import { useIntersectionObserver } from 'hooks/common';
import { useUserDiaries } from 'hooks/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const YourProfileDiaries: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username }) => {
  const {
    userDiariesData,
    isLoading: isUserDiariesLoading,
    isError: isUserDiariesError,
    fetchNextPage: fetchUserDiariesNextPage,
  } = useUserDiaries(username);
  const { setTargetRef: setUserDiariesTargetRef } = useIntersectionObserver({
    onIntersect: fetchUserDiariesNextPage,
  });

  if (userDiariesData === undefined) {
    return <FullPageLoading />;
  }

  return (
    <ProfileLayout isMyProfile={false} username={username}>
      <DiariesContainer
        title={`${username} 프로필 - 일기`}
        diariesData={userDiariesData}
        empty={<EmptyDiary text="일기가 없습니다." />}
      />
      <ObserverTarget
        targetRef={setUserDiariesTargetRef}
        isLoading={isUserDiariesLoading}
        isError={isUserDiariesError}
      />
    </ProfileLayout>
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

  const { accessToken } = session.user;

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
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        notFound: true,
      };
    }
  }

  return { props: { dehydratedState: dehydrate(queryClient), username } };
}) satisfies GetServerSideProps;

export default YourProfileDiaries;
