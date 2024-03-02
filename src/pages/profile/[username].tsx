import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { getServerSession } from 'next-auth';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import * as api from 'api';
import { Loading, ObserverTarget, Seo, Tab } from 'components/common';
import { DiariesContainer } from 'components/diary';
import EmptyDiary from 'components/diary/EmptyDiary';
import { ProfileContainer } from 'components/profile';
import { queryKeys } from 'constants/service';
import { useIntersectionObserver, useTabIndicator } from 'hooks/common';
import { useUserDiaries } from 'hooks/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const PROFILE_TAB_LIST = [
  { id: 'activities', title: '활동' },
  { id: 'diaries', title: '일기' },
];

const YourProfile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username }) => {
  const { tabsRef, indicator, activeIndex, setActiveIndex } = useTabIndicator();

  const { userDiariesData, isLoading, isError, fetchNextPage } =
    useUserDiaries(username);
  const { setTargetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
  });

  if (userDiariesData === undefined) return <Loading />;

  return (
    <>
      <Seo title="프로필 | a daily diary" />
      <ProfileContainer username={username} isMyProfile={false} />
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
        <>
          <DiariesContainer
            title={PROFILE_TAB_LIST[activeIndex].title}
            diariesData={userDiariesData}
            empty={<EmptyDiary text="일기가 없습니다." />}
          />
          <ObserverTarget
            targetRef={setTargetRef}
            isLoading={isLoading}
            isError={isError}
          />
        </>
      )}
    </>
  );
};

export const getServerSideProps = (async (context) => {
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
