import { Global, ThemeProvider } from '@emotion/react';
import Head from 'next/head';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyle} />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
}
