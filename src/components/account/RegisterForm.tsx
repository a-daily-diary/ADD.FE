import styled from '@emotion/styled';
import axios, { isAxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { AxiosResponse } from 'axios';
import type {
  RegisterResponse,
  RegisterSchema,
  RegisterStep,
  RegisterRequest,
} from 'types/Register';
import type { ErrorResponse, SuccessResponse } from 'types/Response';
import FormInput from 'components/account/FormInput';
import Button from 'components/common/Button';
import {
  ERROR_MESSAGE,
  REQUIRED_MESSAGE,
  VALID_VALUE,
} from 'constants/validation';

interface RegisterProps {
  registerStep: RegisterStep;
}

const RegisterForm = ({ registerStep }: RegisterProps) => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    setError,
  } = useFormContext<RegisterSchema>();

  const registerStepValues = Object.values(registerStep).filter(
    (value) => value,
  ).length;

  // TODO : lodash 설치 후 username input이 변경될 때 중복확인하는 코드로 수정
  const handleOnBlurUsername = async () => {
    try {
      const { username } = getValues();
      await axios.post<SuccessResponse<RegisterResponse>, RegisterRequest>(
        'http://34.168.182.31:5000/users/username-check',
        {
          username,
        },
      );
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(error);
        setError('username', {
          type: 'pattern',
          message: error.response?.data.message[0],
        });
      }
    }
  };

  // TODO : lodash 설치 후 email input이 변경될 때 중복확인하는 코드로 수정
  const handleOnBlurEmail = async () => {
    try {
      const { email } = getValues();
      await axios.post<SuccessResponse<RegisterResponse>, RegisterRequest>(
        'http://34.168.182.31:5000/users/email-check',
        {
          email,
        },
      );
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
        {registerStep.email && registerStepValues === 1 && (
          <Title>이메일을 입력해주세요.</Title>
        )}
        {registerStep.username && registerStepValues === 2 && (
          <Title>닉네임을 입력해주세요.</Title>
        )}
        {registerStep.password && registerStepValues === 3 && (
          <Title>비밀번호를 입력해주세요.</Title>
        )}
        {registerStep.passwordCheck && registerStepValues === 4 && (
          <Title>비밀번호를 확인해주세요.</Title>
        )}
      </TitleContainer>
      <FormInputContainer>
        <FormInput
          register={register('email', {
            required: REQUIRED_MESSAGE.email,
            pattern: {
              value: VALID_VALUE.email,
              message: ERROR_MESSAGE.email,
            },
            onBlur: handleOnBlurEmail,
          })}
          name="email"
          type="text"
          placeholder="이메일"
          label="이메일"
          errors={errors.email}
          isShowLabel={registerStepValues > 1}
        />
        {registerStep.username && registerStepValues > 1 && (
          <FormInput
            register={register('username', {
              required: REQUIRED_MESSAGE.username,
              pattern: {
                value: VALID_VALUE.username,
                message: ERROR_MESSAGE.username,
              },
              onBlur: handleOnBlurUsername,
            })}
            name="username"
            type="text"
            placeholder="닉네임"
            label="닉네임"
            errors={errors.username}
            isShowLabel={registerStepValues > 2}
          />
        )}
        {registerStep.password && registerStepValues > 2 && (
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
            isShowLabel={registerStepValues > 3}
          />
        )}
        {registerStep.passwordCheck && registerStepValues > 3 && (
          <FormInput
            register={register('passwordCheck', {
              required: REQUIRED_MESSAGE.passwordCheck,
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || ERROR_MESSAGE.passwordCheck;
                },
              },
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
