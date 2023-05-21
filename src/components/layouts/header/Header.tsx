import styled from '@emotion/styled';
import type { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return <HeaderLayout>{children}</HeaderLayout>;
};

const HeaderLayout = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 54px;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_06};
  background: ${({ theme }) => theme.colors.white};
`;
