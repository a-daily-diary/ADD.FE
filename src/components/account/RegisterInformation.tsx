import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import type {
  RegisterStep,
  RegisterForm,
  DuplicateCheckField,
} from 'types/register';
import type { ErrorResponse } from 'types/response';
import * as api from 'api';
import { FormInput } from 'components/form';
import {
  ERROR_MESSAGE,
  INVALID_VALUE,
  VALID_VALUE,
} from 'constants/validation';
import { useDebounce } from 'hooks/common';
import { errorResponseMessage } from 'utils';

interface RegisterProps {
  registerStep: RegisterStep;
  changeIsEmailOrUsernameDuplicated: (value: boolean) => void;
}

export const RegisterInformation = ({
  registerStep,
  changeIsEmailOrUsernameDuplicated,
}: RegisterProps) => {
  const {
    register,
    getValues,
    formState: { errors },
    setError,
    setFocus,
  } = useFormContext<RegisterForm>();

  useEffect(() => {
    // NOTE: Step이 낮은 값을 뒤로 배치하여 이미 지난 step에 대해선 find 무시
    const fields: Array<keyof RegisterForm> = [
      'passwordCheck',
      'password',
      'username',
      'email',
    ];

    const focusField = fields.find((field) => registerStep[field]);
    if (focusField) setFocus(focusField);
  }, [registerStep]);

  const handleAxiosError = (type: DuplicateCheckField, error: unknown) => {
    if (isAxiosError<ErrorResponse>(error)) {
      setError(type, {
        type: 'exist',
        message: errorResponseMessage(error.response?.data.message),
      });
    }
  };

  const onChangeEmail = useDebounce(async () => {
    changeIsEmailOrUsernameDuplicated(true);

    try {
      await api.emailExists({ email: getValues('email') });
      changeIsEmailOrUsernameDuplicated(false);
    } catch (error) {
      handleAxiosError('email', error);
    }
  }, 200);

  const onChangeUsername = useDebounce(async () => {
    changeIsEmailOrUsernameDuplicated(true);

    try {
      await api.usernameExists({ username: getValues('username') });
      changeIsEmailOrUsernameDuplicated(false);
    } catch (error) {
      handleAxiosError('username', error);
    }
  }, 200);

  const registerStepValues = Object.values(registerStep).filter(
    (value) => value,
  ).length;

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
            onChange: onChangeEmail,
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
              onChange: onChangeUsername,
              validate: (value) =>
                !INVALID_VALUE.username.test(value) ||
                ERROR_MESSAGE.username.invalidPattern,
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
