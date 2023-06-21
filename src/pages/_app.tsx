import { Global, ThemeProvider } from '@emotion/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { Layout } from 'components/layouts';
import { theme, GlobalStyle } from 'styles';

export default function App({ Component, pageProps }: AppProps) {
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
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
