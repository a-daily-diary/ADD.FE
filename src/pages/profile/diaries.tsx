import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import type { GetServerSideProps, NextPage } from 'next';
import * as api from 'api';
import { FullPageLoading, ObserverTarget, Seo } from 'components/common';
import { DiariesContainer } from 'components/diary';
import EmptyDiary from 'components/diary/EmptyDiary';
import { ProfileContainer, ProfileTab } from 'components/profile';
import { PAGE_PATH } from 'constants/common';
import { MY_PROFILE_TAB_LIST } from 'constants/profile';
import { queryKeys } from 'constants/services';
import { useIntersectionObserver } from 'hooks/common';
import { useUserDiaries } from 'hooks/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const MyProfileDiaries: NextPage = () => {
  const { data: session } = useSession();

  if (session === null) return <div>로그인이 필요합니다.</div>; // TODO: 로그인 페이지로 이동 모달 생성하여 적용하기

  const {
    userDiariesData,
    isLoading: isUserDiariesLoading,
    isError: isUserDiariesError,
    fetchNextPage: fetchUserDiariesNextPage,
  } = useUserDiaries(session.user.username);
  const { setTargetRef: setUserDiariesTargetRef } = useIntersectionObserver({
    onIntersect: fetchUserDiariesNextPage,
  });

  if (userDiariesData === undefined) {
    return <FullPageLoading />;
  }

  return (
    <>
      <Seo title="프로필 | a daily diary" />
      <ProfileContainer username={session.user.username} />

      <ProfileTab tabList={MY_PROFILE_TAB_LIST} />
      <DiariesContainer
        title="프로필 - 일기"
        diariesData={userDiariesData}
        empty={<EmptyDiary text="일기가 없습니다." />}
      />
      <ObserverTarget
        targetRef={setUserDiariesTargetRef}
        isLoading={isUserDiariesLoading}
        isError={isUserDiariesError}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

  if (session === null) {
    return {
      redirect: {
        destination: PAGE_PATH.account.login,
        permanent: false,
      },
    };
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
  return { props: { dehydratedState: dehydrate(queryClient), session } };
};

export default MyProfileDiaries;
