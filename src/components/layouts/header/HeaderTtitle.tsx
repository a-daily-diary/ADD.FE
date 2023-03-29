import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { ReactNode } from 'react';

export interface HeaderTitleProps {
  children: ReactNode;
  isCenter?: boolean;
  isNumber?: boolean;
}

const HeaderTitle = ({ children, isCenter, isNumber }: HeaderTitleProps) => {
  return (
    <Title isCenter={isCenter} isNumber={isNumber}>
      {children}
    </Title>
  );
};

export default HeaderTitle;

const Title = styled.strong<HeaderTitleProps>`
  ${({ isCenter }) =>
    isCenter ?? false
      ? css`
          position: absolute;
          left: 50%;
          margin: 0 auto;
          transform: translate(-50%);
        `
      : css`
          flex: none;
          padding: 0 0 0 4px;
        `};

  ${({ theme }) => theme.fonts.header};
  font-weight: ${({ isNumber }) => (isNumber ?? false) && 700};
`;
