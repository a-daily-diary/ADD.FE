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
      <DiaryList />
    </>
  );
};

export default Home;
