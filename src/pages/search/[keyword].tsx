import styled from '@emotion/styled';
import { getServerSession } from 'next-auth';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import type { SearchForm, SortByOption } from 'types/search';
import { ObserverTarget, Seo } from 'components/common';
import { DiariesContainer } from 'components/diary';
import {
  NoSearchResults,
  SearchHeader,
  SearchResultHeader,
} from 'components/search';
import { PAGE_PATH } from 'constants/common';
import { SORT_BY_LIST } from 'constants/search';
import { useIntersectionObserver } from 'hooks/common';
import { useDiaries } from 'hooks/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const SearchResultPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ keyword }) => {
  const [sortOptions, setSortOptions] = useState<SortByOption[]>(SORT_BY_LIST);

  const sortBy = useMemo(
    () => sortOptions.filter((option) => option.selected)[0].id,
    [sortOptions],
  );

  const methods = useForm<SearchForm>({ mode: 'onChange' });

  const { diariesData, isLoading, isError, fetchNextPage } = useDiaries(
    keyword,
    sortBy,
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
export const getServerSideProps = (async (context) => {
  const { req, res, params } = context;
  const keyword = params?.keyword as string;

  const session = await getServerSession(req, res, authOptions);

  if (session === null) {
    return {
      redirect: {
        destination: PAGE_PATH.account.login,
        permanent: false,
      },
    };
  }

  return { props: { keyword } };
}) satisfies GetServerSideProps;

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
