import styled from '@emotion/styled';
import axios, { isAxiosError } from 'axios';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import type {
  RegisterResponse,
  RegisterSchema,
  RegisterStep,
  DuplicationCheckRequest,
} from 'types/Register';
import type { ErrorResponse, SuccessResponse } from 'types/Response';
import FormInput from 'components/account/FormInput';
import {
  ERROR_MESSAGE,
  INVALID_VALUE,
  VALID_VALUE,
} from 'constants/validation';
import { errorResponseMessage } from 'utils/ErrorResponseMessage';

interface RegisterProps {
  registerStep: RegisterStep;
}

const RegisterForm = ({ registerStep }: RegisterProps) => {
  const {
    register,
    getValues,
    formState: { errors },
    setError,
  } = useFormContext<RegisterSchema>();

  const registerStepValues = Object.values(registerStep).filter(
    (value) => value,
  ).length;

  // TODO : lodash 설치 후 username input이 변경될 때 중복확인하는 코드로 수정
  const handleOnBlurUsername = async () => {
    try {
      const { username } = getValues();
      await axios.post<
        DuplicationCheckRequest,
        SuccessResponse<RegisterResponse>
      >('http://34.168.182.31:5000/users/username-check', {
        username,
      });
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(error);
        setError('username', {
          type: 'exist',
          message: errorResponseMessage(error.response?.data.message),
        });
      }
    }
  };

  // TODO : lodash 설치 후 email input이 변경될 때 중복확인하는 코드로 수정
  const handleOnBlurEmail = async () => {
    try {
      const { email } = getValues();
      await axios.post<
        DuplicationCheckRequest,
        SuccessResponse<RegisterResponse>
      >('http://34.168.182.31:5000/users/email-check', {
        email,
      });
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(error);
        setError('email', {
          type: 'exist',
          message: errorResponseMessage(error.response?.data.message),
        });
      }
    }
  };

  return (
    <section>
      <TitleContainer>
        {registerStep.email && registerStepValues === 1 && (
          <Title>이메일을 입력해주세요.</Title>
        )}
        {registerStep.username && registerStepValues === 2 && (
          <>
            <Title>닉네임을 입력해주세요.</Title>
            <DescriptionText>
              영어, 숫자, 특수문자 중 최소 2가지를 조합, 6~20자 이내
            </DescriptionText>
          </>
        )}
        {registerStep.password && registerStepValues === 3 && (
          <>
            <Title>비밀번호를 입력해주세요.</Title>
            <DescriptionText>
              영어, 숫자, 특수문자 중 최소 2가지를 조합, 6~30자 이내
            </DescriptionText>
          </>
        )}
        {registerStep.passwordCheck && registerStepValues === 4 && (
          <>
            <Title>비밀번호를 확인해주세요.</Title>
            <DescriptionText>
              영어, 숫자, 특수문자 중 최소 2가지를 조합, 6~30자 이내
            </DescriptionText>
          </>
        )}
      </TitleContainer>
      <FormInputContainer>
        <FormInput
          register={register('email', {
            required: ERROR_MESSAGE.email.required,
            pattern: {
              value: VALID_VALUE.email,
              message: ERROR_MESSAGE.email.pattern,
            },
            onBlur: handleOnBlurEmail,
          })}
          type="text"
          placeholder="이메일"
          label="이메일"
          errors={errors.email}
          isShowLabel={registerStepValues > 1}
        />
        {registerStep.username && registerStepValues > 1 && (
          <FormInput
            register={register('username', {
              required: ERROR_MESSAGE.username.required,
              minLength: {
                value: VALID_VALUE.username.min,
                message: ERROR_MESSAGE.username.length,
              },
              maxLength: {
                value: VALID_VALUE.username.max,
                message: ERROR_MESSAGE.username.length,
              },
              pattern: {
                value: VALID_VALUE.username.pattern,
                message: ERROR_MESSAGE.username.pattern,
              },
              validate: (value) =>
                !INVALID_VALUE.username.test(value) ||
                ERROR_MESSAGE.username.invalidPattern,
              onBlur: handleOnBlurUsername,
            })}
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
                ERROR_MESSAGE.username.invalidPattern,
            })}
            type={'password'}
            placeholder="비밀번호"
            label="비밀번호"
            errors={errors.password}
            isShowLabel={registerStepValues > 3}
          />
        )}
        {registerStep.passwordCheck && registerStepValues > 3 && (
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
            type={'password'}
            placeholder="비밀번호 확인"
            label="비밀번호 확인"
            errors={errors.passwordCheck}
          />
        )}
      </FormInputContainer>
    </section>
  );
};

export default RegisterForm;

const TitleContainer = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_01};
`;

const DescriptionText = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_07};
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 36px;
`;
