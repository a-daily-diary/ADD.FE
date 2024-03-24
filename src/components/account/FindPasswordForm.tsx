import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import type { Dispatch, SetStateAction } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { RegisterForm } from 'types/register';
import type { ErrorResponse } from 'types/response';
import { passwordResetLink } from 'api';
import { Button } from 'components/common';
import { FormInput } from 'components/form';
import { ERROR_MESSAGE, VALID_VALUE } from 'constants/validation';

interface FindPasswordFormProps {
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
}

export const FindPasswordForm = ({ setIsSubmitted }: FindPasswordFormProps) => {
  /**
   * @todo
   * RegisterForm 대신 PasswordFindForm 정의하여 사용
   */
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<RegisterForm>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const { email } = data;
      await passwordResetLink({
        email,
        /**
         * @todo
         * redirectUrl을 비밀번호 재설정 페이지로 변경
         */
        redirectUrl: `${window.location.origin}`,
      });
      setIsSubmitted(true);
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        if (error.response?.status === 404) {
          setError('email', {
            type: 'emailNotFound',
            message: '이메일이 존재하지 않습니다.',
          });
        } else {
          /**
           * @todo
           * 404 외 모든 에러 공통 처리 */
          console.log(error.response?.status);
        }
      }
    }
  };

  return (
    <>
      <Title>비밀번호를 잊으셨나요?</Title>
      <DescriptionText>
        이메일 주소를 입력하면 암호를 재설정할 수 있는
        <br />
        링크를 이메일로 보내드릴게요.
      </DescriptionText>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          register={register('email', {
            required: ERROR_MESSAGE.email.required,
            pattern: {
              value: VALID_VALUE.email,
              message: ERROR_MESSAGE.email.pattern,
            },
          })}
          type="text"
          placeholder="이메일"
          label="이메일"
          errors={errors.email}
        />
        <ButtonContainer>
          <Button
            type="submit"
            disabled={!isValid}
            fullWidth
            text="재설정 링크보내기"
          />
        </ButtonContainer>
      </Form>
    </>
  );
};

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_01};
`;

const DescriptionText = styled.p`
  margin-top: 8px;

  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_07};
`;

const Form = styled.form`
  margin-top: 40px;
`;

const ButtonContainer = styled.div`
  margin-top: 28px;
`;
