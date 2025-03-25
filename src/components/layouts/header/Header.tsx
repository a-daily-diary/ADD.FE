import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { HEADER_HEIGHT, Z_INDEX } from 'constants/styles';

interface HeaderProps {
  left: ReactNode;
  title?: ReactNode;
  right?: ReactNode;
}

export const Header = ({ left, title, right }: HeaderProps) => {
  return (
    <HeaderLayout>
      {left}
      {title}
      {right}
    </HeaderLayout>
  );
};

const HeaderLayout = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: ${Z_INDEX.header};
  height: ${HEADER_HEIGHT};
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_06};
  background: ${({ theme }) => theme.colors.white};
`;
