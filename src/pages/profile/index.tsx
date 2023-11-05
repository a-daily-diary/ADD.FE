import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import type { GetServerSideProps, NextPage } from 'next';
import * as api from 'api';
import { Seo, Tab } from 'components/common';
import { DiariesContainer } from 'components/diary';
import EmptyDiary from 'components/diary/EmptyDiary';
import { ProfileContainer } from 'components/profile';
import { queryKeys } from 'constants/queryKeys';
import { useTabIndicator } from 'hooks/common';
import { useBookmarkedDiaries, useUserDiaries } from 'hooks/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { ScreenReaderOnly } from 'styles';

const PROFILE_TAB_LIST = [
  { id: 'activities', title: '활동' },
  { id: 'diaries', title: '일기' },
  { id: 'bookmarks', title: '북마크' },
];

const Profile: NextPage = () => {
  const { tabsRef, indicator, activeIndex, setActiveIndex } = useTabIndicator();

  const { data: session } = useSession();

  if (session === null) return <div>로그인이 필요합니다.</div>; // TODO: 로그인 페이지로 이동 모달 생성하여 적용하기

  const { userDiariesData, isLoading: isUserDiariesLoading } = useUserDiaries(
    session.user.username,
  );
  const { bookmarkedDiariesData, isLoading: isBookmarkedDiariesLoading } =
    useBookmarkedDiaries(session.user.username);

  if (userDiariesData === undefined || bookmarkedDiariesData === undefined)
    return <div />;
  if (isUserDiariesLoading || isBookmarkedDiariesLoading)
    return <div>Loading</div>;

  return (
    <>
      <Seo title="프로필 | a daily diary" />
      <ProfileContainer username={session.user.username} />
      <section>
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
        <article>
          {PROFILE_TAB_LIST[activeIndex].id === 'diaries' && (
            <>
              <Title>{PROFILE_TAB_LIST[activeIndex].title}</Title>
              <DiariesContainer
                diariesData={userDiariesData}
                empty={<EmptyDiary text="일기가 없습니다." />}
              />
            </>
          )}
          {PROFILE_TAB_LIST[activeIndex].id === 'bookmarks' && (
            <>
              <Title>{PROFILE_TAB_LIST[activeIndex].title}</Title>
              <DiariesContainer
                diariesData={bookmarkedDiariesData}
                empty={<EmptyDiary text="북마크한 일기가 없습니다." />}
              />
            </>
          )}
        </article>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

  if (session === null) {
    return {
      redirect: {
        destination: '/account/login',
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
  await queryClient.prefetchQuery(
    [queryKeys.diaries, username],
    async () => await api.getDiariesByUsername({ username, config: headers }),
  );
  await queryClient.prefetchQuery(
    [queryKeys.diaries, username],
    async () =>
      await api.getBookmarkedDiariesByUsername({ username, config: headers }),
  );
  return { props: { dehydratedState: dehydrate(queryClient), session } };
};

export default Profile;

const TabButton = styled.button<{ active: boolean }>`
  ${({ theme }) => theme.fonts.headline_04};
`;

const Title = styled.h2`
  ${ScreenReaderOnly}
`;
