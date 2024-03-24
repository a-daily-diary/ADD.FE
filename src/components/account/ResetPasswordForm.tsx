import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import type { PasswordResetForm } from 'types/password';
import { Button } from 'components/common';
import { FormInput } from 'components/form';

export const ResetPasswordForm = () => {
  const { register } = useForm<PasswordResetForm>({ mode: 'onChange' });

  return (
    <>
      <Title>비밀번호를 재설정해주세요.</Title>
      <Form>
        <FormInput
          register={register('password', {})}
          type="password"
          placeholder="비밀번호"
          label="비밀번호"
        />
        <FormInput
          register={register('passwordCheck', {})}
          type="password"
          placeholder="비밀번호 확인"
          label="비밀번호 확인"
        />
        <StyledButton type="submit" text="비밀번호 재설정" fullWidth />
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
