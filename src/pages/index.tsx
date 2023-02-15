import styled from '@emotion/styled';
import Head from 'next/head';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | ADD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Text>ADD Front End</Text>
      </main>
    </>
  );
};

export default Home;

const Text = styled.p`
  ${({ theme }) => theme.fonts.diary_title};
  color: ${({ theme }) => theme.colors.main};
`;
