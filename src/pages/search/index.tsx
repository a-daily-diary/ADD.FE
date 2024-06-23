import styled from '@emotion/styled';
import { getServerSession } from 'next-auth';
import { FormProvider, useForm } from 'react-hook-form';
import type { GetServerSideProps, NextPage } from 'next';
import type { SearchForm } from 'types/search';
import { Seo } from 'components/common';
import { RecentSearchContainer, SearchHeader } from 'components/search';
import { PAGE_PATH } from 'constants/common';
import { authOptions } from 'pages/api/auth/[...nextauth]';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

  if (session === null) {
    return {
      redirect: {
        destination: PAGE_PATH.account.login,
        permanent: false,
      },
    };
  }

  return { props: { session } };
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
