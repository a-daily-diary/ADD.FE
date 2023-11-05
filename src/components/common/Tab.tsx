import styled from '@emotion/styled';
import type { ReactNode } from 'react';

interface TabProps {
  children: ReactNode;
  indicator: {
    width: number;
    offsetLeft: number;
  };
}

export const Tab = ({ children, indicator }: TabProps) => {
  return <TabList indicator={indicator}>{children}</TabList>;
};

const TabList = styled.ul<{
  indicator: { width: number; offsetLeft: number };
}>`
  display: flex;
  gap: 28px;
  position: relative;
  padding: 24px 28px;

  &::after {
    content: '';
    position: absolute;
    bottom: 16px;
    left: 0;
    width: ${({ indicator }) => `${indicator.width}px`};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary_00};
    transform: translateX(${({ indicator }) => `${indicator.offsetLeft}px`});
    transition: transform 0.2s;
    will-change: transform;
  }
`;
