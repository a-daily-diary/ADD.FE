import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import type { NextPage } from 'next';
import type { SubmitHandler } from 'react-hook-form';
import type { LoginForm } from 'types/Login';
import FormInput from 'components/account/FormInput';
import Button from 'components/common/Button';
import {
  ERROR_MESSAGE,
  VALID_VALUE,
  INVALID_VALUE,
} from 'constants/validation';

const Login: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const { email, password } = data;
    try {
      const response = await signIn('credentials', {
        email,
        password,
        callbackUrl: 'http://localhost:3000', // TODO: 이전 pathname 확인하여 로그인 성공 후 이 전 페이지로 라우팅 처리하기
      });

      if (response?.ok === false && response?.error !== null) {
        setError('email', {
          type: 'exist',
        });
        setError('password', {
          type: 'exist',
          message: response?.error,
        });
      }
    } catch (error) {
      // TODO: 예기치 못한 에러 임의로 처리, 수정 필요
      alert('로그인에 실패하였습니다. 관리자에게 문의해주세요.');
    }
  };

  return (
    <Section>
      <Title>로그인</Title>
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
          type={'password'}
          placeholder="비밀번호"
          label="비밀번호"
          errors={errors.password}
        />
        <Button
          type="submit"
          disabled={!isValid}
          pattern="box"
          size="lg"
          fullWidth
        >
          로그인
        </Button>
      </Form>
      <ButtonContainer>
        <Button
          type="button"
          pattern="box"
          size="lg"
          fullWidth
          variant="line"
          onClick={async () => await router.push('/account/register')}
        >
          이메일로 가입하기
        </Button>
      </ButtonContainer>
    </Section>
  );
};

export default Login;

const Section = styled.section`
  padding: 86px 20px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  ${({ theme }) => theme.fonts.headline_01};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
`;
