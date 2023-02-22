import styled from '@emotion/styled';
import Head from 'next/head';
import type { NextPage } from 'next';
import { DIARY_LIST_MOCK_DATA } from 'mocks/DiaryList';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | ADD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section>
        <Text>ADD Front End</Text>
        <ul>
          {DIARY_LIST_MOCK_DATA.map((diary) => {
            const {
              id,
              title,
              content,
              imgUrl,
              commentCount,
              favoriteCount,
              isFavorite,
              isBookmark,
              createdAt,
              author,
            } = diary;
            return (
              <li key={`diary-list-${id}`}>
                <h2>{title}</h2>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Home;

const Text = styled.h1`
  ${({ theme }) => theme.fonts.diary_title};
  color: ${({ theme }) => theme.colors.main};
`;
