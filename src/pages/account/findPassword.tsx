import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';
import type { NextPage } from 'next/types';
import type { RegisterForm } from 'types/register';
import { FindPasswordForm } from 'components/account';
import { Button, Seo } from 'components/common';
import { Header, HeaderLeft, HeaderTitle } from 'components/layouts';
import { Z_INDEX } from 'constants/styles';

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
        <Title>비밀번호를 잊으셨나요?</Title>
        <DescriptionText>
          {`이메일 주소를 입력하면 암호를 재설정할 수 있는 
            링크를 이메일로 보내드릴게요.`}
        </DescriptionText>
        <FormProvider {...methods}>
          <FindPasswordForm />
          <ButtonContainer>
            <Button
              type="submit"
              disabled={!isValid}
              pattern="box"
              size="lg"
              fullWidth
            >
              재설정 링크보내기
            </Button>
          </ButtonContainer>
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

const Title = styled.h1`
  ${({ theme }) => theme.fonts.headline_01};
`;

const DescriptionText = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_07};

  white-space: pre-line;
`;

const ButtonContainer = styled.div`
  margin-top: 28px;
  z-index: ${Z_INDEX.dialog};
`;
