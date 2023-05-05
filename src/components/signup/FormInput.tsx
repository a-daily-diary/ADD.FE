import styled from '@emotion/styled';
import type { ComponentProps } from 'react';
import type { ErrorOption, UseFormRegisterReturn } from 'react-hook-form';

interface IFormInputProps extends ComponentProps<'input'> {
  register: UseFormRegisterReturn;
  label: string;
  errors?: ErrorOption;
  vaule?: string;
  isDoubleCheck?: boolean;
  doubleCheck?: string;
}

const FormInput = ({
  name,
  type,
  register,
  placeholder,
  label,
  errors,
  isDoubleCheck = false,
  doubleCheck,
  vaule = '',
}: IFormInputProps) => {
  return (
    <>
      {vaule?.length > 0 && errors == null && isDoubleCheck && (
        <Label htmlFor={name}>{label}</Label>
      )}
      {isDoubleCheck && doubleCheck != null && <p>{doubleCheck}</p>}
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        error={errors != null}
        {...register}
      />
      {errors != null && <Error>{errors.message}</Error>}
    </>
  );
};

export default FormInput;

const Label = styled.label`
  display: inline-block;
  margin: 0 0 8px 0;
  ${({ theme }) => theme.fonts.caption_02}
  color: #444444;
`;

const Input = styled.input<{ error: boolean }>`
  width: 100%;
  padding: 0 0 6px 0;
  border: none;
  border-bottom: 1px solid
    ${({ theme, error }) => (error ? theme.colors.error : theme.colors.gray_06)};
  ${({ theme }) => theme.fonts.body_01}

  &:focus {
    border-bottom: 1px solid
      ${({ theme, error }) =>
        error ? theme.colors.error : theme.colors.primary_00};
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_04};
  }
`;

const Error = styled.p`
  margin: 8px 0 0 0;
  ${({ theme }) => theme.fonts.body_09}
  color: ${({ theme }) => theme.colors.error};
`;
