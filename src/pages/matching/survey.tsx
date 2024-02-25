import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';

import type { SubmitHandler } from 'react-hook-form';
import type { MatchingFeedbackForm } from 'types/matching';

import { CheckedOffIcon, CheckedOnIcon } from 'assets/icons';
import { Seo } from 'components/common';
import FeedbackTypeCheckbox from 'components/matching/FeedbackTypeCheckbox';
import { ScreenReaderOnly } from 'styles';

const MatchingSurvey = () => {
  const router = useRouter();

  const { control, register, handleSubmit } = useForm<MatchingFeedbackForm>();

  const onSubmit: SubmitHandler<MatchingFeedbackForm> = async (data) => {
    console.log(data); // FIXME: 실제 API 연동할 때 사용될 데이터 console.log 입니다.

    await router.push('/');
  };

  const isBlockedMatching = useWatch({
    control,
    name: 'isBlockedMatching',
  });

  return (
    <>
      <Seo title="랜덤 매칭 설문 | a daily diary" />
      <Section>
        <Title>랜덤 매칭 설문</Title>
        <BoldParagraph>즐거운 통화하셨나요?</BoldParagraph>
        <RegularParagraph04>
          남겨주신 피드백은 상대방에게 전달되지 않습니다.
        </RegularParagraph04>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FeedbackTypeCheckbox register={register} />
          <RegularParagraph07>
            상대방에대한 피드백을 작성해주세요.
            <br />
            불쾌해요를 선택하셨다면 이유를 남겨주세요.
          </RegularParagraph07>
          <TextArea
            placeholder="피드백을 남겨주세요."
            {...register('message')}
          />
          <CheckBoxLabel>
            <input type="checkbox" {...register('isBlockedMatching')} />
            {isBlockedMatching ? <CheckedOnIcon /> : <CheckedOffIcon />}
            <p>이 사람이랑 전화하지 않을래요.</p>
          </CheckBoxLabel>
          <Button type="submit">피드백 작성 완료</Button>
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
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
  ${({ theme }) => theme.fonts.body_04};
  color: ${({ theme }) => theme.colors.gray_00};
  input {
    display: none;
  }
`;

const Button = styled.button`
  ${({ theme }) => theme.fonts.button_02};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary_00};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 17px 0;
  margin: 12px 0;
`;
