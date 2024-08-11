import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { GetServerSidePropsContext, NextPage } from 'next';
import type { User } from 'next-auth';
import * as api from 'api';
import { BadgeDetailButton } from 'components/badge';
import { Seo } from 'components/common';
import { Header, HeaderLeft, HeaderTitle } from 'components/layouts';
import { queryKeys } from 'constants/services';
import { useBadges } from 'hooks/services';
import { getServerSidePropsWithAuth } from 'lib/auth';
import { getQueryParams } from 'utils';

const BadgePage: NextPage<{ username: string }> = ({ username }) => {
  const { badgesData } = useBadges({ username });

  return (
    <>
      <Seo title={`${username}님의 배지 | a daily diary`} />
      <Header
        left={<HeaderLeft type="이전" />}
        title={<HeaderTitle title={`${username}님의 배지`} position="center" />}
      />
      <Section>
        <BadgeList>
          {badgesData?.map((badge) => {
            const { id } = badge;
            return (
              <li key={id}>
                <BadgeDetailButton badge={badge} />
              </li>
            );
          })}
        </BadgeList>
      </Section>
    </>
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
    await queryClient.prefetchQuery([queryKeys.badges, username], async () => {
      return await api.getBadgesByUsername({ username, config: headers });
    });

    return { props: { dehydratedState: dehydrate(queryClient), username } };
  },
);

export default BadgePage;

const Section = styled.section`
  margin-top: 54px;
  padding: 30px 26px;
`;

const BadgeList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px 34px;
`;
