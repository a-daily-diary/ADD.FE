import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { Theme } from '@emotion/react';
import type { ReactNode } from 'react';

interface ButtonProps {
  color: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  theme?: Theme;
  onClick?: () => void;
  children: ReactNode;
}

const IconButton = ({ size, color, onClick, children }: ButtonProps) => {
  return (
    <ButtonLayout color={color} size={size} onClick={onClick}>
      {children}
    </ButtonLayout>
  );
};

const sizeStyles = ({ size }: ButtonProps) => css`
  ${size === 'sm' &&
  css`
    width: 20px;
    height: 20px;
  `}

  ${size === 'md' &&
  css`
    width: 48px;
    height: 48px;
  `}

  ${size === 'lg' &&
  css`
    width: 60px;
    height: 60px;
  `}

  ${size === 'xl' &&
  css`
    width: 100px;
    height: 100px;
  `}
`;

const ButtonLayout = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  border-radius: 50%;
  background: ${({ color }) => color};
  cursor: pointer;
  user-select: none;

  ${sizeStyles}
`;

export default IconButton;
