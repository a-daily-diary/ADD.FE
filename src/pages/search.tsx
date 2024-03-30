import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Seo } from 'components/common';
import { SearchHeader } from 'components/search';
import { NoSearchResults } from 'components/search/NoSearchResults';

const SearchPage: NextPage = () => {
  return (
    <>
      <Seo title={'검색 | a daily diary'} />
      <SearchHeader />
      <Container>
        <Title>최근 검색어</Title>
        <NoSearchResults description="최근 검색어 내역이 없습니다." />
      </Container>
    </>
  );
};

export default SearchPage;

const Container = styled.section`
  overflow-y: auto;
  scrollbar-width: none;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h2`
  padding: 24px 20px;
  ${({ theme }) => theme.fonts.headline_02}
`;
