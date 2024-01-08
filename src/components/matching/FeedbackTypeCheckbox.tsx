import React from 'react';

import type { ComponentProps } from 'react';

interface FeedbackTypeCheckboxProps extends ComponentProps<'input'> {}

const FeedbackTypeCheckbox = ({
  style,
  children,
  ...otherProps
}: FeedbackTypeCheckboxProps) => {
  return (
    <label>
      <input
        type="checkbox"
        style={
          style !== null && style !== undefined
            ? { ...style, display: 'none' }
            : { display: 'none' }
        }
        {...otherProps}
      />
      {children}
    </label>
  );
};

export default FeedbackTypeCheckbox;
