import styled from '@emotion/styled';
import { useState } from 'react';
import { NoSearchResults } from './NoSearchResults';
import { CloseIcon } from 'assets/icons';
import { theme } from 'styles';

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

export const RecentSearchContainer = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>(
    RECENT_SEARCHES_MOCKS,
  );

  const isEmptyRecentSearches = recentSearches.length === 0;

  return (
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
                  <CloseIcon
                    width={16}
                    height={16}
                    stroke={theme.colors.gray_04}
                  />
                </RecentSearchButton>
              </li>
            );
          })}
        </RecentSearchList>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.headline_02}
`;

const RecentSearchList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 18px;
`;

const RecentSearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.bg_01};
  ${({ theme }) => theme.fonts.body_05}
`;
