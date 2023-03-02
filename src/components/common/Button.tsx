import styled from '@emotion/styled';
import type { ReactNode } from 'react';

interface ButtonProps {
  type: 'box' | 'round' | 'circle' | 'icon';
  size: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'active' | 'line' | 'highlight' | '';
  color?: string;
  onClick?: () => void;
  children: ReactNode;
}

type Props = Partial<ButtonProps>;

const Button = ({
  type,
  size,
  variant,
  color,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <ButtonLayout
      className={`${type}-${size} ${(variant ??= '')}`}
      onClick={onClick}
      color={color}
    >
      {children}
    </ButtonLayout>
  );
};

const ButtonLayout = styled.button<Props>`
  display: flex;
  width: fit-content;
  border: none;
  background: ${({ theme }) => theme.colors.bg_f4f4f4};
  ${({ theme }) => theme.fonts.button};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  user-select: none;

  &.box-sm {
    padding: 8px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
    :active {
      background: ${({ theme }) => theme.colors.main};
      color: ${({ theme }) => theme.colors.white};
    }
  }

  &.box-lg {
    width: 100%;
    padding: 17px 0;
    border-radius: 10px;
    :active {
      background: ${({ theme }) => theme.colors.main};
    }
  }

  &.round-md {
    padding: 12px 20px;
    border-radius: 120px;
    background: ${({ theme }) => theme.colors.bg_f4f4f4};
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
  }

  &.round-lg {
    padding: 17px 32px;
    background: ${({ theme }) => theme.colors.bg_f4f4f4};
    border-radius: 100px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
  }

  &.round-xl {
    padding: 20px 48px;
    border-radius: 100px;
    background: ${({ theme }) => theme.colors.main};
    font-size: 16px;
    :active {
      background: ${({ theme }) => theme.colors.bg_f4f4f4};
      color: ${({ theme }) => theme.colors.black};
    }
  }

  &.circle-sm {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ color }) => color};
  }

  &.circle-md {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${({ color }) => color};
  }

  &.circle-lg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${({ color }) => color};
  }

  &.circle-xl {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: ${({ color }) => color};
    :active {
      border: 2px solid ${({ theme }) => theme.colors.main};
    }
  }

  &.icon-sm {
    padding: 0;
    background: none;
  }

  &.highlight {
    background: ${({ theme }) => theme.colors.sub};
    color: ${({ theme }) => theme.colors.main};
  }

  &.line {
    border: 1px solid ${({ theme }) => theme.colors.gray_ddd};
    background: none;
    color: ${({ theme }) => theme.colors.black};
    box-sizing: border-box;
  }
`;

export default Button;
