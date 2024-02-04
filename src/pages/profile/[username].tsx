import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { getServerSession } from 'next-auth';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import * as api from 'api';
import { Seo, Tab } from 'components/common';
import { DiariesContainer } from 'components/diary';
import EmptyDiary from 'components/diary/EmptyDiary';
import { ProfileContainer } from 'components/profile';
import { queryKeys } from 'constants/queryKeys';
import { useTabIndicator } from 'hooks/common';
import { useBookmarkedDiaries, useUserDiaries } from 'hooks/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const PROFILE_TAB_LIST = [
  { id: 'activities', title: '활동' },
  { id: 'diaries', title: '일기' },
];

const YourProfile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username }) => {
  const { tabsRef, indicator, activeIndex, setActiveIndex } = useTabIndicator();

  const { userDiariesData, isLoading: isUserDiariesLoading } =
    useUserDiaries(username);
  const { bookmarkedDiariesData, isLoading: isBookmarkedDiariesLoading } =
    useBookmarkedDiaries(username);

  // TODO: Loading 컴포넌트 적용
  if (
    userDiariesData === undefined ||
    bookmarkedDiariesData === undefined ||
    isUserDiariesLoading ||
    isBookmarkedDiariesLoading
  )
    return <div>Loading</div>;

  return (
    <>
      <Seo title="프로필 | a daily diary" />
      <ProfileContainer username={username} isMyProfile={false} />
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
        {PROFILE_TAB_LIST[activeIndex].id === 'diaries' && (
          <DiariesContainer
            title={PROFILE_TAB_LIST[activeIndex].title}
            diariesData={userDiariesData}
            empty={<EmptyDiary text="일기가 없습니다." />}
          />
        )}
      </section>
    </>
  );
};

export const getServerSideProps = (async (
  context: GetServerSidePropsContext,
) => {
  const { req, res, params } = context;
  const username = params?.username as string;

  const session = await getServerSession(req, res, authOptions);

  if (session === null) {
    return {
      redirect: {
        destination: '/account/login',
        permanent: false,
      },
    };
  }

  const { accessToken, username: loggedInUsername } = session.user;

  if (loggedInUsername === username) {
    return {
      redirect: {
        destination: '/profile',
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
    await queryClient.fetchQuery(
      [queryKeys.diaries, username],
      async () => await api.getDiariesByUsername({ username, config: headers }),
    );
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

const TabButton = styled.button<{ active: boolean }>`
  ${({ theme }) => theme.fonts.headline_04};
`;
