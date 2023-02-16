import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyle} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
