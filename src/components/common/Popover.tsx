import { css } from '@emotion/react';
import type { PropsWithChildren } from 'react';
import { Z_INDEX } from 'constants/styles';
import { theme } from 'styles';

interface PopOverProps extends PropsWithChildren {
  position?: 'absolute' | 'fixed';
  top?: number;
  right?: number;
}

// NOTE: PopOver의 부모에 position: relative 필요
export const PopOver = ({
  children,
  position = 'absolute',
  top = 10,
  right = 0,
}: PopOverProps) => {
  return (
    <div
      css={css`
        position: ${position};
        right: ${right}px;
        bottom: 0;
        z-index: ${Z_INDEX.dialog};
        padding: 6px 0;
        border: 1px solid ${theme.colors.gray_06};
        border-radius: 10px;
        background-color: ${theme.colors.white};
        filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.08));
        transform: translateY(calc(100% + ${top}px));
      `}
    >
      {children}
    </div>
  );
};
