import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface HeaderTitleStyleProps {
  position?: 'left';
  fontWeight?: 700;
}
interface HeaderTitleProps extends HeaderTitleStyleProps {
  title: string;
}

export const HeaderTitle = ({
  title,
  position,
  fontWeight,
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
  ${({ theme }) => theme.fonts.body_02};
  ${({ fontWeight }) => fontWeight === 700 && 'font-weight: 700'};
`;
