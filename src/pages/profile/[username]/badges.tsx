import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import type { GetServerSideProps, NextPage } from 'next';
import * as api from 'api';
import { BadgeDetailButton } from 'components/badge';
import { Seo } from 'components/common';
import { Header, HeaderLeft, HeaderTitle } from 'components/layouts';
import { SERVER_SIDE_PROPS } from 'constants/server';
import { queryKeys } from 'constants/services';
import { useBadges } from 'hooks/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const BadgePage: NextPage = () => {
  const router = useRouter();
  const {
    query: { username },
  } = router;
  const { badgesData } = useBadges({ username: username as string });

  return (
    <>
      <Seo title="내 배지 | a daily diary" />
      <Header
        left={<HeaderLeft type="이전" />}
        title={<HeaderTitle title="내 배지" position="center" />}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

  if (session === null) {
    return SERVER_SIDE_PROPS.REDIRECT_LOGIN;
  }

  const { username, accessToken } = session.user;

  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([queryKeys.badges, username], async () => {
    return await api.getBadgesByUsername({ username, config: headers });
  });
  return { props: { dehydratedState: dehydrate(queryClient), session } };
};

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
