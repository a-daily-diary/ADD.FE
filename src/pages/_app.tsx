import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import { global } from 'styles/globals';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={global} />
      <Component {...pageProps} />
    </>
  );
}
