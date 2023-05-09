import styled from '@emotion/styled';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Dispatch, SetStateAction } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { RegisterSchema } from 'types/Register';
import FormInput from 'components/account/FormInput';
import Button from 'components/common/Button';
import {
  ERROR_MESSAGE,
  REQUIRED_MESSAGE,
  VALID_VALUE,
} from 'constants/validation';

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
}

const RegisterForm = ({
  formData,
  setFormData,
}: {
  formData: RegisterSchema;
  setFormData: Dispatch<SetStateAction<RegisterSchema>>;
}) => {
  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    mode: 'onChange',
  });

  const passwordCheckRef = useRef<string | null>(null);
  passwordCheckRef.current = watch('password');

  // 이메일, 유저네임 중복 확인하기 위해 작성
  const [isDoubleCheck, setIsDoubleCheck] = useState({
    email: false,
    username: false,
  });

  const usernmaeDoubleCheck = () => {
    const username = getValues('username');

    try {
      const res = axios.post('http://localhost:5001/users/username-check', {
        username,
      });
      setIsDoubleCheck((prev) => {
        return { ...prev, username: true };
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitHandler: SubmitHandler<RegisterFormData> = (data) => {
    const { email, username, password, passwordCheck } = data;
    setFormData({ ...formData, email, username, password, passwordCheck });
  };

  return (
    <Section>
      <TitleContainer>
        <Title>이메일을 입력해주세요.</Title>
      </TitleContainer>
      <FormInputContainer>
        <FormInput
          register={register('email', {
            required: REQUIRED_MESSAGE.email,
            pattern: {
              value: VALID_VALUE.email,
              message: ERROR_MESSAGE.email,
            },
            validate: () => !isDoubleCheck.email || '이미 가입한 이메일입니다.',
          })}
          name="email"
          type="text"
          placeholder="이메일"
          label="이메일"
          errors={errors.email}
          vaule={getValues('email')}
        />

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
          isDoubleCheck={isDoubleCheck.username}
          doubleCheck="중복확인 완료"
          vaule={getValues('username')}
        />
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
          vaule={getValues('password')}
        />
        <FormInput
          register={register('passwordCheck', {
            required: REQUIRED_MESSAGE.passwordCheck,
            validate: (value) =>
              value === passwordCheckRef.current || ERROR_MESSAGE.passwordCheck,
          })}
          name="passwordCheck"
          type="password"
          placeholder="비밀번호 확인"
          label="비밀번호 확인"
          errors={errors.passwordCheck}
        />
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
