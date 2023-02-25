import styled from '@emotion/styled';
import Head from 'next/head';
import type { NextPage } from 'next';
import DiaryList from 'components/diary/DiaryList';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | ADD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Text>ADD Front End</Text>
      <DiaryList />
    </>
  );
};

export default Home;

const Text = styled.h1`
  ${({ theme }) => theme.fonts.diary_title};
  color: ${({ theme }) => theme.colors.main};
`;
