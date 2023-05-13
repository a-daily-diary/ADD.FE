import styled from '@emotion/styled';
import type { ComponentProps } from 'react';
import type { ErrorOption, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps extends ComponentProps<'input'> {
  register: UseFormRegisterReturn;
  label: string;
  errors?: ErrorOption;
  isShowLabel?: boolean;
}

const FormInput = ({
  name,
  type,
  register,
  placeholder,
  label,
  errors,
  isShowLabel = false,
}: FormInputProps) => {
  return (
    <div>
      {isShowLabel && <Label htmlFor={name}>{label}</Label>}
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        isError={errors !== undefined}
        {...register}
      />
      <ErrorText>{errors?.message}</ErrorText>
    </div>
  );
};

export default FormInput;

const Label = styled.label`
  ${({ theme }) => theme.fonts.caption_02};
  color: ${({ theme }) => theme.colors.gray_01};
`;

const Input = styled.input<{ isError: boolean }>`
  width: 100%;
  padding: 8px 0 6px;
  border-bottom: 1px solid
    ${({ theme, isError }) =>
      !isError ? theme.colors.gray_06 : theme.colors.error};
  ${({ theme }) => theme.fonts.body_01};
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-bottom: 1px solid
      ${({ theme, isError }) =>
        !isError ? theme.colors.primary_00 : theme.colors.error};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_04};
  }
`;

const ErrorText = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.error};
  ${({ theme }) => theme.fonts.body_09};
`;
