import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { SubmitHandler } from 'react-hook-form';
import type { MatchingFeedbackForm } from 'types/matching';

import { CheckedOffIcon, CheckedOnIcon } from 'assets/icons';
import { Seo } from 'components/common';
import FeedbackTypeCheckbox from 'components/matching/FeedbackTypeCheckbox';
import { PAGE_PATH } from 'constants/common';
import { useCreateMatchingFeedback } from 'hooks/services/mutations/useCreateMatchingFeedback';
import { useRecentMatchingHistory } from 'hooks/services/queries/useRecentMatchingHistory';
import { ScreenReaderOnly } from 'styles';

const MatchingSurvey = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<MatchingFeedbackForm>();

  // TODO: BlackList 기능은 별도의 이슈에서 작업할 예정입니다.
  const [shouldBlackList, setShouldBackList] = useState<boolean>(false);

  const { data: matchingHistory } = useRecentMatchingHistory();

  const { mutate } = useCreateMatchingFeedback();

  const onSubmit: SubmitHandler<MatchingFeedbackForm> = (formData) => {
    if (!matchingHistory) return;

    const { id, matchedUser } = matchingHistory;

    mutate(
      {
        matchingHistoryId: id,
        matchedUserId: matchedUser.id,
        ...formData,
      },
      {
        onSuccess: () => {
          void router.push(PAGE_PATH.main);
        },
        onError: () => {
          alert('의도하지 않은 에러가 발생하였습니다.');
          void router.push(PAGE_PATH.main);
        },
      },
    );
  };

  const handleChangeShouldBlackList = () => {
    setShouldBackList((previous) => !previous);
  };

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
            {...register('content')}
          />
          <CheckBoxLabel>
            <input
              type="checkbox"
              checked={shouldBlackList}
              onChange={handleChangeShouldBlackList}
            />
            {shouldBlackList ? <CheckedOnIcon /> : <CheckedOffIcon />}
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
