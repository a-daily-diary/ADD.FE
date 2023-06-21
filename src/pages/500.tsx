import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

const Custom500 = () => {
  return (
    <Section>
      <Image
        src={'/images/error/500.png'}
        alt="500 에러"
        width={166}
        height={171}
        priority
      />
      <Title>화면을 표시 할 수 없습니다.</Title>
      <Text>내부 서버 오류가 발생했습니다</Text>
      <HomeLink href={'/'}>홈화면으로 이동</HomeLink>
    </Section>
  );
};

export default Custom500;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Title = styled.h1`
  margin: 20px 0 4px;
  ${({ theme }) => theme.fonts.headline_02};
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.gray_02};
  ${({ theme }) => theme.fonts.body_05};
`;

const HomeLink = styled(Link)`
  margin-top: 60px;
  padding: 17px 32px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.bg_02};
  ${({ theme }) => theme.fonts.body_08};
`;
