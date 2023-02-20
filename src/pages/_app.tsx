import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Layout from 'components/layouts/Layout';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyle} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
