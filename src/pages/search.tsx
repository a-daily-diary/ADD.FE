import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Seo } from 'components/common';
import { RecentSearchContainer, SearchHeader } from 'components/search';

const SearchPage: NextPage = () => {
  return (
    <>
      <Seo title={'검색 | a daily diary'} />
      <Section>
        <SearchHeader />
        <RecentSearchContainer />
      </Section>
    </>
  );
};

export default SearchPage;

const Section = styled.section`
  overflow-y: auto;
  scrollbar-width: none;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
