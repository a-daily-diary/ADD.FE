import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import type { GetServerSideProps, NextPage } from 'next';
import * as api from 'api';
import { FullPageLoading, ObserverTarget, Seo, Tab } from 'components/common';
import { DiariesContainer } from 'components/diary';
import EmptyDiary from 'components/diary/EmptyDiary';
import { ProfileContainer, ActivitiesContainer } from 'components/profile';
import { PAGE_PATH } from 'constants/common';
import { queryKeys } from 'constants/services';
import { useIntersectionObserver, useTabIndicator } from 'hooks/common';
import { useBookmarkedDiaries, useUserDiaries } from 'hooks/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const PROFILE_TAB_LIST = [
  { id: 'activities', title: '활동' },
  { id: 'diaries', title: '일기' },
  { id: 'bookmarks', title: '북마크' },
];

const MyProfile: NextPage = () => {
  const { tabsRef, indicator, activeIndex, setActiveIndex } = useTabIndicator();

  const { data: session } = useSession();

  if (session === null) return <div>로그인이 필요합니다.</div>; // TODO: 로그인 페이지로 이동 모달 생성하여 적용하기

  const {
    userDiariesData,
    isLoading: isUserDiariesLoading,
    isError: isUserDiariesError,
    fetchNextPage: fetchUserDiariesNextPage,
  } = useUserDiaries(session.user.username);
  const {
    bookmarkedDiariesData,
    isLoading: isBookmarkedDiariesLoading,
    isError: isBookmarkedDiariesError,
    fetchNextPage: fetchBookmarkedDiariesNextPage,
  } = useBookmarkedDiaries(session.user.username);
  const { setTargetRef: setUserDiariesTargetRef } = useIntersectionObserver({
    onIntersect: fetchUserDiariesNextPage,
  });
  const { setTargetRef: setBookmarkedDiariesTargetRef } =
    useIntersectionObserver({
      onIntersect: fetchBookmarkedDiariesNextPage,
    });

  if (userDiariesData === undefined || bookmarkedDiariesData === undefined) {
    return <FullPageLoading />;
  }

  return (
    <>
      <Seo title="프로필 | a daily diary" />
      <ProfileContainer username={session.user.username} />
      <Tab indicator={indicator}>
        {PROFILE_TAB_LIST.map((tab, index) => {
          const { id, title } = tab;
          return (
            <li key={`tab-list-${id}`}>
              <TabButton
                type="button"
                ref={(el) => (tabsRef.current[index] = el)}
                onClick={() => {
                  setActiveIndex(index);
                }}
                active={activeIndex === index}
              >
                {title}
              </TabButton>
            </li>
          );
        })}
      </Tab>
      {PROFILE_TAB_LIST[activeIndex].id === 'activities' && (
        <ActivitiesContainer title={PROFILE_TAB_LIST[activeIndex].title} />
      )}
      {PROFILE_TAB_LIST[activeIndex].id === 'diaries' && (
        <>
          <DiariesContainer
            title={PROFILE_TAB_LIST[activeIndex].title}
            diariesData={userDiariesData}
            empty={<EmptyDiary text="일기가 없습니다." />}
          />
          <ObserverTarget
            targetRef={setUserDiariesTargetRef}
            isLoading={isUserDiariesLoading}
            isError={isUserDiariesError}
          />
        </>
      )}
      {PROFILE_TAB_LIST[activeIndex].id === 'bookmarks' && (
        <>
          <DiariesContainer
            title={PROFILE_TAB_LIST[activeIndex].title}
            diariesData={bookmarkedDiariesData}
            empty={<EmptyDiary text="북마크한 일기가 없습니다." />}
          />
          <ObserverTarget
            targetRef={setBookmarkedDiariesTargetRef}
            isLoading={isBookmarkedDiariesLoading}
            isError={isBookmarkedDiariesError}
          />
        </>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

  if (session === null) {
    return {
      redirect: {
        destination: PAGE_PATH().account.login,
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

export default MyProfile;

const TabButton = styled.button<{ active: boolean }>`
  ${({ theme }) => theme.fonts.headline_04};
`;
