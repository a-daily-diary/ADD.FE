import styled from '@emotion/styled';

import React from 'react';
import type { NextPage } from 'next';

import { Seo } from 'components/common';
import MatchingController from 'components/matching/MatchingController';
import MatchingUserInfo from 'components/matching/MatchingUserInfo';
import RecommendTopic from 'components/matching/RecommendTopic';
import { ScreenReaderOnly } from 'styles';

const MatchingPlaying: NextPage = () => {
  return (
    <>
      <Seo title="랜덤 매칭 | a daily diary" />
      <Section>
        <Title>랜덤 매칭</Title>
        <MatchingUserInfo style={{ marginTop: '48px' }} />
        <RecommendTopic style={{ marginTop: '30px' }} />
        <MatchingController style={{ margin: '53px 0 30px' }} />
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
