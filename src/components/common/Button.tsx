import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { theme } from 'styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pattern: 'box' | 'round';
  size: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'active' | 'highlight' | 'line';
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button = ({
  pattern,
  size,
  variant,
  fullWidth,
  children,
  ...props
}: ButtonProps) => {
  return (
    <ButtonLayout
      pattern={pattern}
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </ButtonLayout>
  );
};

const patternStyles = ({ pattern }: ButtonProps) => css`
  ${pattern === 'box' &&
  css`
    border-radius: 6px;
  `}

  ${pattern === 'round' &&
  css`
    border-radius: 100px;
  `}
`;

const sizeStyles = ({ size }: ButtonProps) => css`
  ${size === 'sm' &&
  css`
    ${theme.fonts.button_01}
    padding: 8px 10px;
  `}

  ${size === 'md' &&
  css`
    ${theme.fonts.button_01}
    padding: 12px 20px;
  `}

  ${size === 'lg' &&
  css`
    ${theme.fonts.button_02}
    padding: 17px 32px;
  `}

  ${size === 'xl' &&
  css`
    ${theme.fonts.button_03}
    padding: 20px 48px;
  `}
`;

const variantStyles = ({ variant }: ButtonProps) => css`
  ${variant === 'active' &&
  css`
    background: ${theme.colors.primary_00};
    color: ${theme.colors.white};
  `}

  ${variant === 'highlight' &&
  css`
    background: ${theme.colors.primary_03};
    color: ${theme.colors.primary_00};
  `}

  ${variant === 'line' &&
  css`
    background: ${theme.colors.white};
    color: ${theme.colors.gray_00};
    border: 1px solid ${theme.colors.gray_05};
  `}
`;

const ButtonLayout = styled.button<ButtonProps>`
  width: ${({ fullWidth }) => (fullWidth === true ? '100%' : 'fit-content')};
  background: ${({ theme }) => theme.colors.primary_00};
  color: ${({ theme }) => theme.colors.white};
  user-select: none;

  ${patternStyles}
  ${sizeStyles}
  ${variantStyles}

  &:disabled {
    background: ${({ theme }) => theme.colors.gray_04};
    color: ${({ theme }) => theme.colors.white};
  }
`;
