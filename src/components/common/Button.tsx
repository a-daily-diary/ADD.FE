import { css } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';
import { theme } from 'styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  shape?: 'box' | 'round';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text: string;
  variant?: 'active' | 'highlight' | 'line' | 'disabled';
}

export const Button = ({
  fullWidth = false,
  shape = 'box',
  size = 'lg',
  text,
  variant = 'active',
  ...props
}: ButtonProps) => {
  return (
    <button
      css={css`
        width: ${fullWidth ? '100%' : 'fit-content'};
        user-select: none;

        ${SHAPE_STYLES[shape]}
        ${SIZE_STYLES[size]}
        ${VARIANT_STYLES[variant]}

        &:disabled {
          ${VARIANT_STYLES.disabled}
        }
      `}
      {...props}
    >
      {text}
    </button>
  );
};

const SHAPE_STYLES = {
  box: css`
    border-radius: 6px;
  `,
  round: css`
    border-radius: 100px;
  `,
};

const SIZE_STYLES = {
  sm: css`
    ${theme.fonts.button_01}
    padding: 8px 10px;
  `,
  md: css`
    ${theme.fonts.button_01}
    padding: 12px 20px;
  `,
  lg: css`
    ${theme.fonts.button_02}
    padding: 17px 32px;
  `,
  xl: css`
    ${theme.fonts.button_03}
    padding: 20px 48px;
  `,
};

const VARIANT_STYLES = {
  active: css`
    background-color: ${theme.colors.primary_00};
    color: ${theme.colors.white};
  `,
  highlight: css`
    background-color: ${theme.colors.primary_03};
    color: ${theme.colors.primary_00};
  `,
  line: css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.gray_00};
    border: 1px solid ${theme.colors.gray_05};
  `,
  disabled: css`
    background-color: ${theme.colors.gray_04};
    color: ${theme.colors.white};
  `,
};
