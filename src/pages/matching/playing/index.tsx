import styled from '@emotion/styled';

import React from 'react';
import type { NextPage } from 'next';

import { MicrophoneOffIcon, EndCallIcon } from 'assets/icons';
import { Button, Seo } from 'components/common';
import MatchingUserInfo from 'components/matching/MatchingUserInfo';
import { colors } from 'constants/styles';
import { ScreenReaderOnly } from 'styles';

const MatchingPlaying: NextPage = () => {
  return (
    <>
      <Seo title="랜덤 매칭 | a daily diary" />
      <Section>
        <Title>랜덤 매칭</Title>
        <MatchingUserInfo />
        <MiddleArea className="middle-area">
          <SubTitle>추천 대화</SubTitle>
          <Card>
            <RegularParagraph>추천하는 대화 주제</RegularParagraph>
            <strong>Hobby</strong>
            <span>취미</span>
            <DivisionLine />
            <BoldParagraph>What is your hobby?</BoldParagraph>
            <SmallParagraph>취미가 무엇인가요?</SmallParagraph>
          </Card>
          {/* FIXME: 버튼 background color 변경 필요 */}
          <Button type="button" pattern="round" size="md">
            다음 질문
          </Button>
        </MiddleArea>
        <BottomArea className="bottom-area">
          <SubTitle>통화 제어</SubTitle>
          <CircleButton type="button" backgroundColor={colors.bg_02}>
            <Tooltip>마이크를 켜주세요!</Tooltip>
            <MicrophoneOffIcon />
            <span>마이크 off</span>
          </CircleButton>
          <CircleButton type="button" backgroundColor={colors.red}>
            <EndCallIcon />
            <span>통화 종료</span>
          </CircleButton>
        </BottomArea>
      </Section>
    </>
  );
};

export default MatchingPlaying;

const Title = styled.h1`
  ${ScreenReaderOnly}
`;

const SubTitle = styled.h2`
  ${ScreenReaderOnly}
`;

const Section = styled.section`
  text-align: center;
  padding: 0 20px;
`;

const MiddleArea = styled.article``;

const Card = styled.div`
  box-shadow: 0px 2px 10px 0px #00000024;
  border-radius: 16px;
  margin: 30px 0 12px;
  padding: 28px 20px 23px;
  strong {
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 34px;
    color: ${({ theme }) => theme.colors.primary_00};
    margin-right: 8px;
  }
  span {
    ${({ theme }) => theme.fonts.body_06};
    color: ${({ theme }) => theme.colors.gray_00};
  }
`;

const BoldParagraph = styled.p`
  ${({ theme }) => theme.fonts.headline_04};
`;

const RegularParagraph = styled.p`
  ${({ theme }) => theme.fonts.body_06};
  color: ${({ theme }) => theme.colors.gray_01};
  margin-bottom: 4px;
`;

const SmallParagraph = styled.p`
  ${({ theme }) => theme.fonts.body_09};
  color: ${({ theme }) => theme.colors.gray_01};
`;

const DivisionLine = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray_06};
  margin: 23px 0;
`;

const BottomArea = styled.article`
  display: flex;
  justify-content: space-around;
  margin: 53px 0 30px;
`;

const CircleButton = styled.button<{
  backgroundColor: string;
}>`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: ${(props) => props.backgroundColor};
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  span {
    position: absolute;
    bottom: -26px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    color: ${({ theme }) => theme.colors.gray_00};
    ${({ theme }) => theme.fonts.body_07}
  }
`;

const Tooltip = styled.div`
  ${({ theme }) => theme.fonts.button_02}
  position: absolute;
  top: -46px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  background-color: ${({ theme }) => theme.colors.primary_00};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  padding: 10px 20px;
  &::before {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.primary_00};
  }
`;
