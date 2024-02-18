import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import type { Dispatch, SetStateAction } from 'react';
import type { RegisterForm } from 'types/register';
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
    formState: { isValid },
  } = useForm<RegisterForm>({ mode: 'onChange' });

  /**
   * @todo
   * 서버로 이메일 전송 요청
   */
  const onSubmit = () => {
    setIsSubmitted(true);
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
        />
        <ButtonContainer>
          <Button
            type="submit"
            disabled={!isValid}
            pattern="box"
            size="lg"
            fullWidth
          >
            재설정 링크보내기
          </Button>
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
