import { css } from '@emotion/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  backgroundColor?: string;
  size?: 'md' | 'lg';
}

export const IconButton = ({
  icon,
  backgroundColor = 'transparent',
  size = 'lg',
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: ${backgroundColor};
        user-select: none;

        ${SIZE_STYLES[size]}
      `}
      {...props}
    >
      {icon}
    </button>
  );
};

const SIZE_STYLES = {
  md: css`
    width: 48px;
    height: 48px;
  `,
  lg: css`
    width: 60px;
    height: 60px;
  `,
};
