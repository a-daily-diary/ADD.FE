import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';
import type { NextPage } from 'next/types';
import type { RegisterForm } from 'types/register';
import { FindPasswordForm } from 'components/account';
import { Seo } from 'components/common';
import { Header, HeaderLeft, HeaderTitle } from 'components/layouts';

const FindPassword: NextPage = () => {
  /**
   * @todo
   * RegisterForm 대신 PasswordFindForm 정의하여 사용
   */
  const methods = useForm<RegisterForm>({ mode: 'onChange' });
  const {
    formState: { isValid },
  } = methods;

  return (
    <>
      <Seo title={'비밀번호 찾기 | a daily diary'} />
      <Header
        left={<HeaderLeft type="이전" />}
        title={<HeaderTitle title={'비밀번호 찾기'} position={'left'} />}
      />
      <ContentWrapper>
        <FormProvider {...methods}>
          <FindPasswordForm />
        </FormProvider>
      </ContentWrapper>
    </>
  );
};

export default FindPassword;

const ContentWrapper = styled.section`
  margin-top: 54px;
  padding: 30px 20px;
`;
