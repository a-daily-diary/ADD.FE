import styled from '@emotion/styled';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { GetStaticProps, NextPage } from 'next';
import type { SubmitHandler } from 'react-hook-form';
import type { RegisterForm, RegisterStep } from 'types/register';
import type { ErrorResponse } from 'types/response';
import type { TermsAgreementId } from 'types/termsAgreement';
import * as api from 'api';
import {
  RegisterInformation,
  RegisterProfileImage,
  RegisterTerms,
  CompleteRegister,
} from 'components/account';

import { Button, Seo } from 'components/common';
import { HeaderTitle, Header, HeaderLeft } from 'components/layouts';
import { queryKeys } from 'constants/queryKeys';
import { Z_INDEX } from 'constants/styles';
import { useRegisterUser } from 'hooks/services';
import { errorResponseMessage } from 'utils';

const Register: NextPage = () => {
  const methods = useForm<RegisterForm>({ mode: 'onChange' });
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

  const registerMutation = useRegisterUser({
    onSuccess: () => {
      setRegisterStep((state) => {
        return { ...state, welcomeMessage: true };
      });
    },
  });

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
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
        const { email, username, password, imgUrl, termsAgreement } = data;
        // NOTE: 동의한 약관 객체를 약관 ID 문자열 배열로 변환
        const termsAgreementIdList = Object.entries(termsAgreement)
          .filter(([_, value]) => value)
          .map(([id, _]) => id) as TermsAgreementId[];

        registerMutation({
          email,
          username,
          password,
          imgUrl,
          termsAgreementIdList,
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
      <Seo title={'회원가입 | a daily diary'} />
      <Header
        left={<HeaderLeft type="이전" />}
        title={<HeaderTitle title={'회원가입'} position={'left'} />}
      />
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

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [queryKeys.termsAgreements],
    api.getTermsAgreement,
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
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
  z-index: ${Z_INDEX.dialog};
  padding: 12px 20px;
`;
