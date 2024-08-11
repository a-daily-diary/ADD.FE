import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { NextPage } from 'next';
import type { SearchForm, SortByOption } from 'types/search';
import { ObserverTarget, Seo } from 'components/common';
import { DiariesContainer } from 'components/diary';
import {
  NoSearchResults,
  SearchHeader,
  SearchResultHeader,
} from 'components/search';
import { INITIAL_SORT_BY_LIST } from 'constants/search';
import { useIntersectionObserver } from 'hooks/common';
import { useDiaries } from 'hooks/services';
import { getServerSidePropsWithAuth } from 'lib/auth';
import { getQueryParams } from 'utils';

const SearchResultPage: NextPage<{ keyword: string }> = ({ keyword }) => {
  const [sortOptions, setSortOptions] = useState<SortByOption[]>([
    ...INITIAL_SORT_BY_LIST,
  ]);

  const selectedSortOption = useMemo(
    () => sortOptions.find((option) => option.selected) ?? sortOptions[0],
    [sortOptions],
  );

  const methods = useForm<SearchForm>({ mode: 'onChange' });

  const { diariesData, isLoading, isError, fetchNextPage } = useDiaries(
    keyword,
    selectedSortOption.id,
  );
  const { setTargetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
  });

  return (
    <>
      <Seo title={`${keyword} 검색 결과 | a daily diary`} />
      <Section>
        <FormProvider {...methods}>
          <SearchHeader />

          {diariesData !== undefined && (
            <>
              <DiariesContainer
                title={`${keyword} 검색 결과`}
                diariesData={diariesData}
                empty={
                  <NoSearchResults
                    description={`"${keyword}" 에 대한 검색 결과가 없습니다.`}
                  />
                }
                header={
                  <SearchResultHeader
                    totalCount={diariesData[0].totalCount}
                    selectedSortOption={selectedSortOption}
                    sortOptions={sortOptions}
                    setSortOptions={setSortOptions}
                  />
                }
                highlightKeyword={keyword}
              />
              <ObserverTarget
                targetRef={setTargetRef}
                isLoading={isLoading}
                isError={isError}
              />
            </>
          )}
        </FormProvider>
      </Section>
    </>
  );
};

export const getServerSideProps = getServerSidePropsWithAuth((context) => {
  const { query } = context;
  const [keyword] = getQueryParams(query.keyword);

  return { props: { keyword } };
});

export default SearchResultPage;

const Section = styled.section`
  overflow-y: auto;
  height: 100vh;
  scrollbar-width: none;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
