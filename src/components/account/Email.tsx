import styled from '@emotion/styled';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Dispatch, SetStateAction } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { RegisterSchema } from 'types/Register';
import FormInput from 'components/account/FormInput';
import Button from 'components/common/Button';

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
}

const Email = ({
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

  const password = useRef<string | null>(null);
  password.current = watch('password');

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
              required: true,
              pattern: {
                value:
                  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
                message: '올바른 이메일 형식이 아닙니다.',
              },
              validate: () =>
                !isDoubleCheck.email || '이미 가입한 이메일입니다.',
            })}
            name="email"
            type="text"
            placeholder="이메일"
            label="이메일"
            errors={errors.email}
            vaule={getValues('email')}
          />
        </FormInputItem>
        <FormInputItem>
          <FormInput
            register={register('username', {
              required: true,
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])|(?=.*[0-9]).{1,20}$/,
                message: '영어, 숫자, 특수문자로 구성해주세요.',
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
              required: true,
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
                message: '8-16자 사이의 영문, 숫자, 특수문자로 구성해주세요.',
              },
            })}
            name="password"
            type="password"
            placeholder="비밀번호"
            label="비밀번호"
            errors={errors.password}
            vaule={getValues('password')}
          />
        </FormInputItem>
        <FormInputItem>
          <FormInput
            register={register('passwordCheck', {
              required: true,
              validate: (value) =>
                value === password.current || '비밀번호가 동일하지 않습니다.',
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

export default Email;

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
