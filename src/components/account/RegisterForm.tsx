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
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormInputList>
        <FormInputItem>
          <FormInput
            register={register('email', {
              required: REQUIRED_MESSAGE.email,
              pattern: {
                value: VALID_VALUE.email,
                message: ERROR_MESSAGE.email,
              },
              validate: () =>
                !isDoubleCheck.email || '이미 가입한 이메일입니다.',
            })}
            name="email"
            type="text"
            placeholder="이메일"
            label="이메일"
            errors={errors.email}
            isShowLabel={isDoubleCheck.email}
          />
        </FormInputItem>
        <FormInputItem>
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
            isShowLabel={isDoubleCheck.username}
          />
          <Button
            pattern="box"
            size="sm"
            variant="highlight"
            onClick={() => {
              usernmaeDoubleCheck();
            }}
          >
            중복확인
          </Button>
        </FormInputItem>
        <FormInputItem>
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
        </FormInputItem>
        <FormInputItem>
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
        </FormInputItem>
      </FormInputList>
      <Button disabled={!isValid} pattern="box" size="lg" fullWidth>
        다음
      </Button>
    </Form>
  );
};

export default RegisterForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  margin: 40px 0 0;
`;

const FormInputList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  gap: 36px;
`;

const FormInputItem = styled.li`
  position: relative;
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
