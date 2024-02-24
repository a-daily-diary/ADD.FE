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
      style={{
        // TODO: #186 PR 머지 후 css 속성으로 수정
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${SIZE_STYLES[size]}px`,
        height: `${SIZE_STYLES[size]}px`,
        borderRadius: '50%',
        backgroundColor,
        userSelect: 'none',
      }}
      {...props}
    >
      {icon}
    </button>
  );
};

const SIZE_STYLES = {
  md: 48,
  lg: 60,
};
