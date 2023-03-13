import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { Theme } from '@emotion/react';
import type { ReactNode } from 'react';

interface ButtonProps {
  pattern: 'box' | 'round';
  size: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'active' | 'highlight' | 'line';
  fullWidth?: boolean;
  theme?: Theme;
  onClick?: () => void;
  children: ReactNode;
}

const Button = ({
  pattern,
  size,
  variant,
  fullWidth,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <ButtonLayout
      pattern={pattern}
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </ButtonLayout>
  );
};

const patternStyles = ({ pattern }: ButtonProps) => css`
  ${pattern === 'box' &&
  css`
    border-radius: 10px;
  `}

  ${pattern === 'round' &&
  css`
    border-radius: 100px;
  `}
`;

const sizeStyles = ({ size, theme }: ButtonProps) => css`
  ${size === 'sm' &&
  css`
    ${theme?.fonts.button}
    padding: 8px 10px;
  `}

  ${size === 'md' &&
  css`
    ${theme?.fonts.button}
    padding: 12px 20px;
  `}

  ${size === 'lg' &&
  css`
    ${theme?.fonts.button_lg}
    padding: 17px 32px;
  `}

  ${size === 'xl' &&
  css`
    ${theme?.fonts.button_xl}
    padding: 20px 48px;
  `}
`;

const variantStyles = ({ variant, theme }: ButtonProps) => css`
  ${variant === 'active' &&
  css`
    background: ${theme?.colors.main};
    color: ${theme?.colors.white};
  `}

  ${variant === 'highlight' &&
  css`
    background: ${theme?.colors.sub};
    color: ${theme?.colors.main};
  `}

  ${variant === 'line' &&
  css`
    background: ${theme?.colors.white};
    color: ${theme?.colors.black};
    border: 1px solid ${theme?.colors.gray_ddd};
    box-sizing: border-box;
  `}
`;

const ButtonLayout = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ fullWidth }) => (fullWidth === true ? '100%' : 'fit-content')};
  background: ${({ theme }) => theme.colors.bg_f4f4f4};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  vertical-align: middle;
  user-select: none;

  ${patternStyles}
  ${sizeStyles}
  ${variantStyles}
`;

export default Button;
