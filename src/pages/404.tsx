import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { PAGE_PATH } from 'constants/common';

const Custom404 = () => {
  return (
    <Section>
      <Image
        src={'/images/error/404.png'}
        alt="404 에러"
        width={166}
        height={171}
        priority
      />
      <Title>죄송합니다.</Title>
      <Text>찾으시는 페이지가 존재하지 않습니다.</Text>
      <HomeLink href={PAGE_PATH().main}>홈화면으로 이동</HomeLink>
    </Section>
  );
};

export default Custom404;

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
