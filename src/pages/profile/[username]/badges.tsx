import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import type { GetServerSideProps, NextPage } from 'next';
import * as api from 'api';
import { ResponsiveImage, Seo } from 'components/common';
import { Header, HeaderLeft, HeaderTitle } from 'components/layouts';
import { PAGE_PATH } from 'constants/common';
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
      {/* TODO: TItle position center로 수정 */}
      <Header
        left={<HeaderLeft type="이전" />}
        title={<HeaderTitle title="내 배지" />}
      />
      <Section>
        <BadgeList>
          {badgesData?.map((badge) => {
            const { id, imgUrl, description, name } = badge;
            return (
              <BadgeItem key={id}>
                {/* TODO: 이미지 반응형으로 크기 수정? */}
                <Image
                  src={imgUrl}
                  alt={description}
                  width={80}
                  height={80}
                  priority
                />
                <span>{name}</span>
              </BadgeItem>
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

const BadgeItem = styled.li`
  display: grid;
  grid-template-rows: 80px;
  place-items: center;
  gap: 10px;
  ${({ theme }) => theme.fonts.body_08}
`;
