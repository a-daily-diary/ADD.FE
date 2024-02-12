import styled from '@emotion/styled';
import React from 'react';

import { Button } from 'components/common';
import { ScreenReaderOnly } from 'styles';

const RecommendTopic = () => {
  return (
    <Container>
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
      <Button type="button" shape="round" size="md" text="다음 질문" />
    </Container>
  );
};

export default RecommendTopic;

const SubTitle = styled.h2`
  ${ScreenReaderOnly}
`;

const Container = styled.article`
  margin-top: 30px;
`;

const Card = styled.div`
  box-shadow: 0px 2px 10px 0px #00000024;
  border-radius: 16px;
  margin-bottom: 12px;
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
