import styled from '@emotion/styled';

import type { UseFormRegister } from 'react-hook-form';
import type { MatchingFeedbackForm } from 'types/matching';

import { BadIcon, EngIcon, FunIcon, NiceIcon } from 'assets/icons';
import { colors } from 'constants/styles';

interface FeedbackTypeCheckboxProps {
  register: UseFormRegister<MatchingFeedbackForm>;
}

const FeedbackTypeCheckbox = ({ register }: FeedbackTypeCheckboxProps) => {
  return (
    <Grid2Column>
      <Label>
        <input type="checkbox" {...register('isNiceMatcher')} />
        <NiceIcon />
        <RegularSpan>친절해요</RegularSpan>
      </Label>
      <Label>
        <input type="checkbox" {...register('isFluentMatcher')} />
        <EngIcon />
        <RegularSpan>영어를 잘해요</RegularSpan>
      </Label>
      <Label>
        <input type="checkbox" {...register('isFunnyMatcher')} />
        <FunIcon />
        <RegularSpan>재밌어요</RegularSpan>
      </Label>
      <Label>
        <input type="checkbox" {...register('isBadMatcher')} />
        <BadIcon />
        <RegularSpan>불쾌해요</RegularSpan>
      </Label>
    </Grid2Column>
  );
};

export default FeedbackTypeCheckbox;

const Grid2Column = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-evenly;
  row-gap: 30px;
  margin-bottom: 60px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  input {
    display: none;
    &:checked + svg {
      outline: 2px solid ${colors.primary_00};
      border-radius: 100%;
    }
  }
`;

const RegularSpan = styled.span`
  ${({ theme }) => theme.fonts.body_04};
  color: ${({ theme }) => theme.colors.gray_00};
`;
