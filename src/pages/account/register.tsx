import styled from '@emotion/styled';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { SubmitHandler, FieldValues } from 'react-hook-form';
import type { RegisterStep } from 'types/Register';
import Profile from 'components/account/Profile';
import RegisterForm from 'components/account/RegisterForm';
import Terms from 'components/account/Terms';
import Button from 'components/common/Button';
import Seo from 'components/common/Seo';

const Register = () => {
  const methods = useForm({ mode: 'onChange' });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const [registerStep, setRegisterStep] = useState<RegisterStep>({
    email: true,
    username: false,
    password: false,
    passwordCheck: false,
    imgUrl: false,
    isAgree: false,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (registerStep.email)
      setRegisterStep((state) => {
        return { ...state, username: true };
      });
    if (registerStep.username)
      setRegisterStep((state) => {
        return { ...state, password: true };
      });
    if (registerStep.password)
      setRegisterStep((state) => {
        return { ...state, passwordCheck: true };
      });
    if (registerStep.passwordCheck)
      setRegisterStep((state) => {
        return { ...state, imgUrl: true };
      });
    if (registerStep.imgUrl) {
      setRegisterStep((state) => {
        return { ...state, isAgree: true };
      });
    }
  };

  return (
    <>
      <Seo title="회원가입 | a daily diary" />
      <FormProvider {...methods}>
        <From onSubmit={handleSubmit(onSubmit)}>
          {!registerStep.imgUrl && !registerStep.isAgree && (
            <RegisterForm registerStep={registerStep} />
          )}
          {registerStep.imgUrl && <Profile />}
          {registerStep.isAgree && (
            <>
              <Title>약관에 동의해주세요.</Title>
              {/* <Terms formData={formData} setFormData={setFormData} /> */}
            </>
          )}
          {/* {formData.isAgree && <p>회원가입 완료</p>} */}
          <ButtonContainer>
            <Button disabled={!isValid} pattern="box" size="lg" fullWidth>
              다음
            </Button>
          </ButtonContainer>
        </From>
      </FormProvider>
    </>
  );
};

export default Register;

const From = styled.form`
  margin-bottom: 72px;
  padding: 28px 20px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_01}
`;

const ButtonContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 12px 20px;
`;
