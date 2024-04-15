import styled from '@emotion/styled';

import type { NextPage } from 'next';
import { Seo } from 'components/common';
import MatchingController from 'components/matching/MatchingController';
import MatchingUserInfo from 'components/matching/MatchingUserInfo';
import RecommendTopic from 'components/matching/RecommendTopic';
import { useAuthenticationState } from 'hooks/services/common/useAuthenticationState';
import { ScreenReaderOnly } from 'styles';

const MatchingPlaying: NextPage = () => {
  const { user, status } = useAuthenticationState();

  return (
    <>
      <Seo title="랜덤 매칭 | a daily diary" />
      <Section>
        <Title>랜덤 매칭</Title>
        {status === 'loading' ? (
          <div>User information Loading</div>
        ) : (
          <MatchingUserInfo
            username={user.username}
            thumbnailUrl={user.imgUrl}
          />
        )}
        <RecommendTopic />
        <MatchingController />
      </Section>
    </>
  );
};

export default MatchingPlaying;

const Title = styled.h1`
  ${ScreenReaderOnly}
`;

const Section = styled.section`
  text-align: center;
  padding: 0 20px;
`;
