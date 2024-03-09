import styled from '@emotion/styled';

import { useRouter } from 'next/router';
import type { NextPage } from 'next';

import { EnIcon, BlockIcon, PrivacyIcon, DiseaseIcon } from 'assets/icons';

import { Button, Seo } from 'components/common';
import { Header, HeaderLeft, HeaderTitle } from 'components/layouts';
import { PAGE_PATH } from 'constants/common';
import { colors } from 'constants/styles';
import { ScreenReaderOnly } from 'styles';

const MatchingRule: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Seo title="랜덤 매칭 규칙 | a daily diary" />
      <Section>
        <Title>랜덤 매칭 규칙</Title>
        <Header
          left={<HeaderLeft type="이전" />} // FIXME: 이전 버튼에 대해 클릭 이벤트 함수 props로 받을 수 있도록 셋팅
          title={<HeaderTitle title="랜덤 매칭" />}
          right={<div />}
        />
        <Article>
          <h2>
            즐거운 랜덤 매칭 통화를 위해
            <br />
            랜덤 매칭 규칙을 꼭 지켜주세요!
          </h2>
          <RuleList>
            <li>
              <ImageWrapper>
                <EnIcon />
              </ImageWrapper>
              <p>한국어 보다는 영어 사용을 권장합니다.</p>
            </li>
            <li>
              <ImageWrapper>
                <BlockIcon />
              </ImageWrapper>
              <p>
                특정 횟수의 경고를 받은 사용자는 일부 서비스 사용이 차단될 수
                있습니다.
              </p>
            </li>
            <li>
              <ImageWrapper>
                <PrivacyIcon />
              </ImageWrapper>
              <p>개인정보 노출 혹은 요청을 금지합니다.</p>
            </li>
            <li>
              <ImageWrapper>
                <DiseaseIcon />
              </ImageWrapper>
              <p>
                선정적인 언어, 혐오/차별/폭력적인 언어, 불법 행위/기타 행위를
                제한합니다.
              </p>
            </li>
          </RuleList>
          <Button
            type="button"
            shape="round"
            size="xl"
            onClick={async () => {
              await router.push(PAGE_PATH.matching_loading);
            }}
            text="랜덤매칭 시작"
          />
        </Article>
      </Section>
    </>
  );
};

export default MatchingRule;

const Section = styled.section`
  margin-top: 54px;
`;

const Title = styled.h1`
  ${ScreenReaderOnly}
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 38px 0;
  h2 {
    ${({ theme }) => theme.fonts.headline_02}
    text-align: center;
    margin-bottom: 26px;
  }
`;

const RuleList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
  li {
    display: flex;
    align-items: center;
    gap: 12px;
    p {
      ${({ theme }) => theme.fonts.body_04}
    }
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bg_02};
  width: 60px;
  height: 60px;
  border-radius: 20px;
`;
