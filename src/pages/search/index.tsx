import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';
import type { NextPage } from 'next';
import type { SearchForm } from 'types/search';
import { Seo } from 'components/common';
import { RecentSearchContainer, SearchHeader } from 'components/search';

const SearchPage: NextPage = () => {
  const methods = useForm<SearchForm>({ mode: 'onChange' });

  return (
    <>
      <Seo title={'검색 | a daily diary'} />
      <Section>
        <FormProvider {...methods}>
          <SearchHeader />
          <RecentSearchContainer />
        </FormProvider>
      </Section>
    </>
  );
};

export default SearchPage;

const Section = styled.section`
  overflow-y: auto;
  height: 100vh;
  scrollbar-width: none;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
