import styled from '@emotion/styled';
import { getServerSession } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import type { SearchForm } from 'types/search';
import { FullPageLoading, ObserverTarget, Seo } from 'components/common';
import { DiariesContainer } from 'components/diary';
import {
  NoSearchResults,
  RecentSearchContainer,
  SearchHeader,
} from 'components/search';
import { PAGE_PATH } from 'constants/common';
import { useIntersectionObserver, useSearchKeywordStorage } from 'hooks/common';
import { useDiaries } from 'hooks/services';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const SearchResultPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ keyword }) => {
  const methods = useForm<SearchForm>({ mode: 'onChange' });
  const { watch } = methods;
  const { searchKeyword } = watch();

  const {
    keywords,
    handleSaveSearchKeyword,
    handleDeleteSearchKeyword,
    handleDeleteAllSearchKeyword,
  } = useSearchKeywordStorage();

  const { diariesData, isLoading, isError, fetchNextPage } = useDiaries(
    keyword as string,
  );
  const { setTargetRef } = useIntersectionObserver({
    onIntersect: fetchNextPage,
  });

  const isShowRecentSearchResult =
    searchKeyword === undefined || searchKeyword.length === 0;

  if (diariesData === undefined) return <FullPageLoading />;

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
            <>
              <DiariesContainer
                title={`${searchKeyword} 검색 결과`}
                diariesData={diariesData}
                empty={<NoSearchResults description="검색 결과가 없습니다." />}
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

export const getServerSideProps: GetServerSideProps = (async (context) => {
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

  return { props: { session, keyword } };
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
