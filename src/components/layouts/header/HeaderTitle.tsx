import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface HeaderTitleStyleProps {
  position?: 'left' | 'center';
  fontWeight?: 500 | 700;
}
interface HeaderTitleProps extends HeaderTitleStyleProps {
  title: string;
}

export const HeaderTitle = ({
  title,
  position,
  fontWeight = 500,
}: HeaderTitleProps) => {
  return (
    <TitleText position={position} fontWeight={fontWeight}>
      {title}
    </TitleText>
  );
};

const TitleText = styled.strong<HeaderTitleStyleProps>`
  ${({ position }) =>
    position === 'left' &&
    css`
      margin-right: auto;
      padding-left: 4px;
    `};
  ${({ position }) =>
    position === 'center' &&
    css`
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    `};

  ${({ theme }) => theme.fonts.body_02};
  font-weight: ${({ fontWeight }) => fontWeight};
`;
