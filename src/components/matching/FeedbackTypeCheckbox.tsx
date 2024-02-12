import styled from '@emotion/styled';
import { Fragment, useRef } from 'react';

import type { UseFormRegister } from 'react-hook-form';
import type { MatchingFeedbackForm } from 'types/matching';

import { BadIcon, EngIcon, FunIcon, NiceIcon } from 'assets/icons';

interface FeedbackTypeCheckboxProps {
  register: UseFormRegister<MatchingFeedbackForm>;
}

const FeedbackTypeCheckbox = ({ register }: FeedbackTypeCheckboxProps) => {
  const { current: FEEDBACK } = useRef([
    {
      id: 'isNice',
      icon: <NiceIcon />,
      description: '친절해요',
      hookFormProps: register('feedbackType.isNice'),
    },
    {
      id: 'isFluent',
      icon: <EngIcon />,
      description: '영어를 잘해요',
      hookFormProps: register('feedbackType.isFluent'),
    },
    {
      id: 'isFun',
      icon: <FunIcon />,
      description: '재밌어요',
      hookFormProps: register('feedbackType.isFun'),
    },
    {
      id: 'isBad',
      icon: <BadIcon />,
      description: '불쾌해요',
      hookFormProps: register('feedbackType.isBad'),
    },
  ]);

  return (
    <Container>
      {FEEDBACK.map((feedback) => {
        const { id, icon, description, hookFormProps } = feedback;
        return (
          <Fragment key={id}>
            <CheckBoxInput id={id} type="checkbox" {...hookFormProps} />
            <CheckBoxLabel htmlFor={id}>
              {icon}
              {description}
            </CheckBoxLabel>
          </Fragment>
        );
      })}
    </Container>
  );
};

export default FeedbackTypeCheckbox;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 100px);
  justify-content: center;
  gap: 40px 50px;
  margin-bottom: 60px;
`;

const CheckBoxInput = styled.input`
  display: none;
  &:checked + label {
    ${({ theme }) => theme.fonts.headline_04};
    color: ${({ theme }) => theme.colors.primary_00};
  }
  &:checked + label > svg {
    outline: 2px solid ${({ theme }) => theme.colors.primary_00};
    border-radius: 100%;
  }
`;

const CheckBoxLabel = styled.label`
  ${({ theme }) => theme.fonts.body_04};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray_00};
`;
