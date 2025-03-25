import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';

interface ToggleProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Toggle = ({
  defaultChecked = false,
  onChange,
  disabled = false,
}: ToggleProps) => {
  const handleToggleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = event.target.checked;
    onChange?.(newCheckedState);
  };

  return (
    <ToggleWrapper>
      <ToggleInput
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={handleToggleChange}
        disabled={disabled}
      />
    </ToggleWrapper>
  );
};

const ToggleWrapper = styled.label`
  display: inline-flex;
  align-items: center;
`;

const ToggleInput = styled.input`
  appearance: none;
  position: relative;
  border-radius: 100px;
  width: 44px;
  height: 24px;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.gray_05};
  cursor: pointer;

  /* Slider */
  &::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
    transition: left 250ms linear;
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary_00};

    &::before {
      left: 22px;
    }
  }

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.gray_05};
  }
`;
