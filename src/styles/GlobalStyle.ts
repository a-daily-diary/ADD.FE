import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import theme from './theme';

const GlobalStyle = css`
  ${emotionReset}

  * {
    box-sizing: border-box;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    color: ${theme.colors.gray_00};
  }

  html {
    /* 10px = 1rem */
    font-size: 62.5%;
  }

  body {
    /* 기본 폰트 사이즈 설정: 16px */
    font-size: 1.6rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    overflow: visible;
    width: auto;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;

    /* Normalize 'line-height'. Cannot be changed from 'normal' in Firefox 4+. */
    line-height: normal;

    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    /* Corrects inability to style clickable 'input' types in iOS */
    -webkit-appearance: none;

    /* Remove excess padding and border in Firefox 4+ */
    &::-moz-focus-inner {
      border: 0;
      padding: 0;
    }
  }

  textarea {
    overflow: hidden; /* 스크롤 바 숨기기 위해 적용 */
    padding: 0;
    border: 0;
    background-color: transparent;
    font: inherit;
    resize: none;

    &::placeholder {
      font: inherit;
    }

    &:focus {
      outline: 0;
    }
  }

  input {
    border: 0;
    color: inherit;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    box-shadow: 0 0 0px 1000px #fff inset;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`;

export default GlobalStyle;
