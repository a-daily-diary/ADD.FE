import styled from '@emotion/styled';
import React from 'react';

import {
  SurveyBadIcon,
  SurveyEngIcon,
  SurveyFunIcon,
  SurveyNiceIcon,
} from 'assets/icons';
import { Seo } from 'components/common';
import FeedbackTypeCheckbox from 'components/matching/FeedbackTypeCheckbox';
import { colors } from 'constants/styles';
import { ScreenReaderOnly, theme } from 'styles';

const MatchingSurvey = () => {
  return (
    <>
      <Seo title="랜덤 매칭 설문 | a daily diary" />
      <Section>
        <Title>랜덤 매칭 설문</Title>
        <BoldParagraph>즐거운 통화하셨나요?</BoldParagraph>
        <RegularParagraph04 color={colors.gray_02}>
          남겨주신 피드백은 상대방에게 전달되지 않습니다.
        </RegularParagraph04>
        <form>
          <Grid2Column>
            <FeedbackTypeCheckbox>
              <SurveyNiceIcon />
              <RegularSpan>친절해요</RegularSpan>
            </FeedbackTypeCheckbox>
            <FeedbackTypeCheckbox>
              <SurveyEngIcon />
              <RegularSpan>영어를 잘해요</RegularSpan>
            </FeedbackTypeCheckbox>
            <FeedbackTypeCheckbox>
              <SurveyFunIcon />
              <RegularSpan>재밌어요</RegularSpan>
            </FeedbackTypeCheckbox>
            <FeedbackTypeCheckbox>
              <SurveyBadIcon />
              <RegularSpan>불쾌해요</RegularSpan>
            </FeedbackTypeCheckbox>
          </Grid2Column>
          <div>
            <RegularParagraph07>
              상대방에대한 피드백을 작성해주세요.
              <br />
              불쾌해요를 선택하셨다면 이유를 남겨주세요.
            </RegularParagraph07>
            <TextArea placeholder="피드백을 남겨주세요." />
          </div>
          <CheckBoxLabel>
            <input type="checkbox" />
            <RegularSpan>이 사람이랑 전화하지 않을래요.</RegularSpan>
          </CheckBoxLabel>
          <ButtonStyle type="submit" isActive={false}>
            피드백 작성 완료
          </ButtonStyle>
        </form>
      </Section>
    </>
  );
};

export default MatchingSurvey;

const Section = styled.section`
  text-align: center;
  margin-top: 54px;
  padding: 0 20px;
`;

const Title = styled.h1`
  ${ScreenReaderOnly}
`;

const Grid2Column = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-evenly;
  row-gap: 30px;
  margin-bottom: 60px;
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
`;

const BoldParagraph = styled.p`
  ${({ theme }) => theme.fonts.headline_02};
  margin-bottom: 10px;
`;

const RegularParagraph04 = styled.p`
  ${({ theme }) => theme.fonts.body_04};
  color: ${({ theme }) => theme.colors.gray_02};
  margin-bottom: 40px;
`;

const RegularParagraph07 = styled.p`
  ${({ theme }) => theme.fonts.body_07};
  color: ${({ theme }) => theme.colors.gray_00};
`;

const RegularSpan = styled.span`
  ${({ theme }) => theme.fonts.body_04};
  color: ${({ theme }) => theme.colors.gray_00};
`;

const TextArea = styled.textarea`
  ${({ theme }) => theme.fonts.body_07};
  color: ${({ theme }) => theme.colors.gray_00};
  border: 1px solid ${({ theme }) => theme.colors.gray_06};
  border-radius: 16px;
  width: 100%;
  min-height: 100px;
  overflow: auto;
  padding: 16px;
  margin-top: 10px;
`;

const CheckBoxLabel = styled.label`
  float: left;
  margin-top: 40px;
  input {
    margin-right: 10px;
  }
`;

const ButtonStyle = styled.button<{
  isActive: boolean;
}>`
  ${theme.fonts.button_02};
  width: 100%;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary_00 : theme.colors.gray_04};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 17px 0;
  margin: 12px 0;
`;
