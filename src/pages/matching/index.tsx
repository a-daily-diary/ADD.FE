import styled from '@emotion/styled';

import { useRouter } from 'next/router';
import type { NextPage } from 'next';

import { Button, Seo } from 'components/common';
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
        <Article>
          <h2>즐거운 랜던매칭 통화를 위해 랜덤 매칭 규칙을 꼭 지켜주세요!</h2>
          <ul>
            {Array.from({ length: 15 }).map((_, idx) => {
              const key = `loop-${idx}`;
              return (
                <li key={key}>
                  <span>image</span>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Vel, modi.
                  </p>
                </li>
              );
            })}
          </ul>
          <Button type="button" pattern="round" size="xl">
            랜덤매칭 시작
          </Button>
        </Article>
      </Section>
    </>
  );
};

export default MatchingRule;

const Section = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Title = styled.h1`
  ${ScreenReaderOnly}
`;

const Article = styled.article`
  flex: 1;
  overflow: auto;
`;
