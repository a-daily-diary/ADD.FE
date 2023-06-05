import { Global, ThemeProvider } from '@emotion/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import type { DehydratedState } from '@tanstack/react-query';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import type { ReactElement, ReactNode } from 'react';
import { theme, GlobalStyle } from 'styles';

export type NextPageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout;
  pageProps: P & {
    session?: Session;
    dehydratedState: DehydratedState;
  };
};

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout<{ session: Session }>) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = useState(new QueryClient());

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={pageProps.session}>
            <ThemeProvider theme={theme}>
              <Global styles={GlobalStyle} />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
