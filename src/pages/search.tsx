import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Seo } from 'components/common';
import { SearchHeader } from 'components/search';

const SearchPage: NextPage = () => {
  return (
    <>
      <Seo title={'검색 | a daily diary'} />
      <SearchHeader />
      <Container>
        <div>search</div>
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
