import styled from '@emotion/styled';
import { useState } from 'react';
import type { NextPage } from 'next';
import { CloseIcon } from 'assets/icons';
import { Seo } from 'components/common';
import { SearchHeader } from 'components/search';
import { NoSearchResults } from 'components/search/NoSearchResults';

// TODO: 목데이터 제거
const RECENT_SEARCHES_MOCKS = [
  'hello',
  'daily routine',
  'dance',
  'morning',
  'movies',
  'cakes',
  'happy',
  'computer',
];

const SearchPage: NextPage = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>(
    RECENT_SEARCHES_MOCKS,
  );

  const isEmptyRecentSearches = recentSearches.length === 0;

  return (
    <>
      <Seo title={'검색 | a daily diary'} />
      <SearchHeader />
      <Container>
        <Title>최근 검색어</Title>
        {isEmptyRecentSearches ? (
          <NoSearchResults description="최근 검색어 내역이 없습니다." />
        ) : (
          <RecentSearchList>
            {recentSearches.map((recentSearch) => {
              return (
                <li key={recentSearch}>
                  <RecentSearchButton type="button">
                    {recentSearch}
                    <CloseIcon width={16} height={16} />
                  </RecentSearchButton>
                </li>
              );
            })}
          </RecentSearchList>
        )}
      </Container>
    </>
  );
};

export default SearchPage;

const Container = styled.section`
  overflow-y: auto;
  padding: 24px 0;
  scrollbar-width: none;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h2`
  padding: 0 20px;
  ${({ theme }) => theme.fonts.headline_02}
`;

const RecentSearchList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 20px;
`;

const RecentSearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.bg_01};
  ${({ theme }) => theme.fonts.body_05}

  & svg {
    stroke: ${({ theme }) => theme.colors.gray_04};
  }
`;
