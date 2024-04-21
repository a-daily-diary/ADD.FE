import styled from '@emotion/styled';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import type { PasswordResetForm } from 'types/password';
import { Button } from 'components/common';
import { FormInput } from 'components/form';
import { PAGE_PATH } from 'constants/common';
import {
  ERROR_MESSAGE,
  INVALID_VALUE,
  VALID_VALUE,
} from 'constants/validation';

export const ResetPasswordForm = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<PasswordResetForm>({ mode: 'onChange' });

  const onSubmit = async () => {
    /**
     * @todo
     * 비밀번호 재설정 API 요청
     */
    await router.replace(PAGE_PATH.account.login);
  };

  return (
    <>
      <Title>비밀번호를 재설정해주세요.</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          register={register('password', {
            required: ERROR_MESSAGE.password.required,
            minLength: {
              value: VALID_VALUE.password.min,
              message: ERROR_MESSAGE.password.length,
            },
            maxLength: {
              value: VALID_VALUE.password.max,
              message: ERROR_MESSAGE.password.length,
            },
            pattern: {
              value: VALID_VALUE.password.pattern,
              message: ERROR_MESSAGE.password.pattern,
            },
            validate: (value) =>
              !INVALID_VALUE.password.test(value) ||
              ERROR_MESSAGE.password.invalidPattern,
          })}
          type="password"
          placeholder="비밀번호"
          label="비밀번호"
          errors={errors.password}
        />
        <FormInput
          register={register('passwordCheck', {
            required: ERROR_MESSAGE.passwordCheck.required,
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return (
                  password === value || ERROR_MESSAGE.passwordCheck.pattern
                );
              },
            },
          })}
          type="password"
          placeholder="비밀번호 확인"
          label="비밀번호 확인"
          errors={errors.passwordCheck}
        />
        <StyledButton
          type="submit"
          disabled={!isValid || isSubmitting}
          text="비밀번호 재설정"
          fullWidth
        />
      </Form>
    </>
  );
};

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_01};
`;

const Form = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StyledButton = styled(Button)`
  margin-top: -4px;
`;
