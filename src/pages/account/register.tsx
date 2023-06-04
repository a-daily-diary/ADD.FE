import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { RegisterRequest, RegisterStep } from 'types/Register';
import type { ErrorResponse } from 'types/Response';
import * as api from 'api';
import CompleteRegister from 'components/account/CompleteRegister';
import RegisterInformation from 'components/account/RegisterInformation';
import RegisterProfileImage from 'components/account/RegisterProfileImage';
import RegisterTerms from 'components/account/RegisterTerms';
import Button from 'components/common/Button';
import Seo from 'components/common/Seo';
import Layout from 'components/layouts/Layout';
import { HeaderTitle, Header, HeaderLeft } from 'components/layouts/header';
import { errorResponseMessage } from 'utils';

const Register: NextPageWithLayout = () => {
  const methods = useForm<RegisterRequest>({ mode: 'onChange' });
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
    welcomeMessage: false,
  });

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
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

    if (registerStep.termsAgreement) {
      try {
        const { email, username, password, imgUrl, isAgree } = data;

        await api
          .register({ email, username, password, imgUrl, isAgree })
          .then(() => {
            setRegisterStep((state) => {
              return { ...state, welcomeMessage: true };
            });
          });
      } catch (error) {
        if (isAxiosError<ErrorResponse>(error)) {
          alert(errorResponseMessage(error.response?.data.message));
        }
      }
    }
  };

  return (
    <>
      {!registerStep.welcomeMessage && (
        <FormProvider {...methods}>
          <From onSubmit={handleSubmit(onSubmit)}>
            {!registerStep.imgUrl && !registerStep.termsAgreement && (
              <RegisterInformation registerStep={registerStep} />
            )}
            {!registerStep.termsAgreement && registerStep.imgUrl && (
              <RegisterProfileImage />
            )}
            {registerStep.termsAgreement && <RegisterTerms />}
            <ButtonContainer>
              <Button
                type="submit"
                disabled={!isValid}
                pattern="box"
                size="lg"
                fullWidth
              >
                다음
              </Button>
            </ButtonContainer>
          </From>
        </FormProvider>
      )}
      {registerStep.welcomeMessage && <CompleteRegister />}
    </>
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
