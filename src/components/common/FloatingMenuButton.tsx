import styled from '@emotion/styled';
import type { ReactNode } from 'react';

export interface FloatingMenuButtonProps {
  icon?: ReactNode;
  label: string;
  onClick: () => void;
}

const FloatingMenuButton = ({
  icon,
  label,
  onClick,
}: FloatingMenuButtonProps) => {
  return (
    <Button type="button" onClick={onClick}>
      {icon}
      {label}
    </Button>
  );
};

export default FloatingMenuButton;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 140px;
  padding: 10px 16px;
  color: ${({ theme }) => theme.colors.gray_01};
  ${({ theme }) => theme.fonts.button_01};
`;
