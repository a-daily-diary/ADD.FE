import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { Theme } from '@emotion/react';
import type { ReactNode } from 'react';

interface ButtonProps {
  type: 'button' | 'submit';
  pattern: 'box' | 'round';
  size: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'active' | 'highlight' | 'line';
  fullWidth?: boolean;
  theme?: Theme;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

const Button = ({
  type,
  pattern,
  size,
  variant,
  fullWidth,
  onClick,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <ButtonLayout
      type={type}
      pattern={pattern}
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
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

const sizeStyles = ({ size, theme }: ButtonProps) => css`
  ${size === 'sm' &&
  css`
    ${theme?.fonts.button_01}
    padding: 8px 10px;
  `}

  ${size === 'md' &&
  css`
    ${theme?.fonts.button_01}
    padding: 12px 20px;
  `}

  ${size === 'lg' &&
  css`
    ${theme?.fonts.button_02}
    padding: 17px 32px;
  `}

  ${size === 'xl' &&
  css`
    ${theme?.fonts.button_03}
    padding: 20px 48px;
  `}
`;

const variantStyles = ({ variant, theme }: ButtonProps) => css`
  ${variant === 'active' &&
  css`
    background: ${theme?.colors.primary_00};
    color: ${theme?.colors.white};
  `}

  ${variant === 'highlight' &&
  css`
    background: ${theme?.colors.primary_03};
    color: ${theme?.colors.primary_00};
  `}

  ${variant === 'line' &&
  css`
    background: ${theme?.colors.white};
    color: ${theme?.colors.gray_00};
    border: 1px solid ${theme?.colors.gray_05};
    box-sizing: border-box;
  `}
`;

const ButtonLayout = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ fullWidth }) => (fullWidth === true ? '100%' : 'fit-content')};
  background: ${({ theme }) => theme.colors.primary_00};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  vertical-align: middle;
  user-select: none;

  ${patternStyles}
  ${sizeStyles}
  ${variantStyles}

    &:disabled {
    background: ${({ theme }) => theme.colors.gray_04};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default Button;
