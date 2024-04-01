import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';
import type { NextPage } from 'next';
import type { SearchForm } from 'types/search';
import { Seo } from 'components/common';
import { RecentSearchContainer, SearchHeader } from 'components/search';
import { useSearchKeywordStorage } from 'hooks/common';

const SearchPage: NextPage = () => {
  const methods = useForm<SearchForm>({ mode: 'onChange' });
  const { watch } = methods;
  const { searchKeyword } = watch();

  const {
    keywords,
    handleSaveSearchKeyword,
    handleDeleteSearchKeyword,
    handleDeleteAllSearchKeyword,
  } = useSearchKeywordStorage();

  const isShowRecentSearchResult =
    searchKeyword === undefined || searchKeyword.trim().length === 0;

  return (
    <>
      <Seo title={'검색 | a daily diary'} />
      <Section>
        <FormProvider {...methods}>
          <SearchHeader onSaveSearchKeyword={handleSaveSearchKeyword} />
          {isShowRecentSearchResult ? (
            <RecentSearchContainer
              recentSearchKeywords={keywords}
              onDeleteSearchKeyword={handleDeleteSearchKeyword}
              onDeleteAllSearchKeyword={handleDeleteAllSearchKeyword}
            />
          ) : (
            <div>검색결과</div>
          )}
        </FormProvider>
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
