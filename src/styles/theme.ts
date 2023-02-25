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
    font-size: ${size}px;
    font-weight: ${weight};
    line-height: ${lineHeight}%;
    letter-spacing: ${letterSpacing}em;
  `;
};

const theme: Theme = {
  colors,
  fonts: {
    diary_title: fontStyle({
      fontFamily: montserrat.style.fontFamily,
      size: 20,
      weight: 700,
      lineHeight: 140,
    }),
    diary_body: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 14,
      weight: 400,
      lineHeight: 160,
    }),
    diary_info: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 12,
      weight: 400,
      lineHeight: 100,
      letterSpacing: -0.02,
    }),
    diary_icon: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 12,
      weight: 500,
      lineHeight: 100,
      letterSpacing: -0.02,
    }),
    navigation: fontStyle({
      fontFamily: pretendard.style.fontFamily,
      size: 12,
      weight: 500,
      lineHeight: 100,
      letterSpacing: -0.04,
    }),
  },
};

export default theme;
