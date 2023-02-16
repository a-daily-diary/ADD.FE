import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

const GlobalStyle = css`
  ${emotionReset}

  * {
    box-sizing: border-box;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    width: 100%;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`;

export default GlobalStyle;
