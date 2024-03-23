import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from 'components/common';
import { PAGE_PATH } from 'constants/common';

export const CompleteRegister = () => {
  const router = useRouter();

  const handleGoToLogin = () => {
    void router.replace(PAGE_PATH().account.login);
  };

  return (
    <Section>
      <WelcomeContainer>
        <Image
          src={'/images/register/welcome.png'}
          alt="환영합니다!"
          width={200}
          height={200}
          priority
        />
        <Title>환영합니다.</Title>
        <WelcomeText>
          add에서 영어일기를 작성하고,
          <br />
          랜덤 매칭을 통해 영어 실력을 키워보세요.
        </WelcomeText>
      </WelcomeContainer>
      <ButtonContainer>
        <Button
          type="button"
          fullWidth
          onClick={handleGoToLogin}
          text="로그인하기"
        />
      </ButtonContainer>
    </Section>
  );
};

const Section = styled.section`
  display: grid;
  grid-template-rows: auto 72px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

const WelcomeContainer = styled.div`
  margin: auto;
  text-align: center;
`;

const Title = styled.h1`
  margin: 44px 0 12px;
  ${({ theme }) => theme.fonts.headline_01};
`;

const WelcomeText = styled.p`
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_07};
`;

const ButtonContainer = styled.div`
  padding: 12px 20px;
`;
