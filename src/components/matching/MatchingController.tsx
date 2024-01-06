import styled from '@emotion/styled';
import React from 'react';

import type { ComponentProps } from 'react';

import { MicrophoneOffIcon, EndCallIcon } from 'assets/icons';
import { colors } from 'constants/styles';
import { ScreenReaderOnly } from 'styles';

interface MatchingControllerProps extends ComponentProps<'article'> {}

const MatchingController = ({ ...otherProps }: MatchingControllerProps) => {
  return (
    <MatchingControllerWrapper {...otherProps}>
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
    </MatchingControllerWrapper>
  );
};

export default MatchingController;

const SubTitle = styled.h2`
  ${ScreenReaderOnly}
`;

const MatchingControllerWrapper = styled.article`
  display: flex;
  justify-content: space-around;
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
