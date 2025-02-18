import { QueryClient, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import type { GetServerSidePropsContext, NextPage } from 'next';
import type { User } from 'next-auth';
import * as api from 'api';
import { FullPageLoading, ObserverTarget } from 'components/common';
import { DiariesContainer } from 'components/diary';
import EmptyDiary from 'components/diary/EmptyDiary';
import { ProfileLayout } from 'components/profile';
import { PAGE_QUERY_PARAM } from 'constants/common';
import { queryKeys } from 'constants/services';
import { useIntersectionObserver } from 'hooks/common';
import { useUserDiaries } from 'hooks/services';
import { getServerSidePropsWithAuth } from 'lib/auth';
import { getQueryParams } from 'utils';

interface YourProfileDiariesProps {
  username: string;
}

const YourProfileDiaries: NextPage<YourProfileDiariesProps> = ({
  username,
}) => {
  const router = useRouter();
  const searchKeyword = getQueryParams(
    router.query[PAGE_QUERY_PARAM.search],
  )[0];

  const {
    userDiariesData,
    isLoading: isUserDiariesLoading,
    isError: isUserDiariesError,
    fetchNextPage: fetchUserDiariesNextPage,
  } = useUserDiaries(username, searchKeyword);

  const { setTargetRef: setUserDiariesTargetRef } = useIntersectionObserver({
    onIntersect: fetchUserDiariesNextPage,
  });

  if (userDiariesData === undefined) {
    return <FullPageLoading />;
  }

  return (
    <ProfileLayout isMyProfile={false} username={username} searchable>
      <DiariesContainer
        title={`${username} 프로필 - 일기`}
        diariesData={userDiariesData}
        empty={<EmptyDiary text="일기가 없습니다." />}
        highlightKeyword={searchKeyword}
      />
      <ObserverTarget
        targetRef={setUserDiariesTargetRef}
        isLoading={isUserDiariesLoading}
        isError={isUserDiariesError}
      />
    </ProfileLayout>
  );
};

export const getServerSideProps = getServerSidePropsWithAuth(
  async (context: GetServerSidePropsContext) => {
    const { user, query } = context;
    const [username] = getQueryParams(query.username);

    const { accessToken } = user as User;

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
  },
);

export default YourProfileDiaries;
