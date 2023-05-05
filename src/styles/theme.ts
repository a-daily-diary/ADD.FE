import { css } from '@emotion/react';
import { Montserrat } from '@next/font/google';
import localFont from '@next/font/local';
import type { SerializedStyles, Theme } from '@emotion/react';
import type { NextFont } from '@next/font/dist/types';
import colors from 'constants/colors';

const pretendard = localFont({
  src: [
    {
      path: '../assets/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'block',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
});

const montserrat = Montserrat({
  weight: '700',
  style: 'normal',
  display: 'block',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
});

interface Font {
  fontFamily: string | NextFont;
  size: number;
  weight: 400 | 500 | 700;
  lineHeight: number;
  letterSpacing?: number;
}

const fontStyle = ({
  fontFamily,
  size,
  weight,
  lineHeight,
  letterSpacing,
}: Font): SerializedStyles => {
  return css`
    font-family: ${fontFamily};
    font-size: ${size}rem;
    font-weight: ${weight};
    line-height: ${lineHeight};
    letter-spacing: ${letterSpacing}em;
  `;
};

const theme: Theme = {
  colors,
  fonts: {
    headline_01: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 2.4,
      weight: 700,
      lineHeight: 1.4,
      letterSpacing: -0.02,
    }),
    headline_02: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 2,
      weight: 700,
      lineHeight: 1.6,
      letterSpacing: -0.02,
    }),
    headline_03: fontStyle({
      fontFamily: montserrat.style.fontFamily,
      size: 2,
      weight: 700,
      lineHeight: 1.4,
    }),
    headline_04: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.6,
      weight: 700,
      lineHeight: 1.4,
      letterSpacing: -0.02,
    }),
    headline_05: fontStyle({
      fontFamily: montserrat.style.fontFamily,
      size: 1.6,
      weight: 700,
      lineHeight: 1,
    }),
    body_01: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 2,
      weight: 400,
      lineHeight: 1,
      letterSpacing: -0.02,
    }),
    body_02: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.8,
      weight: 500,
      lineHeight: 1,
      letterSpacing: -0.02,
    }),
    body_03: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.6,
      weight: 500,
      lineHeight: 1.6,
      letterSpacing: -0.02,
    }),
    body_04: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.6,
      weight: 400,
      lineHeight: 1.4,
      letterSpacing: -0.02,
    }),
    body_05: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.6,
      weight: 400,
      lineHeight: 1,
      letterSpacing: -0.02,
    }),
    body_06: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.4,
      weight: 400,
      lineHeight: 1.6,
    }),
    body_07: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.4,
      weight: 400,
      lineHeight: 1.4,
      letterSpacing: -0.02,
    }),
    body_08: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.4,
      weight: 400,
      lineHeight: 1,
      letterSpacing: -0.02,
    }),
    body_09: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.2,
      weight: 400,
      lineHeight: 1.4,
      letterSpacing: -0.02,
    }),
    caption_01: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.2,
      weight: 500,
      lineHeight: 1,
      letterSpacing: -0.02,
    }),
    caption_02: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.2,
      weight: 400,
      lineHeight: 1,
      letterSpacing: -0.02,
    }),
    navigation: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.2,
      weight: 500,
      lineHeight: 1,
      letterSpacing: -0.04,
    }),
    button_01: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.2,
      weight: 500,
      lineHeight: 1,
      letterSpacing: -0.02,
    }),
    button_02: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.4,
      weight: 700,
      lineHeight: 1,
      letterSpacing: -0.02,
    }),
    button_03: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 1.6,
      weight: 700,
      lineHeight: 1,
      letterSpacing: -0.02,
    }),
  },
};

export default theme;
