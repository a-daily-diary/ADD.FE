import styled from '@emotion/styled';

import { useRouter } from 'next/router';
import type { NextPage } from 'next';

import { Seo } from 'components/common';
import { Header, HeaderLeft, HeaderTitle } from 'components/layouts';
import { ScreenReaderOnly } from 'styles';

const MatchingRule: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Seo title="일기 작성 | a daily diary" />
      <Section>
        <Title>랜덤 매칭 규칙</Title>
        <Header
          left={
            <HeaderLeft
              type="이전"
              onClick={() => {
                router.back();
              }}
            />
          }
          title={<HeaderTitle title="랜덤 매칭" />}
          right={<div />}
        />
        <article>article area</article>
      </Section>
    </>
  );
};

export default MatchingRule;

const Section = styled.section`
  margin-top: 54px;
  min-height: 100vh;
`;

const Title = styled.h1`
  ${ScreenReaderOnly}
`;
