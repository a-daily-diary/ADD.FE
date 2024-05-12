import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import type { GetServerSideProps, NextPage } from 'next';
import * as api from 'api';
import { FullPageLoading, ObserverTarget } from 'components/common';
import { DiariesContainer } from 'components/diary';
import EmptyDiary from 'components/diary/EmptyDiary';
import { ProfileLayout } from 'components/profile';
import { PAGE_PATH } from 'constants/common';
import { queryKeys } from 'constants/services';
import { useIntersectionObserver } from 'hooks/common';
import { useBookmarkedDiaries } from 'hooks/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const MyProfileBookmarks: NextPage = () => {
  const { data: session } = useSession();

  if (session === null) return <div>로그인이 필요합니다.</div>; // TODO: 로그인 페이지로 이동 모달 생성하여 적용하기

  const {
    bookmarkedDiariesData,
    isLoading: isBookmarkedDiariesLoading,
    isError: isBookmarkedDiariesError,
    fetchNextPage: fetchBookmarkedDiariesNextPage,
  } = useBookmarkedDiaries(session.user.username);
  const { setTargetRef: setBookmarkedDiariesTargetRef } =
    useIntersectionObserver({
      onIntersect: fetchBookmarkedDiariesNextPage,
    });

  if (bookmarkedDiariesData === undefined) {
    return <FullPageLoading />;
  }

  return (
    <ProfileLayout isMyProfile username={session.user.username}>
      <DiariesContainer
        title="프로필 - 북마크"
        diariesData={bookmarkedDiariesData}
        empty={<EmptyDiary text="북마크한 일기가 없습니다." />}
      />
      <ObserverTarget
        targetRef={setBookmarkedDiariesTargetRef}
        isLoading={isBookmarkedDiariesLoading}
        isError={isBookmarkedDiariesError}
      />
    </ProfileLayout>
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

export default MyProfileBookmarks;
