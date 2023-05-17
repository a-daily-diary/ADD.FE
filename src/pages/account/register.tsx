import styled from '@emotion/styled';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import type { SubmitHandler, FieldValues } from 'react-hook-form';
import type { RegisterStep } from 'types/Register';
import RegisterForm from 'components/account/RegisterForm';
import RegisterProfileImage from 'components/account/RegisterProfileImage';
import RegisterTerms from 'components/account/RegisterTerms';
import Button from 'components/common/Button';
import Seo from 'components/common/Seo';
import Layout from 'components/layouts/Layout';
import { HeaderTitle, Header, HeaderLeft } from 'components/layouts/header';

const Register: NextPageWithLayout = () => {
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
    termsAgreement: false,
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
        return { ...state, termsAgreement: true };
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <From onSubmit={handleSubmit(onSubmit)}>
        {!registerStep.imgUrl && !registerStep.termsAgreement && (
          <RegisterForm registerStep={registerStep} />
        )}
        {!registerStep.termsAgreement && registerStep.imgUrl && (
          <RegisterProfileImage />
        )}
        {registerStep.termsAgreement && <RegisterTerms />}
        {/* {formData.termsAgreement && <p>회원가입 완료</p>} */}
        <ButtonContainer>
          <Button disabled={!isValid} pattern="box" size="lg" fullWidth>
            다음
          </Button>
        </ButtonContainer>
      </From>
    </FormProvider>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Seo title={'회원가입 | a daily diary'} />
      <Header>
        <HeaderLeft type="이전" />
        <HeaderTitle title={'회원가입'} position={'left'} />
      </Header>
      {page}
    </Layout>
  );
};

export default Register;

const From = styled.form`
  margin: 54px 0 62px;
  padding: 28px 20px;
`;

const ButtonContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 12px 20px;
`;
