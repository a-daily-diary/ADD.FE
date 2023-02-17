import styled from '@emotion/styled';
import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | ADD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <section>
          <Text>ADD Front End</Text>
        </section>
        <Navigation>
          <NavigationList>
            <li>
              <NavigationLink href="/">
                <EmptyIcon />
                <span>홈</span>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/matching">
                <EmptyIcon />
                <span>랜덤매칭</span>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/write">
                <EmptyIcon />
                <span>일기작성</span>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="/profile">
                <EmptyIcon />
                <span>프로필</span>
              </NavigationLink>
            </li>
          </NavigationList>
        </Navigation>
      </main>
    </>
  );
};

export default Home;

const Text = styled.h1`
  ${({ theme }) => theme.fonts.diary_title};
  color: ${({ theme }) => theme.colors.main};
`;

const Navigation = styled.nav`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_eee};
`;

const NavigationList = styled.ul`
  display: flex;
  justify-content: space-around;
`;

const NavigationLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  ${({ theme }) => theme.fonts.navigation}
  color: ${({ theme }) => theme.colors.gray_999};
`;

// 아이콘 svg 적용 전, 아이콘 위치 잡기 위해 EmptyIcon 적용
const EmptyIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.5);
`;
