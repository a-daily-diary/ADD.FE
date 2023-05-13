import styled from '@emotion/styled';
import axios, { isAxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { AxiosResponse } from 'axios';
import type {
  RegisterRequest,
  RegisterResponse,
  RegisterSchema,
  RegisterStep,
} from 'types/Register';
import type { ErrorResponse, SuccessResponse } from 'types/Response';
import FormInput from 'components/account/FormInput';
import Button from 'components/common/Button';
import {
  ERROR_MESSAGE,
  REQUIRED_MESSAGE,
  VALID_VALUE,
} from 'constants/validation';

interface ConfirmStatus {
  status: boolean;
  message: string;
}
interface Confirm {
  email: ConfirmStatus;
  username: ConfirmStatus;
}

interface RegisterProps {
  registerStep: RegisterStep;
}

const RegisterForm = ({ registerStep }: RegisterProps) => {
  const {
    register,
    watch,
    getValues,
    formState: { errors, isValid },
    setError,
  } = useFormContext<RegisterSchema>();

  const passwordCheckRef = useRef<string | null>(null);
  passwordCheckRef.current = watch('password');

  // 이메일, 유저네임 중복 확인하기 위해 작성
  const defaultConfirmStats = { status: false, message: '' };
  const [isConfirmed, setIsConfirmed] = useState<Confirm>({
    email: defaultConfirmStats,
    username: defaultConfirmStats,
  });

  // TODO : lodash 설치 후 email input이 변경될 때 중복확인하는 코드로 수정
  const handleOnBlurEmail = async () => {
    try {
      const { email } = getValues();
      const {
        data,
      }: AxiosResponse<
        SuccessResponse<RegisterResponse>,
        RegisterRequest
      > = await axios.post('http://34.168.182.31:5000/users/email-check', {
        email,
      });

      setIsConfirmed((state) => {
        return {
          ...state,
          email: { status: true, message: data.data.message },
        };
      });
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(error);
        setError('email', {
          type: 'pattern',
          message: error.response?.data.message[0],
        });
      }
    }
  };

  return (
    <Section>
      <TitleContainer>
        {registerStep === 'email' && <Title>이메일을 입력해주세요.</Title>}
        {registerStep === 'username' && <Title>닉네임을 입력해주세요.</Title>}
      </TitleContainer>
      <FormInputContainer>
        <div>
          <FormInput
            register={register('email', {
              required: REQUIRED_MESSAGE.email,
              pattern: {
                value: VALID_VALUE.email,
                message: ERROR_MESSAGE.email,
              },
              onBlur: handleOnBlurEmail,
              onChange: () => {
                setIsConfirmed((state) => {
                  return {
                    ...state,
                    email: defaultConfirmStats,
                  };
                });
              },
            })}
            name="email"
            type="text"
            placeholder="이메일"
            label="이메일"
            errors={errors.email}
            isShowLabel={isConfirmed.email.status}
          />
          {isConfirmed.email.status && <p>{isConfirmed.email.message}</p>}
        </div>
        {registerStep === 'username' && (
          <FormInput
            register={register('username', {
              required: REQUIRED_MESSAGE.username,
              pattern: {
                value: VALID_VALUE.username,
                message: ERROR_MESSAGE.username,
              },
            })}
            name="username"
            type="text"
            placeholder="닉네임"
            label="닉네임"
            errors={errors.username}
            isShowLabel={isConfirmed.username.status}
          />
        )}
        {/* TODO: 중복 확인 버튼 UI 수정 */}
        {/* <Button
            pattern="box"
            size="sm"
            variant="highlight"
            onClick={() => {
              usernmaeDoubleCheck();
            }}
          >
            중복확인
          </Button> */}
        {registerStep === 'password' && (
          <FormInput
            register={register('password', {
              required: REQUIRED_MESSAGE.password,
              pattern: {
                value: VALID_VALUE.password,
                message: ERROR_MESSAGE.password,
              },
            })}
            name="password"
            type="password"
            placeholder="비밀번호"
            label="비밀번호"
            errors={errors.password}
          />
        )}
        {registerStep === 'passwordCheck' && (
          <FormInput
            register={register('passwordCheck', {
              required: REQUIRED_MESSAGE.passwordCheck,
              validate: (value) =>
                value === passwordCheckRef.current ||
                ERROR_MESSAGE.passwordCheck,
            })}
            name="passwordCheck"
            type="password"
            placeholder="비밀번호 확인"
            label="비밀번호 확인"
            errors={errors.passwordCheck}
          />
        )}
      </FormInputContainer>
      <ButtonContainer>
        <Button disabled={!isValid} pattern="box" size="lg" fullWidth>
          다음
        </Button>
      </ButtonContainer>
    </Section>
  );
};

export default RegisterForm;

const Section = styled.section`
  margin-bottom: 72px;
`;

const TitleContainer = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_01};
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 36px;
`;

const ButtonContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 12px 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;
