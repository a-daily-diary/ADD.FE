import styled from '@emotion/styled';
import { useState } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import type { ErrorOption, UseFormRegisterReturn } from 'react-hook-form';
import type { OnlyMessageResponse, SuccessResponse } from 'types/response';
import { HideIcon, ShowIcon } from 'assets/icons';
import { FadeInAnimationStyle } from 'styles';

interface FormInputProps extends ComponentProps<'input'> {
  register: UseFormRegisterReturn;
  label: string;
  errors?: ErrorOption;
  success?: SuccessResponse<OnlyMessageResponse>;
  isShowLabel?: boolean;
  button?: ReactNode;
}

interface ErrorStyleProps {
  isError: boolean;
  isSuccess: boolean;
}

export const FormInput = ({
  type,
  register,
  placeholder,
  label,
  errors,
  success,
  isShowLabel = false,
  button,
}: FormInputProps) => {
  const { name } = register;
  const isPasswordInput = name.includes('password');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleOnTogglePassword = () => {
    setShowPassword((state) => !state);
  };

  return (
    <InputContainer>
      {isShowLabel && <Label htmlFor={name}>{label}</Label>}
      <InputBox>
        <Input
          type={isPasswordInput ? (showPassword ? 'text' : 'password') : type}
          id={name}
          placeholder={placeholder}
          isError={errors !== undefined}
          isSuccess={success !== undefined}
          {...register}
        />
        {isPasswordInput && (
          <PasswordButton type="button" onClick={handleOnTogglePassword}>
            {showPassword ? <ShowIcon /> : <HideIcon />}
          </PasswordButton>
        )}
        {button}
      </InputBox>
      {/* NOTE: errors갸  undefined가 아니고, 빈 객체가 아닌 경우 에러 메시지를 보여줍니다. */}
      {errors !== undefined && Object.keys(errors).length !== 0 && (
        <ErrorText>{errors.message}</ErrorText>
      )}
      {success !== undefined && (
        <SuccessText>{success.data.message}</SuccessText>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  ${FadeInAnimationStyle}
`;

const Label = styled.label`
  ${({ theme }) => theme.fonts.caption_02};
  color: ${({ theme }) => theme.colors.gray_01};
`;

const InputBox = styled.div`
  position: relative;
`;

const Input = styled.input<ErrorStyleProps>`
  width: 100%;
  padding: 8px 0 6px;
  border-bottom: 1px solid
    ${({ theme, isError, isSuccess }) =>
      !isError
        ? isSuccess
          ? theme.colors.primary_00
          : theme.colors.gray_06
        : theme.colors.error};
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

  &:disabled {
    border-color: transparent;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const ErrorText = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.error};
  ${({ theme }) => theme.fonts.body_09};
  ${FadeInAnimationStyle}
`;

const SuccessText = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.primary_00};
  ${({ theme }) => theme.fonts.body_09};
  ${FadeInAnimationStyle}
`;

const PasswordButton = styled.button`
  position: absolute;
  bottom: 6px;
  right: 0;
`;
